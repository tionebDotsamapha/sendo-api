import axios from 'axios';

// Configuration BirdEye API
const BIRDEYE_API_BASE = 'https://public-api.birdeye.so/defi';
const BIRDEYE_API_KEY = process.env.BIRDEYE_API_KEY || 'a96a597d5ed746a2a93cbb8f7d7602e6';

// Interface pour les données de prix BirdEye
export interface BirdEyePriceData {
  unixTime: number;
  value: number;
}

export interface BirdEyeResponse {
  success: boolean;
  data: {
    isScaledUiToken: boolean;
    items: BirdEyePriceData[];
  };
}

// Variable globale pour tracker le dernier appel API
let lastApiCall = 0;

/**
 * Récupère l'historique des prix d'un token depuis un timestamp donné
 */
export const getHistoricalPrices = async (
  mint: string,
  fromTimestamp: number,
  toTimestamp: number,
  timeframe: '1m' | '3m' | '5m' | '15m' | '30m' | '1H' | '2H' | '4H' | '6H' | '8H' | '12H' | '1D' | '3D' | '1W' | '1M' = '1H'
): Promise<BirdEyePriceData[]> => {
  try {
    // Respecter la limite de 1 requête par seconde
    const now = Date.now();
    const timeSinceLastCall = now - lastApiCall;
    
    if (timeSinceLastCall < 1000) {
      const waitTime = 1000 - timeSinceLastCall;
      console.log(`⏳ Attente de ${waitTime}ms pour respecter le rate limit...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    lastApiCall = Date.now();
    
    const response = await axios.get<BirdEyeResponse>(`${BIRDEYE_API_BASE}/history_price`, {
      params: {
        address: mint,
        address_type: 'token',
        type: timeframe,
        time_from: fromTimestamp,
        time_to: toTimestamp,
        ui_amount_mode: 'raw'
      },
      headers: {
        'accept': 'application/json',
        'x-chain': 'solana',
        ...(BIRDEYE_API_KEY && { 'X-API-KEY': BIRDEYE_API_KEY })
      },
      timeout: 5000
    });

    if (response.data.success && response.data.data.items) {
      return response.data.data.items;
    }
    
    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        console.warn(`Rate limit atteint pour ${mint}, attente de 3 secondes...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
        return [];
      }
      console.error(`Erreur BirdEye pour ${mint}: ${error.response?.status} - ${error.message}`);
    } else {
      console.error(`Erreur BirdEye pour ${mint}:`, error instanceof Error ? error.message : String(error));
    }
    return [];
  }
};

/**
 * Fonction simple : récupère les prix depuis l'achat jusqu'à maintenant
 * et trouve le prix le plus haut (ATH)
 */
export const getPriceAnalysis = async (
  mint: string,
  purchaseTimestamp: number
): Promise<{
  purchasePrice: number;
  currentPrice: number;
  athPrice: number;
  athTimestamp: number;
  priceHistory: BirdEyePriceData[];
} | null> => {
  try {
    const now = Math.floor(Date.now() / 1000);
    
    // Récupérer tous les prix depuis l'achat jusqu'à maintenant
    const priceHistory = await getHistoricalPrices(mint, purchaseTimestamp, now, '1H');
    
    if (priceHistory.length === 0) {
      console.warn(`Aucune donnée de prix trouvée pour ${mint}`);
      return null;
    }

    // Prix d'achat (premier prix)
    const purchasePrice = priceHistory[0].value;
    
    // Prix actuel (dernier prix)
    const currentPrice = priceHistory[priceHistory.length - 1].value;
    
    // Trouver le prix le plus haut (ATH)
    let athPrice = purchasePrice;
    let athTimestamp = purchaseTimestamp;
    
    priceHistory.forEach(price => {
      if (price.value > athPrice) {
        athPrice = price.value;
        athTimestamp = price.unixTime;
      }
    });

    return {
      purchasePrice,
      currentPrice,
      athPrice,
      athTimestamp,
      priceHistory
    };
  } catch (error) {
    console.error(`Erreur analyse prix ${mint}:`, error instanceof Error ? error.message : String(error));
    return null;
  }
};

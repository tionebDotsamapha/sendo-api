import { getPriceAnalysis } from '../src/services/birdeyes.js';

/**
 * Tests pour la fonction getPriceAnalysis
 * Teste les 2 adresses fournies
 */

async function testPriceAnalysis() {
    console.log('🎯 Test Fonction Simple BirdEye');
    console.log('===============================');
    
    // Test avec les données de votre transaction
    const testCases = [
        {
            name: 'Token DiEhaRyCBrKoEpBVCBUjNkHT8Kh5CS8oZsUbrvMnpump',
            mint: 'DiEhaRyCBrKoEpBVCBUjNkHT8Kh5CS8oZsUbrvMnpump',
            timestamp: 1757259522,
            description: 'Transaction d\'achat Pump.fun'
        },
        {
            name: 'Token YD3xgCvyX2yQXWT6eiSUtEJJrU4AzrVrZkRM4MMpump',
            mint: 'YD3xgCvyX2yQXWT6eiSUtEJJrU4AzrVrZkRM4MMpump',
            timestamp: Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60), // Il y a 7 jours
            description: 'Test avec USDC pour vérifier la connectivité'
        },
        {
            name: 'Token 3gT5dyrFXb5pEzhyfWFF9jHLr14FP4L75Mffbivtpump',
            mint: '3gT5dyrFXb5pEzhyfWFF9jHLr14FP4L75Mffbivtpump',
            timestamp: Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60), // Il y a 7 jours
            description: 'Test avec Other pour vérifier la connectivité'
        }
    ];

    for (const testCase of testCases) {
        console.log(`\n📊 Test: ${testCase.name}`);
        console.log(`📅 Date d'achat: ${new Date(testCase.timestamp * 1000).toISOString()}`);
        console.log(`📝 Description: ${testCase.description}`);
        console.log('---');
        
        try {
            console.log('⏳ Analyse en cours...');
            const result = await getPriceAnalysis(testCase.mint, testCase.timestamp);
            
            if (result) {
                console.log('✅ Analyse réussie !');
                console.log('\n📊 RÉSULTATS:');
                console.log(`💰 Prix d'achat: $${result.purchasePrice.toFixed(8)}`);
                console.log(`💵 Prix actuel: $${result.currentPrice.toFixed(8)}`);
                console.log(`📈 Prix le plus haut (ATH): $${result.athPrice.toFixed(8)}`);
                console.log(`📅 Date de l'ATH: ${new Date(result.athTimestamp * 1000).toISOString()}`);
                console.log(`📈 Nombre de points: ${result.priceHistory.length}`);
                
                // Calculs de performance
                const gainFromPurchase = ((result.currentPrice - result.purchasePrice) / result.purchasePrice) * 100;
                const missedGains = ((result.athPrice - result.currentPrice) / result.purchasePrice) * 100;
                const daysSincePurchase = (Date.now() / 1000 - testCase.timestamp) / (24 * 60 * 60);
                
                console.log('\n🎯 PERFORMANCES:');
                console.log(`📊 Gain depuis l'achat: ${gainFromPurchase.toFixed(2)}%`);
                console.log(`📉 Perte depuis l'ATH: ${missedGains.toFixed(2)}%`);
                console.log(`⏰ Jours depuis l'achat: ${daysSincePurchase.toFixed(1)}`);
                
                console.log('\n📋 RÉSUMÉ:');
                if (gainFromPurchase > 0) {
                    console.log(`🎉 Position profitable: +${gainFromPurchase.toFixed(2)}%`);
                } else {
                    console.log(`😞 Position en perte: ${gainFromPurchase.toFixed(2)}%`);
                }
                
                if (missedGains > 0) {
                    console.log(`⚠️  Vous avez raté ${missedGains.toFixed(2)}% de gains !`);
                } else {
                    console.log(`🎯 Vous avez vendu au bon moment !`);
                }
            } else {
                console.log('❌ Aucune donnée trouvée pour ce token');
            }
        } catch (error) {
            console.error('❌ Erreur lors du test:', error instanceof Error ? error.message : String(error));
        }
        
        console.log('\n' + '='.repeat(50));
    }
}

// Fonction pour tester un seul token rapidement
async function testSingleToken(mint: string, timestamp: number) {
    console.log(`\n🔍 Test rapide pour ${mint}`);
    console.log(`📅 Timestamp: ${timestamp} (${new Date(timestamp * 1000).toISOString()})`);
    
    const result = await getPriceAnalysis(mint, timestamp);
    
    if (result) {
        const gain = ((result.currentPrice - result.purchasePrice) / result.purchasePrice) * 100;
        console.log(`✅ Prix d'achat: $${result.purchasePrice.toFixed(8)}`);
        console.log(`✅ Prix actuel: $${result.currentPrice.toFixed(8)}`);
        console.log(`✅ ATH: $${result.athPrice.toFixed(8)}`);
        console.log(`✅ Gain: ${gain.toFixed(2)}%`);
        return result;
    } else {
        console.log('❌ Aucune donnée');
        return null;
    }
}

// Exécution des tests
async function runAllTests() {
    try {
        await testPriceAnalysis();
        
        console.log('\n🏁 Test terminé');
    } catch (error) {
        console.error('❌ Erreur globale:', error instanceof Error ? error.message : String(error));
    }
}

// Exécuter si le fichier est lancé directement
if (import.meta.url === `file://${process.argv[1]}`) {
    runAllTests();
}

export { testPriceAnalysis, testSingleToken, runAllTests };

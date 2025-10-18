import { Request, Response } from 'express';
import { getTransactionsForAddress } from '../services/helius.js';
import { decodeTxData, serializedBigInt } from '../utils/decoder/index.js';

export const getTradesForAddressController = async (req: Request, res: Response) => {
    try {
        const address: string = req.params.address;
        const limit: number = Number(req.query.limit) || 5;
        const transactions = await getTransactionsForAddress(address, limit);
        const parsedTransactionsArray: any[] = [];

        for (const transaction of transactions) {
            const tx = await decodeTxData(transaction);

            if (tx.balances.signerTokenBalances.length > 0 && tx.error === 'SUCCESS') {
                parsedTransactionsArray.push({
                    signature: tx.signature,
                    recentBlockhash: tx.recentBlockhash,
                    blockTime: tx.blockTime,
                    fee: tx.fee,
                    error: tx.error,
                    status: tx.status,
                    accounts: tx.accounts,
                    balances: {
                        signerAddress: tx.balances.signerAddress,
                        solBalance: tx.balances.signerSolBalance,
                        tokenBalances: tx.balances.signerTokenBalances,
                    },
                });
            }
        }

        if (!address) {
            return res.status(400).json({
                message: 'Address is required',
                version: '1.0.0'
            });
        }

        res.json({
            message: 'Transactions retrieved successfully',
            version: '1.0.0',
            transactions: serializedBigInt(parsedTransactionsArray)
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving transactions',
            version: '1.0.0',
            error: error
        });
    }
};
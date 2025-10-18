import { Request, Response } from 'express';
import { getTransactionsForAddress } from '../services/helius.js';
import { decodeTxData } from '../utils/decoder/index.js';
import { serializedBigInt } from '../utils/decoder/index.js';

export const getTransactionsForAddressController = async (req: Request, res: Response) => {
    try {
        const address: string = req.params.address;
        const limit: number = Number(req.query.limit) || 5;
        const transactions = await getTransactionsForAddress(address, limit);
        const parsedTransactionsArray: any[] = [];

        for (const transaction of transactions) {
            const tx = await decodeTxData(transaction);
            parsedTransactionsArray.push(tx);
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
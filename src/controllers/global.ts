import { Request, Response } from 'express';
import { getBalanceForAddress } from '../services/helius.js';
import { serializedBigInt } from '../utils/decoder/index.js';

export const getGlobalForAddressController = async (req: Request, res: Response) => {
    try {
        const address: string = req.params.address;
        const balance = await getBalanceForAddress(address);
        console.log(balance);

        if (!address) {
            return res.status(400).json({
                message: 'Address is required',
                version: '1.0.0'
            });
        }

        res.json({
            message: 'Global information retrieved successfully',
            version: '1.0.0',
            global: {
                balance: serializedBigInt(balance)
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving global information',
            version: '1.0.0',
            error: error
        });
    }
};
import { Request, Response } from 'express';
import { getTokensForAddress } from '../services/helius.js';

export const getTokensForAddressController = async (req: Request, res: Response) => {
    try {
        const address: string = req.params.address;
        const tokens = await getTokensForAddress(address);
        if (!address) {
            return res.status(400).json({
                message: 'Address is required',
                version: '1.0.0'
            });
        }
        res.json({
            message: 'Tokens retrieved successfully',
            version: '1.0.0',
            tokens: tokens
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving tokens',
            version: '1.0.0',
            error: error
        });
    }
};
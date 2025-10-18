import { Request, Response } from 'express';
import { getSignaturesForAddress } from '../services/helius.js';
import { serializedBigInt } from '../utils/decoder/index.js';

export const getSignaturesForAddressController = async (req: Request, res: Response) => {
    try {
        const address: string = req.params.address;
        const limit: number = Number(req.query.limit) || 5;
        const signatures = await getSignaturesForAddress(address, limit);
    
        if (!address) {
            return res.status(400).json({
                message: 'Address is required',
                version: '1.0.0'
            });
        }

        res.json({
            message: 'Signatures retrieved successfully',
            version: '1.0.0',
            signatures: serializedBigInt(signatures)
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving signatures',
            version: '1.0.0',
            error: error
        });
    }
};
import { Request, Response } from 'express';
import { getNftsForAddress } from '../services/helius.js';

export const getNftsForAddressController = async (req: Request, res: Response) => {
    try {
        const address: string = req.params.address;
        const nfts = await getNftsForAddress(address);
        if (!address) {
            return res.status(400).json({
                message: 'Address is required',
                version: '1.0.0'
            });
        }
        res.json({
            message: 'Nfts retrieved successfully',
            version: '1.0.0',
            nfts: nfts
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving nfts',
            version: '1.0.0',
            error: error
        });
    }
};
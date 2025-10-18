import { Router } from 'express';
import { getSignaturesForAddressController } from '../controllers/signatures.js';
import { getTokensForAddressController } from '../controllers/tokens.js';
import { getNftsForAddressController } from '../controllers/nfts.js';
import { getGlobalForAddressController } from '../controllers/global.js';
import { getTransactionsForAddressController } from '../controllers/transactions.js';
import { getTradesForAddressController } from '../controllers/trades.js';

const router = Router();

router.get('/signatures/:address', (req, res) => getSignaturesForAddressController(req, res));
router.get('/tokens/:address', (req, res) => getTokensForAddressController(req, res));
router.get('/transactions/:address', (req, res) => getTransactionsForAddressController(req, res));
router.get('/trades/:address', (req, res) => getTradesForAddressController(req, res));
router.get('/nfts/:address', (req, res) => getNftsForAddressController(req, res));
router.get('/global/:address', (req, res) => getGlobalForAddressController(req, res));

export default router;
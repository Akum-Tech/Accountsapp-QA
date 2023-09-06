import { Router } from 'express';
const VoucherRoutes = Router();
import { checkToken } from '../utility/tokenValidation';

import { getAllVoucher } from '../controllers/vouchers.controller';

VoucherRoutes.post('/' , checkToken, getAllVoucher);


export default VoucherRoutes;
import { Router } from 'express';
const DebitVoucherRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { getDebitVouchers, getDebitVoucher, createDebitVoucher, deleteDebitVoucher, updateDebitVoucher, getDebitVoucherLastDate, cancelDebitVoucher } from '../controllers/debitVoucher.controller';

DebitVoucherRoutes.post('/all',checkToken, getDebitVouchers);
DebitVoucherRoutes.get('/:id',checkToken, getDebitVoucher);
DebitVoucherRoutes.post('/',checkToken, checkPlan, createDebitVoucher);
DebitVoucherRoutes.delete('/:id',checkToken, deleteDebitVoucher);
DebitVoucherRoutes.put('/:id',checkToken, checkPlan, updateDebitVoucher);
DebitVoucherRoutes.post('/lastdate',checkToken, getDebitVoucherLastDate);
DebitVoucherRoutes.put('/cancel/:id',checkToken, cancelDebitVoucher);


export default DebitVoucherRoutes;
import { Router } from 'express';
const CreditVoucherRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { getCreditVouchers, getCreditVoucher, createCreditVoucher, deleteCreditVoucher, updateCreditVoucher, getCreditVoucherLastDate, cancelCreditVoucher } from '../controllers/creditVoucher.controller';



CreditVoucherRoutes.post('/all',checkToken, getCreditVouchers);
CreditVoucherRoutes.get('/:id',checkToken, getCreditVoucher);
CreditVoucherRoutes.post('/',checkToken, checkPlan, createCreditVoucher);
CreditVoucherRoutes.delete('/:id',checkToken, deleteCreditVoucher);
CreditVoucherRoutes.put('/:id',checkToken, checkPlan, updateCreditVoucher);
CreditVoucherRoutes.post('/lastdate',checkToken, getCreditVoucherLastDate);
CreditVoucherRoutes.put('/cancel/:id',checkToken, cancelCreditVoucher);


export default CreditVoucherRoutes;
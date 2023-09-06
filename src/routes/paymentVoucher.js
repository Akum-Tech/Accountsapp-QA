import { Router } from 'express';
const PaymentVoucherRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { getPaymentVouchers, getPaymentVoucher, createPaymentVoucher, deletePaymentVoucher, updatePaymentVoucher, getPaymentVoucherLastDate, cancelPaymentVoucher } from '../controllers/paymentVoucher.controller';


PaymentVoucherRoutes.post('/all',checkToken, getPaymentVouchers);
PaymentVoucherRoutes.get('/:id',checkToken, getPaymentVoucher);
PaymentVoucherRoutes.post('/',checkToken, checkPlan, createPaymentVoucher);
PaymentVoucherRoutes.delete('/:id',checkToken, deletePaymentVoucher);
PaymentVoucherRoutes.put('/:id',checkToken, checkPlan, updatePaymentVoucher);
PaymentVoucherRoutes.post('/lastdate',checkToken, getPaymentVoucherLastDate);
PaymentVoucherRoutes.put('/cancel/:id',checkToken, cancelPaymentVoucher);

export default PaymentVoucherRoutes;
import { Router } from 'express';
const RecieptVoucherRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { getRecieptVouchers, getRecieptVoucher, createRecieptVoucher, deleteRecieptVoucher, updateRecieptVoucher, getRecieptVoucherLastDate , cancelRecieptVoucher} from '../controllers/recieptVoucher.controller';

RecieptVoucherRoutes.post('/all',checkToken, getRecieptVouchers);
RecieptVoucherRoutes.get('/:id',checkToken, getRecieptVoucher);
RecieptVoucherRoutes.post('/',checkToken, checkPlan, createRecieptVoucher);
RecieptVoucherRoutes.delete('/:id',checkToken, deleteRecieptVoucher);
RecieptVoucherRoutes.put('/:id',checkToken, checkPlan, updateRecieptVoucher);
RecieptVoucherRoutes.post('/lastdate',checkToken, getRecieptVoucherLastDate);
RecieptVoucherRoutes.put('/cancel/:id',checkToken, cancelRecieptVoucher);

export default RecieptVoucherRoutes;
import { Router } from 'express';
const PurchaseVoucherRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { getPurchaseVouchers, getPurchaseVoucher, createPurchaseVoucher, deletePurchaseVoucher, updatePurchaseVoucher, getPurchaseVoucherLastDate, cancelPurchaseVoucher } from '../controllers/purchaseVoucher.controller';


PurchaseVoucherRoutes.post('/all',checkToken, getPurchaseVouchers);
PurchaseVoucherRoutes.get('/:id',checkToken, getPurchaseVoucher);
PurchaseVoucherRoutes.post('/',checkToken, checkPlan, createPurchaseVoucher);
PurchaseVoucherRoutes.delete('/:id',checkToken, deletePurchaseVoucher);
PurchaseVoucherRoutes.put('/:id',checkToken, checkPlan, updatePurchaseVoucher);
PurchaseVoucherRoutes.post('/lastdate',checkToken, getPurchaseVoucherLastDate);
PurchaseVoucherRoutes.put('/cancel/:id',checkToken, cancelPurchaseVoucher);


export default PurchaseVoucherRoutes;
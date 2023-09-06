import { Router } from 'express';
const SaleVoucherRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { getSaleVouchers, getSaleVoucher, createSaleVoucher, deleteSaleVoucher, updateSaleVoucher, getSaleVoucherLastDate, cancelSaleVoucher } from '../controllers/saleVoucher.controller';


SaleVoucherRoutes.post('/all',checkToken, getSaleVouchers);
SaleVoucherRoutes.get('/:id',checkToken, getSaleVoucher);
SaleVoucherRoutes.post('/lastdate',checkToken, getSaleVoucherLastDate);
SaleVoucherRoutes.post('/',checkToken, checkPlan, createSaleVoucher);
SaleVoucherRoutes.delete('/:id',checkToken, deleteSaleVoucher);
SaleVoucherRoutes.put('/:id',checkToken, checkPlan, updateSaleVoucher);
SaleVoucherRoutes.put('/cancel/:id',checkToken, cancelSaleVoucher);


export default SaleVoucherRoutes;
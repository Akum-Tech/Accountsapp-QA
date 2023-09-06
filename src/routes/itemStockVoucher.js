import { Router } from 'express';
const ItemStockVoucherRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { getItemStockVouchers, getItemStockVoucher, createItemStockVoucher, deleteItemStockVoucher, updateItemStockVoucher, getItemStockVoucherLastDate, cancelItemStockVoucher } from '../controllers/itemStockVoucher.controller';


ItemStockVoucherRoutes.post('/all',checkToken, getItemStockVouchers);
ItemStockVoucherRoutes.get('/:id',checkToken, getItemStockVoucher);
ItemStockVoucherRoutes.post('/',checkToken, checkPlan, createItemStockVoucher);
ItemStockVoucherRoutes.delete('/:id',checkToken, deleteItemStockVoucher);
ItemStockVoucherRoutes.put('/:id',checkToken, checkPlan, updateItemStockVoucher);
ItemStockVoucherRoutes.post('/lastdate',checkToken, getItemStockVoucherLastDate);
ItemStockVoucherRoutes.put('/cancel/:id',checkToken, cancelItemStockVoucher);
export default ItemStockVoucherRoutes;
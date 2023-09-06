import { Router } from 'express';
const ItemStockRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { getItemStocks, getItemStock, createItemStock,getItemStockGroupReport, getItemStockReport,deleteItemStock, updateItemStocks } from '../controllers/itemStock.controller';


ItemStockRoutes.get('/all',checkToken, getItemStocks);
ItemStockRoutes.get('/:id',checkToken, getItemStock);
ItemStockRoutes.post('/',checkToken, checkPlan, createItemStock);
ItemStockRoutes.delete('/:id',checkToken, deleteItemStock);
ItemStockRoutes.put('/:id',checkToken, checkPlan, updateItemStocks);
ItemStockRoutes.post('/getItemStockReport',checkToken, getItemStockReport);
ItemStockRoutes.post('/getItemStockGroupReport',checkToken, getItemStockGroupReport);


export default ItemStockRoutes;
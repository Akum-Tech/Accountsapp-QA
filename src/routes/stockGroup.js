import { Router } from 'express';
const StockRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { createStock, getStock, getStocks, deleteStock, updateStocks,getAllStockGroups } from '../controllers/stockGroup.controller';


StockRoutes.get('/all',checkToken, getStocks);
StockRoutes.get('/:id',checkToken, getStock);
StockRoutes.post('/', checkToken, checkPlan, createStock);
StockRoutes.delete('/:id',checkToken, deleteStock);
StockRoutes.put('/:id', checkToken, checkPlan, updateStocks);
StockRoutes.get('/all/:id', checkToken, getAllStockGroups);
export default StockRoutes;
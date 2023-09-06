import { Router } from 'express';
const SubStockRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { createSubStock, getSubStock, getSubStocks, deleteSubStock, updateSubStocks } from '../controllers/substockGroup.controller';


SubStockRoutes.get('/all',checkToken, getSubStocks);
SubStockRoutes.get('/:id',checkToken, getSubStock);
SubStockRoutes.post('/', checkToken, checkPlan,createSubStock);
SubStockRoutes.delete('/:id',checkToken, deleteSubStock);
SubStockRoutes.put('/:id', checkToken, checkPlan,updateSubStocks);

export default SubStockRoutes;
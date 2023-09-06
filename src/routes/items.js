import { Router } from 'express';
const ItemRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { createItem, getItem, getItems, deleteItem, updateItems } from '../controllers/items.controller';


ItemRoutes.get('/all',checkToken, getItems);
ItemRoutes.get('/:id',checkToken, getItem);
ItemRoutes.post('/',checkToken, checkPlan, createItem);
ItemRoutes.delete('/:id',checkToken, deleteItem);
ItemRoutes.put('/:id',checkToken, checkPlan, updateItems);


export default ItemRoutes;
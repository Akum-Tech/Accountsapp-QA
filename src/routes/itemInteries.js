import { Router } from 'express';
const ItemInteriesRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { getItemInteries, getItemIntery, createItemInteries, deleteItemInteries, updateItemInteries } from '../controllers/itemInteries.controller';



ItemInteriesRoutes.get('/all',checkToken, getItemInteries);
ItemInteriesRoutes.get('/:id',checkToken, getItemIntery);
ItemInteriesRoutes.post('/',checkToken, createItemInteries);
ItemInteriesRoutes.delete('/:id',checkToken, deleteItemInteries);
ItemInteriesRoutes.put('/:id',checkToken, updateItemInteries);


export default ItemInteriesRoutes;
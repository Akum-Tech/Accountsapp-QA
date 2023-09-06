import { Router } from 'express';
const TaxesRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { createTaxes, getTaxes, getTaxess, deleteTaxes, updateTaxes, getTaxebyStatus } from '../controllers/taxes.controller';

TaxesRoutes.get('/', checkToken , getTaxess);
TaxesRoutes.get('/:id', checkToken , getTaxes);
TaxesRoutes.post('/' , checkToken, checkPlan, createTaxes);
TaxesRoutes.get('/status/:status' , getTaxebyStatus);
TaxesRoutes.delete('/:id', checkToken , deleteTaxes);
TaxesRoutes.put('/:id', checkToken, checkPlan, updateTaxes);


export default TaxesRoutes;
import { Router } from 'express';
const UnitsRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { createUnit, getUnit, getUnits, deleteUnit, updateUnit} from '../controllers/units.controller';


UnitsRoutes.get('/', checkToken,getUnits);
UnitsRoutes.get('/:id',checkToken, getUnit);
UnitsRoutes.post('/', checkToken, checkPlan,createUnit);
UnitsRoutes.delete('/:id',checkToken, deleteUnit);
UnitsRoutes.put('/:id', checkToken, checkPlan, updateUnit);

export default UnitsRoutes;
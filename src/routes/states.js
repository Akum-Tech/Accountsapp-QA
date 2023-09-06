import { Router } from 'express';
import { checkToken } from '../utility/tokenValidation';
const StateRoutes = Router();
import { checkPlan } from '../utility/planCheck';
import { createState, getState, getStates, deleteState, updateStates } from '../controllers/states.controller';


StateRoutes.get('/', getStates);
StateRoutes.get('/:id', getState);
StateRoutes.post('/', checkToken, checkPlan, createState);
StateRoutes.delete('/:id', checkToken, deleteState);
StateRoutes.put('/:id', checkToken, checkPlan, updateStates);

export default StateRoutes;
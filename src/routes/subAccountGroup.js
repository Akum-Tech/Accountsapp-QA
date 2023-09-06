import { Router } from 'express';
const SubAccountGroupRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { createSubAccountGroup, getSubAccountGroup, getSubAccountGroups, deleteSubAccountGroup, updateSubAccountGroups } from '../controllers/subAccountGroup.controller';


SubAccountGroupRoutes.get('/all', checkToken,getSubAccountGroups);
SubAccountGroupRoutes.get('/:id',checkToken, getSubAccountGroup);
SubAccountGroupRoutes.post('/', checkToken, checkPlan, createSubAccountGroup);
SubAccountGroupRoutes.delete('/:id', checkToken,deleteSubAccountGroup);
SubAccountGroupRoutes.put('/:id', checkToken, checkPlan, updateSubAccountGroups);

export default SubAccountGroupRoutes;
import { Router } from 'express';
const AccountGroupRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { getAccountGroups, getAccountGroup, createAccountGroup, deleteAccountGroup, updateAccountGroup,getAllAccountGroups, getAccountGroupByName, getAllAccountGroupList } from '../controllers/accountGroup.controller';



AccountGroupRoutes.get('/', checkToken, getAccountGroups);
AccountGroupRoutes.get('/:id', checkToken, getAccountGroup);
AccountGroupRoutes.get('/name/:name', checkToken, getAccountGroupByName);
AccountGroupRoutes.post('/', checkToken, checkPlan , createAccountGroup);
AccountGroupRoutes.delete('/:id', checkToken, deleteAccountGroup);
AccountGroupRoutes.put('/:id', checkToken, checkPlan, updateAccountGroup);
AccountGroupRoutes.get('/all/:id', checkToken, getAllAccountGroups);
AccountGroupRoutes.get('/all/list/:id', checkToken, getAllAccountGroupList);




export default AccountGroupRoutes;
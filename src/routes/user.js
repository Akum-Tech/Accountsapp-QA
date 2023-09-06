import { Router } from 'express';
const UserRoutes = Router();
import { checkToken } from '../utility/tokenValidation';

import { createUser, getUser, getUsers, deleteUser, updateUsers, updatesubscriptionUsers, login,mobileverify, emailverify,resendotpemail,resendotpmobile,checksubscription,checksubscriptionuser,testemail,changeUserDetails,addsubUser,checkExistUser,usersToLeads} from '../controllers/users.controller';

UserRoutes.get('/', getUsers);
UserRoutes.get('/:id', checkToken , getUser);
UserRoutes.post('/' , createUser);
UserRoutes.delete('/:id', checkToken , deleteUser);
UserRoutes.put('/:id', checkToken , updateUsers);
UserRoutes.put('/subscription/:id', checkToken , updatesubscriptionUsers);
UserRoutes.post('/login', login);
UserRoutes.post('/mobileverify', mobileverify);
UserRoutes.post('/emailverify', emailverify);
UserRoutes.post('/resendotpemail', resendotpemail);
UserRoutes.post('/resendotpmobile', resendotpmobile);
UserRoutes.post('/checksubscription',checkToken,checksubscription);
UserRoutes.post('/checksubscriptionuser',checkToken,checksubscriptionuser)
UserRoutes.post('/testemail',testemail)
UserRoutes.post('/changeUserDetails',changeUserDetails)
UserRoutes.post('/addsubUser',addsubUser)
UserRoutes.post('/checkExistUser',checkExistUser)
// UserRoutes.post('/usersToLeads',usersToLeads)


export default UserRoutes;
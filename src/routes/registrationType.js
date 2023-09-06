import { Router } from 'express';
const RegistrationTypeRoutes = Router();
import { checkToken } from '../utility/tokenValidation';

import { getRegistrationTypes, getRegistrationType} from '../controllers/registrationtype.controller';


RegistrationTypeRoutes.get('/',checkToken, getRegistrationTypes);
RegistrationTypeRoutes.get('/:id',checkToken, getRegistrationType);

export default RegistrationTypeRoutes;
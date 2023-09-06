import { Router } from 'express';
const OrganizationInfoRoutes = Router();
import { uploadPhoto } from '../utility/fileUpload';
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';

import { getOrganizationInfos, getOrganizationInfo, createOrganizationInfo, deleteOrganizationInfo, updateOrganizationInfo} from '../controllers/organizationInfo.controller';


OrganizationInfoRoutes.get('/', checkToken, getOrganizationInfos);
OrganizationInfoRoutes.get('/:id', checkToken, getOrganizationInfo);
OrganizationInfoRoutes.post('/', uploadPhoto.single('file'), checkToken , createOrganizationInfo);
OrganizationInfoRoutes.delete('/:id', checkToken, deleteOrganizationInfo);
OrganizationInfoRoutes.put('/:id', uploadPhoto.single('file'), checkToken, updateOrganizationInfo);

export default OrganizationInfoRoutes;
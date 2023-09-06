import { Router } from 'express';
const CompanyRoutes = Router();
import { uploadPhoto } from '../utility/fileUpload';
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';

import { getCompanys, getCompany, createCompany, deleteCompany, updateCompany, getCurrentPeriod, updatePeriod,updatemanualstock} from '../controllers/company.controller';




CompanyRoutes.get('/',  getCompanys);
CompanyRoutes.post('/', uploadPhoto.single('file'),createCompany);



// CompanyRoutes.get('/', checkToken, getCompanys);
CompanyRoutes.get('/:id', checkToken, getCompany);
// CompanyRoutes.post('/', uploadPhoto.single('file'), checkToken, checkPlan , createCompany);
CompanyRoutes.put('/:id/changePeriod', checkToken, checkPlan, updatePeriod);
CompanyRoutes.put('/:id/changemanualstock', checkToken, checkPlan, updatemanualstock);
CompanyRoutes.delete('/:id', checkToken, deleteCompany);
CompanyRoutes.put('/:id',checkToken, uploadPhoto.single('file'), checkPlan, updateCompany);


export default CompanyRoutes;
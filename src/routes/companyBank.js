import { Router } from 'express';
const CompanyBankRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { getCompanyBank, createCompanyBank, deleteCompanyBank, updateCompanyBank } from '../controllers/companyBank.controller';



// CompanyBankRoutes.get('/', checkToken, getCompanyBanks);
CompanyBankRoutes.get('/:id', checkToken, getCompanyBank);
CompanyBankRoutes.post('/', checkToken, checkPlan, createCompanyBank);
CompanyBankRoutes.delete('/:id', checkToken, deleteCompanyBank);
CompanyBankRoutes.put('/:id',checkToken, checkPlan, updateCompanyBank);


export default CompanyBankRoutes;
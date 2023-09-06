import { Router } from 'express';
const LedgerBalanceRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { getLedgerBalancies, getLedgerBalance, createLedgerBalance, deleteLedgerBalance, updateLedgerBalance } from '../controllers/ledgerBalance.controller';


LedgerBalanceRoutes.get('/all',checkToken, getLedgerBalancies);
LedgerBalanceRoutes.get('/:id',checkToken, getLedgerBalance);
LedgerBalanceRoutes.post('/',checkToken, checkPlan, createLedgerBalance);
LedgerBalanceRoutes.delete('/:id',checkToken, deleteLedgerBalance);
LedgerBalanceRoutes.put('/:id',checkToken, checkPlan, updateLedgerBalance);


export default LedgerBalanceRoutes;
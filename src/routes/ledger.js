import { Router } from 'express';
const LedgerRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { getstockinhandLedgers,createLedger, getbankLedgers, getLedger, getLedgers, deleteLedger, updateLedger,getSalePurchaseVoucherLedger, getbankdefault,getJournlVoucherLedger, getSalePurchaseLedger, getbankCaseLedgers, getdiscountLedgers, getCaseLedgers, getLedgerwithoutbank, getLedgerReport, getAutoLedgerList} from '../controllers/ledger.controller';


LedgerRoutes.get('/all', checkToken, getLedgers);
LedgerRoutes.get('/alllegerwithoutbak', checkToken, getLedgerwithoutbank);
LedgerRoutes.get('/alllegerreport', checkToken, getLedgerReport);
LedgerRoutes.get('/getBankdefault/:id', checkToken, getbankdefault);
LedgerRoutes.post('/getbankledger', checkToken, getbankLedgers);
LedgerRoutes.post('/getdiscountledger', checkToken,  getdiscountLedgers);
LedgerRoutes.post('/getbankcaseledger', checkToken, getbankCaseLedgers);
LedgerRoutes.post('/getcashledger', checkToken, getCaseLedgers);
LedgerRoutes.get('/getSalePurchaseLedger/:id',  getSalePurchaseLedger);
LedgerRoutes.get('/getJournlVoucherLedger/:id', checkToken, getJournlVoucherLedger);
LedgerRoutes.get('/getSalePurchaseVoucherLedger/:id', checkToken, getSalePurchaseVoucherLedger);
LedgerRoutes.get('/getStockVoucherLedger/:id', checkToken, getstockinhandLedgers);
LedgerRoutes.get('/:id', checkToken, getLedger);
LedgerRoutes.post('/getautoledgerlist', checkToken, getAutoLedgerList);
LedgerRoutes.post('/', checkToken, checkPlan, createLedger);
LedgerRoutes.delete('/:id', checkToken, deleteLedger);
LedgerRoutes.put('/:id', checkToken, checkPlan, updateLedger);

export default LedgerRoutes;
import { Router } from 'express';
const JournalVoucherRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { checkPlan } from '../utility/planCheck';
import { updateStockJournalVoucher,getJournalStockVoucher,createStockJournalVoucher,getJournalVouchers, getJournalVoucher, createJournalVoucher, deleteJournalVoucher, updateJournalVoucher, getJournalVoucherLastDate, cancelJournalVoucher } from '../controllers/journalVoucher.controller';


JournalVoucherRoutes.post('/all',checkToken, getJournalVouchers);
JournalVoucherRoutes.get('/:id',checkToken, getJournalVoucher);
JournalVoucherRoutes.get('/getStockJournal/:id',checkToken, getJournalStockVoucher);
// JournalVoucherRoutes.post('/',checkToken, checkPlan, createJournalVoucher);
JournalVoucherRoutes.post('/',createJournalVoucher);

JournalVoucherRoutes.delete('/:id',checkToken, deleteJournalVoucher);
JournalVoucherRoutes.put('/:id',checkToken, checkPlan, updateJournalVoucher);
JournalVoucherRoutes.put('/updateStockJournalVoucher/:id',checkToken, checkPlan, updateStockJournalVoucher)
JournalVoucherRoutes.post('/lastdate',checkToken, getJournalVoucherLastDate);
JournalVoucherRoutes.post('/createStockJournal',checkToken, createStockJournalVoucher);
JournalVoucherRoutes.put('/cancel/:id',checkToken, cancelJournalVoucher);

export default JournalVoucherRoutes;
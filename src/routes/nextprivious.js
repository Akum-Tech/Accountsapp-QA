import { Router } from 'express';
const NextPreviousRoutes = Router();
import { checkToken } from '../utility/tokenValidation';
import { nextVoucher, previousVoucher} from '../controllers/nextPrevious.controller';

NextPreviousRoutes.post('/next',checkToken, nextVoucher);
NextPreviousRoutes.post('/previous',checkToken, previousVoucher);

export default NextPreviousRoutes;
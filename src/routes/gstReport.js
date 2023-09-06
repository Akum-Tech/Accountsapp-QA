import { Router } from 'express';
const GSTReportRoutes = Router();
import { checkToken } from '../utility/tokenValidation';

import { getGstR1, getGstR1Summary, getGstR2 , getGstR3B, getGstR2Summary, getGstR3BSummary} from '../controllers/gstReport.controller';

GSTReportRoutes.post('/r1', checkToken, getGstR1);
GSTReportRoutes.post('/r1/summary', checkToken, getGstR1Summary);
GSTReportRoutes.post('/r2', checkToken, getGstR2);
GSTReportRoutes.post('/r2/summary', checkToken, getGstR2Summary);
GSTReportRoutes.post('/r3b', checkToken, getGstR3B);
GSTReportRoutes.post('/r3b/summary', checkToken, getGstR3BSummary);


export default GSTReportRoutes;
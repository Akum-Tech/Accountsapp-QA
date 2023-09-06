import { Router } from 'express';
const AllReportRoute = Router();
import { checkToken } from '../utility/tokenValidation';
import { getProitLossSheet,getBlanceSheet, getTrailBlance} from '../controllers/allreport.controller';

AllReportRoute.post('/getprofitlosssheet',checkToken, getProitLossSheet);
AllReportRoute.post('/getblancesheet',checkToken, getBlanceSheet);
AllReportRoute.post('/trailbalance',checkToken, getTrailBlance);


export default AllReportRoute;
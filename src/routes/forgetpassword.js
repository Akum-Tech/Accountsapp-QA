import { Router } from 'express';
const ForgetPassRoutes = Router();

import { genrateOtp, verifyOtp,UpdatePassword} from '../controllers/forgetPassword.controller';

ForgetPassRoutes.post('/otp', genrateOtp);
ForgetPassRoutes.post('/votp', verifyOtp);
ForgetPassRoutes.put('/:id', UpdatePassword);


export default ForgetPassRoutes;
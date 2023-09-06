import { Router } from 'express';
const ManulstockRoutes = Router();
import { uploadPhoto } from '../utility/fileUpload';
import { checkToken } from '../utility/tokenValidation';


import { getManulstocks, getManulstock, createManulstock, deleteManulstock, updateManulstock} from '../controllers/manualColsingStock.controller';


ManulstockRoutes.post('/all', checkToken, getManulstocks);
ManulstockRoutes.get('/:id', checkToken, getManulstock);
ManulstockRoutes.post('/', checkToken, createManulstock);
ManulstockRoutes.put('/:id', checkToken, updateManulstock);
ManulstockRoutes.delete('/:id', checkToken, deleteManulstock);



export default ManulstockRoutes;
import { Router } from 'express';
const PurposeRoutes = Router();

import { createPurpose, getPurpose, getPurposes, deletePurpose, updatePurposes } from '../controllers/purpose.controller';


PurposeRoutes.get('/:type', getPurposes);
PurposeRoutes.get('/:id', getPurpose);
PurposeRoutes.post('/', createPurpose);
PurposeRoutes.delete('/:id', deletePurpose);
PurposeRoutes.put('/:id', updatePurposes);


export default PurposeRoutes;
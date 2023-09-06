import { Router } from 'express';
const SubscriptionTrailRoutes = Router();
import { createSubscriptionTrail, getSubscriptionTrail, getSubscriptionTrails, deleteSubscriptionTrail, updateSubscriptionTrail } from '../controllers/subscriptionTrail.controller';
import { checkToken } from '../utility/tokenValidation';


SubscriptionTrailRoutes.get('/', checkToken, getSubscriptionTrails);
SubscriptionTrailRoutes.get('/:id', checkToken, getSubscriptionTrail);
SubscriptionTrailRoutes.post('/', checkToken, createSubscriptionTrail);
SubscriptionTrailRoutes.delete('/:id', checkToken, deleteSubscriptionTrail);
SubscriptionTrailRoutes.put('/:id', checkToken, updateSubscriptionTrail);

export default SubscriptionTrailRoutes;
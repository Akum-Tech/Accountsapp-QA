import { Router } from 'express';
const SubscriptionRoutes = Router();

import { createSubscription, getSubscription, getSubscriptions, getActiveSubscriptions, deleteSubscription, CheckSubscriptions, updateSubscription, VerifyOrder, Order, OrderListByUser, OrderList, DownloadInvoice, RemoveInvoice, subscribedList } from '../controllers/subscription.controller';
import { checkToken } from '../utility/tokenValidation';


SubscriptionRoutes.get('/', getSubscriptions);
SubscriptionRoutes.get('/active', getActiveSubscriptions);
SubscriptionRoutes.get('/:id', checkToken, getSubscription);
SubscriptionRoutes.get('/check/subscription', checkToken, CheckSubscriptions);
SubscriptionRoutes.post('/', checkToken, createSubscription);
SubscriptionRoutes.delete('/:id', checkToken, deleteSubscription);
SubscriptionRoutes.put('/:id', checkToken, updateSubscription);
SubscriptionRoutes.post('/Order', checkToken, Order);
SubscriptionRoutes.post('/VerifyOrder', checkToken, VerifyOrder);
SubscriptionRoutes.post('/OrderListByUser', checkToken, checkToken, OrderListByUser);
SubscriptionRoutes.post('/OrderList', checkToken, checkToken, OrderList);
SubscriptionRoutes.post('/invoice/download', checkToken, DownloadInvoice);
SubscriptionRoutes.post('/invoice/remove', checkToken, RemoveInvoice);
SubscriptionRoutes.post('/subscribed/list', subscribedList);

export default SubscriptionRoutes;
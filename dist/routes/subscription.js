"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _subscription = require("../controllers/subscription.controller");
var _tokenValidation = require("../utility/tokenValidation");
var SubscriptionRoutes = (0, _express.Router)();
SubscriptionRoutes.get('/', _subscription.getSubscriptions);
SubscriptionRoutes.get('/active', _subscription.getActiveSubscriptions);
SubscriptionRoutes.get('/:id', _tokenValidation.checkToken, _subscription.getSubscription);
SubscriptionRoutes.get('/check/subscription', _tokenValidation.checkToken, _subscription.CheckSubscriptions);
SubscriptionRoutes.post('/', _tokenValidation.checkToken, _subscription.createSubscription);
SubscriptionRoutes["delete"]('/:id', _tokenValidation.checkToken, _subscription.deleteSubscription);
SubscriptionRoutes.put('/:id', _tokenValidation.checkToken, _subscription.updateSubscription);
SubscriptionRoutes.post('/Order', _tokenValidation.checkToken, _subscription.Order);
SubscriptionRoutes.post('/VerifyOrder', _tokenValidation.checkToken, _subscription.VerifyOrder);
SubscriptionRoutes.post('/OrderListByUser', _tokenValidation.checkToken, _tokenValidation.checkToken, _subscription.OrderListByUser);
SubscriptionRoutes.post('/OrderList', _tokenValidation.checkToken, _tokenValidation.checkToken, _subscription.OrderList);
SubscriptionRoutes.post('/invoice/download', _tokenValidation.checkToken, _subscription.DownloadInvoice);
SubscriptionRoutes.post('/invoice/remove', _tokenValidation.checkToken, _subscription.RemoveInvoice);
SubscriptionRoutes.post('/subscribed/list', _subscription.subscribedList);
var _default = SubscriptionRoutes;
exports["default"] = _default;
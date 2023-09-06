"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _subscriptionTrail = require("../controllers/subscriptionTrail.controller");
var _tokenValidation = require("../utility/tokenValidation");
var SubscriptionTrailRoutes = (0, _express.Router)();
SubscriptionTrailRoutes.get('/', _tokenValidation.checkToken, _subscriptionTrail.getSubscriptionTrails);
SubscriptionTrailRoutes.get('/:id', _tokenValidation.checkToken, _subscriptionTrail.getSubscriptionTrail);
SubscriptionTrailRoutes.post('/', _tokenValidation.checkToken, _subscriptionTrail.createSubscriptionTrail);
SubscriptionTrailRoutes["delete"]('/:id', _tokenValidation.checkToken, _subscriptionTrail.deleteSubscriptionTrail);
SubscriptionTrailRoutes.put('/:id', _tokenValidation.checkToken, _subscriptionTrail.updateSubscriptionTrail);
var _default = SubscriptionTrailRoutes;
exports["default"] = _default;
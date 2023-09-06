import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const SubscriptionOrder = sequelize.define("subscription_order", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.STRING
  },
  subscription_id: {
    type: Sequelize.INTEGER
  },
  amount: {
    type: Sequelize.DECIMAL
  },
  gst: {
    type: Sequelize.DECIMAL
  },
  total: {
    type: Sequelize.DECIMAL
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 1
  },
  creation_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updated_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  razorpay_payment_id: {
    type: Sequelize.STRING
  },
  razorpay_order_id: {
    type: Sequelize.STRING
  },
  razorpay_signature: {
    type: Sequelize.STRING
  },
  recpit_id: {
    type: Sequelize.STRING
  },
  name:{
      type : Sequelize.STRING,
      defaultValue:''
  },
  email:{
      type : Sequelize.STRING,
      defaultValue:''
  },
  address:{
      type : Sequelize.STRING,
      defaultValue:''
  },
  gst_number:{
    type : Sequelize.STRING,
    defaultValue:''
  }
});

export default SubscriptionOrder;

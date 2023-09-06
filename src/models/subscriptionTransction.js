import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const SubscriptionTranction =  sequelize.define('subscription_transaction', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    user_id:{
        type: Sequelize.STRING,
    },
    type:{
        type: Sequelize.STRING,
    },
    entry_by:{
        type: Sequelize.STRING
    },
    subscription_start:{
        type: Sequelize.DATE
    },
     subscription_end:{
        type: Sequelize.DATE
    },
     creation_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
});

export default SubscriptionTranction;
import Sequelize, { STRING } from 'sequelize';
import { sequelize } from '../database/database'

const Subscription =  sequelize.define('subscription', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    months:{
        type: Sequelize.INTEGER,
    },
    tax_id:{
        type: Sequelize.INTEGER,
    },
    basic:{
        type: Sequelize.STRING,
        defaultValue:'0'
    },
    gst:{
        type: Sequelize.STRING,
        defaultValue:'0'
    },
    total:{
        type: Sequelize.STRING,
        defaultValue:'0'
    },
    title:{
        type : Sequelize.STRING,
        defaultValue:''
    },
    description:{
        type : Sequelize.STRING,
        defaultValue:''
    },
    status:{
        type : Sequelize.STRING,
        defaultValue:1
    },
    creation_date:{
        type : Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

export default Subscription;
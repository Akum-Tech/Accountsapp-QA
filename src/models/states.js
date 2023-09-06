import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const State =  sequelize.define('states', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    gst_code:{
        type: Sequelize.STRING,
    },
    name:{
        type: Sequelize.STRING
    },
    effective_date:{ 
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
    },
    creation_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }, 
});

export default State;
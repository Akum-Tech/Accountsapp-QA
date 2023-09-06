import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const Units =  sequelize.define('units', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    uqc:{
        type: Sequelize.STRING
    },
    quantity_description:{
        type: Sequelize.STRING
    },
    creation_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }, 
    updated_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

export default Units;
import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const ManualClosingStock =  sequelize.define('maual_closingstock', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    uid:{
        type:Sequelize.STRING,
        primaryKey: true
    },
    company_id:{
        type: Sequelize.STRING
    },
    stockvalue:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    closingdate:{
        type: Sequelize.DATEONLY
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
export default ManualClosingStock;
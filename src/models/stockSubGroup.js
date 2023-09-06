import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const StockSubGroup =  sequelize.define('stock_sub_groups', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    uid:{
        type: Sequelize.STRING
    },
    stock_name:{
        type: Sequelize.STRING
    },
    stock_id:{
        type: Sequelize.STRING
    },
    company_id:{
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

export default StockSubGroup;
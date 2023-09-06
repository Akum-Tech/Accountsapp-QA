import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const SubAccountGroup =  sequelize.define('sub_account_groups', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    uid:{
        type:Sequelize.STRING
    },
    name:{
        type: Sequelize.STRING
    },
    account_group_id:{
        type: Sequelize.STRING
    },
    company_id:{
        type: Sequelize.STRING
    },
     type:{
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

export default SubAccountGroup;
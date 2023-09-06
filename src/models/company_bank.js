import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const CompanyBank =  sequelize.define('company_bank_details', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    uid:{
        type:Sequelize.STRING
    },
    account_number:{
        type: Sequelize.STRING
    },
    ifsc_code:{
        type: Sequelize.STRING
    },
    branch_name:{
        type: Sequelize.STRING,
    },
    bank_name:{
        type: Sequelize.STRING,
    },
    company_id:{
        type: Sequelize.STRING,
    },
    isdefault:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    updated_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    creation_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

export default CompanyBank;
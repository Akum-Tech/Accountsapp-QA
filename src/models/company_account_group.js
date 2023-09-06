import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const CompanyAccountGroup =  sequelize.define('companies_account_groups', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    uid:{
        type:Sequelize.STRING
    },
    company_id:{
        type: Sequelize.STRING
    },
    account_group_id:{
        type: Sequelize.INTEGER
    },
    name:{
        type: Sequelize.STRING,
        unique: true
    },
    type:{
        type: Sequelize.STRING
    }
});

export default CompanyAccountGroup;
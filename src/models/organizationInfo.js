import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const OrganizationInfo =  sequelize.define('organization_info', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    company_name:{
        type: Sequelize.STRING,
        defaultValue: '',
    },
    gst_number:{
        type: Sequelize.STRING,
        defaultValue: '',
    },
    cin_number:{
        type: Sequelize.STRING,
        defaultValue: '',
    },
    phone_number:{
        type: Sequelize.STRING,
        defaultValue: '',
    },
    email:{
        type: Sequelize.STRING,
        defaultValue: '',
    },
    terms:{
        type: Sequelize.STRING,
        defaultValue: '',
    },
    pan_number:{
        type: Sequelize.STRING,
        defaultValue: '',
    },
    address:{
        type: Sequelize.STRING,
        defaultValue: '',
    },
    logo:{
        type: Sequelize.STRING,
        defaultValue: '',
    },
    service_code:{
        type: Sequelize.STRING,
        defaultValue: '',
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

export default OrganizationInfo;
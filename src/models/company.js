import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const Company =  sequelize.define('companies', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    uid:{
        type:Sequelize.STRING
    },
    user_id:{
        type: Sequelize.STRING
    },
    company_name:{
        type: Sequelize.STRING,
        // unique: true
    },
    street:{
        type: Sequelize.STRING
    },
    state_id:{
        type: Sequelize.INTEGER,
    },
    city_id:{
        type: Sequelize.INTEGER,
    },
    area:{
        type: Sequelize.STRING,
    },
    pin_code:{
        type: Sequelize.STRING
    },
    gst_number:{
        type: Sequelize.STRING
    },
    composition_dealer:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
    },
    company_logo:{
        type: Sequelize.STRING
    },
    status:{   // 1=active,2=block	
        type: Sequelize.STRING, 
        defaultValue:1
    },
    cin_number:{
        type: Sequelize.STRING,
    },
    company_pan_number:{
        type: Sequelize.STRING,
    },
    terms:{
         type: Sequelize.STRING
    }, 
    financial_year:{
        type: Sequelize.STRING
    },
    financial_start:{
        type: Sequelize.STRING
    },
    financial_end:{
        type: Sequelize.STRING
    },
    bookstart_date:{
        type: Sequelize.STRING
    },
    current_period_start:{
        type: Sequelize.STRING
    },
    manualstock_closing:{
     type: Sequelize.STRING,
     defaultValue: "No"
    },
    website:{
        type: Sequelize.STRING,
        defaultValue:'' 
    },
    jurisdiction:{
        type: Sequelize.STRING,
        defaultValue:'' 
    },
    phone_number:{
        type: Sequelize.STRING,
        defaultValue:'' 
    },
    email:{
        type: Sequelize.STRING,
        defaultValue:'' 
    },
    current_period_end:{
        type: Sequelize.STRING
    },
    updated_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    creation_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    role:{
        type: Sequelize.STRING
    },
    subscription_end_date:{
        type: Sequelize.DATE,
        default:''
    }
});

export default Company;
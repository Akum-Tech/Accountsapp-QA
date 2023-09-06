import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const User =  sequelize.define('users', {
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
    email:{
        type: Sequelize.STRING,
        unique: true
    },
    password:{
        type: Sequelize.STRING
    },
    phone:{
        type: Sequelize.STRING,
    },
    email_otp:{  	
        type: Sequelize.INTEGER,
        defaultValue:0
    }, 
     sms_otp:{  	
        type: Sequelize.INTEGER,
        defaultValue:0
    }, 
    is_email_verify:{  	
        type: Sequelize.INTEGER,
        defaultValue:0
    }, 
    
     is_mobile_verify:{  	
        type: Sequelize.INTEGER,
        defaultValue:0
    }, 
    device_id:{
        type: Sequelize.STRING
    },
    android_token:{
        type: Sequelize.STRING
    },
    apple_token:{
        type: Sequelize.STRING
    },
    application_type:{ 
        type: Sequelize.STRING  // ['web', 'android', 'ios', 'admin']
    },
    status:{  // 1=active,2=block	
        type: Sequelize.STRING,
        defaultValue:1
    }, 
    updated_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    creation_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    subscription_end_date: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
    }
});

export default User;
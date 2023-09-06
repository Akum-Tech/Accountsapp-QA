import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const forgetpassword =  sequelize.define('forget_passwords', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    user_id:{
        type:Sequelize.STRING
    },
    otp:{
        type: Sequelize.STRING
    },
    is_verified:{
        type: Sequelize.INTEGER
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

export default forgetpassword;
import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const Registrationtype =  sequelize.define('registration_types', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    registration_name:{
        type: Sequelize.STRING //Regular/composition/consumer/unregistered
    },
    status:{   // 1=active,2=block	
        type: Sequelize.STRING, 
        defaultValue:1
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

export default Registrationtype;
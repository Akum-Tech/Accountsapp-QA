import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const Entries =  sequelize.define('entries', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    company_id:{
        type: Sequelize.STRING
    },
    message:{
        type: Sequelize.STRING
    },
    creation_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

export default Entries;
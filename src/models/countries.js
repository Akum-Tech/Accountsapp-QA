import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const Country =  sequelize.define('countries', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    name:{
        type: Sequelize.STRING
    },
    country_code:{
        type: Sequelize.STRING,
    }
});

export default Country;
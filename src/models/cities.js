import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const City =  sequelize.define('cities', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    state_id:{
        type: Sequelize.INTEGER,
    },
    name:{
        type: Sequelize.STRING
    }
});

export default City;
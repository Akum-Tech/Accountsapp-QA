import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const subcriptionFreePeriod =  sequelize.define('subcription_free_period', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    value_days:{
        type:Sequelize.INTEGER
    }
});

export default subcriptionFreePeriod;
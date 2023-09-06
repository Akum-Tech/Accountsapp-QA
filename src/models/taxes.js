import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const Taxes =  sequelize.define('taxes', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    state_type:{
        type:Sequelize.ENUM,
        values: ['Local', 'Globe']
    },
    type:{
        type:Sequelize.ENUM,
        values: ['Sales', 'Purchase']
    },
    tax:{
        type: Sequelize.STRING
    },
    title:{
        type: Sequelize.STRING,
        defaultValue:''
    }
});

export default Taxes;
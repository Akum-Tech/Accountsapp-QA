import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const Purpose =  sequelize.define('purpose_vouchers', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    name:{
        type: Sequelize.STRING
    },
    order_by:{
        type:Sequelize.INTEGER,
    },
    type:{
        type: Sequelize.STRING
    },
    status:{
        type: Sequelize.INTEGER
    }
});

export default Purpose;
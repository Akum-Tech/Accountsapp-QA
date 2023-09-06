import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const ItemStock =  sequelize.define('item_stocks', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    uid:{
        type:Sequelize.STRING
    },
    item_id:{
        type: Sequelize.STRING
    },
    opening_blance:{
        type: Sequelize.STRING
    },
    inword:{
        type: Sequelize.STRING
    },
    outword:{
        type: Sequelize.STRING
    },
    closing:{
        type: Sequelize.STRING,
    },
    date:{
        type: Sequelize.DATE
    },
    period_start:{
        type: Sequelize.DATE
    },
    period_end:{
        type: Sequelize.DATE
    }, 
    status:{  // 1=active,2=block	
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

export default ItemStock;
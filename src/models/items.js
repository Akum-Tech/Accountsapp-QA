import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const Item =  sequelize.define('items', {
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
    unit_id:{
        type: Sequelize.INTEGER
    },
    stock_group_id:{
        type: Sequelize.STRING
    },
    stock_sub_group_id:{
        type: Sequelize.STRING
    },
    hsn_code:{
        type: Sequelize.STRING,
    },
    rate:{
        type: Sequelize.STRING,
        defaultValue: 0
    },
    quantity:{
       type: Sequelize.INTEGER,
       defaultValue: 0
    },
    total_value:{
        type: Sequelize.STRING
    },
    isgst_applicable:{
        type:Sequelize.BOOLEAN,
        defaultValue: false
    },
    company_id:{
        type: Sequelize.STRING
    },
    taxes_slab_id:{
        type: Sequelize.INTEGER,
        defaultValue:null
    },
    cess:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
    },
    cess_tax:{
        type: Sequelize.STRING,
        defaultValue:''
    },
    period_start:{
         type: Sequelize.STRING
    },
    period_end:{
         type: Sequelize.STRING
    },
    status:{  // 1=active,2=block	
        type: Sequelize.STRING,
        defaultValue:1
    },
    taxes_slab_value:{ 
        type: Sequelize.STRING,
        defaultValue:''
    },
    effective_date:{  // 1=active,2=block	
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
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

export default Item;
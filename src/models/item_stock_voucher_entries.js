import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const itemStockVoucherEntries =  sequelize.define('item_stock_voucher_entries', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    uid:{
        type:Sequelize.STRING
    },
    voucher_id:{
        type: Sequelize.STRING
    },
    company_id:{
        type: Sequelize.STRING
    },
    item_id:{
        type: Sequelize.STRING
    },
    quantity:{
        type: Sequelize.STRING
    },
    unit:{
        type: Sequelize.STRING
    },
    name:{
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.STRING,
    },
    model:{
        type: Sequelize.STRING
    },
    hsn_code:{
        type: Sequelize.STRING
    },
    price:{
         type: Sequelize.STRING
    },
    discount:{
        type: Sequelize.STRING
    },
    discount_type:{
        type:Sequelize.STRING
    },
    total_amount:{
        type: Sequelize.STRING
    },
    igst_tax:{
        type: Sequelize.STRING
    },
    invoice_date:{
        type: Sequelize.DATEONLY
    },
    type:{
        type: Sequelize.ENUM ,
        values: ['Credit', 'Debit']
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

export default itemStockVoucherEntries;
import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const VoucherInteries =  sequelize.define('voucher_entries', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    uid:{
        type:Sequelize.STRING
    },
    ledger_id:{
        type: Sequelize.STRING
    },
    amount:{
        type: Sequelize.STRING
    },
    voucher_id:{
        type: Sequelize.STRING
    },
    type:{
        type: Sequelize.ENUM ,
        values: ['Sales', 'Purchase', 'Credit', 'Debit']
    },
    invoice_date:{
        type: Sequelize.DATEONLY
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

export default VoucherInteries;
import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const DebitVoucher =  sequelize.define('debit_vouchers', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    uid:{
        type:Sequelize.STRING,
        primaryKey: true
    },
    company_id:{
        type: Sequelize.STRING
    },
    purpose_id:{
        type:Sequelize.INTEGER
    },
    buyer_ledger_id:{
        type: Sequelize.STRING
    },
    narration:{
        type: Sequelize.STRING
    },
    is_bank:{
        type: Sequelize.STRING
    },
    is_local:{
        type: Sequelize.STRING
    },
    sub_amount:{
        type: Sequelize.STRING
    },
    total_amount:{
        type: Sequelize.STRING
    },
    bank_name:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    bank_account_number:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    bank_ifsc:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    shipping_address:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    discount_type:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    discount_percentage:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    discount_ledger:{
        type: Sequelize.STRING,
    },
    discount:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    invoice_id:{
        type: Sequelize.STRING,
    },
    invoice_date:{
        type: Sequelize.DATEONLY
    },
    description:{
        type: Sequelize.STRING
    },
    current_year:{
        type: Sequelize.STRING
    },
    end_year:{
        type: Sequelize.STRING
    },
    status:{ 	
        type: Sequelize.INTEGER,  // 1=active, 0=cancel
        defaultValue:1
    },
    isinclusive:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
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
export default DebitVoucher;
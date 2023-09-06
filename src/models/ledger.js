import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const Ledger =  sequelize.define('ledgers', {
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
    email:{
        type:Sequelize.STRING
    },
    amount:{
        type:Sequelize.STRING
    },
    phone:{
        type:Sequelize.STRING,
        defaultValue:''
    },
    company_id:{
        type: Sequelize.STRING
    },
    street:{
        type: Sequelize.STRING
    },
    state_id:{
        type: Sequelize.INTEGER,
    },
    city_id:{
        type: Sequelize.INTEGER,
    },
    area:{
        type: Sequelize.STRING,
    },
    pin_code:{
        type: Sequelize.STRING,
        defaultValue:''
    },
    sub_account_group_id:{
        type: Sequelize.STRING,
        defaultValue:null
    },
    tax_key:{
        type: Sequelize.STRING,
        defaultValue:null
    },
    sale_key:{
        type: Sequelize.STRING,
        defaultValue:null
    },
    account_group_id:{
        type: Sequelize.STRING
    },
    gst_number:{
        type: Sequelize.STRING,
        defaultValue:''
    },

    opening_balance :{
        type: Sequelize.STRING,
        defaultValue:'Debit' //Debit/credit
    },
    registration_type:{
        type: Sequelize.STRING,
        defaultValue:'Regular' //Regular/composition/consumer/unregistered
    },
    status:{   // 1=active,2=block	
        type: Sequelize.STRING, 
        defaultValue:1
    },
    state_status:{
        type: Sequelize.STRING,
        defaultValue:''
    },
    period_start:{
    type: Sequelize.STRING
    },
    period_end:{
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
    bank_name:{
        type: Sequelize.STRING,
        defaultValue:''
    },
    bank_branch:{
        type: Sequelize.STRING,
        defaultValue:''
    },
    account_holder_name:{
        type: Sequelize.STRING,
        defaultValue:''
    },
    ifsc:{
        type: Sequelize.STRING,
        defaultValue:''
    },
    pan_number:{
        type: Sequelize.STRING,
        defaultValue:''
    },
    bank_account_number:{
        type: Sequelize.STRING,
        defaultValue:'' 
    },
    website:{
        type: Sequelize.STRING,
        defaultValue:'' 
    },
    jurisdiction:{
        type: Sequelize.STRING,
        defaultValue:'' 
    },
    cin_number:{
        type: Sequelize.STRING,
        defaultValue:'' 
    },
    is_default_bank:{
        type: Sequelize.ENUM,
        values: ['true', 'false']
    },
    is_gst:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
    },
    is_auto:{
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

export default Ledger;
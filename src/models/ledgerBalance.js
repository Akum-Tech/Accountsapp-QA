import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const LedgerBalance =  sequelize.define('ledger_balances', {
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
    date:{
        type: Sequelize.DATE
    },
    financial_year:{
        type: Sequelize.STRING
    },
    opening_balance:{
        type: Sequelize.STRING
    },
    balance_status:{
        type: Sequelize.ENUM,
        values: ['Credit', 'Debit']
    },
    closing:{
        type: Sequelize.STRING
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

export default LedgerBalance;
import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const JournalInteries =  sequelize.define('journal_entries', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    uid:{
        type:Sequelize.STRING,
        primaryKey: true
    },
    journa_voucher_id:{
       type: Sequelize.STRING
    },
    type:{
        type: Sequelize.STRING
    },
    invoice_date:{
        type: Sequelize.DATEONLY
    },
    ledger_id:{
        type: Sequelize.STRING,
    },
    company_id:{
        type: Sequelize.STRING,
    },
    amount:{
        type: Sequelize.STRING
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
export default JournalInteries;
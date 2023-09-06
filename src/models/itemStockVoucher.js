import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const ItemStockVoucher = sequelize.define("item_stock_vouchers", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  company_id: {
    type: Sequelize.STRING
  },
  ledger_id: {
    type: Sequelize.STRING
  },
  narration: {
    type: Sequelize.STRING
  },
  total_amount: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  voucher_type: {
    type: Sequelize.STRING,
    defaultValue: "itemStockVoucher"
  },
  invoice_id: {
    type: Sequelize.STRING
  },
  invoice_date: {
    type: Sequelize.DATEONLY
  },
  current_year: {
    type: Sequelize.STRING
  },
  end_year: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.INTEGER,  // 1=active, 0=cancel
    defaultValue: 1
  },
  creation_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updated_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});
export default ItemStockVoucher;

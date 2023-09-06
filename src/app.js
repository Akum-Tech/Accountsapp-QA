import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import methodOverride from 'method-override';
import multer from 'multer';
import path from 'path';
import "@babel/polyfill";
import CryptoJS from "crypto-js";
// console.log(CryptoJS)

let crypto;
try {
  crypto = require('crypto');
  
} catch (err) {
//   console.log('crypto support is disabled!');
}
 
// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
// console.log(ciphertext.toString());
// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
// var plaintext = bytes.toString(CryptoJS.enc.Utf8);
// console.log(plaintext);


// console.log(new Date().getFullYear())

//Importing Routes
import UserRoutes from './routes/user';
import CompanyRoutes from './routes/company';
import CompanyBankRoutes from './routes/companyBank';
import AccountGroupRoutes from './routes/accountGroup';
import LedgerRoutes from './routes/ledger';
import ItemRoutes from './routes/items';
import CityRoutes from './routes/cities';
import CountryRoutes from './routes/countries';
import StateRoutes from './routes/states';
import StockRoutes from './routes/stockGroup';
import SubAccountGroupRoutes from './routes/subAccountGroup';
import RegistrationTypeRoutes from './routes/registrationType';
import UnitsRoutes from './routes/units';
import SubStockRoutes from './routes/subStockGroup';
import ForgetPassRoutes from './routes/forgetpassword';
import TaxesRoutes from './routes/taxes';
import ItemStockRoutes from './routes/itemStock';
import ItemInteriesRoutes from './routes/itemInteries';
import LedgerBalanceRoutes from './routes/ledgerBalance';
import SaleVoucherRoutes from './routes/saleVoucher';
import PurchaseVoucherRoutes from './routes/purchaseVoucher';
import CreditVoucherRoutes from './routes/creditVoucher';
import DebitVoucherRoutes from './routes/debitVoucher';
import RecieptVoucherRoutes from './routes/recieptVoucher';
import PaymentVoucherRoutes from './routes/paymentVoucher';
import JournalVoucherRoutes from './routes/journalVoucher';
import PurposeRoutes from './routes/purpose';
import VoucherRoutes from './routes/vouchers'
import SubscriptionRoutes from './routes/subscription';
import NextPreviousRoutes from './routes/nextprivious';
import ManulstockRoutes from './routes/manualClosingStock';
import ReportRoutes from './routes/allReports';
import SubscriptionTrailRoutes from './routes/subscriptionTrail';
import GSTReportRoutes from './routes/gstReport';
import OrganizationInfoRoutes from './routes/organizationInfo';
import ItemStockVoucherRoutes from './routes/itemStockVoucher';

const app = express();

//middlewares
app.all('*', function(req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token");
    next(); 
});


app.use('/', express.static(path.join(__dirname, '../app')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(morgan('dev'));
app.use(express.json({limit: '100mb'})); 
app.use(express.urlencoded({limit: '50mb','extended': 'true'})); 
app.use(express.json({type: 'application/vnd.api+json'})); 


app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../app', 'index.html'));
})

// file upload code
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, 'accounting' + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var uploadSingle = multer({ //multer settings
    storage: storage
}).single('file');

/** API for single file upload */
app.post('/api/uploadPhoto', function(req, res) {
    uploadSingle(req, res, function(err) {
        if (err) {
            res.json({
                error_code: 1,
                err_desc: err
            });
            return;
        }
        res.json(req.file);
    })

});

//routes
app.use('/api/user', UserRoutes)
app.use('/api/company', CompanyRoutes)
app.use('/api/companybank', CompanyBankRoutes)
app.use('/api/accountGroup', AccountGroupRoutes)
app.use('/api/ledger', LedgerRoutes)
app.use('/api/item', ItemRoutes)
app.use('/api/cities', CityRoutes)
app.use('/api/countries', CountryRoutes)
app.use('/api/states', StateRoutes)
app.use('/api/stockGroup', StockRoutes)
app.use('/api/subAccountGroup', SubAccountGroupRoutes)
app.use('/api/registrationType',RegistrationTypeRoutes)
app.use('/api/units',UnitsRoutes)
app.use('/api/subStockGroup',SubStockRoutes)
app.use('/api/forgetpassword',ForgetPassRoutes)
app.use('/api/taxes', TaxesRoutes)
app.use('/api/itemStock', ItemStockRoutes)
app.use('/api/itemInteries', ItemInteriesRoutes)
app.use('/api/ledgerBalance', LedgerBalanceRoutes)
app.use('/api/saleVoucher', SaleVoucherRoutes)
app.use('/api/purchaseVoucher', PurchaseVoucherRoutes)
app.use('/api/creditVoucher', CreditVoucherRoutes)
app.use('/api/debitVoucher', DebitVoucherRoutes)
app.use('/api/recieptVoucher', RecieptVoucherRoutes)
app.use('/api/paymentVoucher', PaymentVoucherRoutes)
app.use('/api/journalVoucher', JournalVoucherRoutes)
app.use('/api/purpose', PurposeRoutes)
app.use('/api/voucher', VoucherRoutes)
app.use('/api/subscription', SubscriptionRoutes)
app.use('/api/nextPrevious',NextPreviousRoutes)
app.use('/api/manualStock',ManulstockRoutes)
app.use('/api/report',ReportRoutes)
app.use('/api/subscriptiontrail', SubscriptionTrailRoutes)
app.use('/api/gstreport', GSTReportRoutes)
app.use('/api/organizationinfo', OrganizationInfoRoutes)
app.use('/api/stockvoucher', ItemStockVoucherRoutes)

export default app;
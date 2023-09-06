import JournalVoucher from '../services/vouchers.service'
import { checkCode } from '../utility/statusCode';
import "@babel/polyfill"



export async function getAllVoucher(req, res){
    try{
        let getdata ;
        req.body.data =await req.decoded.data;
        if(req.body.type==="ledger"){
            getdata = await JournalVoucher.getAllLedgerVoucher(req.body, res);
        }else if(req.body.type==="cash"){
            getdata = await JournalVoucher.getAllCashVoucher(req.body, res);
        }else if(req.body.type==="bank"){
            getdata = await JournalVoucher.getAllBankVoucher(req.body, res);
        }else if(req.body.type==="sales_register"){
            getdata = await JournalVoucher.getSalesRegisterVoucher(req.body, res);
        }else if(req.body.type==="purchase_register"){
            getdata = await JournalVoucher.getPurchaseRegisterVoucher(req.body, res);
        }else if(req.body.type==="journal_register"){
            getdata = await JournalVoucher.getJournalRegisterVoucher(req.body, res);
        }else if(req.body.type==="day_book"){
            getdata = await JournalVoucher.getdayBookVoucher(req.body, res);
        }else if(req.body.type==="group"){
            getdata = await JournalVoucher.getgroupVoucher(req.body, res);
        }else{
            res.status(500).json({
                statusCode:res.statusCode,
                success: false,
                message:"Pass valid type!"
            }) 
        } 
        if(getdata){
            res.json(getdata);
        }
     }catch(err){
         res.status(500).json({
             statusCode:res.statusCode,
             success: false,
             error:err,
             message:"Something went wrong!"
         })
     }
}

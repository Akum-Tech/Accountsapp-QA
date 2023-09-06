import LedgerBalance from "../services/ledgerBalance.service";
import NextPrevious from "../services/nextPrevious.service";
import SaleVoucher from "../services/saleVoucher.service";
import PurchaseVoucher from "../services/purchaseVoucher.service";
import RecieptVoucher from "../services/recieptVoucher.service";
import PaymentVoucher from "../services/paymentVoucher.service";
import DebitVoucher from "../services/debitVoucher.service";
import CreditVoucher from "../services/creditVoucher.service";
import JournalVoucher from "../services/journalVoucher.service";
import getSingleDatastockentry from "../services/journalVoucher.service";
import { nextPreviousValidation } from "../validation/nextPrevious";
import { checkCode } from "../utility/statusCode";
import "@babel/polyfill";

export async function previousVoucher(req, res) {
  try {
    let validation = await nextPreviousValidation(req.body);
    if (validation.success) {
      let checkdata = null;
      let data = null;
      req.body.data = req.decoded.data;
       if (req.body.type === "salevoucher") {
        checkdata = await NextPrevious.getpreviousDataDetail_sv(req.body, res);
      } else if (req.body.type === "purchasevoucher") {
        checkdata = await NextPrevious.getpreviousDataDetail_purv(
          req.body,
          res
        );
      } else if (req.body.type === "recieptvoucher") {
        checkdata = await NextPrevious.getpreviousDataDetail_rv(req.body, res);
      } else if (req.body.type === "paymentvoucher") {
        checkdata = await NextPrevious.getpreviousDataDetail_payv(
          req.body,
          res
        );
      } else if (req.body.type === "debitvoucher") {
        checkdata = await NextPrevious.getpreviousDataDetail_dv(req.body, res);
      } else if (req.body.type === "creditvoucher") {
        checkdata = await NextPrevious.getpreviousDataDetail_cv(req.body, res);
      } else if (req.body.type === "journalvoucher") {
        checkdata = await NextPrevious.getpreviousDataDetail_jv(req.body, res);
      } else if (req.body.type === "itemstockvoucher") {
        checkdata = await NextPrevious.getpreviousDataDetail_isv(req.body, res);
      } else {
        checkdata = null;
      }

      if (checkdata) {
        if (req.body.type === "salevoucher") {
          data = await SaleVoucher.getSingleData(checkdata.uid, req.body, res);
        } else if (req.body.type === "purchasevoucher") {
          data = await PurchaseVoucher.getSingleData(
            checkdata.uid,
            req.body,
            res
          );
        } else if (req.body.type === "recieptvoucher") {
          data = await RecieptVoucher.getSingleData(
            checkdata.uid,
            req.body,
            res
          );
        } else if (req.body.type === "paymentvoucher") {
          data = await PaymentVoucher.getSingleData(
            checkdata.uid,
            req.body,
            res
          );
        } else if (req.body.type === "debitvoucher") {
          data = await DebitVoucher.getSingleData(checkdata.uid, req.body, res);
        } else if (req.body.type === "creditvoucher") {
          data = await CreditVoucher.getSingleData(
            checkdata.uid,
            req.body,
            res
          );
        } else if (req.body.type === "journalvoucher") {
          // console.log('checkdata.voucher_type--->',checkdata.voucher_type);
        
            data = await JournalVoucher.getSingleData(
              checkdata.uid,
              req.body,
              res
            );
        }else if(req.body.type === "itemstockvoucher"){
          data = await JournalVoucher.getSingleDatastockentry(
            checkdata.uid,
            req.body,
            res
          );
        } else {
          data = null;
        }

        if (data) {
          res.json(data);
        } else {
          res.json({
            statusCode: 200,
            success: false,
            message: "something went wrong"
          });
        }
      } else {
        res.json({
          statusCode: 200,
          success: false,
          message: "something went wrong"
        });
      }
    } else {
      res.json({
        statusCode: await checkCode("validation"),
        success: false,
        message: validation.message
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: res.statusCode,
      success: false,
      error: err.message,
      message: "Something went wrong!"
    });
  }
}

export async function nextVoucher(req, res) {
  try {
    let validation = await nextPreviousValidation(req.body);
    if (validation.success) {
      let checkdata = null;
      let data = null;
      req.body.data = req.decoded.data;
      // console.log("hello", req.body.type, req.body.type === "salevoucher");
      if (req.body.type === "salevoucher") {
        checkdata = await NextPrevious.getnextDataDetail_sv(req.body, res);
      } else if (req.body.type === "purchasevoucher") {
        checkdata = await NextPrevious.getnextDataDetail_purv(req.body, res);
      } else if (req.body.type === "recieptvoucher") {
        checkdata = await NextPrevious.getnextDataDetail_rv(req.body, res);
      } else if (req.body.type === "paymentvoucher") {
        checkdata = await NextPrevious.getnextDataDetail_payv(req.body, res);
      } else if (req.body.type === "debitvoucher") {
        checkdata = await NextPrevious.getnextDataDetail_dv(req.body, res);
      } else if (req.body.type === "creditvoucher") {
        checkdata = await NextPrevious.getnextDataDetail_cv(req.body, res);
      } else if (req.body.type === "journalvoucher") {
        checkdata = await NextPrevious.getnextDataDetail_jv(req.body, res);
      } else if (req.body.type === "itemstockvoucher") {
        checkdata = await NextPrevious.getnextDataDetail_isv(req.body, res);
      } else {
        checkdata = null;
      }

      console.log("checkdata", checkdata)
      if (checkdata) {
        if (req.body.type === "salevoucher") {
          data = await SaleVoucher.getSingleData(checkdata.uid, req.body, res);
        } else if (req.body.type === "purchasevoucher") {
          data = await PurchaseVoucher.getSingleData(
            checkdata.uid,
            req.body,
            res
          );
        } else if (req.body.type === "recieptvoucher") {
          data = await RecieptVoucher.getSingleData(
            checkdata.uid,
            req.body,
            res
          );
        } else if (req.body.type === "paymentvoucher") {
          data = await PaymentVoucher.getSingleData(
            checkdata.uid,
            req.body,
            res
          );
        } else if (req.body.type === "debitvoucher") {
          data = await DebitVoucher.getSingleData(checkdata.uid, req.body, res);
        } else if (req.body.type === "creditvoucher") {
          data = await CreditVoucher.getSingleData(
            checkdata.uid,
            req.body,
            res
          );
        } else if (req.body.type === "journalvoucher") {
          // console.log('checkdata.voucher_type--->',checkdata.voucher_type);

          data = await JournalVoucher.getSingleData(
            checkdata.uid,
            req.body,
            res
          );
          //data = await JournalVoucher.getSingleData(checkdata.uid, req.body, res);
        }else if(req.body.type === "itemstockvoucher"){
          data = await JournalVoucher.getSingleDatastockentry(
            checkdata.uid,
            req.body,
            res
          );
        } else {
          data = null;
        }

        if (data) {
          res.json(data);
        } else {
          res.json({
            statusCode: 200,
            success: false,
            code: 1,
            message: "something went wrong"
          });
        }
      } else {
        res.json({
          statusCode: 200,
          success: false,
          code: 2,
          message: "No data found!"
        });
      }
    } else {
      res.json({
        statusCode: await checkCode("validation"),
        success: false,
        message: validation.message
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: res.statusCode,
      success: false,
      error: err.message,
      message: "Something went wrong!"
    });
  }
}

// export async function nextVoucher(req, res) {
//     try{

//         let validation =await nextPreviousValidation(req.body);
//         if(validation.success){
//              req.body.data = req.decoded.data;
//             let checkdata = await  NextPrevious.getpreviousDataDetail_sv(req.body, res);
//             if(checkdata){
//         let data = await SaleVoucher.getSingleData(checkdata.uid, req.body, res);
//         if(data){
//             res.json(data);
//         }
//             }else{
//                 res.json({
//                 statusCode: 200,
//                 success: false,
//                 message:'something went wrong'
//             })
//             }
//         }else{
//             res.json({
//                 statusCode: await checkCode('validation'),
//                 success: false,
//                 message:validation.message
//             })
//         }

//     }catch(err){
//         res.status(500).json({
//             statusCode:res.statusCode,
//             success: false,
//             error:err.message,
//             message:"Something went wrong!"
//         })
//     }
// }

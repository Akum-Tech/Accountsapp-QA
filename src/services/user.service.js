import User from "../models/users";
import Company from "../models/company";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
import { checkCode } from "../utility/statusCode";
import nodemailer from "nodemailer";
import uniqid from "uniqid";
import otpGenerator from "otp-generator";
import { sequelize } from "../database/database";
import jwt from "jsonwebtoken";
import sha1 from "sha1";
import "@babel/polyfill";
const axios = require("axios");
import Constant from "../constant/config";
var handlebars = require("handlebars");
import subcriptionFreePeriod from "../models/subcription_free_period";
import SubscriptionTranction from "../models/subscriptionTransction";
import addSubusers from "../models/addsubusers";
import { decreption } from "../security/company";
var fs = require("fs");
const path = require("path");
import mailotpTrigger from "../utility/mail"


// const transport = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "webapitest101@gmail.com",
//     pass: "test@123#"
//   },
//   secure: false,
//   tls: {
//     rejectUnauthorized: false
//   }
// });

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

async function gettemplate(path, sendotp) {
  //let templaten;
  //  readHTMLFile(path, function(err, html) {
  //     var template = handlebars.compile(html);
  //     var replacements = {
  //          otp: sendotp
  //     };
  //     var htmlToSend = template(replacements);
  //     template= htmlToSend;
  // });
  // console.log('jjjlll--',templaten);
  // return templaten;
}

exports.getSingleData = async function (id, data, res) {
  try {
    let createdata = await User.findOne({
      where: {
        uid: id
      }
    });
    if (createdata) {
      let countcomapny = await Company.findAll({
        where: {
          user_id: createdata.dataValues.uid
        }
      });

      createdata.dataValues.serverdate = new Date().toISOString().slice(0, 10);
      createdata.dataValues.companyList = await decreption(countcomapny, "array", createdata.dataValues.email);;
      return {
        statusCode: res.statusCode,
        success: true,
        message: "User fetch Successfully",
        user: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "User not Found!",
        user: createdata ? createdata : {}
      };
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.getAllData = async function (data, res) {
  try {
    let createdata = await User.findAll({
      order: [['creation_date', 'DESC']]
    });
    console.log(createdata)
    if (createdata.length > 0) {
      // let decrepted =await decreption(createdata, 'array', data.data.email);
      return {
        statusCode: res.statusCode,
        success: true,
        message: "User fetch Successfully",
        user: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "User not Found!",
        user: []
      };
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.createData = async function (data, res) {
  try {
    console.log(data);
    let emailotp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false
    });
    let smsotp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false
    });
    if (data.email != '') {
      let checkuser = await User.findOne({
        where: {
          email: data.email
        }
      });
      if (checkuser != null) {
        if (checkuser.dataValues.is_email_verify == 1) {
          return {
            statusCode: res.statusCode,
            success: false,
            message: "Email ID Already Exist",
            user: checkuser
          };
        } else {
          let finddata = await User.findOne({
            where: {
              uid: checkuser.dataValues.uid
            }
          });
          if (finddata) {
            data.updated_date = new Date();
            data.status = 1;
            data.is_email_verify = 0;
            data.email_otp = emailotp;
            data.password = await sha1(data.password);
            let updatedata = await finddata.update(data);
            if (updatedata) {
              let token = await jwt.sign(
                {
                  data: updatedata.dataValues
                },
                "AccountingApi"
              );
              updatedata.dataValues.token = token;
              let countcomapny = await Company.findAll({
                where: {
                  user_id: updatedata.uid
                },
                attributes: [
                  [
                    sequelize.fn("COUNT", sequelize.col("company_name")),
                    "company"
                  ]
                ]
              });
              updatedata.dataValues.comapny = countcomapny[0];


              if (data.email != '') {
                var html = fs.readFileSync(
                  path.resolve(__dirname, "../template/email.html"),
                  "utf8"
                );
                var template = handlebars.compile(html);
                var replacements = {
                  otp: emailotp
                };
                var htmlToSend = template(replacements);
                let userMailName = updatedata.dataValues.name;
                let mailotpTrigger1 = await mailotpTrigger.otpmailTrigger(data.email, htmlToSend, userMailName, 0)
              }
              return {
                statusCode: res.statusCode,
                success: true,
                message: "User Already Exists",
                user: updatedata
              };
            } else {
              return {
                statusCode: res.statusCode,
                success: false,
                message: "Something went wrong!",
              };
            }
          }
        }
      } else {
        data.email_otp = emailotp;
        let createdData = await createUser(data)
        if (createdData != '') {
          return {
            statusCode: res.statusCode,
            success: true,
            message: "User Created Successfully",
            user: createdData
          }
        } else {
          return {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
          };
        }
      }

    } else if (data.phone != '') {
      let checkuser1 = await User.findOne({
        where: {
          phone: data.phone
        }
      });
      if (checkuser1 != null) {
        if (checkuser1.dataValues.is_mobile_verify == 1) {
          return {
            statusCode: res.statusCode,
            success: false,
            message: " Mobile Number Already Exist"
          };
        } else {
          let finddata = await User.findOne({
            where: {
              uid: checkuser1.dataValues.uid
            }
          });
          if (finddata) {
            data.updated_date = new Date();
            data.status = 1;
            data.sms_otp = smsotp;
            data.is_mobile_verify = 0;
            data.password = await sha1(data.password);
            let updatedata = await finddata.update(data);
            if (updatedata) {
              let token = await jwt.sign(
                {
                  data: updatedata.dataValues
                },
                "AccountingApi"
              );
              updatedata.dataValues.token = token;
              let countcomapny = await Company.findAll({
                where: {
                  user_id: updatedata.uid
                },
                attributes: [
                  [
                    sequelize.fn("COUNT", sequelize.col("company_name")),
                    "company"
                  ]
                ]
              });
              updatedata.dataValues.comapny = countcomapny[0];
              delete updatedata.dataValues.password;
              delete updatedata.dataValues.sms_otp;
              delete updatedata.dataValues.android_token;
              delete updatedata.dataValues.apple_token;

              let url = Constant.smsurl;
              let urlwithnumber = url.concat(data.phone);//phno            
              let v3 = urlwithnumber.concat("&message=");
              let userName = updatedata.dataValues.name;
              let msg1 = `Dear ${userName}, ${data.sms_otp} is the OTP to verify your mobile number.%nRegards,%nTeam, Intellinvest Pvt. Ltd.`
              console.log('msg1----------->', msg1)
              let v4 = v3.concat(msg1)
              let msg = v4;
              //let lasturl=data.concat(msg);
              axios
                .get(msg)
                .then(function (response) {
                  // handle success
                  console.log('response--------------->', response);

                })
                .catch(function (error) {
                  // handle error
                  console.log('error------->', error);
                })
                .then(function () {
                  // always executed
                  console.log("always");
                });
              return {
                statusCode: res.statusCode,
                success: true,
                message: "User Already Exists",
                user: updatedata
              };
            } else {
              return {
                statusCode: res.statusCode,
                success: false,
                message: "Something went wrong!",
              };
            }
          }
        }
      } else {
        data.sms_otp = smsotp;
        let createdData = await createUser(data)
        if (createdData != '') {
          return {
            statusCode: res.statusCode,
            success: true,
            message: "User Created Successfully",
            user: createdData
          }
        } else {
          return {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
          };
        }
      }
    }

  } catch (e) {
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};


async function createUser(data) {
  return new Promise(async (resolve, reject) => {
    data.uid = await uniqid();
    data.creation_date = new Date();
    data.updated_date = new Date();
    data.status = 1;
    data.password = await sha1(data.password);
    if (data.email != '') {
      data.is_email_verify = 0;
    }
    if (data.phone != '') {
      data.is_mobile_verify = 0;
    }
    let createdata = await User.create(data);
    if (createdata) {
      let token = await jwt.sign(
        {
          data: createdata.dataValues
        },
        "AccountingApi"
      );
      createdata.dataValues.token = token;
      let countcomapny = await Company.findAll({
        where: {
          user_id: createdata.uid
        },
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("company_name")), "company"]
        ]
      });
      createdata.dataValues.comapny = countcomapny[0];
      delete createdata.dataValues.password;
      delete createdata.dataValues.email_otp;
      delete createdata.dataValues.sms_otp;
      delete createdata.dataValues.android_token;
      delete createdata.dataValues.apple_token;


      //let lasturl=data.concat(msg);
      if (data.phone != '') {
        let url = Constant.smsurl;
        let urlwithnumber = url.concat(data.phone);//phno            
        let v3 = urlwithnumber.concat("&message=");
        let userName = createdata.dataValues.name;
        let msg1 = `Dear ${userName}, ${data.sms_otp} is the OTP to verify your mobile number.%nRegards,%nTeam, Intellinvest Pvt. Ltd.`
        let v4 = v3.concat(msg1)
        let msg = v4;
        console.log('msg------------>', msg)
        axios
          .get(msg)
          .then(function (response) {
            // handle success       
            console.log("response", response);
          })
          .catch(function (error) {
            // handle error         
            console.log("error", error);
          })
      }
      if (data.email != '') {
        var html = fs.readFileSync(
          path.resolve(__dirname, "../template/email.html"),
          "utf8"
        );
        var template = handlebars.compile(html);
        var replacements = {
          otp: data.email_otp
        };
        var htmlToSend = template(replacements);
        let userMailName = createdata.dataValues.name;
        let mailotpTrigger1 = await mailotpTrigger.otpmailTrigger(data.email, htmlToSend, userMailName, 0)
      }
      resolve(createdata)
    }
  })
}

exports.deleteData = async function (id, res) {
  try {
    let deletedata = await User.destroy({
      where: {
        uid: id
      }
    });
    if (deletedata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "User Delete Successfully",
        user: deletedata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Something went wrong!",
        user: deletedata
      };
    }
  } catch (e) {
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.updateData = async function (id, data, res) {
  try {
    let finddata = await User.findOne({
      where: {
        uid: id
      }
    });
    if (finddata) {
      data.updated_date = new Date();
      let updatedata = await finddata.update(data);
      if (updatedata) {
        return {
          statusCode: res.statusCode,
          success: true,
          message: "User update Successfully",
          user: updatedata
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Something went wrong!",
          user: updatedata
        };
      }
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "User not found!",
        user: finddata ? finddata : {}
      };
    }
  } catch (e) {
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.updatesubscriptionData = async function (id, data, res) {
  try {
    let finddata = await User.findOne({
      where: {
        uid: id
      }
    });
    if (finddata) {
      data.updated_date = new Date();
      let updatedata = await finddata.update(data);
      if (updatedata) {

        let obj = await {
          user_id: updatedata.dataValues.uid,
          type: 'free',
          entry_by: 'Admin',
          subscription_start: data.subscription_old_date,
          subscription_end: data.subscription_end_date,
          creation_date: new Date(),
        }
        let create = await SubscriptionTranction.create(obj)
        return {
          statusCode: res.statusCode,
          success: true,
          message: "User update Successfully",
          user: updatedata
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Something went wrong!",
          user: updatedata
        };
      }
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "User not found!",
        user: finddata ? finddata : {}
      };
    }
  } catch (e) {
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

//for login flow changes update cnfrmed
exports.loginUser = async function (data, res) {
  try {
    let emailotp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false
    });
    let smsotp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false
    });
    let finddata = await User.findOne({
      where: {
        [Op.or]: [
          data.email ? { email: data.email } : null,
          data.phone ? { phone: data.phone } : null
        ]
      }
    });
    if (finddata) {
      if (sha1(data.password) === finddata.password) {
        if (data.email != undefined) {
          if (finddata.dataValues.is_email_verify == 0) {
            data.email_otp = emailotp;
          }
        }
        if (data.phone != undefined) {
          if (finddata.dataValues.is_mobile_verify == 0) {
            data.sms_otp = smsotp;
          }
        }

        data.password = await sha1(data.password);
        let updatedata = await finddata.update(data);
        if (updatedata) {
          let token = await jwt.sign(
            {
              data: updatedata.dataValues
            },
            "AccountingApi"
          );
          updatedata.dataValues.token = token;

          let countcomapny = await Company.findAll({
            where: {
              user_id: updatedata.uid
            },
            attributes: [
              [sequelize.fn("COUNT", sequelize.col("company_name")), "company"]
            ]
          });
          updatedata.dataValues.comapny = countcomapny[0];
          delete updatedata.dataValues.password;
          delete updatedata.dataValues.email_otp;
          delete updatedata.dataValues.sms_otp;
          // delete updatedata.dataValues.android_token;
          // delete updatedata.dataValues.apple_token;
          updatedata.dataValues.serverdate = new Date()
            .toISOString()
            .slice(0, 10);
          if (data.phone != undefined) {
            if (finddata.dataValues.is_mobile_verify == 0) {
              let url = Constant.smsurl;
              let urlwithnumber = url.concat(data.phone);//phno            
              let v3 = urlwithnumber.concat("&message=");
              let userName = updatedata.dataValues.name;
              let msg1 = `Dear ${userName}, ${data.sms_otp} is the OTP to verify your mobile number.%nRegards,%nTeam, Intellinvest Pvt. Ltd.`
              let v4 = v3.concat(msg1)
              let msg = v4;
              console.log("smstemplate inlogin------------------->", msg);
              axios
                .get(msg)
                .then(function (response) {
                  // handle success
                  console.log('response--------------------------------->', JSON.stringify(response.data));
                })
                .catch(function (error) {
                  console.log('errrooor--------------------->', JSON.stringify(error));
                })
            }
          }
          if (data.email != undefined) {
            if (finddata.dataValues.is_email_verify == 0) {
              var html = fs.readFileSync(
                path.resolve(__dirname, "../template/email.html"),
                "utf8"
              );
              var template = handlebars.compile(html);
              var replacements = {
                otp: emailotp
              };
              var htmlToSend = template(replacements);
              let userMailName = updatedata.dataValues.name;
              let mailotpTrigger1 = await mailotpTrigger.otpmailTrigger(data.email, htmlToSend, userMailName, 0)
            }
          }
          return {
            statusCode: res.statusCode,
            success: true,
            message: "User Login Successfully",
            user: updatedata
          };
        } else {
          return {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!"
          };
        }
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Password incorrect!",
          user: {}
        };
      }
    } else {
      if (data.logintype == 1) {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Email ID not exist!"
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Phone Number not exist!"
        };
      }
    }
  } catch (e) {
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.verifyotpemail = async function (data, res) {
  try {
    let finddata = await User.findOne({
      where: {
        email: data.email,
        email_otp: data.otp,
        is_email_verify: "0"
      }
    });
    if (finddata) {
      data.is_email_verify = 1;
      let updatedata = await finddata.update(data);
      delete updatedata.dataValues.password;
      delete updatedata.dataValues.email_otp;
      delete updatedata.dataValues.sms_otp;
      delete updatedata.dataValues.android_token;
      delete updatedata.dataValues.apple_token;
      return {
        statusCode: res.statusCode,
        success: true,
        user: updatedata,
        message: "Email OTP verify Sucessfully"
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "OTP not valid!"
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.verifyotpmobile = async function (data, res) {
  try {
    let finddata = await User.findOne({
      where: {
        phone: data.phone,
        sms_otp: data.otp,
        is_mobile_verify: "0"
      }
    });
    if (finddata) {
      data.is_mobile_verify = 1;
      let updatedata = await finddata.update(data);
      delete updatedata.dataValues.password;
      delete updatedata.dataValues.email_otp;
      delete updatedata.dataValues.sms_otp;
      delete updatedata.dataValues.android_token;
      delete updatedata.dataValues.apple_token;
      return {
        statusCode: res.statusCode,
        success: true,
        user: updatedata,
        message: "Mobile OTP verify Sucessfully"
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "OTP not valid!"
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.resendotpemail = async function (data, res) {
  try {
    let emailotp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false
    });

    let finddata = await User.findOne({
      where: {
        email: data.email,
        is_email_verify: "0"
      }
    });
    if (finddata) {
      data.email_otp = emailotp;
      let updatedata = await finddata.update(data);
      delete updatedata.dataValues.password;
      delete updatedata.dataValues.email_otp;
      delete updatedata.dataValues.sms_otp;
      delete updatedata.dataValues.android_token;
      delete updatedata.dataValues.apple_token;

      var html = fs.readFileSync(
        path.resolve(__dirname, "../template/email.html"),
        "utf8"
      );
      var template = handlebars.compile(html);
      var replacements = {
        otp: emailotp
      };
      var htmlToSend = template(replacements);


      let userMailName = updatedata.dataValues.name;
      let mailotpTrigger1 = await mailotpTrigger.otpmailTrigger(data.email, htmlToSend, userMailName, 0)

      return {
        statusCode: res.statusCode,
        success: true,
        user: updatedata,
        message: "Rsend OTP On your Email Id  Sucessfully"
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Email id  not valid!"
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.resendotpmobile = async function (data, res) {
  try {
    let smsotp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false
    });

    let finddata = await User.findOne({
      where: {
        phone: data.phone,
        is_mobile_verify: "0"
      }
    });
    if (finddata) {
      data.sms_otp = smsotp;
      let updatedata = await finddata.update(data);
      delete updatedata.dataValues.password;
      delete updatedata.dataValues.email_otp;
      delete updatedata.dataValues.sms_otp;
      delete updatedata.dataValues.android_token;
      delete updatedata.dataValues.apple_token;
      let url = Constant.smsurl;
      let urlwithnumber = url.concat(data.phone);
      let v3 = urlwithnumber.concat("&message=");
      let v4 = v3.concat(Constant.verficationotpmsgtxt1);
      let v5 = v4.concat(smsotp);
      let msg = v5; //.concat(Constant.verficationotpmsgtxt2);
      //let msg='Your GST account mobile verification code is'+ otp +'Team CYBERNETIC SYSTEMS';
      console.log("smstemplate", msg);
      //let lasturl=data.concat(msg);
      axios
        .get(msg)
        .then(function (response) {
          // handle success
          console.log(response);
          console.log("response");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          console.log("error");
        })
        .then(function () {
          // always executed
          console.log("always");
        });
      return {
        statusCode: res.statusCode,
        success: true,
        user: updatedata,
        message: "Resend OTP on your registerd mobile number sucessfully"
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "phone number not valid!"
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.checksubscription = async function (data, res) {
  try {
    let finddatasubscription = await subcriptionFreePeriod.findOne({
      where: { id: 1 }
    });
    //console.log("data===>",data.id)
    let user = await User.findOne({ where: { uid: data.id } });
    if (user) {
      if (finddatasubscription.value_days != 0) {
        var d = new Date();
        d.setDate(d.getDate() + finddatasubscription.value_days);
        let datan = {
          subscription_end_date: d
        };
        await user.update(datan);
        let transctiondata = {
          user_id: data.id,
          type: "free",
          entry_by: "self",
          subscription_start: new Date(),
          subscription_end: d
        };
        await SubscriptionTranction.create(transctiondata);
      }
      let updatedata = await User.findOne({ where: { uid: data.id } });
      delete updatedata.dataValues.password;
      delete updatedata.dataValues.email_otp;
      delete updatedata.dataValues.sms_otp;
      delete updatedata.dataValues.android_token;
      delete updatedata.dataValues.apple_token;
      return {
        statusCode: res.statusCode,
        success: true,
        user: updatedata,
        severdate: new Date().toISOString().slice(0, 10),
        message: "User subscription sucesfully"
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "User Not find "
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.checksubscriptionuser = async function (data, res) {
  try {
    let userdata = await User.findOne({ where: { uid: data.id } });
    if (userdata) {
      return {
        statusCode: res.statusCode,
        success: true,
        user: userdata,
        severdate: new Date().toISOString().slice(0, 10),
        message: "User detail sucesfully"
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "User detail find "
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.testemail = async function (data, res) {
  try {
    let emailotp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false
    });

    data.email_otp = emailotp;
    var html = fs.readFileSync(
      path.resolve(__dirname, "../template/email.html"),
      "utf8"
    );
    var template = handlebars.compile(html);
    var replacements = {
      otp: emailotp
    };
    var htmlToSend = template(replacements);
    let userMailName = updatedata.dataValues.name;
    let mailotpTrigger1 = await mailotpTrigger.otpmailTrigger(data.email, htmlToSend, userMailName, 0)

    return {
      statusCode: res.statusCode,
      success: true,
      message: " OTP On your Email Id  Sucessfully"
    };
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.changeUserDetails = async function (req, res) {
  try {
    let changeEmail = req.body.changeEmail ? req.body.changeEmail : '';
    let changeMobile = req.body.changeMobile ? req.body.changeMobile : '';
    let email = req.body.email ? req.body.email : '';
    let mobile = req.body.mobile ? req.body.mobile : ''
    let finddata = await User.findOne({
      where: {
        uid: req.body.userid
      }
    })
    let emailotp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false
    });
    let smsotp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false
    });

    if (changeEmail == 'Y') {
      if (finddata) {
        let userChangedEmaildata = await User.update({
          email: email, email_otp: emailotp, is_email_verify: "0"
        }, {
          where: {
            uid: req.body.userid
          }
        })
        if (userChangedEmaildata) {
          let findemaildata = await User.findOne({
            where: {
              email: email,
              is_mobile_verify: "0"
            }
          });
          if (findemaildata.dataValues.is_email_verify == 0) {
            var html = fs.readFileSync(
              path.resolve(__dirname, "../template/email.html"),
              "utf8"
            );
            var template = handlebars.compile(html);
            var replacements = {
              otp: emailotp
            };
            var htmlToSend = template(replacements);
            let userMailName = findemaildata.dataValues.name;
            let mailotpTrigger1 = await mailotpTrigger.otpmailTrigger(data.email, htmlToSend, userMailName, 0)
            return {
              statusCode: res.statusCode,
              success: true,
              // user: updatedata,
              message: " OTP sent Sucessfully"
            };
          }
        }
      }
    }
    if (changeMobile == 'Y') {
      if (finddata) {
        let userChangedMobiledata = await User.update({
          phone: mobile, sms_otp: smsotp, is_mobile_verify: "0"
        }, {
          where: {
            uid: req.body.userid
          }
        })
        if (userChangedMobiledata) {
          let findMobiledata = await User.findOne({
            where: {
              phone: mobile,
              is_mobile_verify: "0"
            }
          });
          if (findMobiledata.dataValues.is_mobile_verify == 0) {
            let url = Constant.smsurl;
            let urlwithnumber = url.concat(mobile);
            let v3 = urlwithnumber.concat("&message=");
            let v4 = v3.concat(Constant.verficationotpmsgtxt1);
            let v5 = v4.concat(smsotp);
            let msg = v5; //.concat(Constant.verficationotpmsgtxt2);
            //let msg='Your GST account mobile verification code is'+ otp +'Team CYBERNETIC SYSTEMS';
            console.log("smstemplate", msg);
            //let lasturl=data.concat(msg);
            axios
              .get(msg)
              .then(function (response) {
                // handle success
                console.log(response);
                console.log("response");
              })
              .catch(function (error) {
                // handle error
                console.log(error);
                console.log("error");
              })
              .then(function () {
                // always executed
                console.log("always");
              });
          }
          return {
            statusCode: res.statusCode,
            success: true,
            // user: updatedata,
            message: " OTP sent Sucessfully"
          };
        }

      }
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
}

exports.addSubUser = async function (req, res) {
  try {
    console.log('req.body------>', req.body)
    let emailotp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false
    });
    let smsotp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false
    });
    let filter = {}
    filter.where = {}
    if (req.body.email) {
      filter.where = {
        main_user_id: req.body.mainUser_id,
        company_id: req.body.company_id,
        sub_user_email: req.body.email,
      }
    } else if (req.body.phone) {
      filter.where = {
        main_user_id: req.body.mainUser_id,
        company_id: req.body.company_id,
        sub_user_phone: req.body.phone
      }
    }
    console.log('filter------->', filter)
    // res.send('ok')
    let subusers = await addSubusers.findAndCountAll(filter).then(async response => {
      console.log('res------->', response)
      if (response.count !=0) {
        console.log('iam here working1234')
        res.json({
          statusCode: res.statusCode,
          success: false,
          message: "Already invited the same subuser for the same company " + req.body.companyName
        })
      } else {
        console.log('iam here working4321')
        let existingUsersFind = await User.findOne({
          where: {
            [Op.or]: [
              req.body.email ? { email: req.body.email } : null,
              req.body.phone ? { phone: req.body.phone } : null
            ]
          }
        })
        if (existingUsersFind != null) {
          let obj = {
            main_user_id: req.body.mainUser_id,
            main_user_name: req.body.mainUsername,
            main_user_email: req.body.mainUseremail,
            main_user_phone: req.body.mainUserPhone,
            company_id: req.body.company_id,
            company_name: req.body.companyName,
            is_invited: "Yes",
            sub_user_name: existingUsersFind.dataValues.name,
            sub_user_email: existingUsersFind.dataValues.email,
            sub_user_phone: existingUsersFind.dataValues.phone,
            sub_user_id: existingUsersFind.dataValues.uid,
            sub_user_unique_id: uniqid()
          }
          let createSubUser = await addSubusers.create(obj)
          if (req.body.email) {
            let data = await mailTrigger(req.body.mainUsername, req.body.password, req.body.email, req.body.companyName, 0)
            if (data) {
              res.json({
                statusCode: res.statusCode,
                success: true,
                message: "subUser Created Successfully",
              });
            }
          } else {
            let mobiledata = await MobileTrigger(req.body.mainUsername, req.body.phone, req.body.password, req.body.companyName, 0)
            console.log('mobiledata--------->', mobiledata)
            if (mobiledata) {
              res.json({
                statusCode: res.statusCode,
                success: true,
                message: "subUser Created Successfully",
              });
            }
          }
        } else {
          let data = {}
          data.uid = await uniqid();
          data.name = req.body.subUsername;
          data.email = req.body.email ? req.body.email : "";
          data.phone = req.body.phone ? req.body.phone : "";
          data.creation_date = new Date();
          data.updated_date = new Date();
          data.status = 1;
          // data.email_otp = emailotp;
          // data.sms_otp = smsotp;
          // data.is_email_verify = 0;
          // data.is_mobile_verify = 0;
          data.application_type = req.body.application_type
          data.password = await sha1(req.body.password);
          if (req.body.email != undefined) {
            data.email_otp = emailotp;
            data.is_email_verify = 0;
          } else if (req.body.phone != undefined) {
            data.sms_otp = smsotp;
            data.is_mobile_verify = 0;
          }
          console.log('data---->', data)
          let createdata = await User.create(data);
          if (createdata) {
            let obj = {
              main_user_id: req.body.mainUser_id,
              main_user_name: req.body.mainUsername,
              main_user_email: req.body.mainUseremail,
              main_user_phone: req.body.mainUserPhone,
              company_id: req.body.company_id,
              company_name: req.body.companyName,
              is_invited: "Yes",
              sub_user_name: createdata.dataValues.name,
              sub_user_email: createdata.dataValues.email,
              sub_user_phone: createdata.dataValues.phone,
              sub_user_unique_id: uniqid(),
              sub_user_id: createdata.dataValues.uid,
            }
            let createSubUser = await addSubusers.create(obj)
            if (createSubUser) {
              if (req.body.email) {
                let data = await mailTrigger(req.body.mainUsername, req.body.password, req.body.email, req.body.companyName, 1)
                if (data) {
                  res.json({
                    statusCode: res.statusCode,
                    success: true,
                    message: "subUser Created Successfully",
                  });
                }
              } else {
                let mobiledata = await MobileTrigger(req.body.mainUsername, req.body.phone, req.body.password, req.body.companyName, 1)
                if (mobiledata) {
                  res.json({
                    statusCode: res.statusCode,
                    success: true,
                    message: "subUser Created Successfully",
                  });
                }
              }
            }
          }
        }
      }
    })
    // let existingUsersFind = await User.findOne({
    //   where: {
    //     [Op.or]: [
    //       req.body.email ? { email: req.body.email } : null,
    //       req.body.phone ? { phone: req.body.phone } : null
    //     ]
    //   }
    // })
    // if (existingUsersFind != null) {
    //   let obj = {
    //     main_user_id: req.body.mainUser_id,
    //     main_user_name: req.body.mainUsername,
    //     main_user_email: req.body.mainUseremail,
    //     main_user_phone: req.body.mainUserPhone,
    //     company_id: req.body.company_id,
    //     company_name: req.body.companyName,
    //     is_invited: "Yes",
    //     sub_user_name: existingUsersFind.dataValues.name,
    //     sub_user_email: existingUsersFind.dataValues.email,
    //     sub_user_phone: existingUsersFind.dataValues.phone,
    //     sub_user_id: existingUsersFind.dataValues.uid,
    //     sub_user_unique_id: uniqid()
    //   }
    //   let createSubUser = await addSubusers.create(obj)
    //   if (req.body.email) {
    //     let data = await mailTrigger(req.body.mainUsername, req.body.password, req.body.email, req.body.companyName, 0)
    //     if (data) {
    //       res.json({
    //         statusCode: res.statusCode,
    //         success: true,
    //         message: "subUser Created Successfully",
    //       });
    //     }
    //   } else {
    //     let mobiledata = await MobileTrigger(req.body.mainUsername, req.body.phone, req.body.password, req.body.companyName, 0)
    //     console.log('mobiledata--------->', mobiledata)
    //     if (mobiledata) {
    //       res.json({
    //         statusCode: res.statusCode,
    //         success: true,
    //         message: "subUser Created Successfully",
    //       });
    //     }
    //   }
    // } else {

    //   let data = {}
    //   data.uid = await uniqid();
    //   data.name = req.body.subUsername;
    //   data.email = req.body.email ? req.body.email : "";
    //   data.phone = req.body.phone ? req.body.phone : "";
    //   data.creation_date = new Date();
    //   data.updated_date = new Date();
    //   data.status = 1;
    //   // data.email_otp = emailotp;
    //   // data.sms_otp = smsotp;
    //   // data.is_email_verify = 0;
    //   // data.is_mobile_verify = 0;
    //   data.application_type = req.body.application_type
    //   data.password = await sha1(req.body.password);
    //   if (req.body.email != undefined) {
    //     data.email_otp = emailotp;
    //     data.is_email_verify = 0;
    //   } else if (req.body.phone != undefined) {
    //     data.sms_otp = smsotp;
    //     data.is_mobile_verify = 0;
    //   }
    //   console.log('data---->', data)
    //   let createdata = await User.create(data);
    //   if (createdata) {
    //     let obj = {
    //       main_user_id: req.body.mainUser_id,
    //       main_user_name: req.body.mainUsername,
    //       main_user_email: req.body.mainUseremail,
    //       main_user_phone: req.body.mainUserPhone,
    //       company_id: req.body.company_id,
    //       company_name: req.body.companyName,
    //       is_invited: "Yes",
    //       sub_user_name: createdata.dataValues.name,
    //       sub_user_email: createdata.dataValues.email,
    //       sub_user_phone: createdata.dataValues.phone,
    //       sub_user_unique_id: uniqid(),
    //       sub_user_id: createdata.dataValues.uid,
    //     }
    //     let createSubUser = await addSubusers.create(obj)
    //     if (createSubUser) {
    //       if (req.body.email) {
    //         let data = await mailTrigger(req.body.mainUsername, req.body.password, req.body.email, req.body.companyName, 1)
    //         if (data) {
    //           res.json({
    //             statusCode: res.statusCode,
    //             success: true,
    //             message: "subUser Created Successfully",
    //           });
    //         }
    //       } else {
    //         let mobiledata = await MobileTrigger(req.body.mainUsername, req.body.phone, req.body.password, req.body.companyName, 1)
    //         if (mobiledata) {
    //           res.json({
    //             statusCode: res.statusCode,
    //             success: true,
    //             message: "subUser Created Successfully",
    //           });
    //         }
    //       }
    //     }
    //   }
    // }
  } catch (error) {
    res.json({
      statusCode: res.statusCode,
      success: false,
      error: error,
      message: "Something went wrong!"
    });
  }
}

async function mailTrigger(userName, Passwrd, email, companyName, type) {
  return new Promise(async (resolve, reject) => {
    var html;
    var replacements = {
      userName: userName,
      Password: Passwrd,
      companyName: companyName
    };
    if (type == 0) {
      replacements.Password = ''
      html = fs.readFileSync(
        path.resolve(__dirname, "../template/existsubUser.html"),
        "utf8"
      );
    } else {
      html = fs.readFileSync(
        path.resolve(__dirname, "../template/SubUser.html"),
        "utf8"
      );
    }
    var template = handlebars.compile(html);
    var htmlToSend = template(replacements);
    let userMailName = userName;
    let mailotpTrigger1 = await mailotpTrigger.otpmailTrigger(email, htmlToSend, userMailName, 2)
    if (mailotpTrigger1) {
      resolve('success')
    } else {
      resolve('failure')
    }
  })
}

async function MobileTrigger(userName, phone, passwrd, companyName, type) {
  return new Promise((resolve, reject) => {
    let url = Constant.smsurl;
    let urlwithnumber = url.concat(phone);
    let v3 = urlwithnumber.concat("&message=");
    var msg;
    if (type == 0) {
      msg = `You are invited to be an SubUser by ${userName} for the company ${companyName} in Akum tech To Login Akum tech Kindly Use the Login link below. https://vikramapp.colanapps.in/%23/login Regards,Team, Intellinvest Pvt. Ltd.`
    } else {
      msg = `You are invited to be a Sub User by ${userName} for the company ${companyName} in Akum tech. Use this password ${passwrd} to Login Akum tech. To Login Akum Tech. Kindly Use the Login link below. https://vikramapp.colanapps.in/%23/login Regards,Team, Intellinvest Pvt. Ltd.`
    }
    msg = v3.concat(msg)
    axios
      .get(msg)
      .then(function (response) {
        resolve(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log('error---->', error)
        resolve(error)
      })
  })
}

// for user and subUser
exports.checkingExistUser = async function (req, res) {
  try {
    let checkSubUserdata = await User.findOne({
      where: {
        [Op.or]: [
          req.body.email ? { email: req.body.email } : null,
          req.body.phone ? { phone: req.body.phone } : null
        ]
      }
    }).then(async (data) => {
      if (data == null) {
        res.json({
          statusCode: res.statusCode,
          success: true,
          message: "New User",
        })
      } else {
        res.json({
          statusCode: res.statusCode,
          success: true,
          message: "Existing User",
        })
      }
    })
  } catch {
    res.json({
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    });
  }
}
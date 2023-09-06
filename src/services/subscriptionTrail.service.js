import subcriptionFreePeriod from "../models/subcription_free_period";
import { checkCode } from "../utility/statusCode";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
import "@babel/polyfill";

exports.getSingleData = async function(id, res) {
  try {
    let createdata = await subcriptionFreePeriod.findOne({ where: { id: id } });
    if (createdata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Subscription fetch Successfully",
        Subscription: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Subscription not Found!",
        Subscription: createdata ? createdata : {}
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.getAllData = async function(data, res) {
  try {
    let createdata = await subcriptionFreePeriod.findAll({});
    if (createdata.length > 0) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Subscription fetch Successfully",
        Subscription: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Subscription not Found!",
        Subscription: createdata ? createdata : []
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.createData = async function(data, res) {
  try {
    console.log("Number(data.value_days", Number(data.value_days));
    if(Number(data.value_days)>=0){
      let checkdata = await subcriptionFreePeriod.findOne({
        where: { value_days: data.value_days }
      });
      if (checkdata) {
        return {
          statusCode:await checkCode("validation"),
          success: false,
          message: "Already Exist",
          Subscription: checkdata
        };
      } else {
        let createdata = await Subscription.create(data);
        if (createdata) {
          return {
            statusCode: res.statusCode,
            success: true,
            message: "Subscription Created Successfully",
            Subscription: createdata
          };
        } else {
          return {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            Subscription: createdata
          };
        }
      }
  }else{
    return {
      statusCode:await checkCode("validation"),
      success: false,
      message: "Number no valid"
    };
  }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};
exports.deleteData = async function(id, res) {
  try {
    let deletedata = await subcriptionFreePeriod.destroy({ where: { id: id } });
    if (deletedata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Subscription Delete Successfully",
        Subscription: deletedata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Something went wrong!",
        Subscription: deletedata
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.updateData = async function(id, data, res) {
  try {
    console.log("Number(data.value_days", Number(data.value_days));
    if(Number(data.value_days)>=0){
      let finddata = await subcriptionFreePeriod.findOne({ where: { id: id } });
      if (finddata) {
        let updatedata = await finddata.update(data);
        if (updatedata) {
          return {
            statusCode: res.statusCode,
            success: true,
            message: "Subscription update Successfully",
            Subscription: updatedata
          };
        } else {
          return {
            statusCode: res.statusCode,
            success: false,
            message: "Something went wrong!",
            Subscription: updatedata
          };
        }
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Subscription not found!",
          Subscription: finddata ? finddata : {}
        };
      }
    }else{
      return {
        statusCode:await checkCode("validation"),
        success: false,
        message: "Number no valid"
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

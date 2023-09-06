import Taxes from "../models/taxes";
import { checkCode } from "../utility/statusCode";
import "@babel/polyfill";


exports.getSingleData = async function(id, res) {
  try {
    let createdata = await Taxes.findOne({
      where: { id: id }
    });
    if (createdata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Tax fetch Successfully",
        taxes: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Tax not Found!",
        taxes: createdata ? createdata : {}
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

exports.getAllData = async function(data, res) {
  try {
    let createdata = await Taxes.findAll({});
    if (createdata.length > 0) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Taxes fetch Successfully",
        taxes: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Taxes not Found!",
        user: createdata ? createdata : []
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

exports.getStatusData = async function(data, res) {
  try {
    console.log(data);
    let createdata = await Taxes.findAll({
        where:{
           state_type:data
        }
      }
    );
    if (createdata.length > 0) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Taxes fetch Successfully",
        taxes: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Taxes not Found!",
        user: createdata ? createdata : []
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

exports.createData = async function(data, res) {
  try {
      let createdata = await Taxes.create(data);
      if(createdata){
          return {
              statusCode:res.statusCode,
              success: true,
              message:"Taxes Created Successfully",
              taxes:createdata
          };
      }else{
          return {
              statusCode:res.statusCode,
              success: true,
              message:"Something went wrong!",
              taxes:createdata
          };
      }
} catch (e) {
    return {
        statusCode:res.statusCode,
        success: false,
        error:e,
        message:"Something went wrong!"
    }
}
};

exports.deleteData = async function(id, res) {
  try {
    let deletedata = await Taxes.destroy({ where: { id: id } });
    if (deletedata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Taxes Delete Successfully",
        taxes: deletedata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Something went wrong!",
        taxes: deletedata
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

exports.updateData = async function(id, data, res) {
  try {
    let finddata = await Taxes.findOne({ where: { id: id } });
    if (finddata) {
      let updatedata = await finddata.update(data);
      if (updatedata) {
        return {
          statusCode: res.statusCode,
          success: true,
          message: "Taxes update Successfully",
          taxes: updatedata
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Something went wrong!",
          taxes: updatedata
        };
      }
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Taxes not found!",
        taxes: finddata ? finddata : {}
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
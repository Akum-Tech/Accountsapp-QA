import OrganizationInfo from "../models/organizationInfo";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
import "@babel/polyfill";


exports.getSingleData = async function(id, data, res) {
  try {
    let createdata = await OrganizationInfo.findOne({
      where: {
        uid: id
      }
    });
    if (createdata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "organization info fetch Successfully",
        company: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "organization info not Found!",
        company:  {}
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

exports.getAllData = async function(data, res) {
  try {
    let createdata = await OrganizationInfo.findAll({
      order: [
        ['id', 'ASC']
      ]
    }).map((node) => node.get({
        plain: true
    }));
    if (createdata.length > 0) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "organization info fetch Successfully",
        company: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "organization info not Found!"
      };
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.createData = async function(data, res) {
  try {
      let checkdata = await OrganizationInfo.findOne({
        where: { company_name: data.company_name }
      });
      if (checkdata) {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Already Exist!",
          company: checkdata
        };
      } else {
        data.creation_date = new Date();
        data.updated_date = new Date();
        let createdata = await OrganizationInfo.create(data);  
        if (createdata) {
          return {
            statusCode: res.statusCode,
            success: true,
            message: "Organization Info Created Successfully",
            company: createdata
          };
        } else {
          return {
            statusCode: res.statusCode,
            success: false,
            message: "Organization Info not created"
          };
        }
      }
  } catch (e) {
    console.log(e)
    return {
      statusCode: await checkCode("error"),
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.deleteData = async function(id, res) {
  try {
    let deleteComapnydata = await OrganizationInfo.destroy({ where: { id: id } });
    if (deleteComapnydata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Organization Info Delete Successfully",
        company: deletedata
      };
    } else {
      return {
        statusCode: await checkCode("error"),
        success: false,
        message: "Something went wrong!",
        company: deletedata
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
   let finddata = await OrganizationInfo.findOne({ where: { id: id } });
    if (finddata) {
      data.updated_date = new Date();
      let updatedata = await finddata.update(data);
      if (updatedata) {
       return {
          statusCode: res.statusCode,
          success: true,
          message: "Organization Info update Successfully",
          company: updatedata
        };
      } else {
        return {
          statusCode: await checkCode("error"),
          success: false,
          message: "Something went wrong!",
          company: {}
        };
      }
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Company not found!",
        company: {}
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
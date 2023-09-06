import User from '../models/users';

export const checkPlan = async(req, res, next) => {
  let getUser = await  User.findOne({where:{id:req.decoded.data.id}});
  if (getUser) {
    if(getUser.dataValues && getUser.dataValues.application_type=="admin"){
      next();
    }else{
      // console.log(getUser.dataValues.subscription_end_date, new Date(getUser.dataValues.subscription_end_date+' 23:59:00') ,new Date());
      if(getUser.dataValues.subscription_end_date && new Date(getUser.dataValues.subscription_end_date+' 23:59:00').getTime() > new Date().getTime()){
        next();
      }else{
        return res.json({
          statusCode: res.statusCode,
          success: false,
          message: "Your subscription plan expired",
          Subscription: false
        });
      }
    }
 } else {
    return res.json({
      statusCode: res.statusCode,
      success: false,
      message: "Subscription not Found!",
      Subscription: false
    });
}
};
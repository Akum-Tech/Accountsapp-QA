import Sequelize from 'sequelize';

// 

// export const sequelize =  new Sequelize('gstappplive', 'root', '', {
//   host: "localhost",
//   dialect: 'mysql',
//   login:false,
//   logging: false,
//   define:{
//     "timestamps":false,
//     freezeTableName:true,
//     "underscored": true,
//   },
//   dialectOptions: {
//     useUTC: false, //for reading from database
//   },
//   timezone: '+05:30'
// });

export const sequelize =  new Sequelize('vikram', 'root', 'root', {
  // host: "127.0.0.1",
  host:"localhost",
  dialect: 'mysql',
  // login:false,
  // logging: false,
  define:{
    "timestamps":false,
    freezeTableName:true,
    "underscored": true,
  },
  dialectOptions: {
    useUTC: false, //for reading from database
  },
  timezone: '+05:30'
});


// export const sequelize =  new Sequelize('db_a4d967_account', 'a4d967_account', 'Account@2020', {
//   host: "mysql6001.site4now.net",
//   dialect: 'mysql',
//   login:false,
//   define:{
//     "timestamps":false,
//     freezeTableName:true,
//     "underscored": true,
//   },
//   dialectOptions: {
//     useUTC: false, //for reading from database
//   },
//   timezone: '+00:00'
// });

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync().then(()=>{
      console.log('connected models')
    }).catch((err)=>{
console.log('couldnot create models',err)
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});


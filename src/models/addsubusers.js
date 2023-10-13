import Sequelize from 'sequelize';
import { sequelize } from '../database/database'


const addSubusers = sequelize.define('addsubusers', {
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },
    // mainuser_id: {
    //     type: Sequelize.STRING
    // },
    // mainuserName: {
    //     type: Sequelize.STRING
    // },
    // mainuserEmail:{
    //     type: Sequelize.STRING
    // },
    // mainuserMobile:{
    //     type: Sequelize.STRING
    // },

    
    // userid_gen:{
    //     type: Sequelize.STRING
    // },
    // subUser_id: {
    //     type: Sequelize.STRING,

    // }, subUsername: {
    //     type: Sequelize.STRING
    // },
    // email:{
    //     type: Sequelize.STRING
    // },
    // phone:{
    //     type: Sequelize.STRING
    // },
    // company_name:{
    //     type: Sequelize.STRING
    // },
    // company_id:{
    //     type: Sequelize.STRING
    // },
    // is_Invited:{
    //     type: Sequelize.STRING
    // }
 id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    main_user_id: {
        type: Sequelize.STRING
    },
    main_user_name: {
            type: Sequelize.STRING
        },
    main_user_email: {
            type: Sequelize.STRING
        },
    main_user_phone: {
            type: Sequelize.STRING
        },
    company_id:{
            type: Sequelize.STRING
        },
    company_name: {
            type: Sequelize.STRING
        },
    is_invited: {
            type: Sequelize.STRING
        },
    sub_user_name: {
            type: Sequelize.STRING
        },
    sub_user_email:{
            type: Sequelize.STRING
        }, 
    sub_user_phone: {
        type: Sequelize.STRING
    }, 
    sub_user_id: {
        type: Sequelize.STRING
    },
    sub_user_unique_id:{
        type: Sequelize.STRING
    },
    creation_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },updation_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
})
sequelize.sync(()=>{
    console.log('sequelize table createed')
})
export default addSubusers;
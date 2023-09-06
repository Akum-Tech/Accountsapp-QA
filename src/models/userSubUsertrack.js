import Sequelize from 'sequelize';
import { sequelize } from '../database/database'


const compUserSubUserTrack = sequelize.define('userSubUsertrack', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cid: {
        type: Sequelize.STRING
    },
    company_name: {
        type: Sequelize.STRING
    },
    main_user_id: {
        type: Sequelize.STRING
    },
    main_user_name: {
        type: Sequelize.STRING
    },
    mainuser_email: {
        type: Sequelize.STRING
    }, 
    mainuser_mobile: {
        type: Sequelize.STRING
    },
    subUsergen_id: {   
        type: Sequelize.STRING
    },
    subUserId: {
        type: Sequelize.STRING
    },
    subUser_email:{
        type: Sequelize.STRING
    },
    subUser_mobile:{
        type: Sequelize.STRING
    },
    isSubuserInviteAdmin: {
        type: Sequelize.STRING
    },
    isAdminInvitedSubUser: {
        type: Sequelize.STRING
    },
    is_editable: {
        type: Sequelize.STRING
    },
    is_viewable: {
        type: Sequelize.STRING
    },
    Role:{
        type: Sequelize.STRING
    },
    status:{
        type: Sequelize.STRING
    }

})

export default compUserSubUserTrack;
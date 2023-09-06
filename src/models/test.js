import Sequelize from 'sequelize';
import { sequelize } from '../database/database'


const test = sequelize.define('test', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    currentUserid: {
        type: Sequelize.STRING

    },
    currentUserName: {
        type: Sequelize.STRING

    }, newUserid: {
        type: Sequelize.STRING

    }, newUsername: {
        type: Sequelize.STRING

    }
})
sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

export default test;
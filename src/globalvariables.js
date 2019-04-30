import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
    axios: axios,
    ADMIN_URL: ADMIN_URL,
    is_valid_phone: phoneNo =>  /(^()?(01){1}[23456789]{1}(\d){8})$/i.test( phoneNo ),

}

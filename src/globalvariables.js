export default {
    is_valid_phone: phoneNo =>  /(^()?(01){1}[23456789]{1}(\d){8})$/i.test( phoneNo ),

}

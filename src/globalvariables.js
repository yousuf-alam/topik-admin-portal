import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
    axios: axios,
    LS_TOKEN_KEY_NAME: 'token', 
    LS_PERMISSION_KEY_NAME: 'user_permissions',
    LS_USER_KEY_NAME: 'user',
    ADMIN_URL: ADMIN_URL,
    is_valid_phone: phoneNo =>  /(^()?(01){1}[23456789]{1}(\d){8})$/i.test( phoneNo ),

    permissionsList: {
        manage_roles: 'manage roles',
        order: ['order create', 'order read', 'order update', 'order delete',],
        complain: ['complain create', 'complain read', 'complain update', 'complain delete',],
        service: ['service create', 'service read', 'service update', 'service delete',],
        category: ['category create', 'category read', 'category update', 'category delete',],
        lineitem: ['lineitem create', 'lineitem read', 'lineitem update', 'lineitem delete',],
        location: ['location create', 'location read', 'location update', 'location delete',],
        partnerwallet: ['partnerwallet create', 'partnerwallet read', 'partnerwallet update', 'partnerwallet delete',],
        partner: ['partner create', 'partner read', 'partner update', 'partner delete',],
        resource: ['resource create', 'resource read', 'resource update', 'resource delete',],
        notification: ['notification create', 'notification read', 'notification update', 'notification delete',],
        promocode:  ['promocode create', 'promocode read', 'promocode update', 'promocode delete',], 
        topbanner: ['topbanner create', 'topbanner read', 'topbanner update', 'topbanner delete',],
        bottombanner: ['bottombanner create', 'bottombanner read', 'bottombanner update', 'bottombanner delete',],
        document: ['document create', 'document read', 'document update', 'document delete',]
    },
    SECRET_KEY: 'Kali Nagin Ke Jaisi Julfe Teri Kali Kali',
    
}

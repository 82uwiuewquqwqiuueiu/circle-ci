import * as mongoose from 'mongoose';
import { model } from 'mongoose';
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    password: {
        type: String,
    },
    full_name: {
        type: String,
        default:null
    },   
    gender:{
        type:String,
        enum:['MALE','FEMALE','OTHER'],
        default: 'null'
    },
    phone_number: {
        type: String,
        unique: true
    },
    profile_pic: {
        type: String,
        default: null
    },
    otp_code: {
        type: Number,
        default: null
    },
    country_code: {
        type: String,
    },
    voip_token: {
        type: String,
        default:null
    },
    device_info: {
        type: [{
            device_type: String,
            device_token: String,
            voip_token: String,
            jwt_token: String,
            login_time: { type: Date, default: Date.now }
        },],
        default: [],
        validate: [deviceLimit, '{PATH} exceeds the limit of 4']
    },
    current_login_device: {
        type: String,
        default: null
    },
    muted_user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    ],
    address: {
        type: String,
        default: null
    },
    notification_status: {
        type: Boolean,
        default: true
    },
    is_account_active: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: String,
        default: Math.round(new Date().getTime())
    },
    account_status: {
        type: String,
        enum: ['PENDING', 'UNVERIFIED_PHONE_NUMBER', 'UNVERIFIED_EMAIL','VERIFIED'],
        default: 'PENDING'
    },
    is_online: {
        type: Boolean,
        default: false
    },
    time_stamp: {
        type: String,
        default: Math.round(new Date().getTime())
    },
}, {
    timestamps: { createdAt: 'created_at' }
});
function deviceLimit(val) {
    if (val.length > 1) {
        this.device_info.shift();
    }
    return true;
}

UserSchema.plugin(mongoosePaginate);
export default model('User', UserSchema);
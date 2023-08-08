"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    username: {
        type: 'string',
        required: true,
    },
    firstname: {
        type: 'string',
        required: true,
    },
    lastname: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    company: {
        type: 'string',
        default: null
    },
    location: {
        type: 'string',
        default: null
    },
    role: {
        type: 'string',
        default: 'candidate'
    },
    profileImg: {
        type: 'string',
        default: 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
    },
    isGoogle: {
        type: 'boolean',
        default: false
    },
    status: {
        type: 'boolean',
        default: true
    },
    basic: {
        type: 'object',
    },
    profile: {
        type: 'object'
    },
    education: {
        type: 'object'
    },
    professional: {
        type: 'object'
    },
    isPrime: {
        type: 'boolean',
        default: false
    },
    subscribedDate: {
        type: 'string'
    },
    Expiry: {
        type: 'string'
    },
    subscriptionStatus: {
        type: "string"
    },
    mockPer: {
        type: 'number'
    },
    facebook: {
        type: 'string'
    },
    instagram: {
        type: 'string'
    },
    linkedIn: {
        type: 'string'
    },
    gitHub: {
        type: 'string'
    }
});
exports.userModel = mongoose_1.default.connection.model('user', userSchema);

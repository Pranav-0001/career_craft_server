"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefresh = exports.validate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validate = (token) => {
    try {
        let data = jsonwebtoken_1.default.verify(token, 'KEY');
        if (data.exp) {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (currentTimestamp > data.exp) {
                console.log('Token has expired.');
                return false;
            }
        }
        console.log(data);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.validate = validate;
const validateRefresh = (token) => {
    try {
        let data = jsonwebtoken_1.default.verify(token, 'refresh');
        if (data.exp) {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (currentTimestamp > data.exp) {
                console.log('Token has expired.');
                return false;
            }
        }
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.validateRefresh = validateRefresh;

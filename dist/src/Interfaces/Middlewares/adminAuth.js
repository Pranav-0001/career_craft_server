"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT_1 = require("../../utils/validateJWT");
const adminAuth = (req, res, next) => {
    var _a;
    try {
        let token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.adminaccesstoken;
        let accKey = process.env.ACCESSTOKEN;
        if (token) {
            token = token.toString();
            let decoded = jsonwebtoken_1.default.verify(token, accKey);
            const { id, role } = decoded.sub;
            if (role === 'Admin') {
                const currentTimestamp = Math.floor(Date.now() / 1000);
                const isTokenExpired = decoded.exp < currentTimestamp;
                if (isTokenExpired) {
                    const refresh = req.cookies.adminJWT;
                    const status = (0, validateJWT_1.validateRefresh)(refresh);
                    if (status) {
                        let newAccessToken = jsonwebtoken_1.default.sign({ sub: { id, role } }, 'KEY', { expiresIn: '3d' });
                        res.locals.newadminaccesstoken = newAccessToken;
                        next();
                    }
                    else {
                        res.clearCookie('adminJWT');
                        res.json({ message: 'cookie cleared', logout: true });
                    }
                }
                else {
                    next();
                }
            }
            else {
                res.json({ message: "unauthorized" });
            }
        }
        else {
            const refresh = req.cookies.adminJWT;
            const status = (0, validateJWT_1.validateRefresh)(refresh);
            if (status) {
                const decoded = jsonwebtoken_1.default.verify(refresh, 'refresh');
                const { id, role } = decoded.sub;
                let newAccessToken = jsonwebtoken_1.default.sign({ sub: { id, role } }, 'KEY', { expiresIn: '3d' });
                res.locals.newadminaccesstoken = newAccessToken;
                next();
            }
            else {
                res.clearCookie('adminJWT');
                res.json({ message: 'cookie cleared', logout: true });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.adminAuth = adminAuth;

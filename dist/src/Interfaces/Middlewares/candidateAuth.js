"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT_1 = require("../../utils/validateJWT");
const candidateAuth = (req, res, next) => {
    try {
        let token = req.headers.accesstoken;
        let accKey = process.env.ACCESSTOKEN;
        if (token) {
            token = token.toString();
            let decoded = jsonwebtoken_1.default.verify(token, accKey);
            const { role, _id } = decoded.sub;
            if (role === 'candidate') {
                const currentTimestamp = Math.floor(Date.now() / 1000);
                const isTokenExpired = decoded.exp < currentTimestamp;
                if (isTokenExpired) {
                    const refresh = req.cookies.userJWT;
                    const status = (0, validateJWT_1.validateRefresh)(refresh);
                    if (status) {
                        let newAccessToken = jsonwebtoken_1.default.sign({ sub: { _id, role } }, 'KEY', { expiresIn: '3d' });
                        res.locals.newAccessToken = newAccessToken;
                        next();
                    }
                    else {
                        res.clearCookie('userJWT');
                        res.json({ message: 'cookie cleared', logout: true });
                    }
                }
                else {
                    next();
                }
            }
            else {
                res.json({ message: 'Unauthorized' });
            }
        }
        else {
            const refresh = req.cookies.userJWT;
            if (refresh) {
                const status = (0, validateJWT_1.validateRefresh)(refresh);
                if (status) {
                    const decoded = jsonwebtoken_1.default.verify(refresh, 'refresh');
                    if (decoded.sub.role === 'employer') {
                        const { _id, role } = decoded.sub;
                        let newAccessToken = jsonwebtoken_1.default.sign({ sub: { _id, role } }, 'KEY', { expiresIn: '3d' });
                        res.locals.newAccessToken = newAccessToken;
                        next();
                    }
                }
                else {
                    res.clearCookie('userJWT');
                    res.json({ message: 'Unauthorized' });
                }
            }
            else {
                res.json({ message: 'Unauthorized' });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.candidateAuth = candidateAuth;

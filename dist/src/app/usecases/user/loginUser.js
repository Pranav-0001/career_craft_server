"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserbyEmail = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (userRepository) => (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findByEmail(email);
    if (user) {
        if (user.status) {
            const verified = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (verified) {
                console.log("success");
                return user;
            }
            else {
                console.log("failes");
                return 'password';
            }
        }
        else {
            if (user.role === 'employer')
                return "employer";
            else {
                return "candidate";
            }
        }
    }
    return 'email';
});
exports.loginUser = loginUser;
const getUserbyEmail = (userRepository) => (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findByEmail(email);
    return user;
});
exports.getUserbyEmail = getUserbyEmail;

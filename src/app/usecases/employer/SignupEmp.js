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
exports.getCandidates = exports.verifyRmployer = exports.signupEmp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const signupEmp = (userRepository) => (firstname, lastname, username, email, password, company, location, role) => __awaiter(void 0, void 0, void 0, function* () {
    password = yield bcrypt_1.default.hash(password, 10);
    const newEmp = {
        email,
        firstname,
        lastname,
        username,
        password,
        company,
        location,
        role,
        status: false
    };
    const createdUser = yield userRepository.create(newEmp);
    return createdUser;
});
exports.signupEmp = signupEmp;
const verifyRmployer = (userrepository) => (empId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield userrepository.findAndUpdate(empId);
    return response;
});
exports.verifyRmployer = verifyRmployer;
const getCandidates = (UserRepository) => (page) => __awaiter(void 0, void 0, void 0, function* () {
    const resoponse = yield UserRepository.getAllCandidates(page);
    return resoponse;
});
exports.getCandidates = getCandidates;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatustrue = exports.updateStatusFalse = exports.getCandidatesCntrl = exports.updateEmpStatus = exports.getEmployerJobs = exports.removeEmpRefreshToken = exports.editJob = exports.postJob = exports.EmployerRegister = exports.generateOtp = void 0;
const userModel_1 = require("../../infra/Database/userModel");
const jobModel_1 = require("../../infra/Database/jobModel");
const userRepository_1 = require("../../infra/repositories/userRepository");
const generateOtpEmp_1 = require("../../app/usecases/employer/generateOtpEmp");
const SignupEmp_1 = require("../../app/usecases/employer/SignupEmp");
const postjob_1 = require("../../app/usecases/employer/postjob");
const jobRepository_1 = require("../../infra/repositories/jobRepository");
const getEmpJobs_1 = require("../../app/usecases/employer/getEmpJobs");
const getUsers_1 = require("../../app/usecases/admin/getUsers");
const db = userModel_1.userModel;
const empDB = jobModel_1.jobModel;
const userRepository = (0, userRepository_1.UserRepositoryImpl)(db);
const jobRepository = (0, jobRepository_1.JobRepositoryImpl)(empDB);
const generateOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        console.log(email);
        const otp = (0, generateOtpEmp_1.generateEmpSignupOtp)(email);
        res.json(otp);
    }
    catch (error) {
    }
});
exports.generateOtp = generateOtp;
const EmployerRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, username, email, company, location, password } = req.body;
    const role = 'employer';
    try {
        const employer = yield (0, SignupEmp_1.signupEmp)(userRepository)(firstname, lastname, username, email, password, company, location, role);
        // const {_id} = JSON.parse(JSON.stringify(employer)) 
        // const accessToken=jsonwebtoken.sign({sub:{_id,role}},'KEY',{expiresIn:'3d'})
        //     const refreshToken=jsonwebtoken.sign({sub:{_id,role}},'refresh',{expiresIn:'100d'})
        //     res.cookie('userJWT',refreshToken,{
        //         httpOnly:true,
        //         secure:true,
        //         sameSite:'none',
        //         maxAge: 100*24*60*60*1000
        //     })
        res.status(201).json({ status: "success", employer });
    }
    catch (err) {
        res.status(500).json({ status: "server error" });
    }
});
exports.EmployerRegister = EmployerRegister;
const postJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, category, qualification, experience, deadline, salaryType, desc, jobType, salaryFrom, salaryTo, fixedSalary, EmployerId } = req.body;
    try {
        const result = yield (0, postjob_1.addJobEmp)(jobRepository)(title, category, qualification, experience, deadline, salaryType, desc, jobType, fixedSalary, EmployerId, salaryFrom, salaryTo);
        res.json({ status: true, jobData: result });
    }
    catch (err) {
        res.status(500).json({ status: "server error" });
    }
});
exports.postJob = postJob;
const editJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { job } = req.params;
    const { title, category, qualification, experience, deadline, salaryType, desc, jobType, salaryFrom, salaryTo, fixedSalary, EmployerId } = req.body;
    try {
        const result = yield (0, postjob_1.EditJobEmp)(jobRepository)(title, category, qualification, experience, deadline, salaryType, desc, jobType, fixedSalary, EmployerId, salaryFrom, salaryTo, job);
        console.log(result);
        res.json({ status: true });
    }
    catch (err) {
        res.status(500).json({ status: "server error" });
    }
});
exports.editJob = editJob;
const removeEmpRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('userJWT');
    res.json({ status: true });
});
exports.removeEmpRefreshToken = removeEmpRefreshToken;
const getEmployerJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const jobs = yield (0, getEmpJobs_1.getEmpJobs)(jobRepository)(id);
        const newAccessToken = res.locals.newAccessToken;
        if (newAccessToken)
            res.json({ jobs, newAccessToken });
        else
            res.json({ jobs });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getEmployerJobs = getEmployerJobs;
const updateEmpStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccessToken = res.locals.newAccessToken;
    try {
        const { empId, email } = req.body;
        const result = yield (0, SignupEmp_1.verifyRmployer)(userRepository)(empId);
        if (result.modifiedCount === 1) {
            (0, getUsers_1.sentConfirmationMail)(email);
        }
        if (newAccessToken)
            res.json({ result, newAccessToken });
        else
            res.json({ result });
    }
    catch (err) {
    }
});
exports.updateEmpStatus = updateEmpStatus;
const getCandidatesCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.params;
        const { users, count } = yield (0, SignupEmp_1.getCandidates)(userRepository)(page);
        const pagination = [];
        for (let i = 1; i <= Math.ceil(count / 8); i++) {
            pagination.push(i);
        }
        res.json({ users, pagination });
    }
    catch (error) {
    }
});
exports.getCandidatesCntrl = getCandidatesCntrl;
const updateStatusFalse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { job } = req.body;
        const data = yield (0, postjob_1.disableJob)(jobRepository)(job);
        res.json(data);
    }
    catch (error) {
    }
});
exports.updateStatusFalse = updateStatusFalse;
const updateStatustrue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { job } = req.body;
        const data = yield (0, postjob_1.enableJob)(jobRepository)(job);
        res.json(data);
    }
    catch (error) {
    }
});
exports.updateStatustrue = updateStatustrue;

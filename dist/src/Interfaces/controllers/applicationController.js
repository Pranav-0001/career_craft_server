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
exports.applicationCount = exports.getApplicationByEmpIdCntrl = exports.getAppliedByUserCntrl = exports.applyJobCntrl = void 0;
const jobApplication_1 = require("../../app/usecases/user/jobApplication");
const applicationRepository_1 = require("../../infra/repositories/applicationRepository");
const applyModel_1 = require("../../infra/Database/applyModel");
const updateUser_1 = require("../../app/usecases/user/updateUser");
const userRepository_1 = require("../../infra/repositories/userRepository");
const userModel_1 = require("../../infra/Database/userModel");
const jobModel_1 = require("../../infra/Database/jobModel");
const jobRepository_1 = require("../../infra/repositories/jobRepository");
const getJobs_1 = require("../../app/usecases/user/getJobs");
const applyRepository = (0, applicationRepository_1.applicationRepositoryEmpl)(applyModel_1.jobApplyModel);
const userRepository = (0, userRepository_1.UserRepositoryImpl)(userModel_1.userModel);
const jobRepository = (0, jobRepository_1.JobRepositoryImpl)(jobModel_1.jobModel);
const applyJobCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const jobId = req.body.jobId;
        const empId = req.body.empId;
        const userdata = yield (0, updateUser_1.getUserInfo)(userRepository)(userId);
        console.log(userdata, 1);
        if ((userdata === null || userdata === void 0 ? void 0 : userdata.basic) && userdata.profile && userdata.education) {
            console.log({ jobId, empId, userId });
            const application = yield (0, jobApplication_1.applyJob)(applyRepository)(jobId, empId, userId);
            if (application.status) {
                const updateJob = yield (0, getJobs_1.addAppliedBy)(jobRepository)(jobId, userId);
                console.log(updateJob);
            }
            res.status(201).json({ status: true, application });
        }
        else {
            res.json({ status: false, Error: "Your profile information is not complete. Please update it to continue applying for jobs." });
        }
    }
    catch (error) {
    }
});
exports.applyJobCntrl = applyJobCntrl;
const getAppliedByUserCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const applications = yield (0, jobApplication_1.getApplicationByUserId)(applyRepository)(userId);
        res.status(201).json({ jobs: applications });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAppliedByUserCntrl = getAppliedByUserCntrl;
const getApplicationByEmpIdCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const empId = (_a = req.query.empId) === null || _a === void 0 ? void 0 : _a.toString();
        const page = (_b = req.query.page) === null || _b === void 0 ? void 0 : _b.toString();
        if (empId && page) {
            const applications = yield (0, jobApplication_1.getApplicationByEmpId)(applyRepository)(empId, page);
            const count = yield (0, jobApplication_1.getCountAppEmp)(applyRepository)(empId);
            let pagecount = [];
            for (let i = 1; i <= Math.ceil(count / 10); i++) {
                pagecount.push(i);
            }
            res.status(201).json({ applications, pagecount });
        }
    }
    catch (error) {
    }
});
exports.getApplicationByEmpIdCntrl = getApplicationByEmpIdCntrl;
const applicationCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const count = yield (0, jobApplication_1.getCountAppEmp)(applyRepository)(id);
        res.json(count);
    }
    catch (error) {
    }
});
exports.applicationCount = applicationCount;

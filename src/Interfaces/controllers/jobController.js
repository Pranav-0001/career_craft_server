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
exports.jobSearchCntrl = exports.getSavedJobsCntrl = exports.removeBookmarkCntrl = exports.bookmarkCntrl = exports.getSingleJOb = exports.getDomains = exports.getAllJobs = void 0;
const jobModel_1 = require("../../infra/Database/jobModel");
const jobRepository_1 = require("../../infra/repositories/jobRepository");
const getJobs_1 = require("../../app/usecases/user/getJobs");
const getDomain_1 = require("../../app/usecases/user/getDomain");
const empDB = jobModel_1.jobModel;
const jobRepository = (0, jobRepository_1.JobRepositoryImpl)(empDB);
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
        const sort = (_c = (_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : null;
        const domain = (_e = (_d = req.query.domain) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : null;
        const salary = (_g = (_f = req.query.salary) === null || _f === void 0 ? void 0 : _f.toString()) !== null && _g !== void 0 ? _g : null;
        const type = (_j = (_h = req.query.type) === null || _h === void 0 ? void 0 : _h.toString()) !== null && _j !== void 0 ? _j : null;
        const jobs = yield (0, getJobs_1.getJobs)(jobRepository)(page, domain, salary, type, sort);
        const JobsCount = yield (0, getJobs_1.getJobsCount)(jobRepository)(domain, salary, type);
        console.log(JobsCount);
        let pagecount = [];
        for (let i = 1; i <= Math.ceil(JobsCount / 5); i++) {
            pagecount.push(i);
        }
        res.json({ jobs, pagecount });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAllJobs = getAllJobs;
const getDomains = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const domains = yield (0, getDomain_1.getDomain)(jobRepository)();
        res.json({ domains });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getDomains = getDomains;
const getSingleJOb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const jobData = yield (0, getJobs_1.getJobData)(jobRepository)(id);
        if (jobData)
            res.status(201).json({ job: jobData[0] });
        else
            res.status(201).json({ job: false });
    }
    catch (error) {
    }
});
exports.getSingleJOb = getSingleJOb;
const bookmarkCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobId, user } = req.body;
        const result = yield (0, getJobs_1.bookmarkJob)(jobRepository)(jobId, user);
        console.log(result);
        res.status(201).json({ message: "success" });
    }
    catch (error) {
    }
});
exports.bookmarkCntrl = bookmarkCntrl;
const removeBookmarkCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobId, user } = req.body;
        const result = yield (0, getJobs_1.removeBookmarkJob)(jobRepository)(jobId, user);
        console.log(result);
        res.status(201).json({ message: "success" });
    }
    catch (error) {
    }
});
exports.removeBookmarkCntrl = removeBookmarkCntrl;
const getSavedJobsCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.query;
        if (user) {
            const saved = yield (0, getJobs_1.getBookmarked)(jobRepository)(user === null || user === void 0 ? void 0 : user.toString());
            res.status(201).json({ saved });
        }
    }
    catch (error) {
    }
});
exports.getSavedJobsCntrl = getSavedJobsCntrl;
const jobSearchCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        console.log(key);
        const { data, count } = yield (0, getJobs_1.searchJobs)(jobRepository)(key);
        let pagecount = [];
        for (let i = 1; i <= Math.ceil(count / 5); i++) {
            pagecount.push(i);
        }
        res.json({ job: data, pagecount });
    }
    catch (error) {
    }
});
exports.jobSearchCntrl = jobSearchCntrl;

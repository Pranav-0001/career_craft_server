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
exports.enableJob = exports.disableJob = exports.EditJobEmp = exports.addJobEmp = void 0;
const addJobEmp = (jobrepository) => (title, category, qualification, experience, deadline, salaryType, desc, jobType, fixedSalary, EmployerId, salaryFrom, salaryTo) => __awaiter(void 0, void 0, void 0, function* () {
    const newjob = {
        title,
        category,
        qualification,
        experience,
        deadline,
        salaryType,
        jobType,
        desc,
        fixedSalary,
        EmployerId,
        salaryFrom: salaryFrom !== null && salaryFrom !== void 0 ? salaryFrom : fixedSalary,
        salaryTo: salaryTo !== null && salaryTo !== void 0 ? salaryTo : fixedSalary
    };
    const createdJob = yield jobrepository.addJob(newjob);
    return createdJob;
});
exports.addJobEmp = addJobEmp;
const EditJobEmp = (jobrepository) => (title, category, qualification, experience, deadline, salaryType, desc, jobType, fixedSalary, EmployerId, salaryFrom, salaryTo, job) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = {
        title,
        category,
        qualification,
        experience,
        deadline,
        salaryType,
        jobType,
        desc,
        fixedSalary,
        EmployerId,
        salaryFrom: salaryFrom !== null && salaryFrom !== void 0 ? salaryFrom : fixedSalary,
        salaryTo: salaryTo !== null && salaryTo !== void 0 ? salaryTo : fixedSalary
    };
    const createdJob = yield jobrepository.editJob(updated, job);
    return createdJob;
});
exports.EditJobEmp = EditJobEmp;
const disableJob = (jobrepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield jobrepository.jobStatusfalse(id);
    return data;
});
exports.disableJob = disableJob;
const enableJob = (jobrepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield jobrepository.jobStatustrue(id);
    return data;
});
exports.enableJob = enableJob;

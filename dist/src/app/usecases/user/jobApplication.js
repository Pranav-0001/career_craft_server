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
exports.getMyApplications = exports.updateApplicationStatus = exports.getCountAppEmp = exports.getApplicationByEmpId = exports.getLast5ApplicationByUserId = exports.getApplicationByUserId = exports.applyJob = void 0;
const applyJob = (applicationRepository) => (jobId, empId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const applied = yield applicationRepository.addApplication(jobId, empId, userId);
    return applied;
});
exports.applyJob = applyJob;
const getApplicationByUserId = (applicationRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const applied = yield applicationRepository.getApplicationByUser(userId);
    return applied;
});
exports.getApplicationByUserId = getApplicationByUserId;
const getLast5ApplicationByUserId = (applicationRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const applied = yield applicationRepository.get5ApplicationByUser(userId);
    return applied;
});
exports.getLast5ApplicationByUserId = getLast5ApplicationByUserId;
const getApplicationByEmpId = (applicationRepository) => (empId, page) => __awaiter(void 0, void 0, void 0, function* () {
    const applied = yield applicationRepository.getApplicationByEmp(empId, page);
    return applied;
});
exports.getApplicationByEmpId = getApplicationByEmpId;
const getCountAppEmp = (applicationRepository) => (empId) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield applicationRepository.getApplicationCountEmp(empId);
    return count;
});
exports.getCountAppEmp = getCountAppEmp;
const updateApplicationStatus = (applicationRepository) => (appId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield applicationRepository.updateApplicationEmp(appId, status);
    return update;
});
exports.updateApplicationStatus = updateApplicationStatus;
const getMyApplications = (applicationRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield applicationRepository.getApplicationCountByCanId(userId);
    return data;
});
exports.getMyApplications = getMyApplications;

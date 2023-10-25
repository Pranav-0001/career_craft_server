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
exports.applicationRepositoryEmpl = void 0;
const applyModel_1 = require("../Database/applyModel");
const mongoose_1 = __importDefault(require("mongoose"));
const applicationRepositoryEmpl = (applyModel) => {
    const addApplication = (jobId, empId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        const formattedDate = `${dd}/${mm}/${yyyy}`;
        const data = {
            jobId,
            empId,
            userId,
            appliedOn: formattedDate,
            status: "Applied"
        };
        const appliedjob = yield applyModel.create(data);
        return appliedjob;
    });
    const getApplicationByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        let id = new mongoose_1.default.Types.ObjectId(userId);
        const applied = yield applyModel_1.jobApplyModel.aggregate([
            {
                $match: { userId: id }
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'job'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'empId',
                    foreignField: '_id',
                    as: 'employer'
                }
            }
        ]);
        return applied;
    });
    const get5ApplicationByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        let id = new mongoose_1.default.Types.ObjectId(userId);
        const applied = yield applyModel_1.jobApplyModel.aggregate([
            {
                $match: { userId: id }
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'job'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'empId',
                    foreignField: '_id',
                    as: 'employer'
                }
            },
            {
                $limit: 5
            }
        ]);
        return applied;
    });
    const getApplicationByEmp = (empId, page) => __awaiter(void 0, void 0, void 0, function* () {
        const skip = (parseInt(page) - 1) * 10;
        let id = new mongoose_1.default.Types.ObjectId(empId);
        const applied = yield applyModel_1.jobApplyModel.aggregate([
            {
                $match: { empId: id }
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'job'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $skip: skip
            },
            {
                $limit: 10
            }
        ]);
        return applied;
    });
    const getApplicationCountEmp = (empId) => __awaiter(void 0, void 0, void 0, function* () {
        let id = new mongoose_1.default.Types.ObjectId(empId);
        const applied = yield applyModel_1.jobApplyModel.aggregate([
            {
                $match: { empId: id }
            },
            {
                $count: 'total'
            }
        ]);
        return applied[0].total;
    });
    const updateApplicationEmp = (appId, status) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(appId);
        const res = yield applyModel.updateOne({ _id: id }, { $set: { status: status } });
        return res;
    });
    const getApplicationCountByCanId = (cId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(cId);
        const number = yield applyModel.countDocuments({ userId: id });
        return number;
    });
    return {
        addApplication,
        getApplicationByUser,
        getApplicationByEmp,
        getApplicationCountEmp,
        updateApplicationEmp,
        getApplicationCountByCanId,
        get5ApplicationByUser
    };
};
exports.applicationRepositoryEmpl = applicationRepositoryEmpl;

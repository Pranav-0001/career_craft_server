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
exports.JobRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const JobRepositoryImpl = (jobModel) => {
    const addJob = (job) => __awaiter(void 0, void 0, void 0, function* () {
        const createdJob = yield jobModel.create(job);
        return createdJob.toObject();
    });
    const editJob = (jobData, job) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(job);
        console.log({ jobData });
        const update = yield jobModel.updateOne({ _id: id }, { $set: {
                title: jobData.title,
                category: jobData.category,
                salaryType: jobData.salaryType,
                fixedSalary: jobData.fixedSalary,
                salaryFrom: jobData.salaryFrom,
                salaryTo: jobData.salaryTo,
                qualification: jobData.qualification,
                experience: jobData.experience,
                deadline: jobData.deadline,
                jobType: jobData.deadline,
                desc: jobData.desc
            } });
        return update;
    });
    const getEmpJobs = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield jobModel.find({ EmployerId: id });
        return jobs;
    });
    const getBookmarked = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield jobModel.aggregate([
            {
                $match: {
                    savedBy: { $in: [new mongoose_1.default.Types.ObjectId(id)] }
                }
            }, {
                $lookup: {
                    from: 'users',
                    localField: 'EmployerId',
                    foreignField: '_id',
                    as: 'Employer'
                }
            }
        ]);
        return jobs;
    });
    const getSingleJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const _id = new mongoose_1.default.Types.ObjectId(id);
            const data = yield jobModel.aggregate([{
                    $match: { _id }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }
            ]);
            return data;
        }
        catch (err) {
            return null;
        }
    });
    const saveJob = (jobId, user) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = new mongoose_1.default.Types.ObjectId(user);
        const res = yield jobModel.updateOne({ _id: jobId }, { $push: { savedBy: userId } });
        return res;
    });
    const removeSaved = (jobId, user) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = new mongoose_1.default.Types.ObjectId(user);
        const res = yield jobModel.updateOne({ _id: jobId }, { $pull: { savedBy: userId } });
        return res;
    });
    const addToApplied = (jobId, user) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = new mongoose_1.default.Types.ObjectId(user);
        const res = yield jobModel.updateOne({ _id: jobId }, { $push: { appliedBy: userId } });
        return res;
    });
    const getJobs = (page, domain, salary, type, sort) => __awaiter(void 0, void 0, void 0, function* () {
        let skip = (page - 1) * 5;
        if (domain != 'null' && type != 'null' && salary != 'null') {
            const salArr = salary === null || salary === void 0 ? void 0 : salary.split('-');
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);
            if (sort == 'low' || sort == 'high') {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            category: domain,
                            jobType: type,
                            salaryTo: {
                                $gte: min,
                                $lte: max
                            }
                        }
                    }, {
                        $sort: {
                            salaryTo: sort === 'low' ? 1 : -1
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
            else {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            category: domain,
                            jobType: type,
                            salaryTo: {
                                $gte: min,
                                $lte: max
                            }
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
        }
        else if (domain != 'null' && type != 'null') {
            if (sort == 'low' || sort == 'high') {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            category: domain,
                            jobType: type,
                        }
                    }, {
                        $sort: {
                            salaryTo: sort === 'low' ? 1 : -1
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
            else {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            category: domain,
                            jobType: type,
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
        }
        else if (domain != 'null' && salary != "null") {
            if (sort == 'low' || sort == 'high') {
                const salArr = salary === null || salary === void 0 ? void 0 : salary.split('-');
                let min = parseInt(salArr[0]);
                let max = parseInt(salArr[1]);
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            category: domain,
                            salaryTo: {
                                $gte: min,
                                $lte: max
                            }
                        }
                    }, {
                        $sort: {
                            salaryTo: sort === 'low' ? 1 : -1
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
            else {
                const salArr = salary === null || salary === void 0 ? void 0 : salary.split('-');
                let min = parseInt(salArr[0]);
                let max = parseInt(salArr[1]);
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            category: domain,
                            salaryTo: {
                                $gte: min,
                                $lte: max
                            }
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
        }
        else if (type != 'null' && salary != "null") {
            const salArr = salary === null || salary === void 0 ? void 0 : salary.split('-');
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);
            if (sort == 'low' || sort == 'high') {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            jobType: type,
                            salaryTo: {
                                $gte: min,
                                $lte: max
                            }
                        }
                    }, {
                        $sort: {
                            salaryTo: sort === 'low' ? 1 : -1
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
            else {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            jobType: type,
                            salaryTo: {
                                $gte: min,
                                $lte: max
                            }
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
        }
        else if (salary != "null") {
            const salArr = salary === null || salary === void 0 ? void 0 : salary.split('-');
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);
            if (sort == 'low' || sort == 'high') {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            salaryTo: {
                                $gte: min,
                                $lte: max
                            }
                        }
                    }, {
                        $sort: {
                            salaryTo: sort === 'low' ? 1 : -1
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
            else {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            salaryTo: {
                                $gte: min,
                                $lte: max
                            }
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
        }
        else if (domain != 'null') {
            if (sort == 'low' || sort == 'high') {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            category: domain,
                        }
                    }, {
                        $sort: {
                            salaryTo: sort === 'low' ? 1 : -1
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
            else {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            category: domain,
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
        }
        else if (type != 'null') {
            if (sort == 'low' || sort == 'high') {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            jobType: type,
                        }
                    }, {
                        $sort: {
                            salaryTo: sort === 'low' ? 1 : -1
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
            else {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true,
                            jobType: type,
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
        }
        else {
            if (sort == 'low' || sort == 'high') {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    }, {
                        $match: {
                            status: true
                        }
                    }, {
                        $sort: {
                            salaryTo: sort === 'low' ? 1 : -1
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
            else {
                const jobs = yield jobModel.aggregate([{
                        $lookup: {
                            from: 'users',
                            localField: 'EmployerId',
                            foreignField: '_id',
                            as: 'Employer'
                        }
                    },
                    {
                        $match: {
                            status: true
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: 5
                    }
                ]);
                return jobs;
            }
        }
    });
    const getJobsCount = (domain, salary, type) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        if (domain != 'null' && type != 'null' && salary != 'null') {
            const salArr = salary === null || salary === void 0 ? void 0 : salary.split('-');
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);
            const jobs = yield jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        category: domain,
                        jobType: type,
                        salaryTo: {
                            $gte: min,
                            $lte: max
                        }
                    }
                },
                {
                    $count: "count"
                }
            ]);
            console.log((_b = (_a = jobs[0]) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 1);
            return (_d = (_c = jobs[0]) === null || _c === void 0 ? void 0 : _c.count) !== null && _d !== void 0 ? _d : 1;
        }
        else if (domain != 'null' && type != 'null') {
            const jobs = yield jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        category: domain,
                        jobType: type,
                    }
                },
                {
                    $count: "count"
                }
            ]);
            return (_f = (_e = jobs[0]) === null || _e === void 0 ? void 0 : _e.count) !== null && _f !== void 0 ? _f : 1;
        }
        else if (domain != 'null' && salary != "null") {
            const salArr = salary === null || salary === void 0 ? void 0 : salary.split('-');
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);
            const jobs = yield jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        category: domain,
                        salaryTo: {
                            $gte: min,
                            $lte: max
                        }
                    }
                },
                {
                    $count: "count"
                }
            ]);
            return (_h = (_g = jobs[0]) === null || _g === void 0 ? void 0 : _g.count) !== null && _h !== void 0 ? _h : 1;
        }
        else if (type != 'null' && salary != "null") {
            const salArr = salary === null || salary === void 0 ? void 0 : salary.split('-');
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);
            const jobs = yield jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        jobType: type,
                        salaryTo: {
                            $gte: min,
                            $lte: max
                        }
                    }
                },
                {
                    $count: "count"
                }
            ]);
            return (_k = (_j = jobs[0]) === null || _j === void 0 ? void 0 : _j.count) !== null && _k !== void 0 ? _k : 1;
        }
        else if (salary != "null") {
            const salArr = salary === null || salary === void 0 ? void 0 : salary.split('-');
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);
            const jobs = yield jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        salaryTo: {
                            $gte: min,
                            $lte: max
                        }
                    }
                },
                {
                    $count: "count"
                }
            ]);
            return (_m = (_l = jobs[0]) === null || _l === void 0 ? void 0 : _l.count) !== null && _m !== void 0 ? _m : 1;
        }
        else if (domain != 'null') {
            const jobs = yield jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        category: domain,
                    }
                },
                {
                    $count: "count"
                }
            ]);
            return (_p = (_o = jobs[0]) === null || _o === void 0 ? void 0 : _o.count) !== null && _p !== void 0 ? _p : 1;
        }
        else if (type != 'null') {
            const jobs = yield jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        jobType: type,
                    }
                },
                {
                    $count: "count"
                }
            ]);
            return (_r = (_q = jobs[0]) === null || _q === void 0 ? void 0 : _q.count) !== null && _r !== void 0 ? _r : 1;
        }
        else {
            const count = yield jobModel.countDocuments();
            return count;
        }
    });
    const getDomains = () => __awaiter(void 0, void 0, void 0, function* () {
        const domains = yield jobModel.distinct("category");
        return domains;
    });
    const getSavedCountById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const Id = new mongoose_1.default.Types.ObjectId(id);
        const domain = yield jobModel.aggregate([{
                $unwind: "$savedBy"
            },
            {
                $match: {
                    "savedBy": Id
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ]);
        return domain;
    });
    const getJobBySearch = (search) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield jobModel.find({ title: { $regex: search, $options: 'i' } }).populate('EmployerId');
        const count = yield jobModel.countDocuments({ title: { $regex: search, $options: 'i' } });
        return { data, count };
    });
    const jobStatusfalse = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield jobModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(jobId) }, { $set: { status: false } });
        return data;
    });
    const jobStatustrue = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield jobModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(jobId) }, { $set: { status: true } });
        return data;
    });
    return {
        addJob,
        getEmpJobs,
        getJobs,
        getDomains,
        getJobsCount,
        getSingleJob,
        saveJob,
        removeSaved,
        getBookmarked,
        addToApplied,
        editJob,
        getSavedCountById,
        getJobBySearch,
        jobStatusfalse,
        jobStatustrue
    };
};
exports.JobRepositoryImpl = JobRepositoryImpl;

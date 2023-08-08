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
exports.searchJobs = exports.mySavedJobCount = exports.addAppliedBy = exports.getBookmarked = exports.removeBookmarkJob = exports.bookmarkJob = exports.getJobData = exports.getJobsCount = exports.getJobs = void 0;
const getJobs = (jobRepository) => (page, domain, salary, type, sort) => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield jobRepository.getJobs(page, domain, salary, type, sort);
    return jobs;
});
exports.getJobs = getJobs;
const getJobsCount = (jobrepository) => (domain, salary, type) => __awaiter(void 0, void 0, void 0, function* () {
    const JobsCount = yield jobrepository.getJobsCount(domain, salary, type);
    return JobsCount;
});
exports.getJobsCount = getJobsCount;
const getJobData = (jobrepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const jobData = yield jobrepository.getSingleJob(id);
    return jobData;
});
exports.getJobData = getJobData;
const bookmarkJob = (jobrepository) => (jobId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield jobrepository.saveJob(jobId, user);
    return response;
});
exports.bookmarkJob = bookmarkJob;
const removeBookmarkJob = (jobrepository) => (jobId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield jobrepository.removeSaved(jobId, user);
    return response;
});
exports.removeBookmarkJob = removeBookmarkJob;
const getBookmarked = (jobrepository) => (user) => __awaiter(void 0, void 0, void 0, function* () {
    const savedJobs = yield jobrepository.getBookmarked(user);
    return savedJobs;
});
exports.getBookmarked = getBookmarked;
const addAppliedBy = (jobrepository) => (jobId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield jobrepository.addToApplied(jobId, user);
    return response;
});
exports.addAppliedBy = addAppliedBy;
const mySavedJobCount = (jobrepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield jobrepository.getSavedCountById(userId);
    return response;
});
exports.mySavedJobCount = mySavedJobCount;
const searchJobs = (JobRepository) => (key) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield JobRepository.getJobBySearch(key);
    return response;
});
exports.searchJobs = searchJobs;

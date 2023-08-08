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
exports.unBlockUser = exports.blockUser = exports.updatePassWordByEmail = exports.updatePassWord = exports.checkPassWord = exports.updateEmployer = exports.updateMyProfile = exports.expiredSubs = exports.updateUserPoint = exports.userUpdateSub = exports.getUserInfo = exports.updateProfessional = exports.updateEducation = exports.updateProfile = exports.updateBasic = void 0;
const updateBasic = (userRepository) => (firstname, lastname, phone, qualification, objective, about, imageURL, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBasic = yield userRepository.updateBasicInfo(firstname, lastname, phone, qualification, objective, about, imageURL, userId);
    return updatedBasic;
});
exports.updateBasic = updateBasic;
const updateProfile = (userRepository) => (father, mother, dob, nationality, permanent, present, marital, gender, skills, projects, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProfile = yield userRepository.updateProfileInfo(father, mother, dob, nationality, permanent, present, marital, gender, skills, projects, userId);
    return updatedProfile;
});
exports.updateProfile = updateProfile;
const updateEducation = (userRepository) => (education, result, institute, starting, ending, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedEdu = yield userRepository.updateEducationInfo(education, result, institute, starting, ending, userId);
    return updatedEdu;
});
exports.updateEducation = updateEducation;
const updateProfessional = (userRepository) => (company, designation, experience, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updateProf = yield userRepository.updateProfessionalInfo(company, designation, experience, userId);
});
exports.updateProfessional = updateProfessional;
const getUserInfo = (userRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield userRepository.getUserInformation(userId);
    return userInfo;
});
exports.getUserInfo = getUserInfo;
const userUpdateSub = (userRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield userRepository.updateSub(userId);
    return userInfo;
});
exports.userUpdateSub = userUpdateSub;
const updateUserPoint = (userRepository) => (userId, per) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield userRepository.updatePoint(userId, per);
    return userInfo;
});
exports.updateUserPoint = updateUserPoint;
const expiredSubs = (userRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield userRepository.updateExp(userId);
    return userInfo;
});
exports.expiredSubs = expiredSubs;
const updateMyProfile = (userRepository) => (userId, username, profileImg, social) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield userRepository.updateUserProfile(userId, username, profileImg, social);
    return update;
});
exports.updateMyProfile = updateMyProfile;
const updateEmployer = (userRepository) => (userId, image, firstname, lastname, username, company, location, social) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield userRepository.updateEmpProfile(userId, image, username, firstname, lastname, company, location, social);
    return update;
});
exports.updateEmployer = updateEmployer;
const checkPassWord = (userRepository) => (userId, password) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield userRepository.checkPass(userId, password);
    return status;
});
exports.checkPassWord = checkPassWord;
const updatePassWord = (userRepository) => (userId, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield userRepository.updatePassword(userId, newPassword);
    return status;
});
exports.updatePassWord = updatePassWord;
const updatePassWordByEmail = (userRepository) => (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield userRepository.updatePasswordByEmail(email, newPassword);
    return status;
});
exports.updatePassWordByEmail = updatePassWordByEmail;
const blockUser = (userRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield userRepository.blockUser(userId);
    return update;
});
exports.blockUser = blockUser;
const unBlockUser = (userRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield userRepository.unBlockUser(userId);
    return update;
});
exports.unBlockUser = unBlockUser;

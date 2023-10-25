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
exports.UserRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepositoryImpl = (userModel) => {
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel.findOne({ email });
        return user ? user.toObject() : null;
    });
    const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield userModel.create(user);
        console.log(createdUser);
        return createdUser.toObject();
    });
    const getNonPremiumUser = () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userModel.find({ role: "candidate", isPrime: false });
        return users;
    });
    const getPremiumUser = () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userModel.find({ role: "candidate", isPrime: true });
        return users;
    });
    const getEmployers = () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userModel.find({ role: "employer" });
        return users;
    });
    const findAndUpdate = (empId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("hrerer");
        const updated = yield userModel.updateOne({ _id: empId }, { $set: { status: true } });
        return updated;
    });
    const updateProfileInfo = (father, mother, dob, nationality, permanent, present, marital, gender, skills, projects, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const profileInfo = {
            father,
            mother,
            dob,
            nationality,
            permanent,
            present,
            marital,
            gender,
            skills,
            projects
        };
        const result = yield userModel.updateOne({ _id: userId }, { $set: { profile: profileInfo } });
        return result;
    });
    const updateBasicInfo = (firstname, lastname, phone, qualification, objective, about, imageURL, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const basicInfo = {
            firstname,
            lastname,
            phone,
            qualification,
            objective,
            about,
            imageURL
        };
        const result = yield userModel.updateOne({ _id: userId }, { $set: { basic: basicInfo } });
        return result;
    });
    const updateEducationInfo = (education, result, institute, starting, ending, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const eduInfo = {
            education,
            result,
            institute,
            starting,
            ending
        };
        const response = yield userModel.updateOne({ _id: userId }, { $set: { education: eduInfo } });
        return response;
    });
    const updateProfessionalInfo = (company, designation, experience, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const profInfo = {
            company,
            designation,
            experience
        };
        const response = yield userModel.updateOne({ _id: userId }, { $set: { professional: profInfo } });
        return response;
    });
    const getUserInformation = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield userModel.findOne({ _id: userId });
        return response;
    });
    const updateSub = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        function formatDateToDdMmYyyy(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
        function getDateAfterDays(days) {
            const currentDate = new Date();
            const futureDate = new Date(currentDate);
            futureDate.setDate(futureDate.getDate() + days);
            return futureDate;
        }
        const id = new mongoose_1.default.Types.ObjectId(userId);
        const res = yield userModel.updateOne({ _id: id }, { $set: { isPrime: true, subscribedDate: formatDateToDdMmYyyy(new Date()), subscriptionStatus: 'subscribed', Expiry: formatDateToDdMmYyyy(getDateAfterDays(30)) } });
        return res;
    });
    const updatePoint = (user, per) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(user);
        const userData = yield userModel.updateOne({ _id: id }, { $set: { mockPer: per } });
        return userData;
    });
    const updateExp = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(user);
        const userData = yield userModel.updateOne({ _id: id }, { $set: { subscriptionStatus: 'Expired', isPrime: false } });
        return userData;
    });
    const updateUserProfile = (userId, username, profileImg, social) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(userId);
        const data = yield userModel.updateOne({ _id: id }, { $set: {
                username: username,
                facebook: social === null || social === void 0 ? void 0 : social.facebook,
                instagram: social === null || social === void 0 ? void 0 : social.instagram,
                linkedIn: social === null || social === void 0 ? void 0 : social.linkedIn,
                gitHub: social === null || social === void 0 ? void 0 : social.gitHub,
                profileImg: profileImg
            } });
        return data;
    });
    const getUsersCount = () => __awaiter(void 0, void 0, void 0, function* () {
        const number = yield userModel.countDocuments();
        const premium = yield userModel.countDocuments({ isPrime: true });
        const emp = yield userModel.countDocuments({ role: 'employer' });
        return { number, premium, emp };
    });
    const updateEmpProfile = (empId, img, username, firstname, lastname, company, location, social) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(empId);
        const update = yield userModel.updateOne({ _id: id }, { $set: {
                profileImg: img,
                firstname,
                lastname,
                username,
                company,
                location,
                facebook: social === null || social === void 0 ? void 0 : social.facebook,
                instagram: social === null || social === void 0 ? void 0 : social.instagram,
                linkedIn: social === null || social === void 0 ? void 0 : social.linkedIn
            } });
        return update;
    });
    const checkPass = (userId, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(userId) });
        if (user) {
            const status = bcrypt_1.default.compare(password, user.password);
            return status;
        }
        return false;
    });
    const updatePassword = (userId, newPass) => __awaiter(void 0, void 0, void 0, function* () {
        const password = yield bcrypt_1.default.hash(newPass, 10);
        const update = yield userModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(userId) }, { $set: { password: password } });
        return update;
    });
    const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const update = yield userModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(userId) }, { $set: { status: false } });
        return update;
    });
    const unBlockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const update = yield userModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(userId) }, { $set: { status: true } });
        return update;
    });
    const getAllCandidates = (page) => __awaiter(void 0, void 0, void 0, function* () {
        const skip = (parseInt(page) - 1) * 8;
        const count = yield userModel.countDocuments({ role: 'candidate' });
        const users = yield userModel.find({ role: 'candidate' }).sort({ isPrime: -1 }).skip(skip).limit(8);
        return { users, count };
    });
    const updatePasswordByEmail = (email, newPass) => __awaiter(void 0, void 0, void 0, function* () {
        const password = yield bcrypt_1.default.hash(newPass, 10);
        const update = yield userModel.updateOne({ email: email }, { $set: { password: password } });
        return update;
    });
    return {
        findByEmail,
        create,
        getNonPremiumUser,
        getPremiumUser,
        getEmployers,
        findAndUpdate,
        updateBasicInfo,
        updateProfileInfo,
        updateEducationInfo,
        updateProfessionalInfo,
        getUserInformation,
        updateSub,
        updatePoint,
        updateExp,
        updateUserProfile,
        getUsersCount,
        updateEmpProfile,
        updatePassword,
        checkPass,
        blockUser,
        unBlockUser,
        getAllCandidates,
        updatePasswordByEmail
    };
};
exports.UserRepositoryImpl = UserRepositoryImpl;

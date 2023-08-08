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
exports.updatePasswordCntrl = exports.forgotpasswordOTPSubmit = exports.forgotPasswordOTP = exports.deactivateAccount = exports.changePasswordCntrl = exports.updateEmployerProfile = exports.updateUserProfile = exports.getDashboardData = exports.getPremiumPageData = exports.getUserDataCntrl = exports.updateProfInformation = exports.updateEducationInformation = exports.updateProfileInformation = exports.updateBasicInformation = exports.getAllEmployers = exports.getPremiumUsers = exports.getNonPremiumUsers = exports.auth = exports.removeRefreshToken = exports.generateOtp = exports.userRegister = exports.userLoginController = void 0;
const userModel_1 = require("../../infra/Database/userModel");
const loginUser_1 = require("../../app/usecases/user/loginUser");
const userRepository_1 = require("../../infra/repositories/userRepository");
const SignupUser_1 = require("../../app/usecases/user/SignupUser");
const generateOtp_1 = require("../../app/usecases/user/generateOtp");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT_1 = require("../../utils/validateJWT");
const getUsers_1 = require("../../app/usecases/admin/getUsers");
const updateUser_1 = require("../../app/usecases/user/updateUser");
const MockTest_1 = require("../../app/usecases/exam/MockTest");
const mockExamRepository_1 = require("../../infra/repositories/mockExamRepository");
const mockTestModel_1 = require("../../infra/Database/mockTestModel");
const subscription_1 = require("../../utils/subscription");
const jobApplication_1 = require("../../app/usecases/user/jobApplication");
const applicationRepository_1 = require("../../infra/repositories/applicationRepository");
const applyModel_1 = require("../../infra/Database/applyModel");
const getJobs_1 = require("../../app/usecases/user/getJobs");
const jobRepository_1 = require("../../infra/repositories/jobRepository");
const jobModel_1 = require("../../infra/Database/jobModel");
const Chat_1 = require("../../app/usecases/Chat/Chat");
const chatRepository_1 = require("../../infra/repositories/chatRepository");
const chatModel_1 = require("../../infra/Database/chatModel");
const publicAns_1 = require("../../app/usecases/PublicAns/publicAns");
const PublicAnsRepository_1 = require("../../infra/repositories/PublicAnsRepository");
const PublicAnswer_1 = require("../../infra/Database/PublicAnswer");
const node_cache_1 = __importDefault(require("node-cache"));
const myCache = new node_cache_1.default();
const db = userModel_1.userModel;
const userRepository = (0, userRepository_1.UserRepositoryImpl)(db);
const mockExamRepository = (0, mockExamRepository_1.MockExamRepositoryImpl)(mockTestModel_1.MockeTestModel);
const applyRepository = (0, applicationRepository_1.applicationRepositoryEmpl)(applyModel_1.jobApplyModel);
const jobRepository = (0, jobRepository_1.JobRepositoryImpl)(jobModel_1.jobModel);
const chatRepository = (0, chatRepository_1.chatRepositoryEmpl)(chatModel_1.chatModel);
const publicAnsRepository = (0, PublicAnsRepository_1.publicAnswerRepositoryImpl)(PublicAnswer_1.PublicAnsModel);
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield (0, loginUser_1.loginUser)(userRepository)(email, password);
        if (user === 'email') {
            res.json({ message: "Invalid Email" });
        }
        else if (user === 'password') {
            res.json({ message: "Invalid password" });
        }
        else if (user === "employer" || user === "candidate") {
            if (user === "employer") {
                res.json({ message: `Verification Pending. You'll get an email when account is verified.`, notVerified: true });
            }
            else {
                res.json({ message: `Account is banned by admin.` });
            }
        }
        else {
            const { _id, role } = JSON.parse(JSON.stringify(user));
            const accessToken = jsonwebtoken_1.default.sign({ sub: { _id, role } }, 'KEY', { expiresIn: '3d' });
            const refreshToken = jsonwebtoken_1.default.sign({ sub: { _id, role } }, 'refresh', { expiresIn: '100d' });
            res.cookie('userJWT', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 100 * 24 * 60 * 60 * 1000
            });
            res.status(200).json({ message: "Login successful", user, accessToken });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.userLoginController = userLoginController;
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, username, email, password, isGoogle, profileImg } = req.body;
    try {
        const user = yield (0, SignupUser_1.signupUser)(userRepository)(firstname, lastname, username, email, password, isGoogle, profileImg);
        const { _id, role } = JSON.parse(JSON.stringify(user));
        const accessToken = jsonwebtoken_1.default.sign({ sub: { _id, role } }, 'KEY', { expiresIn: '3d' });
        const refreshToken = jsonwebtoken_1.default.sign({ sub: { _id, role } }, 'refresh', { expiresIn: '100d' });
        res.cookie('userJWT', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 100 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({ message: "Signup successful", user, accessToken });
    }
    catch (err) {
        console.log(JSON.parse(JSON.stringify(err)).code);
        if (JSON.parse(JSON.stringify(err)).code == 11000) {
            res.status(403).json({ message: "Email already exist" });
        }
        else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
});
exports.userRegister = userRegister;
const generateOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const otp = (0, generateOtp_1.generateSignupOtp)(email);
        res.json(otp);
    }
    catch (error) {
    }
});
exports.generateOtp = generateOtp;
const removeRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('userJWT');
        res.json({ status: true });
    }
    catch (error) {
    }
});
exports.removeRefreshToken = removeRefreshToken;
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        let status = (0, validateJWT_1.validate)(token);
        if (status) {
            res.json({ status: true });
        }
        else {
            const refreshToken = req.cookies.userJWT;
            const refreshStatus = (0, validateJWT_1.validateRefresh)(refreshToken);
            if (refreshStatus) {
                const data = jsonwebtoken_1.default.verify(refreshToken, 'refresh');
                const accessToken = jsonwebtoken_1.default.sign({ sub: data.sub }, 'KEY', { expiresIn: '3d' });
                res.json({ status: true, accessToken });
            }
            else {
                res.clearCookie('userJWT');
                res.json({ status: false });
            }
        }
    }
    catch (error) {
    }
});
exports.auth = auth;
const getNonPremiumUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, getUsers_1.Nonpremium)(userRepository)();
        if (res.locals.newadminaccesstoken)
            res.json({ users, newAdminAccessToken: res.locals.newadminaccesstoken });
        else
            res.json({ users });
    }
    catch (error) {
    }
});
exports.getNonPremiumUsers = getNonPremiumUsers;
const getPremiumUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, getUsers_1.Premium)(userRepository)();
        if (res.locals.newadminaccesstoken)
            res.json({ users, newAdminAccessToken: res.locals.newadminaccesstoken });
        else
            res.json({ users });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getPremiumUsers = getPremiumUsers;
const getAllEmployers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, getUsers_1.Employers)(userRepository)();
        if (res.locals.newadminaccesstoken)
            res.json({ users, newAdminAccessToken: res.locals.newadminaccesstoken });
        else
            res.json({ users });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAllEmployers = getAllEmployers;
const updateBasicInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        console.log(req.body);
        if (userId) {
            const { firstname, lastname, phone, qualification, objective, about, imageURL } = req.body;
            const response = yield (0, updateUser_1.updateBasic)(userRepository)(firstname, lastname, phone, qualification, objective, about, imageURL, userId);
            console.log(response);
        }
    }
    catch (error) {
    }
});
exports.updateBasicInformation = updateBasicInformation;
const updateProfileInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        console.log("hey", userId);
        if (userId) {
            const { father, mother, dob, nationality, permanent, present, marital, gender, skills, projects } = req.body;
            const resoponse = yield (0, updateUser_1.updateProfile)(userRepository)(father, mother, dob, nationality, permanent, present, marital, gender, skills, projects, userId);
            return resoponse;
        }
    }
    catch (error) {
    }
});
exports.updateProfileInformation = updateProfileInformation;
const updateEducationInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (userId) {
            const { education, result, institute, starting, ending } = req.body;
            const resoponse = yield (0, updateUser_1.updateEducation)(userRepository)(education, result, institute, starting, ending, userId);
        }
    }
    catch (error) {
    }
});
exports.updateEducationInformation = updateEducationInformation;
const updateProfInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (userId) {
            const { company, designation, experience } = req.body;
            const resoponse = yield (0, updateUser_1.updateProfessional)(userRepository)(company, designation, experience, userId);
        }
    }
    catch (error) {
    }
});
exports.updateProfInformation = updateProfInformation;
const getUserDataCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (userId) {
            const result = yield (0, updateUser_1.getUserInfo)(userRepository)(userId);
            res.status(201).json({ user: result });
        }
    }
    catch (error) {
    }
});
exports.getUserDataCntrl = getUserDataCntrl;
const getPremiumPageData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { user } = req.params;
        const userdata = yield (0, updateUser_1.getUserInfo)(userRepository)(user);
        const valid = (0, subscription_1.validSubsription)((_a = userdata === null || userdata === void 0 ? void 0 : userdata.Expiry) !== null && _a !== void 0 ? _a : '');
        if (valid) {
            const result = yield (0, updateUser_1.getUserInfo)(userRepository)(user);
            let highscore = 0;
            const mockTests = yield (0, MockTest_1.getMockLastExamByUserId)(mockExamRepository)(user);
            highscore = Math.max(...mockTests.map(ele => ele.mark ? ele.mark : 0));
            res.json({ user: result, highscore, mockTests });
        }
        else {
            const updateUser = yield (0, updateUser_1.expiredSubs)(userRepository)(user);
            res.json({ expired: true });
        }
    }
    catch (error) {
    }
});
exports.getPremiumPageData = getPremiumPageData;
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const applications = yield (0, jobApplication_1.getMyApplications)(applyRepository)(id);
        const saved = yield (0, getJobs_1.mySavedJobCount)(jobRepository)(id);
        const chat = yield (0, Chat_1.chatCount)(chatRepository)(id);
        const LAS = yield (0, publicAns_1.getMyLAS)(publicAnsRepository)(id);
        const applied = yield (0, jobApplication_1.getLast5ApplicationByUserId)(applyRepository)(id);
        res.json({ applications, saved: saved[0], chat: chat[0], LAS: LAS[0], applied });
    }
    catch (error) {
    }
});
exports.getDashboardData = getDashboardData;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, userName, profileImg, facebook, instagram, linkedIn, gitHub } = req.body;
        const data = yield (0, updateUser_1.updateMyProfile)(userRepository)(userId, userName, profileImg, { facebook, instagram, linkedIn, gitHub });
        res.json(data);
    }
    catch (error) {
    }
});
exports.updateUserProfile = updateUserProfile;
const updateEmployerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { EmpId, image, firstname, lastname, username, company, location, facebook, instagram, linkedIn } = req.body;
        const data = yield (0, updateUser_1.updateEmployer)(userRepository)(EmpId, image, firstname, lastname, username, company, location, { instagram, facebook, linkedIn });
        res.json(data);
    }
    catch (error) {
    }
});
exports.updateEmployerProfile = updateEmployerProfile;
const changePasswordCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, newPassword, userId } = req.body;
        const status = yield (0, updateUser_1.checkPassWord)(userRepository)(userId, password);
        if (status) {
            const data = yield (0, updateUser_1.updatePassWord)(userRepository)(userId, newPassword);
            res.json({ message: "Password updated" });
        }
        else {
            res.json({ error: "Invalid Password" });
        }
    }
    catch (error) {
    }
});
exports.changePasswordCntrl = changePasswordCntrl;
const deactivateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, password } = req.body;
        const status = yield (0, updateUser_1.checkPassWord)(userRepository)(userId, password);
        if (status) {
            const data = yield (0, updateUser_1.blockUser)(userRepository)(userId);
            res.json({ status: true, message: 'Success' });
        }
        else {
            res.json({ error: "Invalid Password" });
        }
    }
    catch (error) {
    }
});
exports.deactivateAccount = deactivateAccount;
const forgotPasswordOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield (0, loginUser_1.getUserbyEmail)(userRepository)(email);
        if (user) {
            if (!user.isGoogle) {
                const otp = (0, generateOtp_1.generateForgotPasswordOtp)(email);
                myCache.set(email, otp, 180);
                res.json({ status: true });
            }
            else {
                res.json({ error: 'Sorry, "Forgot Password" is unavailable for Google Auth accounts. ' });
            }
        }
        else {
            res.json({ error: 'Email not registered.' });
        }
    }
    catch (error) {
    }
});
exports.forgotPasswordOTP = forgotPasswordOTP;
const forgotpasswordOTPSubmit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, email } = req.body;
        const generatedOTP = myCache.get(email);
        if (generatedOTP) {
            console.log(generatedOTP, otp);
            if (generatedOTP == otp) {
                res.json({ status: true });
            }
            else {
                res.json({ error: "Invalid OTP" });
            }
        }
        else {
            res.json({ error: 'OTP Expired , Try Again' });
        }
    }
    catch (error) {
    }
});
exports.forgotpasswordOTPSubmit = forgotpasswordOTPSubmit;
const updatePasswordCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const data = yield (0, updateUser_1.updatePassWordByEmail)(userRepository)(email, password);
        if (data.matchedCount === 1) {
            res.json({ status: true });
        }
        else {
            res.json({ error: "Something went wrong!!" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatePasswordCntrl = updatePasswordCntrl;

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
exports.unBlockUserCntrl = exports.blockUserCntrl = exports.adminDashboardData = exports.adminLogout = exports.adminLogin = void 0;
const loginAdmin_1 = require("../../app/usecases/admin/loginAdmin");
const adminRespository_1 = require("../../infra/repositories/adminRespository");
const adminModel_1 = require("../../infra/Database/adminModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsers_1 = require("../../app/usecases/admin/getUsers");
const userRepository_1 = require("../../infra/repositories/userRepository");
const userModel_1 = require("../../infra/Database/userModel");
const subscription_1 = require("../../app/usecases/Subscription/subscription");
const subscriptionRepository_1 = require("../../infra/repositories/subscriptionRepository");
const subscriptionModel_1 = require("../../infra/Database/subscriptionModel");
const updateUser_1 = require("../../app/usecases/user/updateUser");
const adminRepository = (0, adminRespository_1.AdminRepositoryImpl)(adminModel_1.adminModel);
const SubscriptionRepository = (0, subscriptionRepository_1.SubscriptionRepositoryImpl)(subscriptionModel_1.subscriptionModel);
const userRepository = (0, userRepository_1.UserRepositoryImpl)(userModel_1.userModel);
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield (0, loginAdmin_1.loginAdmin)(adminRepository)(email, password);
        if (admin === "email") {
            res.json({ email: "Invalid Email" });
        }
        else if (admin === "password") {
            res.json({ email: "Invalid Password" });
        }
        else if (admin) {
            const datas = JSON.parse(JSON.stringify(admin));
            const accessToken = jsonwebtoken_1.default.sign({ sub: { role: 'Admin', id: datas._id } }, 'KEY', { expiresIn: '3d' });
            const refreshToken = jsonwebtoken_1.default.sign({ sub: { role: 'Admin', id: datas._id } }, 'refresh', { expiresIn: '100d' });
            res.cookie('adminJWT', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 100 * 24 * 60 * 60 * 1000
            });
            res.json({ admin, accessToken });
        }
    }
    catch (error) {
    }
});
exports.adminLogin = adminLogin;
const adminLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('adminJWT');
        res.json({ signout: true });
    }
    catch (error) {
    }
});
exports.adminLogout = adminLogout;
const adminDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { number, premium, emp } = yield (0, getUsers_1.countUsers)(userRepository)();
        const revenue = yield (0, subscription_1.totalRevenueAdmin)(SubscriptionRepository)();
        const subscription = yield (0, subscription_1.subscriptionHistory)(SubscriptionRepository)();
        res.json({ users: number, premium, emp, revenue, subscription });
    }
    catch (error) {
    }
});
exports.adminDashboardData = adminDashboardData;
const blockUserCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, updateUser_1.blockUser)(userRepository)(id);
        res.json({ status: true });
    }
    catch (error) {
    }
});
exports.blockUserCntrl = blockUserCntrl;
const unBlockUserCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, updateUser_1.unBlockUser)(userRepository)(id);
        res.json({ status: true });
    }
    catch (error) {
    }
});
exports.unBlockUserCntrl = unBlockUserCntrl;

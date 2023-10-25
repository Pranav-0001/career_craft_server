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
exports.subscriptionHistoryForadmin = exports.addSubscriptionCntrl = void 0;
const subscriptionRepository_1 = require("../../infra/repositories/subscriptionRepository");
const subscriptionModel_1 = require("../../infra/Database/subscriptionModel");
const subscription_1 = require("../../app/usecases/Subscription/subscription");
const userModel_1 = require("../../infra/Database/userModel");
const userRepository_1 = require("../../infra/repositories/userRepository");
const updateUser_1 = require("../../app/usecases/user/updateUser");
const SubscriptionRepository = (0, subscriptionRepository_1.SubscriptionRepositoryImpl)(subscriptionModel_1.subscriptionModel);
const userRepository = (0, userRepository_1.UserRepositoryImpl)(userModel_1.userModel);
const addSubscriptionCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { user, time, orderId, status } = req.body;
        const data = yield (0, subscription_1.subscribeAdd)(SubscriptionRepository)(user, time, orderId, status);
        yield (0, updateUser_1.userUpdateSub)(userRepository)(user);
        res.json({ status: true, sub: data });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addSubscriptionCntrl = addSubscriptionCntrl;
const subscriptionHistoryForadmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.params.page);
        const data = yield (0, subscription_1.subscriptionHistoryAdmin)(SubscriptionRepository)(page);
        const count = yield (0, subscription_1.subscriptionCount)(SubscriptionRepository)();
        let pages = [];
        let no = Math.ceil(count / 10);
        for (let i = 1; i <= no; i++) {
            pages.push(i);
        }
        res.json({ subs: data, pages });
    }
    catch (error) {
        console.log(error);
    }
});
exports.subscriptionHistoryForadmin = subscriptionHistoryForadmin;

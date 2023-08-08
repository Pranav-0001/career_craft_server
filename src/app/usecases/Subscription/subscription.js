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
exports.subscriptionCount = exports.subscriptionHistoryAdmin = exports.subscriptionHistory = exports.totalRevenueAdmin = exports.subscribeAdd = void 0;
const subscribeAdd = (subscriptionRepository) => (user, time, orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield subscriptionRepository.addSubscription(user, time, orderId, status);
    return data;
});
exports.subscribeAdd = subscribeAdd;
const totalRevenueAdmin = (subscriptionRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield subscriptionRepository.totalRevenue();
    return data;
});
exports.totalRevenueAdmin = totalRevenueAdmin;
const subscriptionHistory = (subscriptionRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield subscriptionRepository.subscriptions();
    return data;
});
exports.subscriptionHistory = subscriptionHistory;
const subscriptionHistoryAdmin = (subscriptionRepository) => (page) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield subscriptionRepository.sunbscriptionHist(page);
    return data;
});
exports.subscriptionHistoryAdmin = subscriptionHistoryAdmin;
const subscriptionCount = (subscriptionRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield subscriptionRepository.countDocs();
    return data;
});
exports.subscriptionCount = subscriptionCount;

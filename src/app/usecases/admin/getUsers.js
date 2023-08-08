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
exports.sentConfirmationMail = exports.countUsers = exports.Employers = exports.Premium = exports.Nonpremium = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const Nonpremium = (userRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepository.getNonPremiumUser();
    return users;
});
exports.Nonpremium = Nonpremium;
const Premium = (userRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepository.getPremiumUser();
    return users;
});
exports.Premium = Premium;
const Employers = (userRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepository.getEmployers();
    return users;
});
exports.Employers = Employers;
const countUsers = (userRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const counts = yield userRepository.getUsersCount();
    return counts;
});
exports.countUsers = countUsers;
const sentConfirmationMail = (email) => {
    let mailTransporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.OTP_EMAIL,
            pass: process.env.OTP_PASSWORD
        }
    });
    let details = {
        from: process.env.OTP_EMAIL,
        to: email,
        subject: "Registration Approval: Employer Account Activated",
        text: `We are pleased to inform you that your registration as an employer on our platform has been approved by the admin. Your employer account is now activated and ready to use.

        As an approved employer, you gain access to various features and functionalities to help you connect with potential candidates and post job opportunities. We believe that this platform will provide you with valuable resources to grow your team and find the right talent for your organization.
        
        If you have any questions or need assistance, please feel free to reach out to our support team. We are here to help you make the most of your experience on our platform.
        
        Thank you for choosing our platform for your recruitment needs. We wish you all the best in finding the perfect candidates for your organization.
        
        Best regards,
        Career Craft`
    };
    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("success");
        }
    });
};
exports.sentConfirmationMail = sentConfirmationMail;

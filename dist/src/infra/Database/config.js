"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.MONGODB_URL;
// console.log(url);
const db = () => {
    mongoose_1.default.connect(url)
        .then(() => {
        console.log("Database connected successfully");
    })
        .catch((error) => {
        console.log(error.message);
    });
};
exports.db = db;

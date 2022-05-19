"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Global = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const globalSchema = new mongoose_1.default.Schema({
    date: {
        type: String,
        default: String(new Date().toJSON().slice(0, 4)) +
            "-" +
            String(new Date().toJSON().slice(5, 7)) +
            "-" +
            String(new Date().toJSON().slice(8, 10)),
        required: true,
    },
    newConfirmed: {
        type: Number,
        default: 0,
        required: true,
    },
    newDeaths: {
        type: Number,
        default: 0,
        required: true,
    },
    newRecovered: {
        type: Number,
        default: 0,
        required: true,
    },
    totalConfirmed: {
        type: Number,
        required: true,
    },
    totalDeaths: {
        type: Number,
        required: true,
    },
    totalRecovered: {
        type: Number,
        required: true,
    },
});
exports.Global = mongoose_1.default.model("Global", globalSchema);
//# sourceMappingURL=global.js.map
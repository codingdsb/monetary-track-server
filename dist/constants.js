"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.__prod__ = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 4000;
exports.__prod__ = process.env.NODE_ENV === "production";
exports.JWT_SECRET = process.env.JWT_SECRET;
//# sourceMappingURL=constants.js.map
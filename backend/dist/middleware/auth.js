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
exports.AuthenticateAdmin = exports.AuthenticateUser = exports.createTokenAdmin = exports.createTokenUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const secretUser = "superS3cr3tUs3r";
const secretAdmin = "superS3cr3tAdmin";
//create the token
function createTokenUser(user) {
    return jsonwebtoken_1.default.sign({ username: user.username,
        password: user.password,
        role: "user" }, secretUser, { expiresIn: '1h' });
}
exports.createTokenUser = createTokenUser;
function createTokenAdmin(Admin) {
    return jsonwebtoken_1.default.sign({ username: Admin.username,
        password: Admin.password,
        role: 'admin' }, secretAdmin, { expiresIn: '1h' });
}
exports.createTokenAdmin = createTokenAdmin;
//middlewar to check user and admin 
const AuthenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res.sendStatus(403);
    }
    const authHeader = (req.headers.authorization).split(' ')[1];
    if (authHeader) {
        jsonwebtoken_1.default.verify(authHeader, secretUser, (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(404).json({ message: "Unauthorized" });
            }
            if (!payload) {
                return res.sendStatus(403);
            }
            if (typeof payload === "string") {
                return res.sendStatus(403);
            }
            const founduser = yield db_1.User.findOne({ username: payload.username, password: payload.password });
            if (!founduser) {
                return res.status(404).json({ message: "User Not Found " });
            }
            if (typeof founduser === "string") {
                return res.status(404).json({ message: "User Not Found " });
            }
            req.headers["user_id"] = payload._id;
            next();
        }));
    }
    else {
        res.status(401);
    }
});
exports.AuthenticateUser = AuthenticateUser;
const AuthenticateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res.sendStatus(403);
    }
    const authHeader = (req.headers.authorization).split(' ')[1];
    if (authHeader) {
        jsonwebtoken_1.default.verify(authHeader, secretAdmin, (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(404).json({ message: "Unauthorized" });
            }
            if (!payload) {
                return res.sendStatus(403);
            }
            if (typeof payload === "string") {
                return res.sendStatus(403);
            }
            const admin = yield db_1.Admin.findOne({ username: payload.username, password: payload.password });
            if (!admin) {
                return res.status(404).json({ message: "Admin Not Found " });
            }
            if (typeof admin === "string") {
                return res.status(404).json({ message: "User Not Found " });
            }
            req.headers['user_id'] = payload._id;
            next();
        }));
    }
    else {
        res.status(401);
    }
});
exports.AuthenticateAdmin = AuthenticateAdmin;

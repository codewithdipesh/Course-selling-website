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
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const userRouter = express_1.default.Router();
// User routes
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to sign up user
    const input = req.body;
    const user = yield db_1.User.findOne({ username: input.username }); //notes
    if (user) {
        res.json({ mesage: "User with this username already exists" });
    }
    else {
        const token = (0, auth_1.createTokenUser)(input);
        const newUser = new db_1.User(input);
        yield newUser.save();
        res.json({ message: "User Created Successfully", token: token });
    }
}));
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to log in user
    if (!req.headers) {
        return res.sendStatus(403);
    }
    if (typeof req.headers.username !== "string" || typeof req.headers.password !== "string") {
        return res.sendStatus(403);
    }
    const input = {
        username: req.headers.username,
        password: req.headers.password
    };
    const user = yield db_1.User.findOne({ username: input.username, password: input.password });
    if (user) {
        const token = (0, auth_1.createTokenUser)(input);
        res.json({ message: "Logged in successfully", token: token });
    }
    else {
        res.json({ message: "Incorrect Id or Password" });
    }
}));
userRouter.get('/courses', auth_1.AuthenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to list all courses
    const courses = yield db_1.Course.find({ published: "true" }); //notes
    res.json({ courses });
}));
userRouter.post('/course/:courseId', auth_1.AuthenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to purchase a course
    if (!req.headers.user_id) {
        return res.status(403).json({ message: "User Does Not Exists" });
    }
    const user = yield db_1.User.findById(req.headers.user_id);
    if (!user) {
        return res.status(403).json({ message: "User Does Not Exists" });
    }
    const course = yield db_1.Course.findById(req.params.courseId);
    if (!course) {
        return res.json({ message: "Course Not Found " });
    }
    if (typeof course === "string") {
        return res.json({ message: "Course Not Found " });
    }
    user.purchasedCourses.push(course._id);
    yield user.save();
    res.json({ message: " Successfully bought the Course" });
}));
userRouter.get('/purchasedCourses', auth_1.AuthenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to view purchased courses
    if (!req.headers.user_id) {
        return res.status(403).json({ message: "User Does Not Exists" });
    }
    const user = yield db_1.User.findById(req.headers.user_id);
    if (!user) {
        return res.status(403).json({ message: "User Does Not Exists" });
    }
    res.json({ purchasedCourses: user.purchasedCourses || [] });
}));
exports.default = userRouter;

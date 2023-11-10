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
const adminRouter = express_1.default.Router();
// Admin routes
adminRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = req.body;
        const admin = yield db_1.Admin.findOne({ username: input.username }); //notes
        if (admin) {
            res.status(403).json({ message: "Admin with this username already exists" });
        }
        else {
            const token = (0, auth_1.createTokenAdmin)(input);
            const newAdmin = new db_1.Admin(input);
            yield newAdmin.save();
            res.status(200).json({ message: "Admin Created Successfully", token: token });
        }
    }
    catch (error) {
        res.sendStatus(403);
    }
}));
adminRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const admin = yield db_1.Admin.findOne({ username: input.username, password: input.password });
    // console.log(admin)
    if (admin) {
        const token = (0, auth_1.createTokenAdmin)(input);
        res.status(200).json({ message: "Logged in successfully", token: token });
    }
    else {
        res.status(403).json({ message: "Incorrect Id or Password" });
    }
}));
adminRouter.post('/courses', auth_1.AuthenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to create a course
    const course = req.body;
    const newCourse = new db_1.Course(course);
    yield newCourse.save();
    res.json({ message: " Course Created Successfully", courseId: newCourse.id });
}));
adminRouter.put('/course/:courseId', auth_1.AuthenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to edit a course
    const course = yield db_1.Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: " Course Updated Successfully" });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
adminRouter.get('/course/:courseId', auth_1.AuthenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to get a course details
    const courseId = req.params.courseId;
    try {
        const course = yield db_1.Course.findById(courseId);
        if (course) {
            res.status(200).json({ course: course });
        }
        else {
            res.status(404).json({ message: 'Course not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
adminRouter.get('/courses', auth_1.AuthenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to get all courses
    const courses = yield db_1.Course.find({}); //notes
    res.json({ courses });
}));
adminRouter.get('/me', auth_1.AuthenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.user_id) {
        res.status(403).json({ message: "Admin Does Not Exists" });
    }
    const admin = yield db_1.Admin.findById(req.headers.user_id);
    if (!admin) {
        return res.sendStatus(403);
    }
    res.json({
        username: admin.username
    });
}));
exports.default = adminRouter;

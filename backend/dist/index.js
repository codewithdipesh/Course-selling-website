"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use("/admin", admin_1.default);
app.use("/user", user_1.default);
app.get("/", (req, res) => {
    res.json({ message: "This is my Course selling Backend" });
});
//cONNECT TO MongoDB
//Dont misuse it
mongoose_1.default.connect('mongodb+srv://paldipakdipa2020:dipeshMongo@cluster0.wnwq78z.mongodb.net/', {});
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

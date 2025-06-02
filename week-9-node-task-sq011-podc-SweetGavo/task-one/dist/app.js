"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = require("./mongoose/database");
const dotenv_1 = __importDefault(require("dotenv"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const balances_route_1 = __importDefault(require("./routes/balances.route"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, database_1.connectDB)();
const app = (0, express_1.default)();
// CORS configuration
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
// Middlewares
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// Static files (if any)
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// API Routes - Add clear prefixes
app.use('/api/transactions', transaction_routes_1.default);
app.use('/api/users', users_route_1.default);
app.use('/api/balances', balances_route_1.default);
// Serve React static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../views/transfer-client/build')));
// React catch-all route (must come after API routes)
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../views/transfer-client/build', 'index.html'));
});
// Error handlers remain the same
// ...
// 404 handler (for unknown API routes)
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong',
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`*********************************************************************** \n SERVER IS RUNNING ON PORT :${PORT} \n***********************************************************************`);
});
module.exports = app;

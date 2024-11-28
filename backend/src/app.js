const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const config = require("./config/config");
const { errorHandler } = require("./middleware/errorHandler");
const logger = require("./utils/logger");

const app = express();

// Security middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(rateLimit(config.rateLimit));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/resources", require("./routes/resources.routes"));
app.use("/api/reports", require("./routes/reports.routes"));

// Error handling
app.use(errorHandler);

// Start server
const server = app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Promise Rejection:", err);
  server.close(() => process.exit(1));
});

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true, unique: true, trim: true },
    interval: { type: Number, required: true, min: 5, default: 10 },
    status: { type: String, enum: ["UP", "DOWN"], default: "DOWN" },
    lastPing: { type: Date },
    responseTime: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);

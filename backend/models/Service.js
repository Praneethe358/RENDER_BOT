const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    interval: { type: Number, required: true, min: 5, default: 10 },
    status: { type: String, enum: ["UP", "DOWN"], default: "DOWN" },
    lastPing: { type: Date },
    responseTime: { type: Number }
  },
  { timestamps: true }
);

serviceSchema.index({ url: 1 }, { unique: true });

module.exports = mongoose.model("Service", serviceSchema);

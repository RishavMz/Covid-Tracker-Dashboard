import mongoose from "mongoose";

const globalSchema = new mongoose.Schema({
  date: {
    type: String,
    default:
      String(new Date().toJSON().slice(8, 10)) +
      "-" +
      String(new Date().toJSON().slice(5, 7)) +
      "-" +
      String(new Date().toJSON().slice(0, 4)),
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

export const Global = mongoose.model("Global", globalSchema);

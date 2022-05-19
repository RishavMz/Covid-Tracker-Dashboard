import mongoose from "mongoose";

const dailySchema = new mongoose.Schema({
  date: {
    type: String,
    default:
      String(new Date().toJSON().slice(0, 4)) +
      "-" +
      String(new Date().toJSON().slice(5, 7)) +
      "-" +
      String(new Date().toJSON().slice(8, 10)),
    required: true,
  },
  countryName: {
    type: String,
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

const countrySchema = new mongoose.Schema({
    countryName: {
        type: String,
        required: true
    },
    newConfirmed: {
        type: Number,
        default: 0,
    },
    newDeaths: {
        type: Number,
        default: 0,
    },
    newRecovered: {
        type: Number,
        default: 0,
    },
    totalConfirmed: {
        type: Number,
        required: true
    },
    totalDeaths: {
        type: Number,
        required: true
    },
    totalRecovered: {
        type: Number,
        required: true
    },
    dailyData: {
        type: [dailySchema]
    }
});

export const Country = mongoose.model("Country", countrySchema);

export const Daily = mongoose.model("Daily", dailySchema);

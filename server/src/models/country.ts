import mongoose from "mongoose";

const dailySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    newConfirmed: {
        type: Number,
        default: 0,
        required: true
    },
    newDeaths: {
        type: Number,
        default: 0,
        required: true
    },
    newRecovered: {
        type: Number,
        default: 0,
        required: true
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
    }
})

const countrySchema = new mongoose.Schema({
    countryName: {
        type: String,
        required: true
    },
    dailyData: {
        type: [dailySchema]
    }
});

export const Country = mongoose.model("Country", countrySchema);
export const Daily   = mongoose.model("Daily", dailySchema);
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
exports.fetchData = void 0;
const axios_1 = __importDefault(require("axios"));
const global_1 = require("../models/global");
const country_1 = require("../models/country");
exports.fetchData = axios_1.default
    .get("https://api.covid19api.com/summary")
    .then((res) => __awaiter(void 0, void 0, void 0, function* () {
    const global = new global_1.Global({
        date: String(new Date().toJSON().slice(0, 4)) +
            "-" +
            String(new Date().toJSON().slice(5, 7)) +
            "-" +
            String(new Date().toJSON().slice(8, 10)),
        newconfirmed: res.data.Global.Newconfirmed,
        totalConfirmed: res.data.Global.TotalConfirmed,
        newDeaths: res.data.Global.NewDeaths,
        totalDeaths: res.data.Global.TotalDeaths,
        newRecovered: res.data.Global.NewRecovered,
        totalRecovered: res.data.Global.TotalRecovered,
    });
    yield global.save();
    res.data.Countries.forEach((country) => __awaiter(void 0, void 0, void 0, function* () {
        const dailyData = new country_1.Daily({
            date: String(new Date().toJSON().slice(0, 4)) +
                "-" +
                String(new Date().toJSON().slice(5, 7)) +
                "-" +
                String(new Date().toJSON().slice(8, 10)),
            countryName: country.Country,
            newConfirmed: country.NewConfirmed,
            newDeaths: country.NewDeaths,
            newRecovered: country.NewRecovered,
            totalConfirmed: country.TotalConfirmed,
            totalDeaths: country.TotalDeaths,
            totalRecovered: country.TotalRecovered,
        });
        yield dailyData.save();
    }));
}))
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=getData.js.map
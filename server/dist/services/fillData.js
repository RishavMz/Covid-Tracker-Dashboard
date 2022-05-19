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
exports.getCountries = void 0;
const axios_1 = __importDefault(require("axios"));
const country_1 = require("../models/country");
const countries = [{
        pretext: 0,
        Slug: "",
        Country: ""
    }];
exports.getCountries = axios_1.default
    .get(`https://api.covid19api.com/summary`)
    .then((res) => __awaiter(void 0, void 0, void 0, function* () {
    res.data.Countries.forEach((country) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const countryv = new country_1.Country({
                countryName: country.Country,
                newConfirmed: country.NewConfirmed || 0,
                newDeaths: country.NewDeaths || 0,
                newRecovered: country.NewRecovered || 0,
                totalConfirmed: country.TotalConfirmed,
                totalDeaths: country.TotalDeaths,
                totalRecovered: country.TotalRecovered
            });
            yield countryv.save();
        }
        catch (err) {
            console.log(err);
        }
        countries.push(country);
        console.log(country.Slug);
    }));
}));
//# sourceMappingURL=fillData.js.map
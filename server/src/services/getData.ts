import axios from "axios";
import { Global } from "../models/global";
import { Daily } from "../models/country";

export const fetchData = axios
  .get("https://api.covid19api.com/summary")
  .then(async (res) => {
    const global = new Global({
      date:
        String(new Date().toJSON().slice(0, 4)) +
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
    await global.save();

    res.data.Countries.forEach(async (country: any) => {
      const dailyData = new Daily({
        date:
          String(new Date().toJSON().slice(0, 4)) +
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
      await dailyData.save();
    });
  })
  .catch((err) => {
    console.log(err);
  });

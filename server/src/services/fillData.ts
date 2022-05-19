

import axios from "axios";
import { /*Daily,*/Country } from "../models/country";



const countries = [{
    pretext: 0,
    Slug: "",
    Country: ""
}] ;
//var index = 0;
export const getCountries = axios
  .get(`https://api.covid19api.com/summary`)
  .then(async (res: any) => {
    res.data.Countries.forEach(async (country: any) => {
        try {
            const countryv = new Country({ 
                countryName     :   country.Country,
                newConfirmed    :   country.NewConfirmed||0    ,
                newDeaths       :   country.NewDeaths ||0      ,
                newRecovered    :   country.NewRecovered ||0   ,
                totalConfirmed  :   country.TotalConfirmed    ,
                totalDeaths     :   country.TotalDeaths       ,
                totalRecovered  :   country.TotalRecovered
            })
            await countryv.save();
        } catch(err) {
            console.log(err);
        }
      countries.push(country);
      console.log(country.Slug)
    });
  });

/*export const fillData = setInterval(() => {
    console.log(countries.length, index);
    if(countries.length==1) {
        console.log("H1");
    }
    else if(index>0 && countries[index] &&  countries[index]) {
        axios
        .get(`https://api.covid19api.com/live/country/${countries[index].Slug}/status/confirmed/date/2022-03-21T13:13:30Z`)
        .then(async (res: any) => {
          for (var i = 0; i < 10; i++) {
            const countryValue = res.data[res.data.length - 1 - i];
            try {
              const dailyData = new Daily({
                date: String(countryValue.Date.slice(0, 10)),
                countryName: countryValue.Country,
                newConfirmed: countryValue.NewConfirmed || 0,
                newDeaths: countryValue.NewDeaths,
                newRecovered: countryValue.NewRecovered || 0,
                totalConfirmed: countryValue.Confirmed,
                totalDeaths: countryValue.Deaths,
                totalRecovered: countryValue.Recovered || 0,
              });
              await dailyData.save();
            } catch (err) {
              console.log(JSON.stringify(countryValue))
              console.log(err);
            }
          }
        }).catch((err) => {
            console.log(err);
        });
        index++;
    } else {
        console.log("H3");
        index++;
    }
}, 500);

*/


/*import { Daily } from "../models/country";
import { Global } from "../models/global";


export async function getGlobalData() {
    for(var i=0; i<10; i++) {
        var datev = new Date();
        datev.setDate(datev. getDate() - i);
        let date = String(datev.toJSON());
        date = String(date.slice(0, 4)) +
        "-" +
        String(date.slice(5, 7)) +
        "-" +
        String(date.slice(8, 10)),
        console. log(date);
        await Daily.aggregate([{ $match: {
            date: date
        } },
        { $group: {
             _id : null,
             totalConfirmed : { $sum: "$totalConfirmed" } ,
             totalDeaths : { $sum: "$totalDeaths" } ,
             totalRecovered : { $sum: "$totalRecovered" } 
            } 
        }]).then(async(args: any) => {
            console.log(JSON.stringify(args))
            try {
                const global = new Global({
                  date: args.date,
                  newConfirmed: args[0].newConfirmed,
                  totalConfirmed: args[0].totalConfirmed,
                  newDeaths: args[0].newDeaths,
                  totalDeaths: args[0].totalDeaths,
                  newRecovered: args[0].newRecovered,
                  totalRecovered: args[0].totalRecovered,
                });
                await global.save();
              } catch (err) {
                console.log(err);
              }
        });
    }
}
*/
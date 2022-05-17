/* Daily data
    Daily   =>  Push
    Country =>  Update
    Global  =>  Update

*/
import axios from "axios";
import { Global } from "../models/global";
import { Country, Daily } from "../models/country";

export const fetchData = axios.get('https://api.covid19api.com/summary')
    .then(async(res) => {
        const global = new Global({ 
            date            :   String(new Date().toJSON().slice(8,10)) +"-"+ String(new Date().toJSON().slice(5,7))+"-"+ String(new Date().toJSON().slice(0, 4))            ,  
            newconfirmed    :   res.data.Global.Newconfirmed    ,
            totalConfirmed  :   res.data.Global.TotalConfirmed ,
            newDeaths       :   res.data.Global.NewDeaths      ,
            totalDeaths     :   res.data.Global.TotalDeaths    ,
            newRecovered    :   res.data.Global.NewRecovered   ,
            totalRecovered  :   res.data.Global.TotalRecovered
        });
        await global.save();

        //console.log("Result : " + JSON.stringify(res.data.Global) )
        //console.log("date            :   "+String(new Date().toJSON().slice(8,10)) +"-"+ String(new Date().toJSON().slice(5,7))+"-"+ String(new Date().toJSON().slice(0, 4))              );
        //console.log("newConfirmed    :   "+res.data.Global.NewConfirmed  );  
        //console.log("totalConfirmed  :   "+res.data.Global.TotalConfirmed); 
        //console.log("newDeaths       :   "+res.data.Global.NewDeaths     ); 
        //console.log("totalDeaths     :   "+res.data.Global.TotalDeaths   ); 
        //console.log("newRecovered    :   "+res.data.Global.NewRecovered  ); 
        //console.log("totalRecovered  :   "+res.data.Global.TotalRecovered);
        //console.log("\n\n\n");

        res.data.Countries.forEach(async(country: any) => {
            const dailyData = new Daily({ 
                date            :   String(new Date().toJSON().slice(8,10)) +"-"+ String(new Date().toJSON().slice(5,7))+"-"+ String(new Date().toJSON().slice(0, 4))                 ,
                newConfirmed    :   country.NewConfirmed    ,
                newDeaths       :   country.NewDeaths       ,
                newRecovered    :   country.NewRecovered    ,
                totalConfirmed  :   country.TotalConfirmed    ,
                totalDeaths     :   country.TotalDeaths       ,
                totalRecovered  :   country.TotalRecovered    
            });
            await dailyData.save().then(async()=>{
                await Country.updateOne({countryName: country.countryName}, 
                {
                    $push: {  dailyData: dailyData  }
                });
            });

          //  console.log("date            :   " + String(new Date().toJSON().slice(8,10)) +"-"+ String(new Date().toJSON().slice(5,7))+"-"+ String(new Date().toJSON().slice(0, 4))   +
          //  "  |  newConfirmed    :   " + country.NewConfirmed      +
          //  "  |  newDeaths       :   " + country.NewDeaths         +
          //  "  |  newRecovered    :   " + country.NewRecovered      +
          //  "  |  totalConfirmed  :   " + country.TotalConfirmed    +
          //  "  |  totalDeaths     :   " + country.TotalDeaths       +
          //  "  |  totalRecovered  :   " + country.TotalRecovered    +          
          //  "\n");
        });
        

    })
    .catch((err) => {
        console.log(err);
    });


import * as React from 'react';
import "./globalData.css";

interface GloalDataProps {
    onDate: any
}
 
interface GloalDataState {
    date : any,
    totalConfirmed  : any,
    totalDeaths     : any,
    totalRecovered  : any,
    newConfirmed    : any,
    newDeaths       : any,
    newRecovered    : any,
    last10          : any
}
 
class GloalData extends React.Component<GloalDataProps, GloalDataState> {
    state = { 
        date : this.props.onDate,
        totalConfirmed  :   0,
        totalDeaths     :   0,
        totalRecovered  :   0,
        newConfirmed    :   0,
        newDeaths       :   0,
        newRecovered    :   0,
        last10          : []
    }
    render() { 
        return ( <div className='globalData'>
            <div className='globalStats'>
                <div className='globalLabel'>Total Confirmed</div>
                <div className='globalValue'>{this.state.totalConfirmed}</div>
                <div className='globalLabel'>Total Deaths</div>
                <div className='globalValue'>{this.state.totalDeaths}</div>
                <div className='globalLabel'>Total Recovered</div>
                <div className='globalValue'>{this.state.totalRecovered}</div>
            </div>
            <div className='globalTrends'>
            <div className='globalLabel'>Total Confirmed</div>
                <div className='globalValue'>{this.state.totalConfirmed}</div>
                <div className='globalLabel'>Total Deaths</div>
                <div className='globalValue'>{this.state.totalDeaths}</div>
                <div className='globalLabel'>Total Recovered</div>
                <div className='globalValue'>{this.state.totalRecovered}</div>
            </div>
        </div> );
    }
}
 
export default GloalData;
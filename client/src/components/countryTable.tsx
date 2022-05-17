import * as React from 'react';

interface CountryTableProps {
    
}
 
interface CountryTableState {
    
}
 
class CountryTable extends React.Component<CountryTableProps, CountryTableState> {
    state = { counries : []  }
    render() { 
        return ( <div className='countryTable'>Country Table</div> );
    }
}
 
export default CountryTable;
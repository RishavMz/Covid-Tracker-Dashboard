import * as React from 'react';

interface NavbarProps {
    
}
 
interface NavbarState {
    
}
 
class Navbar extends React.Component<NavbarProps, NavbarState> {
    state = { selected : null }
    render() { 
        return ( <div className='navbar'> This is a navbar </div> );
    }
}
 
export default Navbar;
import React from 'react';
import { DFPSlotsProvider, AdSlot } from 'react-dfp';
export default class Ad extends React.Component {
 

render () {
  
    return (
      // <!-- /21799560237/Home/Home_Left -->

       <DFPSlotsProvider dfpNetworkId={'21799560237'} adUnit={"Home/Home_Left"}  >
       
       <AdSlot adUnit={"Home/Home_Left"} sizes={[ [600, 160]]} />
     </DFPSlotsProvider>
    );
  }
}

import React from 'react';

export default class Ad extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
       <ins
        className="adsbygoogle"
        data-ad-client="ca-pub-4591861188995436"
        data-ad-format="auto"
        data-adtest="on"
        data-ad-slot="4640466102"
        style={{ display: "block" }}
      />
      
    );
  }
}

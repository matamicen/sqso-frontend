import React from "react";
import "../../styles/style.css";
import QRA from "./QRA";


export default class QRAs extends React.Component {
  render() {
    return (
      <div className="feed-item-qras">
        {this.props.qras.map((qra, i) => (
          
            <QRA key={i} avatarpic={qra.avatarpic} qra={qra.qra} />
          
        ))}
      </div>
    );
  }
}

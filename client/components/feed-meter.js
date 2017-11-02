import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';


export default class FeedMeter extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Feed Meter',
          backgroundColor: '#ffe082',
          borderColor: '#ffab00',
          borderWidth: 1,
          hoverBackgroundColor: '#ffa726',
          hoverBorderColor: '#ff9100',
          data: [this.props.points]
        }
      ]
    };
  }

  render() {
    return (
      <div className="valign-wrapper">
        <div className="col s11 m11 l11">
          <HorizontalBar
            data={this.data}
            height={8}
            width={100}
            options={{
              maintainAspectRatio: true,
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  ticks: {
                    display: false,
                    max: 30,
                    min: 0,
                    stepSize: 1
                  },
                  gridLines: {
                    display: false
                  }
                }],
                yAxes: [{
                  gridLines: {
                    display: false
                  }
                }]
              }
            }}/>
        </div>
        <div className="col s1 m1 l1">
          <i className="feed-meter-icon material-icons large">mood</i>
        </div>
      </div>
    );
  }

}

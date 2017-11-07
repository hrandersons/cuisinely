import React from 'react';

import {Bar} from 'react-chartjs-2';


export default class UserStat extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Recipes Completed',
          backgroundColor: '#ef9a9a',
          borderColor: '#ef9a9a',
          borderWidth: 1,
          hoverBackgroundColor: '#e57373',
          hoverBorderColor: '#e57373',
          data: this.props.data
        }
      ]
    };
    this.chartOptions = {
    showScale: true,
    pointDot: true,
    showLines: false,

    title: {
        display: true,
        text: 'Chart.js Bar Chart'
    },

    legend: {
        display: true,
        labels: {
            boxWidth: 50,
            fontSize: 10,
            fontColor: '#bbb',
            padding: 5,
        }
    },

    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true,
              min: 50,
              max: 100    
          }
        }]
     }
    }
  }


  componentDidMount() {


  }

  render() {
    return (
      <div className="card white">
        <div className="card-content black-text">
          <span className="card-title">Recipes Completed This Week</span>
          <Bar
            data={ this.data}
            options={{
              legend: {
                display: false
              },
              scales: {
                yAxes: [{
                  ticks: {
                    max: 10,
                    min: 0,
                    stepSize: 1
                  },
                  gridLines: {
                    display: false
                  }
                }],
                xAxes: [{
                  gridLines: {
                    display: false
                  }
                }]
              }
            }}/>
        </div>
      </div>

    );
  }

}

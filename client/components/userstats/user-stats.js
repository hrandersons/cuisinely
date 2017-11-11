import React from 'react';
import { Line } from 'react-chartjs-2';

export default class UserStats extends React.Component {
  constructor(props) {
    super(props);

    this.data = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Weekly Points',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.props.data
      }]
    };
    this.chartOptions = {
      showScale: true,
      pointDot: true,
      showLines: true,
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
            beginAtZero: true,
            min: 0,
            max: 70
          }
        }]
      }
    };
  }

  render() {
    return (
      <div className="col s10 m5 l6">
        <div align='center'>
          <h4>Weekly Points</h4>
        </div>
        <Line data={this.data} options={this.chartOptions}/>
      </div>
    );
  }
}

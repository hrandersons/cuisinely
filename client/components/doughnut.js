import React from 'react';
import { Doughnut } from 'react-chartjs-2';

class DoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
  labels: [
    'Week 1',
    'Week 2',
    'Week 3',
    'Week 4'
  ],
  datasets: [{
    data: ['300', '50', '100', '150'],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#7fffd4'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#7fffd4'
    ]
    }]
  }
}

  render() {
    return (
      <div>
        <div className="col s10 m12 l6">
      <div align='center'>
        <h3>Money Spent</h3>
      </div>
          <Doughnut data={this.data} />
        </div>
      </div>
    )
  }

}

export default DoughnutChart
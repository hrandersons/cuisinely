import React from 'react';

import {Bar} from 'react-chartjs-2';

const data = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Recipes Completed',
      backgroundColor: '#ef9a9a',
      borderColor: '#ef9a9a',
      borderWidth: 1,
      hoverBackgroundColor: '#e57373',
      hoverBorderColor: '#e57373',
      data: [2, 1, 4, 3]
    }
  ]
};

export default class UserStat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card white">
        <div className="card-content black-text">
          <span className="card-title">Recipes Completed This Month</span>
          <Bar
            data={data}
            options={{
              legend: {
                display: false
              },
              scales: {
                yAxes: [{
                  ticks: {
                    max: 5,
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

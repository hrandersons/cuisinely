import React from 'react';

import {Bar} from 'react-chartjs-2';

// const data = {
//   labels: ['Mon', 'Tue','Wed','Thu','Fri','Sat', 'Sun'],
//   datasets: [
//     {
//       label: 'Recipes Completed',
//       backgroundColor: '#ef9a9a',
//       borderColor: '#ef9a9a',
//       borderWidth: 1,
//       hoverBackgroundColor: '#e57373',
//       hoverBorderColor: '#e57373',
//       data: [2, 1, 4, 3]
//     }
//   ]
// };

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
  }


  componentDidMount() {


  }

  render() {
    return (
      <div className="card white">
        <div className="card-content black-text">
          <span className="card-title">Recipes Completed This Month</span>
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

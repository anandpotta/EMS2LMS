import React from 'react';
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import classNames from 'classnames';
import "./graph.css";


class LineChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, title, type } = this.props;
    
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "Leaves",
        backgroundColor: "rgba(33,150,243,0.2)",
        borderColor: 'rgba(33,150,243,0.2)',
        data: [0, 10, 5, 2, 20, 30, 45],
        borderWidth: 1
      }]
    }
    const option = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };


    return (
      <div className="graph-container">
        <Line data={data} option={option} />
      </div>
    );
  }
};

LineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  chartId: PropTypes.string
}

export default LineChart;

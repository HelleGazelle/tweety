import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';


class Chart extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            chartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            }
        }
    }

    readonly data = {
        labels: ['Word1', 'Word2', 'Word3', 'Word4', 'Word5'],
        datasets: [
          {
            label: '# in text',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [257, 199, 94, 52, 52]
          }
        ]
      };

    render() {
        return (
            <div className="chart">
                <h2>Bar Chart</h2>
                <Bar
                    data={this.data}
                    width={100}
                    height={50}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}

export default Chart;
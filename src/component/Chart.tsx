import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import data from './Data';

interface ChartProps {
    ranking: (number | null)[][];
}

interface ChartState {

}


class Chart extends Component<ChartProps, ChartState> {
    constructor(props: ChartProps) {
        super(props);
        this.state = {

        }
    }


    render() {



        const data = {
            labels: ['Word1', 'Word2', 'Word3', 'Word4', 'Word5', 'Word6', 'Word7', 'Word8', 'Word9', 'Word10'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [this.props.ranking[0][1], this.props.ranking[0][1], this.props.ranking[0][1], this.props.ranking[0][1], this.props.ranking[0][1], this.props.ranking[0][1], this.props.ranking[0][1], this.props.ranking[0][1], this.props.ranking[0][1], this.props.ranking[0][1]]
                }
            ]
        };


        for (let i = 0; i < this.props.ranking.length; i++) {
            data.datasets[0].data[i] = this.props.ranking[i][1];
            //  if (this.props.ranking[i][0] != null) {
            //     data.labels[i] = this.props.ranking[i][0].toString();
            //  }
        }



        return (
            <div className="chart">
                <h2>Bar Chart</h2>
                <Bar
                    data={data}
                    width={100}
                    height={50}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;
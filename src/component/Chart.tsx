import React, { Component } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

interface ChartProps {
    ranking: (number | null)[][];
    previewTweets: any;
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
            if (this.props.ranking[i][0] != null) {
                data.labels[i] = this.props.ranking[i][0]!.toString();
            }
        }

        // function compare(a: any, b: any) {
        //     if (a[0] < b[0]) {
        //       return -1;
        //     }
        //     if (a[0] > b[0]) {
        //       return 1;
        //     }
        //     // a muss gleich b sein
        //     return 0;
        //   }



        // let favorite: any = [];
        // for (let i = 0; i < this.props.previewTweets.length; i++) {
        //     console.log("reply: ", this.props.previewTweets[i].in_reply_to_screen_name);
        //     favorite.push([this.props.previewTweets[i].retweet_count, this.props.previewTweets[i].text]);
        // }
        // favorite.sort(compare);
        // console.log("retweets: ", favorite);


        let replies: any = [];
        for (let i = 0; i < this.props.previewTweets.length; i++) {
            replies.push(this.props.previewTweets[i].in_reply_to_screen_name);
        }

        let countedNames = replies.reduce(function (allNames: any, name: any) {
            if (name in allNames) {
                allNames[name]++;
            }
            else {
                allNames[name] = 1;
            }
            return allNames;
        }, {});

        console.log("replies: ", countedNames);



        return (
            <div className="chart">
                <h2>Bar Chart</h2>
                <Bar
                    data={data}
                    width={25}
                    height={10}
                    options={{
                        maintainAspectRatio: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />

                {/* <h2>Donut Chart</h2>
                <Doughnut
                    data={data}
                    width={25}
                    height={10}
                    options={{
                        maintainAspectRatio: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                /> */}
            </div>




        )
    }
}

export default Chart;
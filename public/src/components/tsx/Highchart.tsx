import * as React from 'react';
import ReactHighcharts from 'react-highcharts';

export interface Props {
    xtitle:string,
    ytitle:string,
    series: Array<number>,
    categories: Array<string>
}

export class Highchart extends React.Component<Props, undefined>{

    render() {

       let config = this.getConfig(this.props);
       
       return <ReactHighcharts config = {config}></ReactHighcharts>;
    }

    getConfig = ({xtitle, ytitle, series, categories}:{xtitle:string, ytitle:string, series: Array<number>, categories: Array<string>}) => {

        return {
            title: {
                text: xtitle,
                x: -20
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                title: {
                    text: ytitle
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series:  series
        };
    }
}
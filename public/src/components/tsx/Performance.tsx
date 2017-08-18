import React from 'react';
import ReactHighcharts from 'react-highcharts';
import Highchart from './Highchart';

export interface Props {};

export interface Stats {
    connectTimes: Array<number>,
    pageLoadTimes: Array<number>,
    renderTimes: Array<number>,
    times: Array<string>
};

export class Performance extends React.Component<Props, Stats>{

    constructor(){

        //调方法
    }

    render() {
        <div class="flex">
            <Highchart xtitle="" ytitle="" series=[] categories=[] />
            <Highchart xtitle="" ytitle="" series=[] categories=[] />
            <Highchart xtitle="" ytitle="" series=[] categories=[] />
        </div>, 
         document.getElementById('app');
    }

    
}
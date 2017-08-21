import * as React from 'react';
import { Highchart } from './Highchart';
import { getPersistenceTimingInfo } from '../../apis/index';

export interface Props {};
export interface States {
    connectTimes: number[],
    pageLoadTimes: number[],
    renderTimes: number[],
    times: string[]
};

export class Performance extends React.Component<Props, States>{

    componentDidMount(){
        var self = this;
        //调方法
        getPersistenceTimingInfo().then(function({connectTimes, pageLoadTimes, renderTimes, times}){
            self.setState({
                connectTimes,
                pageLoadTimes,
                renderTimes,
                times
            })
        });
    }

    render() {
        return  (
            <div className="flex">
                <Highchart xtitle="pageLoadTimes" ytitle="pageLoadTimes" series={this.state.pageLoadTimes} categories={this.state.times} />
                <Highchart xtitle="renderTimes" ytitle="renderTimes" series={this.state.renderTimes} categories={this.state.times} />
                <Highchart xtitle="connectTimes" ytitle="connectTimes" series={this.state.connectTimes} categories={this.state.times} />
            </div>
        );
           
    }

    
}
import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import axios from '../axios';

let CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dps = [{x: 0, y: 0}];   //dataPoints.
let xVal = dps.length + 1;
let yVal = 0;
let newX;
let updateInterval =1000;


class Graphic extends Component {

    constructor() {
        super();
        this.updateChart = this.updateChart.bind(this);
    }

    componentDidMount() {
        setInterval(this.updateChart, updateInterval);
        this.retrieveData();
    }

     retrieveData(){
        const id = this.props.match.params.id;
         axios.get(`http://localhost:1000/status/${id}`)
            .then((result) => {
               /* console.log(result.data);*/
                yVal = result.data
            });

         axios.get(`http://localhost:1000/getPeriod/${id}`)
             .then((result) => {
                 console.log(result.data);
                 newX = result.data;

                 /**set x's intervals*/
                 updateInterval = newX * 1000;
                 setInterval(this.updateChart, updateInterval);
                /***/

             });
    }

    componentDidUpdate(){
       this.retrieveData();

    }

    updateChart() {

        dps.push({x: xVal,y: yVal});
        xVal = xVal + newX;

        if (dps.length >  10 ) {
            dps.shift();
        }
        this.chart.render();
    }

    render() {
        const options = {
            data: [{
                type: "line",
                dataPoints : dps
            }]
        }

        return (
            <div className ="col-sm-6" >
                <h4>Grafik: Sistem Durumu</h4>

                <CanvasJSChart options = {options}
                               onRef={ref => this.chart = ref}
                />

            </div>
        );
    }
}

export default Graphic;
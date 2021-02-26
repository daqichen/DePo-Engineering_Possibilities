import React from "react";
import {XYPlot, LineSeries, VerticalBarSeries} from 'react-vis';

const data = [
  {x: 0, y: 8},
  {x: 1, y: 5},
  {x: 2, y: 4},
  {x: 3, y: 9},
  {x: 4, y: 1},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 3},
  {x: 8, y: 2},
  {x: 9, y: 0}
];

const ForecasterHome = () => {
  return (
    <>
       <div>
            <h3>Investment Forecaster</h3>
            <p>This page allows you to customize your investments and view the potential growth of <b>$10,000</b> over a period of <b>10 years</b>.</p>
        </div>
        <div className="App">
        <XYPlot height={300} width={300}>
          <VerticalBarSeries data={data} />
        </XYPlot>
      </div>
    </>
  );
};

export default ForecasterHome;

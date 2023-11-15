import React from 'react';
import { Rings } from 'react-loader-spinner'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Barchart = props => {

  const { loader, barData, month, PassedFunction } = props

  const UpdateState = (e) => {
    PassedFunction(e.target.value)
  }


  const DataFormatter = (number) => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`;
    }
    return number.toString();
  };

  const chartData = Object.keys(barData).map((range) => ({
    range,
    count: barData[range],
  }));

  return (
    <div className="stat-cont">
      <div className="stat-top-cont">
        <h3>Bar Chart</h3>
        <select className='drop-down2' onChange={UpdateState} value={month}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      {
        loader ? (
          <div className='loader-cont'>
            <Rings
              height="80"
              width="80"
              color="pink"
              radius="6"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="rings-loading"

            />
          </div>
        ) : (
          <ResponsiveContainer height={220}>
            <BarChart
              data={chartData}
              margin={{
                top: 5,
              }}
            >
              <XAxis
                dataKey="range"
                tick={{
                  stroke: 'gray',
                  strokeWidth: 1,
                }}
              />
              <YAxis
                tickFormatter={DataFormatter}
                tick={{
                  stroke: 'gray',
                  strokeWidth: 0,
                }}
              />
              <Legend
                wrapperStyle={{
                  padding: 30,
                }}
              />
              <Bar dataKey="count" fill="#1f77b4" barSize="20%" />
            </BarChart>
          </ResponsiveContainer>
        )
      }

    </div>
  );
};

export default Barchart;


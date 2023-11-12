import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';

const PieCharts = props => {
  const { piedata, month, PassedFunction } = props

  const UpdateState = (e) => {
    PassedFunction(e.target.value)
  }

  const data = Object.entries(piedata).map(([name, count]) => ({
    name,
    count
  }));

  return (
    <div className="stat-cont">
      <div className='stat-top-cont'>
        <h3>Piechart</h3>
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
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            startAngle={0}
            endAngle={360}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="electronics" fill="#fecba6" />
            <Cell name="jewelery" fill="#b3d23f" />
            <Cell name="men's clothing" fill="#a44c9e" />
            <Cell name="women's clothing" fill="#8884d8" />
          </Pie>
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieCharts;






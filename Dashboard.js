import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import transactions from './Enriched_transactions_API_response.json';
import MenuBar from './MenuBar';
import Profile from './Profile';
import './Dashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const months = [
  { name: 'January', value: 0 },
  { name: 'February', value: 1 },
  { name: 'March', value: 2 },
  { name: 'April', value: 3 },
  { name: 'May', value: 4 },
  { name: 'June', value: 5 },
  { name: 'July', value: 6 },
  { name: 'August', value: 7 },
  { name: 'September', value: 8 },
  { name: 'October', value: 9 },
  { name: 'November', value: 10 },
  { name: 'December', value: 11 }
];

function Dashboard() {
  const [data, setData] = useState([]);
  const [savings, setSavings] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const categories = { 'Clothing': 0, 'Travel': 0, 'Gas & Electricity': 0 };
    transactions.data.forEach(transaction => {
      const date = new Date(transaction.transactionBookedTimestamp);
      if (date.getMonth() === selectedMonth) {
        const category2 = transaction.category.merchantCategory2Name;
        const category3 = transaction.category.merchantCategory3Name;
        const amount = Math.abs(transaction.amount);
        
        if (category2 === 'Clothing') categories['Clothing'] += amount;
        if (category2 === 'Travel' || category3 === 'Travel') categories['Travel'] += amount;
        if (category3 === 'Gas & Electricity') categories['Gas & Electricity'] += amount;
      }
    });
    
    setData([
      { name: 'Clothing', value: categories['Clothing'] },
      { name: 'Travel', value: categories['Travel'] },
      { name: 'Gas & Electricity', value: categories['Gas & Electricity'] }
    ]);

    setSavings([
      { category: 'Clothing', amount: categories['Clothing'], savings: categories['Clothing'] * 0.05 },
      { category: 'Travel', amount: categories['Travel'], savings: categories['Travel'] * 0.04 },
      { category: 'Gas & Electricity', amount: categories['Gas & Electricity'], savings: categories['Gas & Electricity'] * 0.03 }
    ]);
  }, [selectedMonth]);

  return (
    <div className="dashboard">
      <MenuBar />
      <div className="content">
        <div className="left">
          <Profile />
          <div className="gifs">
          <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTF0aGl1cmpkbHltMXpnbGFldTBxa3hjbzhwamt2bDB2ZDdzeWd2MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vYUWWJty4qIdW/giphy.webp" alt="cashback gif1" />
          </div>
        </div>
        <div className="middle">
          <h2>Expenditure for year 2024</h2>
          <div>
            <label htmlFor="month-select">Select Month: </label>
            <select id="month-select" value={selectedMonth} onChange={e => setSelectedMonth(parseInt(e.target.value))}>
              {months.map((month, index) => (
                <option key={index} value={month.value}>{month.name}</option>
              ))}
            </select>
          </div>
          <PieChart width={400} height={400}>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={150}>
              {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="right">
          <h3>Potential Savings from Natwest Green Account</h3>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount Spent</th>
                <th>Potential Savings</th>
              </tr>
            </thead>
            <tbody>
              {savings.map((item, index) => (
                <tr key={index}>
                  <td>{item.category}</td>
                  <td>{item.amount.toFixed(2)}</td>
                  <td>{item.savings.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getTransactions, getUserDetail } from '../../Services/services';
import { format, subMonths } from 'date-fns';

export default function Analytics() {
  const [data, setData] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTransactions();
      const sortedData = response.data.slice().sort((a, b) => a.date - b.date);
      setData(sortedData);
    };
    fetchData();

    const fetchUserDetail = async () => {
      const userDetail = await getUserDetail(); // Fetch budgetLimit from user details
      setBudgetLimit(userDetail.budgetLimit);
    };
    fetchUserDetail();
  }, []);

  const getLastNMonthsData = n => {
    const currentDate = new Date();
    const filteredData = data.filter(
      item => subMonths(currentDate, n) <= new Date(item.date)
    );
    return filteredData;
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const timeRanges = [
    { label: 'Last Month', months: 1, xAxisTicks: 'auto' },
    { label: 'Last 6 Months', months: 6, xAxisTicks: 6 },
    { label: 'Last 12 Months', months: 12, xAxisTicks: 12 } // Set desired number of ticks
  ];

  const renderChart = () => {
    const chartData = getLastNMonthsData(timeRanges[selectedTab].months);

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '5%'
        }}
      >
        <LineChart width={800} height={400} data={chartData}>
          <XAxis
            dataKey="date"
            tickFormatter={date => format(new Date(date), 'MMM dd, yyyy')}
            ticks={chartData
              .map(item => item.date)
              .slice(0, timeRanges[selectedTab].xAxisTicks)}
          />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cost" stroke="#8884d8" />
          <ReferenceLine y={budgetLimit} stroke="red" label="Budget Limit" />
        </LineChart>
      </Box>
    );
  };

  return (
    <Paper
      sx={{
        width: '80%',
        margin: 'auto',
        marginTop: '2%',
        marginBottom: '5%',
        padding: '20px',
        borderRadius: '10px'
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        {timeRanges.map((range, index) => (
          <Tab label={range.label} key={index} />
        ))}
      </Tabs>
      {renderChart()}
    </Paper>
  );
}

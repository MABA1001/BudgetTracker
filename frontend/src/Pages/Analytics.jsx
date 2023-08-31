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
import { getTransactions } from '../Services/user';
import { format, subMonths } from 'date-fns';
import { useUserDetail } from './../Context/userDetailContext';

export default function Analytics() {
  const [data, setData] = useState([]);
  const { userDetail } = useUserDetail();
  const [budgetLimit] = useState(userDetail.budgetLimit);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTransactions();
      const sortedData = response.data.slice().sort((a, b) => a.date - b.date);
      setData(sortedData);
    };
    fetchData();
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
    { label: 'Last 12 Months', months: 12, xAxisTicks: 12 }
  ];

  const chartData = getLastNMonthsData(timeRanges[selectedTab].months);
  const xAxisTicks = chartData
    .map(item => item.date)
    .slice(0, timeRanges[selectedTab].xAxisTicks);

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
            ticks={xAxisTicks}
          />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cost" stroke="#8884d8" />
          <ReferenceLine y={budgetLimit} stroke="red" label="Budget Limit" />
        </LineChart>
      </Box>
    </Paper>
  );
}

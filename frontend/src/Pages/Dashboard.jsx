import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { toast } from 'react-toastify';
import { getTransactions } from '../Services/user';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import BudgetModal from '../Components/BudgetModal';
import ActionMenu from '../Components/ActionMenu';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useUserDetail } from './../Context/userDetailContext';

export default function Dashboard() {
  const [transactionData, SetTransactionData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dateFilter, setDateFilter] = React.useState(dayjs(new Date()));
  const { userDetail } = useUserDetail();

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'cost', label: 'Price' },
    { id: 'date', label: 'Date' },
    { id: 'actions', label: 'Actions' }
  ];
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTransactions();
        SetTransactionData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddBudgetClick = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdatedData = row => {
    SetTransactionData(prevTrans => [...prevTrans, row]);
    checkLimit();
  };

  const handleDeleteRecord = id => {
    SetTransactionData(prevTrasactions =>
      prevTrasactions.filter(trans => trans._id !== id)
    );
  };

  const hanldeEditRecord = async () => {
    try {
      const response = await getTransactions();
      SetTransactionData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      checkLimit();
    }
  };

  const checkLimit = () => {
    const sum = transactionData.reduce((total, currentObject) => {
      return total + currentObject.cost;
    }, 0);
    if (userDetail.budgetLimit < sum) {
      toast.warning(
        `${userDetail.firstName} Budget Limit Exceeded from ${userDetail.budgetLimit} `,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
    }
  };

  return (
    <Paper
      sx={{
        width: '80%',
        margin: 'auto',
        mt: '5%',
        mb: '5%',
        padding: '20px',
        borderRadius: '10px'
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Filter by date"
                value={dateFilter}
                onChange={newValue => setDateFilter(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddBudgetClick}
          sx={{ bgcolor: 'black', height: '60px' }}
        >
          Add Budget
        </Button>
      </Box>

      <TableContainer
        sx={{
          maxHeight: '440px',
          border: '1px solid #c8c4c4',
          borderRadius: '5px'
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionData
              .filter(transaction => {
                const transactionDate = dayjs(transaction.date.split('T')[0]);
                return transactionDate.isSame(dateFilter, 'day');
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.id === 'actions' ? (
                            <ActionMenu
                              transactionId={row._id}
                              transaction={row}
                              updateRecordOnEdit={hanldeEditRecord}
                              updateRecordOnDelete={handleDeleteRecord}
                            />
                          ) : column.id === 'date' ? (
                            value.split('T')[0]
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={transactionData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <BudgetModal
        open={modalOpen}
        onClose={handleCloseModal}
        updateTransactionRecord={handleUpdatedData}
      />
    </Paper>
  );
}

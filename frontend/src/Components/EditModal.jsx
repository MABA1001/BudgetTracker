import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateTransaction } from '../Services/services';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  cost: Yup.number().required('Price is required')
});

const EditModal = ({ open, onClose, data, updateTransactionRecord }) => {
  const initialValues = {
    name: data.name,
    cost: data.cost,
    date: data.date.split('T')[0]
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateTransaction(data._id, values);
      formik.resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      setSubmitting(false);
      updateTransactionRecord();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" component="div" gutterBottom>
          Update Budget
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="cost"
            name="cost"
            label="Price"
            type="number"
            value={formik.values.cost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cost && Boolean(formik.errors.cost)}
            helperText={formik.touched.cost && formik.errors.cost}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="date"
            name="date"
            label="Date"
            disabled
            value={formik.values.date}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditModal;

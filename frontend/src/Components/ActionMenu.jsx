import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteTransaction } from '../Services/services';
import Box from '@mui/material/Box';
import EditModal from './EditModal';
import { useState } from 'react';

export default function ActionMenu({
  transactionId,
  updateRecordOnDelete,
  transaction,
  updateRecordOnEdit
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEditClick = () => {
    setModalOpen(true);
    handleClose();
  };

  const onDeleteClick = async () => {
    try {
      await deleteTransaction(transactionId);
      updateRecordOnDelete(transactionId);
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      handleClose();
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <Box>
      <IconButton
        aria-label="more"
        aria-controls={open ? 'action-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={onEditClick}>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={onDeleteClick}>
          <DeleteIcon />
          Delete
        </MenuItem>
      </Menu>
      <EditModal
        open={modalOpen}
        onClose={handleCloseModal}
        data={transaction}
        updateTransactionRecord={updateRecordOnEdit}
      />
    </Box>
  );
}

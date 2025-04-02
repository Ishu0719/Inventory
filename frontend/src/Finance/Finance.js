import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Select, MenuItem, FormControl, InputLabel, Modal, Box, Typography, Grid, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
  { id: 'SI_no', label: 'SI NO.', flex: 1, minWidth: 50 },
  { id: 'Name', label: 'Name', flex: 1,  minWidth: 100 },
  { id: 'Amount', label: 'Amount', flex: 1, minWidth: 150 },
  { id: 'Transaction', label: 'Transaction', flex: 1,  minWidth: 180 },
  { id: 'Category', label: 'Category', flex: 1,  minWidth: 180 },
  { id: 'Payment_Mode', label: 'Payment Mode', flex: 1 },
  { id: 'Status', label: ' Status', flex: 1 },
  { id: 'action', label: 'Action', flex: 1,  },
];

function createData(SI_no, Name, Amount, Transaction, Category,  payment_Mode, Status) {
  return { SI_no, Name, Amount, Transaction, Category,  payment_Mode, Status};
}

const rows = [
  createData('1', 'Ayushi', 5000, 'expense', 'rent',  'upi', 'cancel'),
  createData('2', 'John',15000,  'income','salary','credit card','completed'),
  createData('3', 'Peter', 2200,'expense','utilities','bank transfer','pending'),
  createData('4', 'Jane', 18000, 'income','payment','debit card','completed'),
  createData('5', 'David', 9000, 'expense','salary','credit card','pending'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState(rows);
const [selectedFinance,setSelectedFinance] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({});
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    maxHeight: '90vh',
    overflow: 'auto'
  };

  const deleteModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    textAlign: 'center'
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (finance) => {
    console.log("ifgjbfdngb");
    
    setSelectedFinance(finance);
    setViewModalOpen(true);
  };

  const handleEdit = (finance) => {
    setSelectedFinance(finance);
    setEditFormData(finance);
    setEditModalOpen(true);
  };

  const handleDelete = (finance) => {
    setSelectedFinance(finance);
    setDeleteModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedFinance(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedFinance(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedFinance(null);
  };

  const handleEditInputChange = (status) => (event) => {
    setEditFormData({
      ...editFormData,
      [status]: event.target.value
    });
  };

  const handleUpdate = () => {
    console.log('Updating Finance:', editFormData);
    // Here you would typically make an API call to update the Finance
    handleCloseEditModal();
  };

 const handleConfirmDelete = () => {
    console.log('Deleting Finance:', selectedFinance);
    // Here you would typically make an API call to delete the Finance
    handleCloseDeleteModal();
  };

  const handleDropdownChange = (columnId, value, SI_no) => {
    const updatedRows = data.map((row) =>
      row.SI_no === SI_no ? { ...row, [columnId]: value } : row
    );
    setData(updatedRows);
  };

  const renderViewModal = () => (
    <Modal
      open={viewModalOpen}
      onClose={handleCloseViewModal}
      aria-labelledby="view-modal-title"
      aria-describedby="view-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography id="view-modal-title" variant="h6" component="h2">
            Finance Details
          </Typography>
          <IconButton onClick={handleCloseViewModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        {selectedFinance && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Name:</strong> {selectedFinance.Name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Amount:</strong> ₹{selectedFinance.Amount}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><strong>Transaction:</strong> {selectedFinance.Transaction}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Category:</strong> {selectedFinance.Category}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Payment Mode:</strong>{selectedFinance.payment_Mode}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Status:</strong> {selectedFinance.Status}</Typography>
            </Grid>
          </Grid>
        )}
              
      </Box>
    </Modal>
  );

  const renderEditModal = () => (
    <Modal
    open={editModalOpen}
    onClose={handleCloseEditModal}
    aria-labelledby="edit-modal-title"
    aria-describedby="edit-modal-description"
  >
    <Box sx={modalStyle}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography id="edit-modal-title" variant="h6" component="h2">
          Edit Finance
        </Typography>
        <IconButton onClick={handleCloseEditModal} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            value={editFormData.Name || ''}
            onChange={handleEditInputChange('Name')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Amount"
            value={editFormData.Amount || ''}
            onChange={handleEditInputChange('Amount')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
                                     variant="outlined"
                                     sx={{ minWidth: 394 }}
                                   >
                                     <InputLabel> Transaction</InputLabel>
                                     <Select
                                       value={editFormData.Transaction || ''}
                                       onChange={(e) =>
                                         handleDropdownChange(
                                           "Transaction",
                                           e.target.value
                                           
                                         )
                                       }
                                       label=" Transaction"
                                     >
                                       <MenuItem value="income">Income</MenuItem>
                                       <MenuItem value="expense">Expense</MenuItem>
                                      
                                     </Select>
                                   </FormControl>
          
        </Grid>
        <Grid item xs={12} sm={6}>
           <FormControl
                                     variant="outlined"
                                     sx={{ minWidth: 394 }}
                                   >
                                     <InputLabel> Category</InputLabel>
                                     <Select
                                       value={editFormData.Category || ''}
                                       onChange={(e) =>
                                         handleDropdownChange(
                                           "Category",
                                           e.target.value
                                           
                                         )
                                       }
                                       label="Category"
                                     >
                                       <MenuItem value="salary">Salary</MenuItem>
                              <MenuItem value="payment">Payment</MenuItem>
                              <MenuItem value="rent">Rent</MenuItem>
                              <MenuItem value="utilities">Utilities</MenuItem>
                              
                                      
                                     </Select>
                                     </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>Payment Mode </InputLabel>
                            <Select
                              value={editFormData.payment_Mode || ''}
                              onChange={(e) => handleDropdownChange('payment_Mode', e.target.value)}
                              label="Payment Mode"
                            >
                              <MenuItem value="cash">Cash</MenuItem>
                              <MenuItem value="bank transfer">Bank Transfer</MenuItem>
                              <MenuItem value="upi">UPI</MenuItem>
                              <MenuItem value="credit card">Credit Card</MenuItem>
                              <MenuItem value="debit card">Debit Card</MenuItem>
                            </Select>
                          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel> Status</InputLabel>
                            <Select
                              value={editFormData.Status||''}
                              onChange={(e) => handleDropdownChange('Status', e.target.value)}
                              label="Status"
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="cancel">Cancel</MenuItem>
                            </Select>
                          </FormControl>
        </Grid>
      
          </Grid>
  
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button variant="outlined" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    );

    const renderDeleteModal = () => (
      <Modal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box sx={deleteModalStyle}>
          <Typography id="delete-modal-title" variant="h6" component="h2" gutterBottom>
            Confirm Delete
          </Typography>
          <Typography id="delete-modal-description" sx={{ mb: 3 }}>
            Are you sure you want to delete this Finance?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>
              No
            </Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>
              Yes
            </Button>
            </Box>
      </Box>
    </Modal>
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer className="table" sx={{ maxHeight: 440, fontSize: '12px', marginLeft: '20px', marginTop: '0px', marginRight: '20px' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                
                    fontWeight: 'bolder',
                    fontSize: '14px',
                    padding: '12px',  // Added padding to cells for better spacing
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.SI_no} sx={{ height: '60px' }}> {/* Increased row height for better spacing */}
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ padding: '12px' }}  // Added padding to table cells for spacing
                      >
                        {column.id === 'Transaction' ? (
                            <FormControl variant="outlined" sx={{ minWidth: 140 }}>
                              <InputLabel>Transaction </InputLabel>
                              <Select
                                value={row.Transaction}
                                onChange={(e) => handleDropdownChange('Transaction', e.target.value, row.SI_no)}
                                label="Transaction"
                              >
                                <MenuItem value="income">Income</MenuItem>
                                <MenuItem value="expense">Expense</MenuItem>
                                
                              </Select>
                            </FormControl>
                          ) :
                          column.id === 'Category' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                              value={row.Category}
                              onChange={(e) => handleDropdownChange('Category', e.target.value, row.SI_no)}
                              label="Category "
                            >
                              <MenuItem value="salary">Salary</MenuItem>
                              <MenuItem value="payment">Payment</MenuItem>
                              <MenuItem value="rent">Rent</MenuItem>
                              <MenuItem value="utilities">Utilities</MenuItem>
                              
                            </Select>
                          </FormControl>
                        ) :column.id === 'Payment_Mode' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>Payment Mode </InputLabel>
                            <Select
                              value={row.payment_Mode}
                              onChange={(e) => handleDropdownChange('payment_Mode', e.target.value, row)}
                              label="Payment Mode"
                            >
                              <MenuItem value="cash">Cash</MenuItem>
                              <MenuItem value="bank transfer">Bank Transfer</MenuItem>
                              <MenuItem value="upi">UPI</MenuItem>
                              <MenuItem value="credit card">Credit Card</MenuItem>
                              <MenuItem value="debit card">Debit Card</MenuItem>
                            </Select>
                          </FormControl>
                        ) : column.id === 'Status' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel> Status</InputLabel>
                            <Select
                              value={row.Status}
                              onChange={(e) => handleDropdownChange('Status', e.target.value, row.SI_no)}
                              label="Status"
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="cancel">Cancel</MenuItem>
                            </Select>
                          </FormControl>
                        ) : column.id === 'action' ? (
                          <div  style={{display:'flex'}}>
                            <IconButton onClick={() => handleView(row)} style={{color:"blue"}}>
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton onClick={() => handleEdit(row)} style={{color:"green"}} >
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row)} style={{color:"red"}} >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ) : (
                          column.format && typeof value === 'number' ? column.format(value) : value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
       {renderViewModal()}
      {renderEditModal()}
      {renderDeleteModal()}
    </Paper>
  );
}


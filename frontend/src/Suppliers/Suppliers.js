
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Select, MenuItem, FormControl, InputLabel, Modal, Box, Typography, Grid, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



const columns = [
  { id: "SI_no", label: "SI NO.", flex: 1, minWidth: 50 },
  { id: "Supplier_name", label: "Supplier Name", flex: 1, minWidth: 100 },
  { id: "Email", label: "Email", flex: 1, minWidth: 150 },
  {
    id: "Mobile_Number",
    label: "Mobile Number",
    minWidth: 180,
  },
  { id: "Address", label: "Address", flex: 1, minWidth: 180 },
  { id: "Status", label: "Status", flex: 1 },
  { id: "action", label: "Action", flex: 1},
];

function createData(
  SI_no,
  Supplier_name,
  Email,
  Mobile_Number,
  Address,
  Status,
) {
  return {
    SI_no,
    Supplier_name,
  Email,
  Mobile_Number,
  Address,
    Status,
   
  };}

const rows = [
  createData(
    "1",
    "Ayushi Jha",
    "ayushi@mail.com",
    9122333449,
    "sakchi",
  "active"
      
  ),
  createData(
    "2",
    "John carie",
    "john@mail.com",
    7122333454,
    "Delhi",
    "inactive"
  ),
  createData(
    "3",
    "Peter fedrik",
    "peter@mail.com",
    6122333468,
    "Mango",
    "active"
  ),
  createData(
    "4",
    "Isha singh",
    "isha143@mail.com",
    9522333479,
    "Bangalore",
    "active"
  ),
  createData(
    "5",
    "David",
    "david@mail.com",
    7022333486,
    "Chennai",
    "inactive"
  ),
  createData(
    "6",
    "Sita",
    "sita79@mail.com",
    95222333495,
    "Kolkata",
    "active"
  ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [selectedSupplier, setSelectedSupplier] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({});
  const [data, setData] = React.useState(rows);

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
  console.log(rows);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (supplier) => {
    setSelectedSupplier(supplier);
    setViewModalOpen(true);
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setEditFormData(supplier);
    setEditModalOpen(true);
  };

  const handleDelete = (supplier) => {
    setSelectedSupplier(supplier);
    setDeleteModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedSupplier(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value
    });
  };
  const handleUpdate = () => {
    console.log('Updating supplier:', editFormData);
    // Here you would typically make an API call to update the supplier
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    console.log('Deleting supplier:', selectedSupplier);
    // Here you would typically make an API call to delete the supplier
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
            supplier Details
          </Typography>
          <IconButton onClick={handleCloseViewModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        {selectedSupplier && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Supplier Name: </strong>{selectedSupplier.Supplier_name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Email:</strong>{selectedSupplier.Email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><strong>Mobile Number:</strong>{selectedSupplier.Mobile_Number}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Address:</strong>{selectedSupplier.Address}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Status:</strong>{selectedSupplier.Status}</Typography>
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
            Edit supplier
          </Typography>
          <IconButton onClick={handleCloseEditModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
         <  Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier Name"
              value={editFormData.Supplier_name || ''}
              onChange={handleEditInputChange('Supplier_name')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={editFormData.Email || ''}
              onChange={handleEditInputChange('Email')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              type="Number"
              value={editFormData.Mobile_Number || ''}
              onChange={handleEditInputChange('Mobile_Number')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              value={editFormData.Address || ''}
              onChange={handleEditInputChange('Address')}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
             <FormControl
                                        variant="outlined"
                                        sx={{ minWidth: 394 }}
                                      >
                                        <InputLabel> Status</InputLabel>
                                        <Select
                                          value={editFormData.Status || ''}
                                          onChange={(e) =>
                                            handleDropdownChange(
                                              "Status",
                                              e.target.value
                                              
                                            )
                                          }
                                          label=" Status"
                                        >
                                          <MenuItem value="active">Active</MenuItem>
                                          <MenuItem value="inactive">In Active</MenuItem>
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
          Are you sure you want to delete this supplier?
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
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        className="table"
        sx={{
          
          maxHeight: 440,
          fontSize: "12px",
          marginLeft: "20px",
          marginTop: "0px",
          marginRight: "20px",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    fontWeight: "bolder",
                    fontSize: "14px",
                    padding: "12px", // Added padding to cells for better spacing
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
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.SI_no}
                  sx={{ height: "60px" }}
                >
                  {" "}
                  {/* Increased row height for better spacing */}
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ padding: "12px" }} // Added padding to table cells for spacing
                      >
                        {
                       column.id === "Status" ? (
                          <FormControl
                            variant="outlined"
                            sx={{ minWidth: 120 }}
                          >
                            <InputLabel> Status</InputLabel>
                            <Select
                                value={row.Status}
                              onChange={(e) =>
                                handleDropdownChange(
                                  "Status",
                                  e.target.value,
                                  row.SI_no
                                )
                              }
                              label=" Status"
                            >
                              <MenuItem value= "active">Active</MenuItem>
                              <MenuItem value= "inactive">In Active</MenuItem>
                             
                            </Select>
                          </FormControl>
                        ) : column.id === "action" ? (
                          <div style={{ display: "flex" }}>
                            <IconButton
                              onClick={() => handleView(row)}
                              style={{color:"blue"}}
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleEdit(row)}
                              style={{color:"green"}}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(row)}
                              style={{color:"red"}}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ) : column.format && typeof value === "number" ? (
                          column.format(value)
                        ) : (
                          value
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

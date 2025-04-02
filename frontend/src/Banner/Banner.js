
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
import { Select, MenuItem, FormControl, InputLabel, Modal, Box, Typography, Grid, Button, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'



const columns = [
  { id: "SI_no", label: "SI NO.", flex: 1, minWidth: 50 },
  { id: "Banner_name", label: "Banner Name", flex: 1, minWidth: 100 },
  { id: "Description", label: "Description", flex: 1,  minWidth: 150 },
  {
    id: "IMG",
    label: "IMG",
    flex: 1,

    minWidth: 180,
  },
  { id: "Valid_From", label: "Valid From", flex: 1,  minWidth: 180 },
  {
    id: "Valid_To",
    label: "Valid To",
    flex: 1,
    minWidth: 180 
    
  },

  
  { id: "Status", label: " Status", flex: 1 },
  { id: "action", label: "Action", flex: 1 },
];

function createData(
  SI_no,
  Banner_name,
  Description,
  IMG,
  Valid_From,
  Valid_To,
  Status
) {
  return {
    SI_no,
    Banner_name,
    Description,
    IMG,
    Valid_From,
    Valid_To,
    
    Status
   
  };}

const rows = [
  createData
    (
      "1",
      "Summer Sale",
       "Get up to 50% off on all summer products.",
       "https://example.com/images/summer-sale.jpg",
       2025-4-1,
       2025-6-30,
       "inactive",
  ),
   createData (
    "2",
     "New Arrivals",
       "Explore the latest collection of 2025.",
       "https://example.com/images/new-arrivals.jpg",
       2025-1-15,
       2025-12-31,
       "active",
  ),
   createData (
    "3",
      "Festival Offer",
     "Special discounts available during the festive season.",
       "https://example.com/images/festival-offer.jpg",
       2025-10-1,
       2025-11-15,
       "active",
   ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState(rows);
  const [selectedBanner, setSelectedBanner] = React.useState(null);
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
  const handleView = (banner) => {
    console.log("ifgjbfdngb");
    
    setSelectedBanner(banner);
    setViewModalOpen(true);
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setEditFormData(banner);
    setEditModalOpen(true);
  };

  const handleDelete = (banner) => {
    setSelectedBanner(banner);
    setDeleteModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedBanner(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedBanner(null);
    setEditFormData({});
  };
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedBanner(null);
  };

  const handleEditInputChange = (status) => (event) => {
    setEditFormData({
      ...editFormData,
      [status]: event.target.value
    });
  };

  const handleUpdate = () => {
    console.log('Updating Product:', editFormData);
    // Here you would typically make an API call to update the Product
    handleCloseEditModal();
  };

  
  
  const handleConfirmDelete = () => {
    console.log('Deleting Product:', selectedBanner);
    // Here you would typically make an API call to delete the Product
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
            Banner Details
          </Typography>
          <IconButton onClick={handleCloseViewModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        {selectedBanner && (
        <Grid container spacing={2}>
           <Grid item xs={12} sm={6}>
               <Typography variant="subtitle1"><strong>Banner Name:</strong> {selectedBanner.Banner_name}</Typography>
           </Grid>
           <Grid item xs={12} sm={6}>
               <Typography variant="subtitle1"><strong>Description:</strong> {selectedBanner.Description}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
               <Typography variant="subtitle1"><strong>IMG:</strong> {selectedBanner.IMG}</Typography>
            </Grid>
           <Grid item xs={12}>
              <Typography variant="subtitle1"><strong>Valid From:</strong> {selectedBanner.Valid_From}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
               <Typography variant="subtitle1"><strong>Valid To:</strong> {selectedBanner.Valid_To}</Typography>
            </Grid>
           <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Status:</strong> {selectedBanner.Status}</Typography>
            </Grid>
          </Grid>
        )}
    </Box>
</Modal>);

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
                Edit Banner
             </Typography>
         <IconButton onClick={handleCloseEditModal} size="small">
          <CloseIcon />
          </IconButton>
         </Box>
        <Grid  Grid container spacing={2}>
             <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Banner Name"
                    value={editFormData.Banner_name|| ''}
                    onChange={handleEditInputChange('Banner_name')}
                   />
                              </Grid>
                             <Grid item xs={12} sm={6}>
                              <TextField
                               fullWidth
                                value={editFormData.Description || ''}
                              onChange={handleEditInputChange('Description')}
                                                     />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                 fullWidth
                                 label="IMG"
                                 value={editFormData.IMG|| ''}
                                 onChange={handleEditInputChange('IMG')}
                                  />
                               </Grid>
                             <Grid item xs={12}>
                             <TextField
                             fullWidth
                             label="Valid From"
                            value={editFormData.Valid_From|| ''}
                             type="date"
                          onChange={handleEditInputChange('Valid_From')}
                          
                         />
                         </Grid>
                             <Grid item xs={12}>
                           <TextField
                            fullWidth
                            label="Valid To"
                            value={editFormData.Valid_To|| ''}
                               type="date"
                              onChange={handleEditInputChange('Valid_To')}
                              
                            />
                            </Grid>
                           <Grid item xs={12} sm={6}>
                          <FormControl
                            variant="outlined"
                            fullWidth
                           >
                           <InputLabel> Status</InputLabel>
                           <Select
                             value={editFormData.Status || ''}
                               onChange={(e) => handleDropdownChange(
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
                          Are you sure you want to delete this Banner?
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
          overflow:"auto",
          maxWidth:"100%",         maxHeight: 440,
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
                              <MenuItem value="active">Active</MenuItem>
                              <MenuItem value="inactive">In Active</MenuItem>
                              <MenuItem value="expired">Expired</MenuItem>
                             
                            </Select>
                          </FormControl>
                        ) : column.id === "action" ? (
                          <div style={{ display: "flex" }}>
                            <IconButton
                              onClick={() => handleView(row)}
                              style={{color:"blue"}}
                              color="black"
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleEdit(row)}
                              style={{color:"green"}}
                              color="black"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(row)}
                              style={{color:"red"}}
                              color="black"
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

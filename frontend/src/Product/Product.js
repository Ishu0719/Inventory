import * as React from "react";
import {useEffect} from "react";
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
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

 // Import your CSS file for styling
const columns = [
  { id: "SI_no", label: "SI NO.", flex: 1, minWidth: 50 },
  { id: "Product_Name", label: "Product Name", flex: 1,  minWidth: 150 },
  { id: "SKU", label: "SKU", flex: 1,  minWidth: 150 },
  {
    id: "Product_Description",
    label: "Product Description",
    flex: 1,
  
    minWidth: 180,
  },
  { id: "Category", label: "Category", flex: 1,  minWidth: 180 },
  {
    id: "Cost_Price",
    label: "Cost Price",
    flex: 1,
    
    format: (value) => value.toFixed(2),
  },
  {
    id: "Selling_Price",
    label: "Selling Price",
    flex: 1,
    
    format: (value) => value.toFixed(2),
  },
  { id: "Quantity", label: " Quantity", flex: 1 },
  { id: "Status", label: " Status", flex: 1 },
  { id: "action", label: "Action", flex: 1 },
];

function createData(
  SI_no,
  Product_Name,
  SKU,
  Product_Description,
  Category,
  Cost_Price,
  Selling_Price,
  Quantity,
  Status,
) {
  return {
    SI_no,
    Product_Name,
    SKU,
    Product_Description,
    Category,
    Cost_Price,
    Selling_Price,
    Quantity,
    Status,
   
  };
}

const rows = [
  createData(
    "1",
   "Wireless Keyboard",
     "KB12345",
     "Compact wireless keyboard ",
     "Electronic",
     1200.00,
     1500.00,
     100,
     "active",

  ),

  createData(
    "2",
    "VIVO T3X",
    "KB12799",
    "Best Smartphone For Gaming",
    "Electronic",
    22000.00,
    18000.00,
    100,
    "active",
  ),
  createData(
    "3",
    "Hp Window",
    "KB12395",
    "Latest Window ",
    "Electronic",
    70000,
    45000,
    0,
    "inactive",
  ),
  createData(
    "4",
    "Wireless mouse",
    "KB12345",
    "Compact wireless Mouse",
    "Electronic",
    1200.00,
    1500.00,
    500,
    "active",
   
  ),
  createData(
    "5",
   "OPPOA52",
    "KB12389",
    "8GB 512GB ",
    "Electronic",
    18000.00,
    15000.00,
    100,
    "active",
  ),
  createData(
    "6",
    "Asus Vivobook 15",
    "KB12375",
    "Best Version Vivobook",
    "Electronic",
    80000,
    55000,
    0,
    "inactive"
  )
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState(rows);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({});
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const getAllProduct = async () => {
    try {
      const res = await axios.get(
      `http://localhost:3002/product/getAllProduct`
      );
      console.log("res ", res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllProduct();
  }, [])


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

  const handleView = (product) => {
    console.log("ifgjbfdngb");
    
    setSelectedProduct(product);
    setViewModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditFormData(product);
    setEditModalOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedProduct(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedProduct(null);
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
    console.log('Deleting Product:', selectedProduct);
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
            Product Details
          </Typography>
          <IconButton onClick={handleCloseViewModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        {selectedProduct && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Product Name:</strong> {selectedProduct.Product_Name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>SKU:</strong> {selectedProduct.SKU}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><strong>Product Description:</strong> {selectedProduct.Product_Description}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Category:</strong>{selectedProduct.Category}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Cost Price:</strong> {selectedProduct.Cost_Price} </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Selling Price:</strong> {selectedProduct.Selling_Price}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Quantity:</strong> {selectedProduct.Quantity}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Status:</strong> {selectedProduct.Status}</Typography>
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
            Edit Product
          </Typography>
          <IconButton onClick={handleCloseEditModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Name"
              value={editFormData.Product_Name || ''}
              onChange={handleEditInputChange('Product_Name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="sku"
              value={editFormData.SKU || ''}
              onChange={handleEditInputChange('SKU')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Description"
              value={editFormData.Product_Description|| ''}
              onChange={handleEditInputChange('Product_Description')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              value={editFormData.Category|| ''}
              onChange={handleEditInputChange('Category')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cost Price"
              type="number"
              value={editFormData.Cost_Price || ''}
              onChange={handleEditInputChange('Cost_Price')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Selling Price"
              type="number"
              value={editFormData.Selling_Price || ''}
              onChange={handleEditInputChange('Selling_Price')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              value={editFormData.Quantity || ''}
              onChange={handleEditInputChange('Quantity')}
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
          Are you sure you want to delete this Product?
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
                              <MenuItem value="active">Active</MenuItem>
                              <MenuItem value="inactive">In Active</MenuItem>
                             
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

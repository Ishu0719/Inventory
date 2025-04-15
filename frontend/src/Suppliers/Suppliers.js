import { useEffect, useState } from "react";
import {
  Table,
  Select,
  MenuItem,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Modal,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  TableContainer,
  TablePagination
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  Close as CloseIcon,
  NetworkWifiOutlined,
 
} from "@mui/icons-material";
import axios from "axios";
import {  InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


import { FormControl, InputLabel } from "@mui/material";



const SupplierTable = () => {

  const [data, setData] = useState([
    {
      id: 1,
      supplier_Name:"lucky",
   email:"lucky@gmail.com",
   mobile_Number:"799235984",
   address:"mango",
   status:"Active",
      
     
    },
    {
      id: 2,
      supplier_Name:"lucky",
   email:"lucky@gmail.com",
   mobile_Number:"799235984",
   address:"mango",
   status:"Active",
     
    },
    {
      id: 3,
      supplier_Name:"lucky",
   email:"lucky@gmail.com",
   mobile_Number:"799235984",
   address:"mango",
   status:"Active",
    },
  ]);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    maxHeight: "90vh",
    overflow: "auto",
  };

  const deleteModalStyle = {
    ...modalStyle,
    width: 400,
    textAlign: "center",
  };

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  // const [supplier ,setSupplier] = useState([]);
  const[searchTerm,setSearchTerm]=useState("");
  const[apiSuppliers,setApiSuppliers]=useState([]);
  const [addFormData, setAddFormData] = useState({
    supplier_Name: "",
    email: "",
    mobile_Number: "",
    address: "",
    status: "Active",
  });

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [suppliers, setSuppliers] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  

  const getAllSupplier = async () => {
    try {
      const res = await axios.get(
       `http://localhost:3002/suppliers/getAllSupplier`
      );
      console.log("response", res.data);
      setSuppliers(res.data);
      setApiSuppliers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllSupplier();
  }, []);
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

  const handleCloseAddModal = () => setAddModalOpen(false);

  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value,
    });
  };

  const handleAddInputChange = (field) => (event) => {
    setAddFormData({
      ...addFormData,
      [field]: event.target.value,
    });
  };
  const handleAddSupplier = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3002/suppliers/createSupplier`,
        addFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllSupplier();
        handleCloseAddModal();
        setAddFormData({
          supplier_Name: "",
          email: "",
          mobile_Number: "",
          address: "",
          status: "Active",
        });

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message||"Failed adding supplier"); 
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTitleChange = (id,newTitle)=>{
    setSuppliers((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier.id === id ? { ...supplier, title: newTitle } : supplier
      )
    );
  }

  const handleTypeChange = (id, newType) => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier.id === id ? { ...supplier, type: newType } : supplier
      )
    );
  }

  const handleUpdate =  async () => {
    console.log("Updating supplier:", editFormData);
    // Here you would typically make an API call to update the supplier
    handleCloseEditModal();
     try{
          const res = await axios.put(
            `http://localhost:3002/suppliers/updateSupplier/${selectedSupplier._id}`,
            editFormData
          );
          if(res.data.success){
            toast.success(res.data.message);
            getAllSupplier();
            setEditFormData({});
          }
        }
        catch(error){
          console.log(error);
          toast.error(error.response.data.message);
        } 
    
  };

  const handleConfirmDelete =  async () => {
    console.log("Deleting supplier:", selectedSupplier);
    // Here you would typically make an API call to delete the supplier
    handleCloseDeleteModal();
    try {
      const res = await axios.delete(
     `http://localhost:3002/suppliers/deleteSupplier/${selectedSupplier._id}`
    ); 
   if(res.data.success){
     toast.success(res.data.message);
     getAllSupplier();
   }
 }
     catch(error){
       console.log(error);
       toast.error(error.res.data.message);
       
     }
   };

  
  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if(value === "") {
      setSuppliers(apiSuppliers);
      return ;// Reset to original data if search term is empty
    }
    const filtered = apiSuppliers.filter((supplier) =>{
      return(
      
      supplier.supplier_Name.toLowerCase().includes(value)||
      supplier.mobile_Number.toString().includes(value) ||
      supplier.address.toLowerCase().includes(value) ||
      supplier.email.toLowerCase().includes(value) ||
      supplier.status.toLowerCase().includes(value)
      )
    });
      setSuppliers(filtered);
  } ;

  const handleAddNew = () => {
    // Logic to add a new supplier
    setAddModalOpen(true);  
    // You can redirect to a form or show a modal here
  }


  return (
    <>
    <h3>SUPPLIER DETAILS</h3>
    <div style={{ display: "flex", alignItems: "center", marginBottom: "50px",justifyContent: "space-between" }}>
    <TextField
           className='search'

        label="Search"
        variant="outlined"
        fullWidth
       value={searchTerm}
       onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{maxWidth:"300px", alignItems:"center", marginLeft: "800px", marginRight: "10px" }}
      />


    <Button 
    variant="contained" 
    color="primary"   
 onClick={handleAddNew}
 style={{ marginLeft: "auto", backgroundColor: "rgb(4,4,100)", color: "white", marginRight: "20px",height:"52px" }}

  >
    <AddIcon/>
    Add Supplier
  </Button>
  </div>
    <TableContainer
      component={Paper}
      style={{ overflowX: "auto", maxWidth: 1250, margin: "25px", display:"flex", justifyContent:"space-between" }}
    >
      <Table className="w-full border border-gray-300">
        <TableHead
          sx={{
            top: 0,
            background: "white",
            zIndex: 2,
            position: "sticky",
            fontWeight: "bold",
          }}
        >
          <TableRow className="bg-gray-200">
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              S.No
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Supplier Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            Email
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Mobile Number
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Address
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: "bold",textAlign:"center" }} className="border p-2">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { suppliers.length>0 && suppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supplier,index) => (
            <TableRow
              key={supplier._id}
              className="text-center"
              sx={{ fontWeight: "bold" }}
            >
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {index + 1} 
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px" }}
                className="border p-2"
              >
                {supplier.supplier_Name}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px"}}
                className="border p-2"
              >
                {supplier.email}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px" }}
                className="border p-2"
              >
                {supplier.mobile_Number}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px"}}
                className="border p-2"
              >
                {supplier.address}
              </TableCell>
              
              
              <TableCell
                sx={{ padding: "4px", fontSize: "12px",textAlign:"center" }}
                className="border p-2"
              >
                {supplier.status}
              </TableCell>
              <TableCell sx={{ fontWeight: "bolder" }} className="border p-2">
                <TableContainer
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    sx={{ color: "blue" }}
                    fontweight="bolder"
                    onClick={() => handleView(supplier)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    sx={{ color: "grey" }}
                    onClick={() => handleEdit(supplier)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(supplier)}
                  >
                    <Delete />
                  </IconButton>
                </TableContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Modal */}
      <Modal open={viewModalOpen} onClose={handleCloseViewModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Supplier Details</Typography>
            <IconButton onClick={handleCloseViewModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedSupplier && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedSupplier).map(([key, value]) => (
                <Grid item xs={6} key={key}>
                  <Typography>
                    <strong>{key}:</strong> {value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Modal>

{/* Add Modal */} 
      <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Supplier</Typography>
            <IconButton onClick={handleCloseAddModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Supplier Name"
                name="supplier_Name"
                value={addFormData.supplier_Name}
                onChange={handleAddInputChange('supplier_Name')}
                required
                sx={{
                  mt: 2,
                  
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
              />
            </Grid>
          
          <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile_Number"
                type="number"
                value={addFormData.mobile_Number}
                onChange={handleAddInputChange('mobile_Number')}
            
                required
                sx={{
                  mt: 2,
                  
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={addFormData.address}
                onChange={handleAddInputChange('address')}
                required
                sx={{
                  mt: 2,
                  
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"  
                type="email"
                value={addFormData.email}
                onChange={handleAddInputChange('email')}
                required
                sx={{
                  mt: 2,
                  
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
             
              />
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={addFormData.status}
                  onChange={handleAddInputChange('status')}
                  required
                  sx={{
                    mt: 2,
                    
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
            
                </Select>
              </FormControl>
            </Grid>
      
         
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button 
                  variant="outlined" 
                  onClick={handleCloseAddModal}
                  sx={{
                    color:"white",
                       backgroundColor: "grey.800",
                      
                     }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleAddSupplier}
                  sx={{
                          
                    backgroundColor: "rgb(4,4,44)",
                   
                  }}
                >
                  Save Supplier
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Edit Supplier</Typography>
            <IconButton onClick={handleCloseEditModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2} mt={2}>
            {Object.keys(editFormData)
          .filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v" && field !== "_id")
            .map((field) => (
              <Grid item xs={6} key={field}>
                <TextField
                  label={field}
                  value={editFormData[field] || ""}
                  onChange={handleEditInputChange(field)}
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={handleCloseEditModal } sx={{
                       color:"white",
                          backgroundColor: "grey.800",
                         
                        }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdate}  sx={{
                          
                          backgroundColor: "rgb(4,4,44)",
                         ml:2
                        }}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box sx={deleteModalStyle}>
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography my={2}>
            Are you sure you want to delete this supplier?
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}  sx={{
                       color:"white",
                          backgroundColor: "grey.800",
                         
                        }}>
              CANCEL
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Modal>
    </TableContainer>
    <TablePagination 
     //page 
     style={{width:"1150"}}
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
  };


export default SupplierTable;
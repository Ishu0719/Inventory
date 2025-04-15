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
  Add,
} from "@mui/icons-material";
import {  InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import{FormControl,InputLabel} from "@mui/material";


const PurchaseOrderTable = () => {

  const [data, setData] = useState([
    {
      id: 1,
      supplier_Id:"4636232",
      order_Date:"25jan 2015",
      expected_Date:"20 march 2025",
      status:"Pending"
     
    },
    {
        id: 2,
      supplier_Id:"4636223",
      order_Date:"25jan 2015",
      expected_Date:"20 march 2025",
      status:"Cancel"
     
     
    },
    {
        id: 3,
      supplier_Id:"46362356",
      order_Date:"25jan 2015",
      expected_Date:"20 march 2025",
      status:"Received"
     
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
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [purchases ,setPurchases] = useState([]);
  const[searchTerm,setSearchTerm]=useState("");
  const[apiPurchases,setApiPurchases]=useState([]);

  const [addFormData, setAddFormData] = useState({
   supplier_Id:"",
   order_Date:"",
   expected_Date:"",
    status: "Pending",
    
  });

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  
  

  const getAllPurchase = async () => {
    try {
      const res = await axios.get(
       `http://localhost:3002/purchase/getAllPurchase`
      );
      console.log("response", res.data);
      setPurchases(res.data);
      setApiPurchases(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPurchase();
  }, []);
  const handleView = (purchase) => {
    setSelectedPurchase(purchase);
    setViewModalOpen(true);
  };

  const handleEdit = (purchase) => {
    setSelectedPurchase(purchase);
    setEditFormData(purchase);
    setEditModalOpen(true);
  };

  const handleDelete = (purchase) => {
    setSelectedPurchase(purchase);
    setDeleteModalOpen(true);
  };

  const [addModalOpen, setAddModalOpen] = useState(false);
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
  const handleAddPurchase = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3002/purchase/createPurchase`,
        addFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllPurchase();
        handleCloseAddModal();
        setAddFormData({
supplier_Id:"",
order_Date:"",
expected_Date:"",
status:"Pending",
          
        });

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message||"Failed adding purchase"); 
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
    setPurchases((prevPurchases) =>
      prevPurchases.map((purchase) =>
        purchase.id === id ? { ...purchase, title: newTitle } : purchase
      )
    );
  }

  const handleTypeChange = (id, newType) => {
    setPurchases((prevPurchases) =>
      prevPurchases.map((purchase) =>
        purchase.id === id ? { ...purchase, type: newType } : purchase
      )
    );
  }



  const handleUpdate = async () => {
    console.log("Updating purchase:", editFormData);
    // Here you would typically make an API call to update the purchase
    handleCloseEditModal();
     try{
          const res = await axios.put(
            `http://localhost:3002/purchase/updatePurchase/${selectedPurchase._id}`,
            editFormData
          );
          if(res.data.success){
            toast.success(res.data.message);
            getAllPurchase();
            setEditFormData({});
          }
        }
        catch(error){
          console.log(error);
          toast.error(error.response.data.message);
        } 
  };

  const handleConfirmDelete = async () => {
    handleCloseDeleteModal();
    try {
     const res = await axios.delete(
    `http://localhost:3002/purchase/deletePurchase/${selectedPurchase._id}`
   ); 
  if(res.data.success){
    toast.success(res.data.message);
    getAllPurchase();
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
      setPurchases(apiPurchases);
      return ;// Reset to original data if search term is empty
    }
    const filtered = apiPurchases.filter((purchase) =>{
      return(
        purchase.supplier_Id.toLowerCase().includes(value) ||
        purchase.order_Date.toString().includes(value) ||
        purchase.expected_Date.toString().includes(value) ||
        purchase.status.toLowerCase().includes(value)
      )
    });
      setPurchases(filtered);
  } ;
  const handleAddNew = () => {
    // Logic to add a new purchase
    setAddModalOpen(true);  
    // You can redirect to a form or show a modal here
  }

 
  return (
 <>
 <h3>PURCHASE ORDER DETAILS</h3>
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
 style={{ marginLeft: "auto", backgroundColor: "rgb(4,4, 100)", color: "white", marginRight: "20px", height:"52px" }}

  >
    <AddIcon/>
    Add order
  </Button>
  </div>

    <TableContainer
      component={Paper}
      style={{ overflowX: "auto", maxWidth: 1250,margin:"25px" }}
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
                Supplier ID
            </TableCell>
           
           
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Ordered  Date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Delivery Date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" ,textAlign:"center"}} className="border p-2">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { purchases.length>0 && purchases
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((purchase,index) => (
            <TableRow
              key={purchase._id}
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
                sx={{ padding: "4px", fontSize: "12px",  }}
                className="border p-2"
              >
                {purchase.supplier_Id}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px"}}
                className="border p-2"
              >
                {purchase.order_Date.split("T")[0]}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px" }}
                className="border p-2"
              >
                {purchase.expected_Date.split("T")[0]}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px",textAlign:"center"}}
                className="border p-2"
              >{purchase.status}
                
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
                    onClick={() => handleView(purchase)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    sx={{ color: "grey" }}
                    onClick={() => handleEdit(purchase)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(purchase)}
                  >
                    <Delete />
                  </IconButton>
                </TableContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Modal */} 
            <Modal open={addModalOpen} onClose={handleCloseAddModal}>
              <Box sx={modalStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="bold">Add New Purchase Order</Typography>
                  <IconButton onClick={handleCloseAddModal}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                  <Grid  style={{margin:"10px"}}>
                  <Grid item  sm={6} mb={1}>
                    <TextField
                      fullWidth
                      label="Supplier ID"
                      name="supplier_Id"
                      value={addFormData.supplier_Id}
                      onChange={handleAddInputChange('supplier_Id')} 
                      required
                      sx={{
                       
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                   
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} mb={1}>
                    <TextField
                      fullWidth
                      label="Order Date"
                      name="order_Date"
                      type="date"
                      value={addFormData.order_Date}
                      onChange={handleAddInputChange('order_Date')}
                      InputLabelProps={{ shrink: true }} 
                      required
                      sx={{
                       
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                   
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} mb={1}>
                    <TextField
                      fullWidth
                      label="Delivery Date"
                      name="expected_Date" 
                      type="date"
                      value={addFormData.expected_Date}
                      onChange={handleAddInputChange('expected_Date')} 
                      InputLabelProps={{ shrink: true }}
                      required
                      sx={{
                       
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                   
                    />
                  </Grid>
          
                  <Grid item xs={12} sm={6} mb={1}>
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
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Recieved">Recieved</MenuItem>
                        <MenuItem value="Cancel">Cancel</MenuItem>
                  
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
                        onClick={handleAddPurchase}
                        sx={{
                          
                          backgroundColor: "rgb(4,4,44)",
                         
                        }}
                      >
                        Save Purchase
                      </Button>
                    </Box>
                  </Grid> 
                 </Grid>
                 </Box>
                </Modal>
            
          

      {/* View Modal */}
      <Modal open={viewModalOpen} onClose={handleCloseViewModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Purchase Details</Typography>
            <IconButton onClick={handleCloseViewModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedPurchase && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedPurchase).map(([key, value]) => (
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



      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Edit Product</Typography>
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
            <Button variant="outlined" onClick={handleCloseEditModal} sx={{
                       color:"white",
                          backgroundColor: "grey.800",
                         
                        }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdate} sx={{ ml: 2 , backgroundColor: "rgb(4,4,44)"}}>
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
            Are you sure you want to delete this purchase?
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal} sx={{
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

export default PurchaseOrderTable;
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

const StockManagementTable = () => {

  const [data, setData] = useState([
    {
      id: 1,
product_Id:"1",
quantities:"100",
restock_Date:"2023-10-01",
reorder_Level:"50",


     
    },
    {
        id: 2,
product_Id:"1",
quantities:"100",
restock_Date:"2023-10-01",
reorder_Level:"50",

    },
    {
        id: 1,
        product_Id:"3",
        quantities:"100",
        restock_Date:"2023-10-01",
        reorder_Level:"50",
        
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
  const [selectedStock, setSelectedStock] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [stocks ,setStocks] = useState([]);
  const[searchTerm,setSearchTerm]=useState("");
  const[apiStocks,setApiStocks]=useState([]);

  const [addFormData, setAddFormData] = useState({
product_Id:"",
quantities:"",
restock_Date:"",
reorder_Level:"",

    
    
  });

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  
  

  const getAllStock = async () => {
    try {
      const res = await axios.get(
      `http://localhost:3002/stock/getAllStock`
      );
      console.log("response", res.data);
      setStocks(res.data.stocks);
      setApiStocks(res.data.stocks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllStock();
  }, []);
  const handleView = (stock) => {
    setSelectedStock(stock);
    setViewModalOpen(true);
  };

  const handleEdit = (stock) => {
    setSelectedStock(stock);
    setEditFormData(stock);
    setEditModalOpen(true);
  };

  const handleDelete = (stock) => {
    setSelectedStock(stock);
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
  const handleAddStock = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3002/stock/createStock`,
        addFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllStock();
        handleCloseAddModal();
        setAddFormData({
product_Id:"",
quantities:"",
restock_Date:"",
reorder_Level:"",

          
        });

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message||"Failed adding stock"); 
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
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.id === id ? { ...stock, title: newTitle } : stock
      )
    );
  }

  const handleTypeChange = (id, newType) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.id === id ? { ...stock, type: newType } : stock
      )
    );
  }



  const handleUpdate = async () => {
    console.log("Updating stock:", editFormData);
    // Here you would typically make an API call to update the stock
    handleCloseEditModal();
     try{
          const res = await axios.put(
            `http://localhost:3002/stock/updateStock/${selectedStock._id}`,
            editFormData
          );
          if(res.data.success){
            toast.success(res.data.message);
            getAllStock();
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
    `http://localhost:3002/stock/deleteStock/${selectedStock._id}`
   ); 
  if(res.data.success){
    toast.success(res.data.message);
    getAllStock();
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
      setStocks(apiStocks);
      return ;// Reset to original data if search term is empty
    }
    const filtered = apiStocks.filter((stock) =>{
      return(
        stock.product_Id.toLowerCase().includes(value) ||
        stock.quantities.toString().includes(value) ||
        stock.restock_Date.toString().includes(value) ||
        stock.reorder_Level.toString().includes(value) 
        
      )
    });
      setStocks(filtered);
  } ;
  const handleAddNew = () => {
    // Logic to add a new stock
    setAddModalOpen(true);  
    // You can redirect to a form or show a modal here
  }

 
  return (
 <>
 <h3>STOCKS DETAILS</h3>
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
 style={{ marginLeft: "auto", backgroundColor: "rgb(4,4, 100)", color: "white", marginRight: "20px",height:"52px"}}

  >
    <AddIcon/>
    Add Stocks
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
              Product ID
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            Quantities
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Restock Date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            Reorder Level
            </TableCell>
           
            <TableCell sx={{ fontWeight: "bold" ,textAlign:"center"}} className="border p-2">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { stocks.length>0 && stocks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((stock,index) => (
            <TableRow
              key={stock._id}
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
                {stock.product_Id}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px" }}
                className="border p-2"
              >
                {stock.quantities}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px" }}
                className="border p-2"
              >
                {stock.restock_Date.split("T")[0]}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px",textAlign:"center" }}
                className="border p-2"
              >
                {stock.reorder_Level}
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
                    onClick={() => handleView(stock)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    sx={{ color: "grey" }}
                    onClick={() => handleEdit(stock)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(stock)}
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
                  <Typography variant="h6" fontWeight="bold">Add New Stock</Typography>
                  <IconButton onClick={handleCloseAddModal}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Product Id"
                      name="product_Id"
                      value={addFormData.product_Id}
                      onChange={handleAddInputChange('product_Id')}
                      required
                      sx={{
                       
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                    />
                  </Grid>
                
                <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Quantities"
                      name="quantities"
                      type="number"
                      value={addFormData.quantities}
                      onChange={handleAddInputChange('quantities')}
                      required
                      sx={{
                       
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Restock Date"
                      name="restock_Date"
                      type="date"
                      value={addFormData.restock_Date}
                        onChange={handleAddInputChange('restock_Date')}
                        InputLabelProps={{ shrink: true }}
                            required
                            sx={{
                       
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                       
                      
                     
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Reorder Level"
                      name="reorder_Level"
                      type="number"
                      value={addFormData.reorder_Level}
                        onChange={handleAddInputChange('reorder_Level')}
                      
                      required
                      sx={{
                       
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                   
                    />
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
                        onClick={handleAddStock}
                       
                        sx={{
                          
                          backgroundColor: "rgb(4,4,44)",
                         
                        }}
                      >
                        Save Stock
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
            <Typography variant="h6">Stock Details</Typography>
            <IconButton onClick={handleCloseViewModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedStock && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedStock).map(([key, value]) => (
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
            <Typography variant="h6">Edit Stock</Typography>
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
            <Button variant="contained" onClick={handleUpdate} sx={{ ml: 2 ,backgroundColor: "rgb(4,4,44)",}}>
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
            Are you sure you want to delete this stock?
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

export default StockManagementTable;
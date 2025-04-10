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
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  Close as CloseIcon,
} from "@mui/icons-material";
import axios from "axios";
import {  InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel } from "@mui/material";
const DiscountTable = () => {

  const [data, setData] = useState([
    {
      id: 1, 
   code:"fgj",
   discount_Value:"50%",
   description:"50% off",
  valid_From:"2023-10-01",
  valid_To:"2023-10-31",
  status:"Active",
   
   
    
    },
    {
      id: 2, 
   code:"fgj",
   discount_Value:"50%",
   description:"50% off",
  valid_From:"2023-10-01",
  valid_To:"2023-10-31",
  status:"Active",
    },
    {
      id: 3,
      code:"fgj",
      discount_Value:"50%",
      description:"50% off",
     valid_From:"2023-10-01",
     valid_To:"2023-10-31",
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
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [discounts ,setDiscounts] = useState([]);
  const[searchTerm,setSearchTerm] = useState("");
  const[apiDiscounts,setApiDiscounts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    code: "",
    discount_Value: "",
    description: "",
    valid_From: "",
    valid_To: "",
    status: "Upcoming",
 
    
  });

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customers, setCustomers] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const getAllDiscount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3002/discount/getAlldiscount`
    
      );
      console.log("response", res.data);
      setDiscounts(res.data);
      setApiDiscounts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllDiscount();
  }, []);
  const handleView = (discount) => {
    setSelectedDiscount(discount);
    setViewModalOpen(true);
  };

  const handleEdit = (discount) => {
    setSelectedDiscount(discount);
    setEditFormData(discount);
    setEditModalOpen(true);
  };

  const handleDelete = (discount) => {
    setSelectedDiscount(discount);
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

  const handleAddDiscount = async () => {
        try {
          const res = await axios.post(
            `http://localhost:3002/discount/createDiscount`,
            addFormData
          );
          if (res.data.success) {
            toast.success(res.data.message);
            getAllDiscount();
            handleCloseAddModal();
            setAddFormData({
              code
              : "",
              discount_Value: "",
              description: "",
              valid_From: "",
              valid_To: "",
              status: "Upcoming",
             
            });
    
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message||"Failed adding discount"); 
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
        setDiscounts((prevDiscounts) =>
          prevDiscounts.map((discount) =>
            discount.id === id ? { ...discount, title: newTitle } : discount
          )
        );
      }
    
      const handleTypeChange = (id, newType) => {
        setDiscounts((prevDiscounts) =>
          prevDiscounts.map((discount) =>
            discount.id === id ? { ...discount, type: newType } : discount
          )
        );
      }
    const handleAddInputChange = (field) => (event) => {
      setAddFormData({
        ...addFormData,
        [field]: event.target.value,
      });
    };


  const handleUpdate = async() => {
    console.log("Updating discount:", editFormData);
    // Here you would typically make an API call to update the discount
    handleCloseEditModal();
     try{
          const res = await axios.put(
            `http://localhost:3002/discount/updateDiscount/${selectedDiscount._id}`,
            editFormData
          );
          if(res.data.success){
            toast.success(res.data.message);
            getAllDiscount();
            setEditFormData({});
          }
        }
        catch(error){
          console.log(error);
          toast.error(error.response.data.message);
        } 
  };

  const handleConfirmDelete =  async() => {
   
   
    handleCloseDeleteModal();
    
     try {
                const res = await axios.delete(
               `http://localhost:3002/discount/deleteDiscount/${selectedDiscount._id}`
              ); 
             if(res.data.success){
               toast.success(res.data.message);
               getAllDiscount();
             }
           }
           catch (error) {
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
    if(value === ""){setDiscounts(apiDiscounts);
      return;}
   
  
  
  const filtered = apiDiscounts.filter((discount) =>{
    return(
    discount.code.toLowerCase().includes(value)||
    discount.discount_Value.toString().includes(value)||
    discount.description.toString().includes(value) ||
    discount.valid_From.toString().includes(value)||
    discount.valid_To.toLowerCase().includes(value) ||
    discount.status.toLowerCase().includes(value)
    )
  });
    setDiscounts(filtered);
}; 
const handleAddNew = () => {
  // Logic to add a new discount
  setAddModalOpen(true);  
  // You can redirect to a form or show a modal here
}


  return (
    <>
    <h3>DISCOUNT DETAILS</h3>
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
 style={{ marginLeft: "auto", backgroundColor: "rgb(4,4,100)", color: "white", marginRight: "20px", marginTop:"-10px" }}

  >
    <AddIcon/>
    Add Discount
  </Button>
  </div>
    <TableContainer
      component={Paper}
      style={{ overflowX: "auto", maxWidth: 1500 }}
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
              Code
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            Discount Value
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Description
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Valid From
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Valid To
            </TableCell>
           
           
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { discounts.length >0 && discounts.map((discount,index) => (
            <TableRow
              key={discount._id}
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
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {discount.code}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {discount.discount_Value}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {discount.description}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {discount.valid_From.split("T")[0] }
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {discount.valid_To.split("T")[0] }
              </TableCell>
              
              
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {discount.status}
              
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
                    onClick={() => handleView(discount)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    sx={{ color: "green" }}
                    onClick={() => handleEdit(discount)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(discount)}
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
            <Typography variant="h6">discount Details</Typography>
            <IconButton onClick={handleCloseViewModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedDiscount && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedDiscount).map(([key, value]) => (
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
                        <Typography variant="h6" fontWeight="bold">Add New Discount</Typography>
                        <IconButton onClick={handleCloseAddModal}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Code"
                            name="code"
                            value={addFormData.code}
                            onChange={handleAddInputChange('code')}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Discount Value"
                            name="discount_Value"
                            value={addFormData.discount_Value}
                            onChange={handleAddInputChange('discount_Value')}
                            required
                            
                          />
                        </Grid>
                      
                      <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={addFormData.description}
                            onChange={handleAddInputChange('description')}
                            required
                          />
                        </Grid>
                        
                        
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Valid From"
                            name="valid_From"
                            type="date"
                            value={addFormData.valid_From}
                            onChange={handleAddInputChange('valid_From')}
                            InputLabelProps={{ shrink: true }}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Valid To"
                            name="valid_To"
                            type="date"
                            value={addFormData.valid_To}
                            onChange={handleAddInputChange('valid_To')}
                            InputLabelProps={{ shrink: true }}
                            required
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
                            >
                              <MenuItem value="Active">Active</MenuItem>
                              <MenuItem value="InActive">InActive</MenuItem>
                              <MenuItem value="Expired">Expired</MenuItem>
                              <MenuItem value="Upcoming">Upcoming</MenuItem>
                        
                            </Select>
                          </FormControl>
                        </Grid>
                  
                     
                        <Grid item xs={12}>
                          <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Button 
                              variant="outlined" 
                              onClick={handleCloseAddModal}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="contained" 
                              color="primary"
                              onClick={handleAddDiscount}
                            >
                              Save Discount
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
            <Typography variant="h6">Edit Discount</Typography>
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
            <Button variant="outlined" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdate} sx={{ ml: 2 }}>
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
            Are you sure you want to delete this discount?
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>
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
    </>
  );
};

export default DiscountTable;
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
import {  InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel } from "@mui/material";

import axios from "axios";
import { toast } from "react-toastify";
const FinanceTable = () => {

  const [data, setData] = useState([
    {
      id: 1,
      name:"isha singh",
   amount:"50012",
   transaction:"Expense",
   category:"Rent",
   payment_Mode:"Credit Card",
   status:"Pending",
      
     
    },
    {
      id: 2,
      name:"isha singh",
      amount:"50012",
      transaction:"Expense",
      category:"Rent",
      payment_Mode:"Credit Card",
      status:"Pending",
      
    },
    {
    id:3,
    name:"isha singh",
    amount:"50012",
    transaction:"Expense",
    category:"Rent",
    payment_Mode:"Credit Card",
    status:"Pending",
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
  const [selectedFinance, setSelectedFinance] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [finances ,setFinances] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");
const[apiFinances,setApiFinances] =useState([]);
 const [addFormData, setAddFormData] = useState({
      name: "",
      amount: "",
      transaction: "Income",
      category: "Rent",
      payment_Mode: "UPI",
      status: "Completed",
     
    });
  
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [customers, setCustomers] = useState([]);
  


  const getAllFinance = async () => {
    try {
      const res = await axios.get(
       `http://localhost:3002/finance/getAllFinance`
      );
      console.log("response", res.data);
      setFinances(res.data);
      setApiFinances(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllFinance();
  }, []);
  const handleView = (finance) => {
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

  const handleAddFinance = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3002/finance/createFinance`,
        addFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllFinance();
        handleCloseAddModal();
        setAddFormData({
          name: "",
          amount: "",
          transaction: "Income",
          category: "Rent",
          payment_Mode: "UPI",
          status: "Completed",
          
        });

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message||"Failed adding customer"); 
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
    setFinances((prevFinances) =>
      prevFinances.map((finance) =>
        finance.id === id ? { ...finance, title: newTitle } : finance
      )
    );
  }

  const handleTypeChange = (id, newType) => {
    setFinances((prevFinances) =>
      prevFinances.map((finance) =>
        finance.id === id ? { ...finance, type: newType } : finance
      )
    );
  }
const handleAddInputChange = (field) => (event) => {
  setAddFormData({
    ...addFormData,
    [field]: event.target.value,
  });
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

  const handleUpdate = async () => {
    console.log("Updating Finance:", editFormData);
    // Here you would typically make an API call to update the Finance
    handleCloseEditModal();
     try{
          const res = await axios.put(
            `http://localhost:3002/finance/updateFinance/${selectedFinance._id}`,
            editFormData
          );
          if(res.data.success){
            toast.success(res.data.message);
            getAllFinance();
            setEditFormData({});
          }
        }
        catch(error){
          console.log(error);
          toast.error(error.response.data.message);
        } 
  };

  const handleConfirmDelete = async () => {
    console.log("Deleting Finance:", selectedFinance);
    // Here you would typically make an API call to delete the Finance
    handleCloseDeleteModal();
     try {
            const res = await axios.delete(
           `http://localhost:3002/finance/deleteFinance/${selectedFinance._id}`
          ); 
         if(res.data.success){
           toast.success(res.data.message);
           getAllFinance();
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
  const handlePayment_ModeChange = (id, newPayment_Mode) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, payment_Mode: newPayment_Mode } : row
      )
    );
  };
  const handleTransactionChange = (id, newTransaction) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, transaction: newTransaction } : row
      )
    );
  };
  const handleCategoryChange = (id, newCategory) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, category: newCategory } : row
      )
    );
  };
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if(value === ""){setFinances(apiFinances);
      return;}
   
  
  
  const filtered = apiFinances.filter((finance) =>{
    return(
    finance.name.toLowerCase().includes(value)||
    finance.amount.toString().includes(value) ||
    finance.transaction.toLowerCase().includes(value) ||
    finance.category.toLowerCase().includes(value)||
    finance.payment_Mode.toLowerCase().includes(value) ||
    finance.status.toLowerCase().includes(value)
    )
  });
    setFinances(filtered);
}; 

const handleAddNew = () => {
  // Logic to add a new finance
  setAddModalOpen(true);  
  // You can redirect to a form or show a modal here
}

  
  return (
   <>
   <h3>FINANCE DETAILS</h3>
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
       Add Finance
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
              Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            Amount
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Transaction
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            Category
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Payment Mode
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
          { finances.length>0 && finances.map((finance,index) => (
            <TableRow
              key={finance._id}
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
                {finance.name}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {finance.amount}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {finance.transaction}
                
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {finance.category}
               
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {finance.payment_Mode}
               
              </TableCell>
              
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {finance.status}
                
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
                    onClick={() => handleView(finance)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    sx={{ color: "green" }}
                    onClick={() => handleEdit(finance)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(finance)}
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
            <Typography variant="h6">Finance Details</Typography>
            <IconButton onClick={handleCloseViewModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedFinance && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedFinance).map(([key, value]) => (
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
      <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Add New Finance</Typography>
            <IconButton onClick={handleCloseAddModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
          <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={addFormData.name}
                onChange={handleAddInputChange('name')}
                required
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                value={addFormData.amount}
                onChange={handleAddInputChange('amount')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="transaction-label">Transaction</InputLabel>
                <Select
                  labelId="transaction-label"
                  name="transaction"
                  value={addFormData.transaction}
                  onChange={handleAddInputChange('transaction')}
                  required
                >
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                  
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={addFormData.category}
                  onChange={handleAddInputChange('category')}
                
                  required
                >
                  <MenuItem value="Rent">Rent</MenuItem>
                  <MenuItem value="Salary">Salary</MenuItem>
                  <MenuItem value="Utilities">Utilities</MenuItem>
                  <MenuItem value="Payment">Payment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
           
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="payment_Mode-label">Payment Mode</InputLabel>
                <Select
                  labelId="payment_Mode-label"
                  name="payment_Mode"
                  value={addFormData.payment_Mode}
                  onChange={handleAddInputChange('payment_Mode')}
                  required
                >
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="Debit Card">Debit Card</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                </Select>
              </FormControl>
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
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Cancel">Cancel</MenuItem>
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
                  onClick={handleAddFinance}
                >
                  Save Finance
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
            <Typography variant="h6">Edit Finance</Typography>
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
            Are you sure you want to delete this Finance?
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>
              CANCLE
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

export default FinanceTable;
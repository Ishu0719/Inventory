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
  Add,
} from "@mui/icons-material";
import {  InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import{FormControl,InputLabel} from "@mui/material";

const ProductTable = () => {

  const [data, setData] = useState([
    {
      id: 1,
      product_Name:"wireless keyboard",
      sku:"KB12345",
      product_Description:"Compact Wireless keyboard",
      category:"Electronic",
      cost_Price:"1200",
      selling_Price:"1500",
      quantity:"100",
      status:"Active"
     
    },
    {
      id: 2,
      product_Name:"wireless keyboard",
      sku:"KB12345",
      product_Description:"Compact Wireless keyboard",
      category:"Electronic",
      cost_Price:"1200",
      selling_Price:"1500",
      quantity:"100",
      status: "Active",
    },
    {
      id: 3,
      product_Name:"wireless keyboard",
      sku:"KB12345",
      product_Description:"Compact Wireless keyboard",
      category:"Electronic",
      cost_Price:"1200",
      selling_Price:"1500",
      quantity:"100",
      status: "InActive",
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [products ,setProducts] = useState([]);
  const[searchTerm,setSearchTerm]=useState("");
  const[apiProducts,setApiProducts]=useState([]);

  const [addFormData, setAddFormData] = useState({
    product_Name: "",
    sku: "",
    product_Description: "",
    category: "",
    cost_Price: "",
    selling_Price: "",
    quantity: "",
    status: "Active",
    
  });

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  
  

  const getAllProduct = async () => {
    try {
      const res = await axios.get(
       `http://localhost:3002/product/getAllProduct`
      );
      console.log("response", res.data);
      setProducts(res.data);
      setApiProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  const handleView = (product) => {
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
  const handleAddProduct = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3002/product/createProduct`,
        addFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllProduct();
        handleCloseAddModal();
        setAddFormData({
product_Name:"",
sku:"",
product_Description:"",
category:"",
cost_Price:"",
selling_Price:"",
quantity:"",
status:"Active",
          
        });

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message||"Failed adding product"); 
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
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, title: newTitle } : product
      )
    );
  }

  const handleTypeChange = (id, newType) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, type: newType } : product
      )
    );
  }



  const handleUpdate = async () => {
    console.log("Updating product:", editFormData);
    // Here you would typically make an API call to update the product
    handleCloseEditModal();
     try{
          const res = await axios.put(
            `http://localhost:3002/product/updateProduct/${selectedProduct._id}`,
            editFormData
          );
          if(res.data.success){
            toast.success(res.data.message);
            getAllProduct();
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
    `http://localhost:3002/product/deleteProduct/${selectedProduct._id}`
   ); 
  if(res.data.success){
    toast.success(res.data.message);
    getAllProduct();
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
      setProducts(apiProducts);
      return ;// Reset to original data if search term is empty
    }
    const filtered = apiProducts.filter((product) =>{
      return(
        product.product_Name.toLowerCase().includes(value) ||
        product.sku.toLowerCase().includes(value) ||
        product.product_Description.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value) ||
        product.cost_Price.toString().includes(value) ||
        product.selling_Price.toString().includes(value) ||
        product.quantity.toString().includes(value) ||
        product.status.toLowerCase().includes(value)
      )
    });
      setProducts(filtered);
  } ;
  const handleAddNew = () => {
    // Logic to add a new product
    setAddModalOpen(true);  
    // You can redirect to a form or show a modal here
  }

 
  return (
 <>
 <h3>PRODUCT DETAILS</h3>
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
 style={{ marginLeft: "auto", backgroundColor: "rgb(4,4, 100)", color: "white", marginRight: "20px", marginTop:"-10px" }}

  >
    <AddIcon/>
    Add Product
  </Button>
  </div>

    <TableContainer
      component={Paper}
      style={{ overflowX: "auto", maxWidth: 1500, margin: "0 auto" }}
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
              Product Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            SKU
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Product Description
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            Category
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Cost Price
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              {" "}
              Selling Price
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              quantity
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
          { products.length>0 && products.map((product,index) => (
            <TableRow
              key={product._id}
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
                {product.product_Name}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {product.sku}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {product.product_Description}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {product.category}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {product.cost_Price}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {product.selling_Price}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {product.quantity}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >{product.status}
                
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
                    onClick={() => handleView(product)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    sx={{ color: "green" }}
                    onClick={() => handleEdit(product)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(product)}
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
                  <Typography variant="h6" fontWeight="bold">Add New Product</Typography>
                  <IconButton onClick={handleCloseAddModal}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Product Name"
                      name="product_Name"
                      value={addFormData.product_Name}
                      onChange={handleAddInputChange('product_Name')}
                      required
                    />
                  </Grid>
                
                <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="SKU"
                      name="sku"
                      value={addFormData.sku}
                      onChange={handleAddInputChange('sku')}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Product Description"
                      name="product_Description"
                      value={addFormData.product_Description}
                      onChange={handleAddInputChange('product_Description')}
                      required
                     
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Category"
                      name="category"
                      value={addFormData.category}
                      onChange={handleAddInputChange('category')}  
                      required
                   
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Cost Price"
                      name="cost_Price"
                      value={addFormData.cost_Price}
                      onChange={handleAddInputChange('cost_Price')} 
                      required
                   
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Selling Price"
                      name="selling_Price"
                      value={addFormData.selling_Price}
                      onChange={handleAddInputChange('selling_Price')} 
                      required
                   
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      name="quantity" 
                      value={addFormData.quantity}
                      onChange={handleAddInputChange('quantity')} 
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
                        onClick={handleAddProduct}
                      >
                        Save Product
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
            <Typography variant="h6">Product Details</Typography>
            <IconButton onClick={handleCloseViewModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedProduct && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedProduct).map(([key, value]) => (
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
            Are you sure you want to delete this product?
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

export default ProductTable;
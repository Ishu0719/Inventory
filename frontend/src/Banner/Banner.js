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
import{ FormControl, InputLabel } from "@mui/material";
const BannerTable = () => {

  const [data, setData] = useState([
    {
      id: 1,
      banner_Name:"summer sale",
   description:"50% off",
   img:"image.jpg",
   valid_From:new Date("2023-10-01"),
    valid_To:new Date("2023-10-31"),
   status:"Active",
    
    },
    {
      id: 2,
      banner_Name:"winter sale",
    description:"30% off",
    img:"image.jpg",
    valid_From:"2023-11-01",
    valid_To:"2023-11-30",
    status:"InActive",
    
     
     
    },
    {
      id: 3,
      banner_Name:"spring sale",
   description:"20% off",
    img:"image.jpg",
    valid_From:"2023-12-01",
    valid_To:"2023-12-31",
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
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  
  const[searchTerm,setSearchTerm] = useState("");
  const[apiBanners,setApiBanners] = useState([]);
  const [addFormData, setAddFormData] = useState({
    banner_Name: "",
    description: "",
    img: "",
    valid_From: "",
    valid_To: "",
    status: "Active",

  });

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [banners, setBanners] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const getAllBanner = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3002/banner/getAllBanner`
    
      );
      console.log("response", res.data);
      setBanners(res.data);
      setApiBanners(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBanner();
  }, []);
  const handleView = (banner) => {
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

   const handleAddBanner = async () => {
        try {
          const res = await axios.post(
            `http://localhost:3002/banner/createBanner`,
            addFormData
          );
          if (res.data.success) {
            toast.success(res.data.message);
            getAllBanner();
            handleCloseAddModal();
            setAddFormData({
              banner_Name: "",
              description: "",
              img: "",
              valid_From: "",
              valid_To: "",
              status: "Active",
              
             
            });
    
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message||"Failed adding banner"); 
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
        setBanners((prevBanners) =>
          prevBanners.map((banner) =>
            banner.id === id ? { ...banner, title: newTitle } : banner
          )
        );
      }
    
      const handleTypeChange = (id, newType) => {
        setBanners((prevBanners) =>
          prevBanners.map((banner) =>
            banner.id === id ? { ...banner, type: newType } : banner
          )
        );
      }
   

    const handleAddInputChange = (field) => (event) => {
      setAddFormData({  
        ...addFormData,
        [field]: event.target.value,
      });
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

  const handleUpdate =  async() => {
    console.log("Updating banner:", editFormData);
    // Here you would typically make an API call to update the banner
    handleCloseEditModal();
    try{
      const res = await axios.put(
        `http://localhost:3002/banner/updateBanner/${selectedBanner._id}`,
        editFormData
      );
      if(res.data.success){
        toast.success(res.data.message);
        getAllBanner();
        setEditFormData({});
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    } 
  };

  const handleConfirmDelete = async() => {
    handleCloseDeleteModal();
    try {
      const res = await axios.delete(
     `http://localhost:3002/banner/deleteBanner/${selectedBanner._id}`
    ); 
   if(res.data.success){
     toast.success(res.data.message);
     getAllBanner();
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
    if(value === ""){setBanners(apiBanners);
      return;}
   
  
  
  const filtered = apiBanners.filter((banner) =>{
    return(
    banner.banner_Name.toLowerCase().includes(value)||
    banner.description.toString().includes(value) ||
    banner.img.toString().includes(value) ||
    banner.valid_From.toString().includes(value)||
    banner.valid_To.toLowerCase().includes(value) ||
    banner.status.toLowerCase().includes(value)
    )
  });
    setBanners(filtered);
}; 
const handleAddNew = () => {
  // Logic to add a new banner
  setAddModalOpen(true);  
  // You can redirect to a form or show a modal here
}
  
  return (
    <>
    <h3>BANNER DETAILS</h3>
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
        Add New Banner
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
              Banner Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            Description
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Image
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
          { banners.length >0 && banners.map((banner,index) => (
            <TableRow
              key={banner._id}
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
                {banner.banner_Name}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {banner.description}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {banner.img}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {banner.valid_From }
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {banner.valid_To}
              </TableCell>
              
              
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >{banner.status}
               
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
                    onClick={() => handleView(banner)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    sx={{ color: "green" }}
                    onClick={() => handleEdit(banner)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(banner)}
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
            <Typography variant="h6">Banner Details</Typography>
            <IconButton onClick={handleCloseViewModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedBanner && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedBanner).map(([key, value]) => (
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
                        <Typography variant="h6" fontWeight="bold">Add New Banner</Typography>
                        <IconButton onClick={handleCloseAddModal}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Banner Name"
                            name="banner_Name"
                            value={addFormData.banner_Name}
                            onChange={handleAddInputChange('banner_Name')}
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
                        
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Image URL"
                            name="img"
                            value={addFormData.img}
                            onChange={handleAddInputChange('img')}
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
                              onClick={handleAddBanner}
                            >
                              Save Banner
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
            <Typography variant="h6">Edit Banner</Typography>
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
            Are you sure you want to delete this banner?
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

export default BannerTable;
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
import CloseIcon from "@mui/icons-material/Close";

const columns = [
  { id: "SI_no", label: "SI NO.", flex: 1, minWidth: 50 },
  { id: "Code", label: "Code", flex: 1,  minWidth: 100 },
  { id: "Discount_Value", label: "Discount Value", flex: 1, minWidth: 150 },
  { id: "Description", label: "Description", flex: 1, minWidth: 180 },
  { id: "Valid_From", label: "Valid From", flex: 1,  minWidth: 180 },
  { id: "Valid_To", label: "Valid To", flex: 1, minWidth: 180 },
  { id: "Status", label: "Status", flex: 1 },
  { id: "action", label: "Action", flex: 1 },
];

function createData(SI_no, Code, Discount_Value, Description, Valid_From, Valid_To, Status) {
  return { SI_no, Code, Discount_Value, Description, Valid_From, Valid_To, Status };
}

const rows = [
  createData("1", "dz1234", "25%", "Hp Window", "2025-03-10", "2025-03-26", "active"),
  createData("2", "89234", "50%", "Vivo T3x", "2025-03-09", "2025-03-17", "expired"),
  createData("3", "p34w56", "60%", "Boat earbuds", "2025-03-26", "2025-04-06", "upcoming"),
  createData("4", "JA3245", "25%", "Oppo", "2025-03-13", "2025-03-23", "active"),
  createData("5", "K234", "15%", "Asus Vivobook 15", "2025-03-17", "2025-03-20", "active"),
  createData("6", "r5346", "50%", "Ac", "2025-03-01", "2025-03-15", "expired"),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState(rows);
  const [selectedDiscount, setSelectedDiscount] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({});
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    textAlign: "center",
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedDiscount(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedDiscount(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDiscount(null);
  };

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value,
    });
  };

  const handleUpdate = () => {
    console.log("Updating discount:", editFormData);
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    console.log("Deleting discount:", selectedDiscount);
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
            Discount Details
          </Typography>
          <IconButton onClick={handleCloseViewModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        {selectedDiscount && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Code:</strong> {selectedDiscount.Code}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Discount Value:</strong> {selectedDiscount.Discount_Value}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Description:</strong> {selectedDiscount.Description}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Valid From:</strong> {selectedDiscount.Valid_From}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Valid To:</strong> {selectedDiscount.Valid_To}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Status:</strong> {selectedDiscount.Status}</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  );

  const renderEditModal = () => (
    <Modal open={editModalOpen} onClose={handleCloseEditModal}>
      <Box sx={modalStyle}>
        <Typography variant="h6">Edit Discount</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Code"
              value={editFormData.Code || ""}
              onChange={handleEditInputChange("Code")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discount Value"
              value={editFormData.Discount_Value || ""}
              onChange={handleEditInputChange("Discount_Value")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={editFormData.Description || ""}
              onChange={handleEditInputChange("Description")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Valid From"
             type="date" 
              value={editFormData.Valid_From || ""}
              onChange={handleEditInputChange("Valid_From")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Valid To"
              type="date"
              value={editFormData.Valid_To || ""}
              onChange={handleEditInputChange("Valid_To")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={editFormData.Status || ""}
                onChange={handleEditInputChange("Status")}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="expired">Expired</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
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
    <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
      <Box sx={deleteModalStyle}>
        <Typography variant="h6">Confirm Delete</Typography>
        <Typography>Are you sure you want to delete this discount?</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
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
    <Paper sx={{ width: "100%", overflow:"hidden" }}>
      <TableContainer  className="table" style={{ overflow:"auto", maxWidth: "100%",fontSize: "12px",
          marginLeft: "20px",
          marginTop: "0px",
          marginRight: "20px",}}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead >
            <TableRow  >
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                  
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.SI_no}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === "Status" ? (
                        <FormControl fullWidth>
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={row.Status}
                            onChange={(e) =>
                              handleDropdownChange("Status", e.target.value, row.SI_no)
                            }
                          >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                            <MenuItem value="expired">Expired</MenuItem>
                            <MenuItem value="upcoming">Upcoming</MenuItem>
                          </Select>
                        </FormControl>
                      ) : column.id === "action" ? (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <IconButton onClick={() => handleView(row)} style={{color :"blue"}}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton onClick={() => handleEdit(row)} style = {{color:"green"}}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(row)} style={{color:"red"}}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
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
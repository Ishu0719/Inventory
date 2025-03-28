
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
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const columns = [
  { id: "SI_no", label: "SI NO.", flex: 1, minWidth: 50 },
  { id: "Code", label: "Code", flex: 1, align: "right", minWidth: 100 },
  { id: "Discount_Value", label: "Discount Value", flex: 1, align: "right", minWidth: 150 },
  {
    id: "Description",
    label: " Description",
    flex: 1,
    align: "right",
    minWidth: 180,
  },
  { id: "Valid_From", label: "Valid From", flex: 1, align: "right", minWidth: 180 },
  {
    id: "Valid_To",
    label: "Valid To",
    flex: 1,
    align: "right",
    format: (value) => value.toFixed(2),
  },
 
  { id: "Status", label: " Status", flex: 1, align: "right" },
  { id: "action", label: "Action", flex: 1, align: "center" },
];

function createData(
  SI_no,
  Code,
  Discount_Value,
  Description,
  Valid_From,
  Valid_To,
  
  Status,
) {
  return {
    SI_no,
    Code,
  Discount_Value,
  Description,
  Valid_From,
  Valid_To,
    
    Status
   
  };
}

const rows = [
  createData(
    "1",
    "dz1234",
    "25%",
    "Hp Window",
    "10-03-25",
    "26-03-25",
    "active",
    
  ),
  createData(
    "2",
    "89234",
    "50%",
    "Vivo T3x",
    "09-03-25",
    "17-03-25",
    "expired",
  ),
  createData(
    "3",
    "p34w56",
    "60%",
    "Boat earbuds",
    "26-03-25",
    "06-04-25",
    "Upcoming",
  ),
  createData(
    "4",
    "JA3245",
    "25%",
    "Oppo",
    "13-03-25",
    "23-03-25",
    "active",
  ),
  createData(
    "5",
    "K234",
    "15%",
    "Asus Vivobook 15",
    "17-03-25",
    "20-03-25",
    "active",
  ),
  createData(
    "6",
    "r5346",
    "50%",
    "Ac",
    "01-03-25",
    "15-03-25",
    "expired",
  ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState(rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id) => {
    console.log("Delete item with ID:", id);
    // You can perform your delete logic here
  };

  const handleEdit = (id) => {
    console.log("Edit item with ID:", id);
    // You can open a modal or perform your edit logic here
  };

  const handleView = (id) => {
    console.log("View item with ID:", id);
    // You can show more details of the item here
  };

  const handleDropdownChange = (columnId, value, SI_no) => {
    const updatedRows = data.map((row) =>
      row.SI_no === SI_no ? { ...row, [columnId]: value } : row
    );
    setData(updatedRows);
  };

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
                              <MenuItem value="expired">Expired</MenuItem>
                              <MenuItem value="Upcoming">Upcoming</MenuItem>
                             
                            </Select>
                          </FormControl>
                        ) : column.id === "action" ? (
                          <div style={{ display: "flex" }}>
                            <IconButton
                              onClick={() => handleView(row.SI_no)}
                              color="black"
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleEdit(row.SI_no)}
                              color="black"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(row.SI_no)}
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
    </Paper>
  );
}
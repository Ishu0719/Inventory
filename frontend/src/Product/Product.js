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
  { id: "Product_Name", label: "Product Name", flex: 1, align: "right", minWidth: 150 },
  { id: "SKU", label: "SKU", flex: 1, align: "right", minWidth: 150 },
  {
    id: "Product_Description",
    label: "Product Description",
    flex: 1,
    align: "right",
    minWidth: 180,
  },
  { id: "Category", label: "Category", flex: 1, align: "right", minWidth: 180 },
  {
    id: "Cost_Price",
    label: "Cost Price",
    flex: 1,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Selling_Price",
    label: "Selling Price",
    flex: 1,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  { id: "Quantity", label: " Quantity", flex: 1, align: "right" },
  { id: "Status", label: " Status", flex: 1, align: "right" },
  { id: "action", label: "Action", flex: 1, align: "center" },
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

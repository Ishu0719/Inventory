import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function SearchBarWithButton() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddClick = () => {
    console.log("Add button clicked");
    // Add your logic here
  };

  return (
    <Box
      display="flex"
      justifyContent="right"
      alignItems="left"
      sx={{ padding: 2, gap: 3 }}
    >
      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        sx={{ maxWidth: 400 }}
      />

      {/* Add Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        startIcon={<AddIcon />}
      >
        Add New
      </Button>
    </Box>
  );
}

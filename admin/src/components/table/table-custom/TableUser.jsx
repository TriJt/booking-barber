import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function TableUser({ title, row, column, setRowId }) {
  const [pageSize, setPageSize] = useState(5);
  return (
    <Box
      sx={{
        height: 420,
        width: "100%",
      }}
    >
      <Typography
        variant="h5"
        component="h5"
        sx={{
          textAlign: "left",
          mt: 3,
          mb: 3,
          ml: 2,
          fontSize: 20,
          fontFamily: "Barlow Condensed, Arial, sans-serif ",
          textTransform: "uppercase",
          letterSpacing: 2,
          fontWeight: 600,
          color: "#CE9461",
        }}
      >
        {title}
      </Typography>
      <DataGrid
        columns={column}
        rows={row}
        getRowId={(row) => row._id}
        sx={{ fontSize: 11, padding: 0 }}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
}

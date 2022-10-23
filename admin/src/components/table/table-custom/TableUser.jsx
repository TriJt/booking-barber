import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export default function TableUser({
  title,
  row,
  column,
  rowId,
  setDeleted,
  deletedId,
  setRowId,
}) {
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
          color: "#CE9461",
        }}
      >
        {title}
      </Typography>
      <DataGrid
        columns={column}
        rows={row}
        getRowId={(row) => row._id}
        sx={{ fontSize: 11 }}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        checkboxSelection
        disableSelectionOnClick
        // onSelectionModelChange={(ids) => {
        //   setDeleted(ids);
        //   console.log(ids);
        // }}
        onCellClick={(params) => setDeleted(params.id)}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
}
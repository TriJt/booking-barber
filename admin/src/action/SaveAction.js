import { useEffect, useState } from "react";
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import axios from "axios";
import { green } from "@mui/material/colors";

export const SaveStaff = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      const data = {
        StaffId: params.row._id,
        Name: params.row.Name,
        Telephone: params.row.Telephone,
        Active: params.row.Active,
        Salary: params.row.Salary,
        Gender: params.row.Gender,
      };
      const response = await axios.put(
        "http://localhost:8800/api/staff/update/" + rowId,

        data
      );
      const record = response.data;
      if (record.statusText === "Success") {
        setSuccess(true);
        setRowId(null);
      }
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            backgroundColor: green[700],
            "&hover": { backgroundColor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

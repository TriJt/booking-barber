import { useEffect, useState } from "react";
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save, Delete } from "@mui/icons-material";
import axios from "axios";
import { red } from "@mui/material/colors";

export const DeleteStaff = ({ params, Id, deletedId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      const data = {
        StaffId: params.row._id,
      };
      const response = await axios.put(
        "http://localhost:8800/api/staff/delete/" + Id,
        data
      );
      const record = response.data;
      console.log(Id);
      if (record.statusText === "Success") {
        setSuccess(true);
      }
      setLoading(false);
    }, 500);
  };
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
            backgroundColor: red[700],
            "&hover": { backgroundColor: red[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="error"
          sx={{
            width: 40,
            height: 40,
          }}
          onClick={() => {
            if (window.confirm("Delete this staff?")) {
              handleSubmit();
            }
          }}
        >
          <Delete />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: red[500],
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

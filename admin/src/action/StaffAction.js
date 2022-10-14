import { useState } from 'react'
import { Box, CircularProgress, Fab } from "@mui/material"
import { Check, Save } from "@mui/icons-material"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StaffAction({params, rowId, setRowId}) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async () => { 
        setLoading(true)
        setTimeout(async () => {
            const data = { 
            StaffId: params.row._id,
                Name: params.row.Name,
                Telephone: params.row.Telephone,
                Number: params.row.Number,
                Street: params.row.Street,
                District: params.row.District,
                City: params.row.City,
                Gender: params.row.Gender,
        }; 
        try {
            const response = await axios.put(
                "http://localhost:8800/api/staff/update/" + rowId,
                
                    data
                
            );
            const record = response.data;
            console.log("data", params.row)
            console.log("result"
                , record)
            if (record.statusText === "Success") {
                setSuccess(true); 
                setRowId(null)
            } else {
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            }
            }, 1000)
    }

    return (
      
      <Box
          sx={{
              m: 1, 
              position: "relative", 
              
          }}>
          {
              success ? 
                  (
                      <Fab
                          color="primary"
                          sx={{
                              width: 40,
                              height: 40, 
                              bgcolor: 'green[500]', 
                              '&hover':{bgcolor: 'green[700]'}
                          }}
                      >
                          <Check/>
                    </Fab>
                  ) : (
                      <Fab
                          color="primary"
                          sx={{
                              width: 40,
                              height: 40
                          }}
                          disabled={params.id !== rowId || loading}
                          onClick = {handleSubmit}
                      >
                          <Save/>
                        </Fab>)}
            < ToastContainer />
          {
              loading && (
                  <CircularProgress
                      size={52}
                      sx={{
                          color: 'green[500]', 
                          position: 'absolute', 
                          top: -6, 
                          left: -6, 
                          zIndex: 1, 

                      }}
                  />
          )
          }
          
    </Box>
  )
}

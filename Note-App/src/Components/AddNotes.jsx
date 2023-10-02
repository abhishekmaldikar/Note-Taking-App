import { 
  Container,
  Paper, 
  Typography, 
  Box ,
  TextField ,
  Button , 
} from '@mui/material'
import notes from '../assets/notes.svg'
import React from 'react'
import { axiosClient } from '../Utils/axiosClient';
import { useState } from 'react'
import { useNotesContext } from '../hooks/useNotesContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNotes = () => {

    const { dispatch } = useNotesContext();

    const [data, setData] = useState({title: '', description: ''});

    console.log(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            if(data.title && data.description){

              const response = await axiosClient.post("/posts/post-todo", data);
             
            if (response.data.statusCode === 201) {
              
              dispatch({type: 'CREATE_NOTES', payload: response.data.result });
              setData({title: '', description: ''});
              toast.success("Note Added Successfully");

            } else {

              toast.error("Failed to Add");
            }
            }else {
              toast.error("All fields are Required!!");
            }
          } catch (error) {

            console.error("Error creating task:", error);
          }
        
    }
    
  return (
    <div>

        <Box
        bgcolor='primary.main'
       
        >
            <Container>
            <ToastContainer/>
                <Box>
                    <img 
                    src={notes}
                    alt='/'
                    loading="lazy"
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        padding: 0,
                        margin: 0,
                      }
                    }
                    />
                </Box>
                <Box sx={{
                    display:"flex",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography variant='h4' color="secondary.main" sx={{
                        mt: 5
                    }} >Add Notes...</Typography>
                    <TextField 
                    margin="normal"
                    name='title'
                    value={data.title}
                    type={'text'}
                    variant='outlined' 
                    onChange={handleChange}
                    placeholder='Name'
                    sx={{
                        bgcolor: 'white',
                        width: {
                            lg : "400px",
                            md : "90%",
                            sm : "90%",
                            xs : "90%"
                        }
                    }}
                    />
                    <TextField
                    margin="normal"
                    name='description'
                    value={data.description}
                    type={'text'}
                    placeholder='Notes description...'
                    multiline
                    variant='outlined'
                    onChange={handleChange}
                    rows={8}
                    sx={{
                        bgcolor: 'white',
                        width: {
                            lg : "400px",
                            md : "90%",
                            sm : "90%",
                            xs : "90%"
                        }
                    }}
                    />
                    <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                    sx={{
                        mt: 1,
                        borderRadius: 1,
                        width: {
                            lg : "400px",
                            md : "90%",
                            sm : "90%",
                            xs : "90%"
                        },
                        height: "50px",
                        mb: 5
                        }}
                    >
                        <Typography sx={{
                            color : "white",
                        }}>
                        Add Notes
                        </Typography>
                    </Button>
                </Box>
                

            </Container>
        </Box>
    </div>
  )
}

export default AddNotes
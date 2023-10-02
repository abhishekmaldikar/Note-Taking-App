import { 
    Grid ,
    Container,
    Box,
    Typography,
    Paper,
    Button,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { axiosClient } from '../Utils/axiosClient';
import React , { useEffect, useState } from 'react';
import { useNotesContext } from '../hooks/useNotesContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllNotes = () => {

   const {notes, dispatch} = useNotesContext();

   const [selectedNote, setSelectedNote] = useState(null);
 

   const [editedNote, setEditedNote] = useState({ title: "", description: "" });
   console.log("",editedNote);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosClient.put(`/posts/${selectedNote._id}`, {
        title: editedNote.title,
        description: editedNote.description,
      });
        console.log(response);
      if (response.data.statusCode === 200) {
        dispatch({ type: 'UPDATE_NOTE', payload: response.data.result });
        console.log("Note updated successfully");
        setOpen(false); 
        toast.success("Note Updated")
      } else {
        console.log("Error updating note");
        toast.error("Unable to update the note")
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Unable to update the note")
    }
  };

   const handleEdit = (note) => {
    setSelectedNote(note);
    setEditedNote({ title: note.title, description: note.description }); 
    setOpen(true);
  };
   const [open, setOpen] = useState(false);

    const note =[
        {
        title : "hello hi dua",
        discription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet."
        },
        {
            title : "hello hi dua",
            discription : "Play  football and have fun"
        },
        {
            title : "hello hi dua",
            discription : "Play  football and have fun"
        },
        {
            title : "hello hi dua",
            discription : "Play  football and have fun"
        },
        {
            title : "hello hi dua",
            discription : "Play  football and have fun"
        }
]        

const fetchData = async () => {
    try {

      const response = await axiosClient.get("/posts/all");
     console.log(response);
      if (response.data.statusCode === 200) {

        const data = response.data.result;
        console.log(data);
        dispatch({type: 'SET_NOTES', payload: data});

      } else {
        console.error("Request failed with status code:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };
useEffect(() => {
    fetchData();
  }, []);

const handleDelete = async(noteId) => {
    try {
        const response = await axiosClient.delete(`/posts/${noteId}`,{
            method: 'DELETE'
        });
        if (response.data.statusCode === 200) {
            console.log(`Im in if block and ${response.data.result}`);
            dispatch({type: 'DELETE_NOTE',payload: response.data.result})
            toast.success("Note Deleted Successfully");
        }else{
            console.log("Error Deleting Note")
            toast.error("Error Deleting Note");
        }
    }catch (error){
        console.log(error);
    }
}


  return (
    <div>
        
        <Box
        bgcolor='primary.main'
        >
        <ToastContainer/>
            <Container >
            <Typography 
            color='secondary.main' 
            ariant='h3' 
            py={2}
            sx={{
                fontSize: {
                    md: 50,
                    sm: 40,
                    xs: 30
                }
            }}
            >
                My Notes
            </Typography>
            <Grid
             container spacing={2}
             sx={{
                py : 3,
             }}
            >
            {notes.map((data,index) =>(
                <>
               <Grid
               item xs={12} sm={6} md={3}
               sx={{
                   display: "flex",
                   justifyContent: "center",

               }}
               > 
                
                <Paper elevation={3}
                sx={{
                    height : "300px",
                    width : "300px",
                    '&:hover': {
                        boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.3)',
                      },
                }}
                >
                    <Box
                    sx={{
                        display : 'flex',
                        justifyContent : 'space-between',
                        alignItems: 'center'

                    }}
                    bgcolor=" #fff7ec"
                    >
                    <Typography variant='h6' p={1} color="GrayText">
                        {data.title}
                    </Typography>
                    <Box>

                    <IconButton onClick={() => handleEdit(data)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(data._id)} >
                        <HighlightOffIcon/>
                    </IconButton>

                    </Box>
                    </Box>
                    <Typography p={1} color="GrayText" id={data._id}>
                        {data.description}
                    </Typography>
                </Paper>
                </Grid>
            </>
                
            ))}
            </Grid>
            </Container>

            <Dialog
  open={open}
  onClose={() => setOpen(false)} 
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title" align='center' variant='h4'>
    {"Make Changes!"}
  </DialogTitle>
  <DialogContent>
    {selectedNote && (
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"            
      >
        <TextField
        id="outlined-multiline-static"
        placeholder='Title'
        rows={8}
        name="title"
        value={editedNote.title}
        onChange={handleChange}
        sx={{
          bgcolor: 'white',
          width: {
            lg: "400px",
            md: "98%",
            sm: "98%",
            xs: "98%"
          }
        }}
        />
    
        <TextField
        id="outlined-multiline-static"
        multiline
        placeholder='description'
        rows={8}
        name="description"
        value={editedNote.description}
        onChange={handleChange}
        sx={{
          bgcolor: 'white',
          width: {
            lg: "400px",
            md: "98%",
            sm: "98%",
            xs: "98%"
          }
        }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpdate}
          sx={{
            mt: 1,
            borderRadius: 1,
            width: {
              lg: "400px",
              md: "98%",
              sm: "98%",
              xs: "98%"
            },
            height: "50px",
            mb: 5
          }}
        >
          <Typography 
          sx={{
            color: "white",
          }}>
            Update!
          </Typography>
        </Button>
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button color='secondary' onClick={() => setOpen(false)} autoFocus>
      Close
    </Button>
  </DialogActions>
</Dialog>
            
        </Box>
    </div>
  )
}

export default AllNotes
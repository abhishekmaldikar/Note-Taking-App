const TodoPosts = require('../models/todoPosts');
const {error , success} = require('../Utils/responseWrapper');


const getAllNotesController = async(req,res) =>{
    try {
        const posts = await TodoPosts.find();
        res.send(success(200,posts));
    } catch (e) {
        res.send(error(500,e))
    }
}

const postNoteController = async(req,res) =>{
    try {
        const {title , description} = req.body;

        if(!title || !description){
            res.send(error(400,"All Fields are required"));
        }

        const newPost = await TodoPosts.create({

            title : title,
            description : description

        })
        console.log(newPost);
        res.send(success(201,newPost));



    } catch (e) {
        res.send(error(500,e));
    }
}

const deleteNoteController = async(req,res) => {

    try {
    
    const { postId } = req.params;

    const post = await TodoPosts.findById(postId);

    if (!post) {
      return res.send(error(404,"No such post exists"))
    }

    const deletedNote = await TodoPosts.findByIdAndRemove(postId);
    

    res.send(success(200,deletedNote));
    } catch (e) {
       res.send(error(500,e));
    }
    
}

const updateNoteController = async(req,res) => {

    try {

    const { todoId } = req.params;
    const { description , title } = req.body;

    if(!description && !title){
        res.send(error(400,"Any One field is Required!"));
    }
  
    const todo = await TodoPosts.findById(todoId);

    if (!todo) {
      return res.send(error(404,"No such post exists"))
    }
    const updatedPost = await TodoPosts.findByIdAndUpdate(todoId, { title: title,description: description }, { new: true });

    res.send(success(200,updatedPost));

    } catch (e) {
       res.send(error(500,e));
    }
    
}



module.exports = {
    getAllNotesController,
    postNoteController,
    deleteNoteController,
    updateNoteController
}
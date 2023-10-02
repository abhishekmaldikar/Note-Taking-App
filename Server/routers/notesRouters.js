const router = require('express').Router();
const postRouters = require('../controllers/todoPostController')

router.get('/all',postRouters.getAllNotesController);
router.post('/post-todo',postRouters.postNoteController);
router.delete('/:postId',postRouters.deleteNoteController);
router.put('/:todoId',postRouters.updateNoteController);

module.exports= router;
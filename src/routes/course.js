const express = require('express');
const router = express.Router();

const courseController = require('../app/controller/CourseController');

router.get('/create', courseController.create);
router.delete('/:id', courseController.delete);
router.get('/:id/edit', courseController.edit)
router.put('/:id', courseController.update);
router.post('/store', courseController.store);
router.post('/comment', courseController.comment)
router.get('/playlists/:id', courseController.showList);
router.get('/:slug', courseController.show);

module.exports = router;

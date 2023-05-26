const { Router } = require('express');
const router = Router();
const { createItem, getItems, getItemById, updateItem, deleteItem } = require('./controllers');

// CREATE
// PATH: /api/items
router.post('/items', createItem);

// READ
router.get('/items', getItems);
router.get('/items/:id', getItemById);

// UPDATE
router.put('/items/:id', updateItem);

// DELETE
router.delete('/items/:id', deleteItem);

module.exports = router;
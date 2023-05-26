let items = [];

// Create a new item
const createItem = (req, res) => {
  const { name, description } = req.body;
  const newItem = { id: items.length + 1, name, description };
  items.push(newItem);
  res.status(201).json(newItem);
};

// Get all items
const getItems = (req, res) => {
  res.json(items);
};

// Get item by ID
const getItemById = (req, res) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === parseInt(id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

// Update an item
const updateItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const item = items.find((item) => item.id === parseInt(id));
  if (item) {
    item.name = name;
    item.description = description;
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

// Delete an item
const deleteItem = (req, res) => {
  const { id } = req.params;
  const itemIndex = items.findIndex((item) => item.id === parseInt(id));
  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem[0]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
};
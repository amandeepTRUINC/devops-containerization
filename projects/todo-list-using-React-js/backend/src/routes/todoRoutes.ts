import { Router } from 'express';
import Todo from '../models/Todo';

const router = Router();

// GET /todos - paginated
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [todos, total] = await Promise.all([
      Todo.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Todo.countDocuments(),
    ]);

    res.json({
      todos,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /todos - create new todo
router.post('/', async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }
    const todo = await Todo.create({ description });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /todos/:id - update isCompleted or description
router.patch('/:id', async (req, res) => {
  try {
    const update: any = {};
    if (typeof req.body.isCompleted === 'boolean') {
      update.isCompleted = req.body.isCompleted;
    }
    if (typeof req.body.description === 'string') {
      update.description = req.body.description;
    }
    if (Object.keys(update).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /todos/:id - delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted', _id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 
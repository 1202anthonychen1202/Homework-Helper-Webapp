const express = require('express');
const {
    createAssignment,
    getAssignments,
    getAssignment,
    deleteAssignment,
    updateAssignment
} = require('../controllers/assignmentController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// require auth for all assignment routes
router.use(requireAuth)

// GET all assignments
router.get('/', getAssignments);

// GET a single assignment
router.get('/:id', getAssignment);

// POST a new assignment
router.post('/', createAssignment);

// DELETE a assignment
router.delete('/:id', deleteAssignment);

// UPDATE a assignment
router.patch('/:id', updateAssignment);

module.exports = router;
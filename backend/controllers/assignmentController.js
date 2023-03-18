const Assignment = require('../models/assignmentModel');
const mongoose = require('mongoose');

// get all assignments
const getAssignments = async (req, res) => {
    const user_id = req.user._id

    const assignments = await Assignment.find({ user_id }).sort({createdAt: -1});

    res.status(200).json(assignments);
}; 

// get a single assignment
const getAssignment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such assignment'});
    }

    const assignment = await Assignment.findById(id);

    if (!assignment) {
        return res.status(404).json({error: 'No such assignment'});
    }

    res.status(200).json(assignment);
};

// create new assignment
const createAssignment = async (req, res) => {
    const {title, schoolClass, date} = req.body;

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!schoolClass) {
        emptyFields.push('schoolClass')
    }
    if (!date) {
        emptyFields.push('date')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to db
    try{
        const user_id = req.user._id
        const assignment = await Assignment.create({title, schoolClass, date, user_id});
        res.status(200).json(assignment);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// delete a assignment
const deleteAssignment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such assignment'});
    }

    const assignment = await Assignment.findOneAndDelete({_id: id});

    if (!assignment) {
        return res.status(404).json({error: 'No such assignment'});
    }
    
    res.status(200).json(assignment);
};

// update a assignment
const updateAssignment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such assignment'});
    }

    const assignment = await Assignment.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!assignment) {
        return res.status(404).json({error: 'No such assignment'});
    }

    res.status(200).json(assignment);
};

module.exports = {
    getAssignments,
    getAssignment,
    createAssignment,
    deleteAssignment,
    updateAssignment
}

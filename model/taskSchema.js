const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
    taskName: {
        type: String
    },
    taskDescription: {
        type: String
    },
    taskDate: {
        type: Date
    },
    taskProgress: {
        type: String,
        enum: ['New Task', 'Inprogress', 'Completed', 'Archived'],
        default: "New Task"
    }
});

module.exports = mongoose.model('Task', Task);
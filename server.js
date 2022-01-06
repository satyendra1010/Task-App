const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = express.Router();
let PORT = process.env.PORT;
let Task = require('./model/taskSchema');
const path = require("path")

const app = express();

app.use(cors());
app.use(bodyParser.json());

if(PORT == null || PORT ==""){
    PORT = 4000;
}

// ... other app.use middleware 
app.use(express.static(path.join(__dirname)))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Task-list", "build", "index.html"));
});

mongoose.connect('mongodb+srv://admin-satyendra:Satyendra@cluster0.umgkv.mongodb.net/TaskDB', { useNewUrlParser: true });
const connection = mongoose.connection;

// Once the connection is established, callback
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

taskRoutes.route('/').get( (req,res) => {
    Task.find((err, tasks) => {
        if(err)
            console.log(err);
        else {
            res.json(tasks);
        }
    });
});

taskRoutes.route('/:id').get((req,res) => {
    const id = req.params.id;
    Task.findById(id, (err,task) => {
        res.json(task);
    });
});

taskRoutes.route('/add').post((req,res) => {
    const task = new Task(req.body);
    task.save()
        .then( task => {
            res.status(200).json({'task': 'task added successfully'});
        })
        .catch( err => {
            res.status(400).send('adding new task failed');
        });
});

taskRoutes.route('/update/:id').post((req,res) => {
    Task.findById(req.params.id, (err, task) => {
        if(!task)
            res.status(404).send('Data is not found');
        else {
            task.taskName = req.body.taskName;
            task.taskDescription = req.body.taskDescription;
            task.taskDate = req.body.taskDate;
            task.taskProgress = req.body.taskProgress;
            task.save().then( task => {
                res.json('Task updated');
            })
            .catch( err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});
taskRoutes.route('/delete/:id').post((req,res) => {
    Task.findByIdAndRemove(req.params.id, (err, task)=>{
        if(!task)
        {
            res.status(404).send('Data is not found');
        }
        else{
            res.status(200).json({
                msg: task
            })
        }
})
}); 

app.use('/tasks', taskRoutes);

app.listen( PORT, () => {
    console.log("Server is running on port " + PORT);
});


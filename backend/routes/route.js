const express = require('express');
const taskData = require('../model/taskData');
const router = express.Router()
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/upload', async (req, res) => {
    const todos =req.body
    try {
        await taskData.insertMany(todos);    
        res.status(200).send("Updated Successfully");
      } catch (error) {
        res.status(400).json({message: error.message});
      }
});
router.get('/view', async (req, res) => {
    try {
        const todos = await taskData.find();    
        res.json(todos)
      } catch (error) {
        res.status(500).json({message: error.message});
      }
});

router.put('/user/update/:id', async (req, res) => {
  try {
    const updateTask = await taskData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updateTask);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.delete('/user/delete/:id', async (req, res) => {
  try {
    const deleteTask = await taskData.findByIdAndRemove(req.params.id);
    res.json(deleteTask);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});
  

module.exports=router;
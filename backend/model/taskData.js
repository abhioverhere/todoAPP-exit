const mongoose=require ('mongoose');
const task=mongoose.Schema({
    text:String,
    completed:Boolean
})
const taskData=mongoose.model('taskdatas',task);
module.exports=taskData;
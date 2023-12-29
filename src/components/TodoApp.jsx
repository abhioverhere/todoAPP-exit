import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import { Button, Checkbox, Fab, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, TextField } from '@mui/material';
import axiosInst from '../axiosInst'
import { useNavigate } from 'react-router-dom';
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate()
    useEffect(() => {
        axiosInst.get('/user/view')
          .then(res => setTodos(res.data))
          .catch((error) => console.error('Error:', error));
      }, []);
      
      const handleClick = (e) => {
        navigate('/update')
      };

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  

  const addTodo = () => {
    if(input===''){
        alert('Blank')
    }else{
    setTodos([...todos, { text: input, completed: false }]);
    setInput('');}
  };

  const toggleTick = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);

    axiosInst.put(`/user/update/${newTodos[index]._id}`, newTodos[index])
    .then(response => console.log('Success:', response.data))
    .catch((error) => console.error('Error:', error));
  };


  const delTodo = (index) => {
    const newTodos = [...todos];
    const toDelete = newTodos[index];
    newTodos.splice(index, 1);
    setTodos(newTodos);

    axiosInst.delete(`/user/delete/${toDelete}`, toDelete)
    .then(res => console.log('Success:', res.data))
    .catch((error) => console.error('Error:', error));    
  };

  const handleFiltering = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {    
    axiosInst.post('/user/upload',todos)    
  };

  return (
    <Grid>
    <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}></Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <h1>To-Do APP</h1>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}></Grid>
    </Grid>
    <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}></Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Grid container>
                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                    <TextField id="outlined-basic" label="New Task Description" variant="outlined" fullWidth value={input} onChange={e => setInput(e.target.value)}/>  
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} paddingLeft='2%'>
                    <Fab color="primary" aria-label="add" onClick={addTodo}>
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>
            <Grid container className="sorting">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Sort:</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="all" control={<Radio />} label="All" checked={filter === 'all'} onChange={handleFiltering} />
                    <FormControlLabel value="completed" control={<Radio />} label="Completed" checked={filter === 'completed'} onChange={handleFiltering} />
                    <FormControlLabel value="incomplete" control={<Radio />} label="Incomplete" checked={filter === 'incomplete'} onChange={handleFiltering} /> 
                  </RadioGroup>
                </FormControl>
            </Grid>
            {todos.filter(todo =>{
            if (filter === 'all') return true;
            if (filter === 'completed') return todo.completed;
            if (filter === 'incomplete') return !todo.completed;
            }).map((todo, index) => (
              <Grid key={index}>
                <Grid container>
                  <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Checkbox {...label} color="primary" checked={todo.completed} onChange={() => toggleTick(index)} />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                    <span style={{ textDecoration: todo.completed ? 'line-through' : '' }}>{todo.text}</span>
                  </Grid>
                  <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Fab color="primary" aria-label="del" onClick={() => delTodo(index)} >
                        <DeleteIcon/>
                    </Fab>  
                  </Grid>                      
                </Grid>                            
            </Grid>))}
            <Button variant="contained" fullWidth onClick={handleSubmit}>Update Task List</Button>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={12}></Grid>
    </Grid>
    </Grid>
    
  );
};

export default TodoApp;

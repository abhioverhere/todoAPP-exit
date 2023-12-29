import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup} from '@mui/material';
import axiosInst from '../axiosInst'
import { useNavigate } from 'react-router-dom';
const TaskView = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate()
    useEffect(() => {
        axiosInst.get('/user/view')
          .then(res => setTodos(res.data))
          .catch((error) => console.error('Error:', error));
      }, []);

      const handleFiltering = (e) => {
        setFilter(e.target.value);
      };
      const handleClick = (e) => {
        navigate('/update')
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
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  marginTop='3%'>
                    <span style={{ textDecoration: todo.completed ? 'line-through' : '' }}>{todo.text}</span>
                  </Grid>
                  <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>                    
                  </Grid>                      
                </Grid>                            
            </Grid>))}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}></Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}></Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} marginTop='3%'>
          <Button variant="contained" fullWidth onClick={handleClick}>Update Task List</Button>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}></Grid>
    </Grid>

    
    </Grid>
  )
}

export default TaskView

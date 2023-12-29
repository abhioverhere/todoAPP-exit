import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import axiosInst from '../axiosInst'

const TaskView = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    useEffect(() => {
        axiosInst.get('/user/view')
          .then(res => setTodos(res.data))
          .catch((error) => console.error('Error:', error));
      }, []);
  return (
    
    <div>
      
    </div>
  )
}

export default TaskView

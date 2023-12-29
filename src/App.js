import { Route, Routes } from 'react-router-dom';
import TodoApp from './components/TodoApp.jsx'
import TaskView from './components/TaskView.jsx'
import Main from '../src/pages/Main.jsx'
import './App.css';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Main child={<TaskView/>}/>}/>
      <Route path={'/update'} element={<Main child={<TodoApp/>}/>}/>
    </Routes>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import TodoApp from './components/TodoApp.jsx'
import Main from '../src/pages/Main.jsx'
import './App.css';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Main child={<TodoApp/>}/>}/>
    </Routes>
  );
}

export default App;

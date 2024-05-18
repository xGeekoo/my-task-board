import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import TaskBoard from './pages/TaskBoard';

function App() {
  return (
    <>
      <Routes>
        <Route path=":boardId?" element={<TaskBoard />} />
        <Route
          path="*"
          element={
            <Navigate to={`/${localStorage.getItem('boardId') || ''}`} />
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

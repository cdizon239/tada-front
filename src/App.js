import './App.css';
import {Routes, Route} from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { TodosLanding } from './components/TodosLanding';


function App() {
  return (
    <>
    <AppLayout>
      <Routes>
        <Route path='/' element={<TodosLanding/>}/>

      </Routes>
    </AppLayout>
    </>
  );
}

export default App;

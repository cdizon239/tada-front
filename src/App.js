import "./App.css";
import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from './themes/GlobalStyles';
import { AppLayout } from "./AppLayout";
import { TodosLanding } from "./components/TodosLanding";
import { TadasLanding } from "./components/TadasLanding";
import { light, dark } from './themes/theme';
import { CategoryDetail } from "./components/CategoryDetail";
import { Login } from './components/Login'


const AppContext = createContext();


function App() {
  return (
    <AppContext.Provider value={light}>
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <AppLayout >
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/todos" element={<TodosLanding />}></Route>
            <Route path="/tadas/*" element={<TadasLanding />}></Route>
            <Route path="/tadas/:categoryId" element={<CategoryDetail />}></Route>
          </Routes>
        </AppLayout>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;

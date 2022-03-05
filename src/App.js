import "./App.css";
import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyles from './themes/GlobalStyles';
import { AppLayout } from "./AppLayout";
import { TodosLanding } from "./components/TodosLanding";
import { light, dark } from './themes/theme';


const AppContext = createContext();


function App() {
  return (
    <AppContext.Provider value={light}>
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <AppLayout >
          <Routes>
            <Route path="/" element={<TodosLanding />}></Route>
          </Routes>
        </AppLayout>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;

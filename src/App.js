import React, { useState, useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import QuizCardParent from './components/QuizComponent/QuizCardParent';
import CMSHome from './components/CMSComponent/CMSHome';
import Login from './components/AuthComponents/Login/LoginForm';
import Register from './components/AuthComponents/Registration/RegistrationForm';
import AlertComponent from './components/AuthComponents/AlertComponent/AlertComponent';
import QuizHome from './components/QuizComponent/QuizHomeScreen';
import { rootReducer, initialState } from './reducers/QuizDataReducer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Context = React.createContext();
const { Provider } = Context;


function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = {
    dispatch,
    state,
    getState: () => state,
  };
  return (
    <Router>
      <Provider value={store}>
      <div className="App">
        <Header title={title}/>
        <Switch>
            <Route path="/login">
              <Login showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/register">
              <Register showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <PrivateRoute path="/create">
              <CMSHome />
            </PrivateRoute>
            <Route path="/quiz">
              <QuizCardParent />
            </Route>
            <Route path="/">
              <QuizHome />
            </Route>
        </Switch>
        <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
      </div>
      </Provider>
    </Router>
  );
}

export { Context, App as default };

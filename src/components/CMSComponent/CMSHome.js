import React,{ useState,useEffect } from 'react';
import FormInput from './FormInput';
import OptionsComponent from './OptionsComponent';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function CMSHome(props) {
  const [quizObject, handleQuizObjectUpdate] = useState({})
  useEffect(() => {
    axios.get(API_BASE_URL+'/user/me', { headers: { 'token': localStorage.getItem('login_access_token') }})
    .then(function (response) {
        if(response.status !== 200){
          redirectToLogin()
        }
    })
    .catch(function (error) {
      redirectToLogin()
    });
  })
  function redirectToLogin() {
    props.history.push('/login');
  }
  function updateQuizObject(objectToBeUpdated) {
    handleQuizObjectUpdate(Object.assign({}, quizObject, objectToBeUpdated));
  }
  function handleQuizObjectSubmit() {
    if(Object.keys(quizObject).length < 4) {
      alert("Please insert all fields");
    } else {
      axios.post(`${API_BASE_URL}/quiz/add_quiz_question`, quizObject, { headers: { 'token': localStorage.getItem('login_access_token') }})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  return (
    <div className="App col-12">
      <div className="container">
        <FormInput label={"question"} updateQuizObject={updateQuizObject} updateKey={"question"} />
        <OptionsComponent updateQuizObject={updateQuizObject} updateKey={"options"} />
        <FormInput label={"right answer"} updateQuizObject={updateQuizObject} updateKey={"rightAnswer"} />
        <FormInput label={"additional information"} inputType={"textarea"} updateQuizObject={updateQuizObject} updateKey={"additionalAnswerInfo"}/>
        <div>
          <button className="btn btn-primary"
                  onClick={() => handleQuizObjectSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CMSHome);

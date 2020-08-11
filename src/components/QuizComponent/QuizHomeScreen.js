import React,{useContext, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import { Context } from '../../App';
import {fetchQuizData} from '../../actions/QuizActions';
function QuizHome(props) {
    const { dispatch,state } = useContext(Context);
    useEffect(()=>{
        fetchQuizData(dispatch,state)
    },[dispatch, state]) 
    function goToQuizPage() {
        props.history.push("/quiz");
    }
    return(
        <div className="quiz-container d-flex flex-column justify-content-center">
            <div className="quiz-title h1">Quiz</div>
            <div className="quiz-description my-4">Test your general tech knowledge</div>
            <button className="btn btn-danger" onClick={()=>goToQuizPage()}>Play</button>
        </div>
    )
}

export default withRouter(QuizHome);
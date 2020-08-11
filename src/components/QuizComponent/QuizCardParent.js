import React, {useState, useContext} from 'react';
import { Context } from '../../App';
import QuizCardComponent from './QuizCardComponent';
import {withRouter} from 'react-router-dom';
import {fetchQuizData} from '../../actions/QuizActions';
function QuizCardParent(props) {
    const { state, dispatch } = useContext(Context);
    const { isFetchingQuizData, quizCardsData, errorMessage } = state;
    const [currentQuizCardIndex, updateQuizCardIndex] = useState(0);
    const [quizScore, updateQuizScore] = useState(0);
    const [shouldShowFinalScoreScreen, updateShouldShowFinalScoreScreen] = useState(false);
    function renderQuizCardComponent() {
        if(quizCardsData.length) {
            const currentQuizCard = quizCardsData[currentQuizCardIndex];
            return <QuizCardComponent 
                        quizCardData={currentQuizCard} 
                        updateQuizCardIndex={updateQuizCardIndex}
                        currentQuizCardIndex={currentQuizCardIndex}
                        quizCardsData={quizCardsData}
                        updateQuizScore={updateQuizScore}
                        quizScore={quizScore}
                        updateShouldShowFinalScoreScreen={updateShouldShowFinalScoreScreen}
                   />   
        } else {
            return null;
        }
    }
    function handleFetchRetry() {
            fetchQuizData(dispatch,state,true);
    }
    if(isFetchingQuizData) {
        return(
            <div className="loader d-flex justify-content-center align-items-center">
                <div className="spinner-border text-info" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            
        )
    }
    if(errorMessage) {
        return(
            <div className="loader d-flex justify-content-center align-items-center flex-column">
                <div className="mb-4 quiz-description">
                    Some error occurred while fetching question
                </div>
                <div className="mt-4">
                    <button className="btn btn-danger" onClick={() => handleFetchRetry()}>
                        Retry
                    </button>
                </div>
            </div>
        )
    }
    if(shouldShowFinalScoreScreen) {
        return(
            <div className="final-score d-flex justify-content-center align-items-center flex-column">
                <div className="mb-4 quiz-description">
                You Final Score is: {quizScore}
                </div>
                <div className="mt-4">
                    <button className="btn btn-danger" onClick={() => props.history.push("/")}>
                        Go to Home
                    </button>
                </div>
            </div>
        )
    }
    return(
       <div className="row d-flex justify-content-center mt-4">
           {renderQuizCardComponent()}
       </div>
    );
}
export default withRouter(QuizCardParent);
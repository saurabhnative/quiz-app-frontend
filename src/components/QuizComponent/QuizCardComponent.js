import React, {useState} from 'react';
import './QuizCardComponent.css'
import QuizAnswerPopUp from './QuizAnswerPopUp';
function QuizCardComponent(props) {
    const {quizCardData, updateQuizCardIndex, currentQuizCardIndex, quizCardsData, quizScore, updateQuizScore, updateShouldShowFinalScoreScreen} = props;
    const [shouldShowAnswer, updateShouldShowAnswer] = useState(false);
    const [selectedOption, updateSelectedOption] = useState(null);
    const [isInputDisabled, updateInputDisabledState] = useState(false);
    function handleCheckBoxSelection(key) {
        if(key === quizCardData.rightAnswer) {
            updateQuizScore(quizScore+1)
        }
        updateSelectedOption(key);
        updateShouldShowAnswer(true);
        updateInputDisabledState(true);
    }
    function renderQuizOptions() {
        const quizOptions = quizCardData.options;
        const optionsList = [];
        for(let key in quizOptions) {
            optionsList.push(
                <li className="list-group-item" key={key} onClick={() => handleCheckBoxSelection(key)}>
                    <div className="quiz-option d-flex align-items-center">
                    <div>{key}: {quizOptions[key]}</div>
                    <div className="form-check">
                    <div className="round">
                        <input className="form-check-input position-static" 
                            type="checkbox"
                            value="option1" 
                            aria-label="quizOption"
                            id={`${quizOptions[key]}`}
                            checked={selectedOption === key}
                            disabled={isInputDisabled}
                            readOnly={true} 
                        />
                        <label htmlFor={`${quizOptions[key]}`}></label>
                    </div>
                    
                    </div>
                    </div>
                </li>
            )
        }
        return (
            <ul className="list-group list-group-flush">
                {optionsList}
            </ul>
        )
    }
    function updateCurrentQuestion(index) {
        if(index >= 0 && index< quizCardsData.length) {
            updateQuizCardIndex(index);
            updateSelectedOption(null);
            updateShouldShowAnswer(false);
            updateInputDisabledState(false);
        } else {
            updateInputDisabledState(true);
            updateShouldShowAnswer(false);
            updateShouldShowFinalScoreScreen(true)
        }
    }
    function renderNextButton() {
        return(
            <div className="row d-flex justify-content-center mt-4 mb-5">
                <button className="btn btn-primary mr-4" onClick={() => updateCurrentQuestion(currentQuizCardIndex+1)}>
                    Next
                </button>
            </div>
        )
    }
    function renderShowAnswer() {
        if(shouldShowAnswer) {
            const correctAnswerKey = quizCardData.rightAnswer;
            const correctAnswerText = quizCardData.options[correctAnswerKey];
            return <QuizAnswerPopUp 
                        shouldShowAnswer={shouldShowAnswer}
                        correctAnswerText={correctAnswerText}
                        additionalAnswerInfo={quizCardData.additionalAnswerInfo}
                        updateCurrentQuestion={updateCurrentQuestion}
                        currentQuizCardIndex={currentQuizCardIndex}
                        isRightAnswer={selectedOption === quizCardData.rightAnswer}
                    />
        }
    }
    return(
        <div>
            <div className="card">
            <div className="card-header d-flex">
                <div>
                 Question {`${currentQuizCardIndex+1}/${quizCardsData.length}`}
                </div>
                <div className="ml-auto">
                    Score: {quizScore}    
                </div>
            </div>
            <div className={"questions-text mt-2 mb-4"}>{quizCardData.question}</div>
            {renderQuizOptions()}
            {renderShowAnswer()}
            {renderNextButton()}
            </div>
        </div>
    );
}
export default QuizCardComponent;
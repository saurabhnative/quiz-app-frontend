import React,{useEffect, useState} from 'react';
function QuizAnswerPopUp(props) {
    const { shouldShowAnswer, correctAnswerText,additionalAnswerInfo,updateCurrentQuestion,currentQuizCardIndex,isRightAnswer } = props;
    const [modalShow, toggleModal] = useState('');
    const [modalDisplay, toggleDisplay] = useState('none');
    const openModal = () => {
        toggleModal('show');
        toggleDisplay('block');     
    }
    const closeModal = () => {
        toggleModal('');
        toggleDisplay('none'); 
        updateCurrentQuestion(currentQuizCardIndex+1);
    }
    useEffect(() => {
        if(shouldShowAnswer) {
            openModal()
        }
    })
    return(
        <div className={`modal model-container fade mt-2 ${modalShow}`} 
            id="welcomeModal" 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="welcomeModalLabel" 
            aria-hidden="true"
            style={{ display: modalDisplay }}
        >
                <div className="modal-dialog" role="document">
                    <div className="modal-content modal-container">
                    <div className="modal-header">
                        <h5 className="modal-title" id="welcomeModalHeader">{isRightAnswer ? "Correct" : "Wrong"}</h5>
                        <button type="button" className="close" aria-label="Close" onClick={() => closeModal()}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body d-flex justify-content-center welcomePopUpBody flex-column">
                        <span className={'mb-2'}>
                            Correct answer is: {correctAnswerText}
                        </span>
                        <span className={'mt-2'}>
                            {additionalAnswerInfo}
                        </span>
                        <br></br>
                    </div>
                    <div className="modal-footer hv-center">
                        <button type="button" className="btn btn-secondary" onClick={() => closeModal()}>Close</button>
                    </div>
                    </div>
                </div>
        </div>
    )
}

export default QuizAnswerPopUp;
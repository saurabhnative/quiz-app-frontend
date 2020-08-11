import axios from 'axios';
import {API_BASE_URL} from '../constants/apiConstants';
export function fetchQuizData(dispatch,state,forcedRetry) {
    if(state.shouldFetchQuizData || forcedRetry) {
        dispatch({ type: 'FETCING_QUIZ_DATA' });
        axios.get(`${API_BASE_URL}/quiz/get_quiz_questions`)
            .then(function (response) {
                // handle success
                dispatch({ type: 'FETCHED_QUIZ_DATA', data: { 'quizCardsData': response.data } });
            })
            .catch(function (error) {
                // handle error
                dispatch({ type: 'FETCHING_QUIZ_DATA_ERROR', data: { 'errorMessage': error } });
                console.log(error);
            })
    }
}

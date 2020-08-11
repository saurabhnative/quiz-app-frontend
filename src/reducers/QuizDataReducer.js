export const initialState = {
    shouldFetchQuizData: true,
    isFetchingQuizData: false,
    quizCardsData: [],
    errorMessage: null
};

export const rootReducer = (state, action) => {
    switch (action.type) {
      case 'RETRY_FETCHING_DATA':
        return {
          ...state,
          shouldFetchQuizData: true
        };
      
      case 'FETCING_QUIZ_DATA':
        return {
          ...state,
          isFetchingQuizData: true,
          shouldFetchQuizData: false
        };
        
      case 'FETCHED_QUIZ_DATA':
        return {
          ...state,
          isFetchingQuizData: false,
          shouldFetchQuizData: false,
          quizCardsData: action.data.quizCardsData
        };

      case 'FETCHING_QUIZ_DATA_ERROR':
          return {
            ...state,
            isFetchingQuizData: false,
            shouldFetchQuizData: false,
            errorMessage: action.data.errorMessage
        };  
        
      default:
        return state;
    }
  };
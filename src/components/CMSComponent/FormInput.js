import React, {useState} from 'react';
function FormInput({label, inputType, updateQuizObject, updateKey}) {
    const [inputText, updateInputText] = useState("")
    function handleInputChange(e) {
        updateInputText(e.target.value);
        updateQuizObject({ [updateKey] : e.target.value})
    }
    function renderInputElement() {
        if(inputType === 'textarea') {
            return <textarea rows={10} 
                             className="form-control" 
                             id={`inputText${updateKey}`} 
                             placeholder={`Enter ${label}`}
                             value={inputText}
                             onChange={(e) => handleInputChange(e)}
                    />
        } else {
            return <input type="text" 
                          className="form-control" 
                          id={`inputText${updateKey}`}
                          placeholder={`Enter ${label}`} 
                          value={inputText}
                          onChange={(e) => handleInputChange(e)}
                    />    
        }
    }
    return(
        <div className="form-group row mt-3">
            <label htmlFor="inputText" className="col-sm-2 col-form-label">{`Enter ${label}`}</label>
            <div className="col-sm-10">
            {renderInputElement()}
            </div>
        </div>
    )
}
export default FormInput;
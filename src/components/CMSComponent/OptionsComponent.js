/**
 * Component to add answer options in a quiz
 */
import React,{useState} from 'react';
import FormInput from './FormInput';
function OptionsComponent({updateQuizObject, updateKey}) {
    const [optionsLength, setOptionsLength] = useState(2);
    const [optionValuesObject, updateOptionsObject] = useState({});
    function handleOptionsObject(optionObject){
        const newObject = Object.assign({},optionValuesObject,optionObject);
        updateOptionsObject(newObject);
        updateQuizObject({[updateKey]: newObject });
    } 
    function renderOptionsArray(){
        let optionsArray = []
        for(let i=0; i < optionsLength; i++) {
           optionsArray.push(
               <div key={i}>
                   <FormInput label={`Option ${String.fromCharCode(65+i)}`} 
                              updateQuizObject={handleOptionsObject} 
                              updateKey={String.fromCharCode(65+i)}
                    />
               </div>
           )     
        }
        return optionsArray;
    }
    function renderOptionAdditionButton() {
        return(
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary mr-4" onClick={() => setOptionsLength(optionsLength + 1)}>
                    Add option +
                </button>
                <button className="btn btn-primary" onClick={() => setOptionsLength(optionsLength - 1)}>
                    Remove option -
                </button>
            </div>
        )
    }
    return (
        <div>
            {renderOptionsArray()}
            {renderOptionAdditionButton()}
        </div>
    );
}
export default OptionsComponent;  
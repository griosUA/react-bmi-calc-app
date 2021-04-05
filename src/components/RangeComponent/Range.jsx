import React from 'react';

const Range = ({label, maxValues, emitValues}) => {

    // https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
    const [state, setState] = React.useState({
        height: '',
        weight: ''
    })

    const outputData = {
        height: '',
        weight: ''
    }

    const handleOnchangeEvent = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });

     /*   if (label === 'Height') {
            setState({
                ...state,
                height: e.target.value
            });
           // outputData.height = e.target.value
        } else {
            setState({
                ...state,
                weight: e.target.value
            });
           // outputData.weight = e.target.value
        }*/

        console.log(state)
     //   emitValues(outputData)
    }

    return (
        <div>
            <label htmlFor="rangeInput">{label}</label>
            <input id='rangeInput'
                   type="range"
                   min={0}
                   name={label === 'Height' ? 'height' : 'weight'}
                   value={label === 'Height' ? state.height : state.weight}
                   max={label === 'Height' ? maxValues.height : maxValues.weight}
                   onChange={handleOnchangeEvent}/>
        </div>
    )
}

export default Range;

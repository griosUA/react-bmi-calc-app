import React from 'react';
import './Output.css'

const Output = ({height, weight, bmi, bmiClass}) => {

    const outputData = {
        height: {
            name: 'Height',
            value: height
        },
        weight: {
            name: 'Weight',
            value: weight
        },
        bmi: {
            name: 'Bmi',
            value: bmi
        },
        bmiClass: {
            name: 'Bmi class',
            value: bmiClass
        }
    }

    const output = Object.keys(outputData).map((od, i) => {
        return (
            <div className={'output-item'} key={i}>
                <h2>{outputData[od].name}</h2>
                <div className={'output-value'}><p>{outputData[od].value}</p></div>
            </div>
        )
    })

    return (
        <div>
            {output}
        </div>
    )
}

export default Output

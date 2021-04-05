import React from 'react';
import './App.css';
import Range from './components/RangeComponent/Range'
import Output from "./components/OutputComponent/Output";

class App extends React.Component {

    // https://www.kalkulaator.ee/ru/indeks-massy-tela
    // https://ru.wikipedia.org/wiki/%D0%98%D0%BD%D0%B4%D0%B5%D0%BA%D1%81_%D0%BC%D0%B0%D1%81%D1%81%D1%8B_%D1%82%D0%B5%D0%BB%D0%B0
    state = {
        maxValues: {
            height: 272,
            weight: 635
        },
        inputs: [
            {
                name: 'Height'
            },
            {
                name: 'Weight'
            }
        ],
        inputValues: {
            height: 0,
            weight: 0
        },
    }

    receiveRangeValues = (value) => {

        this.setState({
            inputValues: {
                height: value.height,
                weight: value.weight
            }
        })

        console.log(this.state)
    }

    render() {

        const inputs = this.state.inputs.map((input, i) => (
                <Range key={i}
                       label={input.name}
                       maxValues={this.state.maxValues}
                       emitValues={this.receiveRangeValues}
                />
            )
        )

        return (
            <div>
                <div>
                    {inputs}
                </div>

                <Output/>
            </div>
        );
    }


}

export default App;

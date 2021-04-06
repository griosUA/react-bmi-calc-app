import React from 'react';
import './App.css';
import Range from './components/RangeComponent/Range'
import Output from "./components/OutputComponent/Output";

class App extends React.Component {

    //1 - send data to Output
//2 - calculate bmi - 'setBmi'
//3 - 'bmiClass' condition
//4 - change css-class or html depending on bmiClass
//5 - convert to lbs and feet

    //6 fix bugs with 0 values

    constructor() {
        super();
        this.state = {
            maxValues: {
                height: 272,
                weight: 635
            },
            height: 170,
            weight: 65,
            inputs: [
                {
                    name: 'Height'
                },
                {
                    name: 'Weight'
                }
            ],
            bmi: 22.49,
            bmiClass: 'Норма'
        }
    }

    onChangeHeight = (newHeight) => {
        this.setState({
            height: newHeight,
        }, this.countBmi)
    }

    onChangeWeight = (newWeight) => {
        this.setState({
            weight: newWeight,
        }, this.countBmi)
    }

    countBmi() {
        const bmi = Number((this.state.weight / Math.pow((this.state.height / 100), 2)).toFixed(2));
        this.setState({
            bmi: bmi
        })
        this.getBmiClass(bmi)
    }

    getBmiClass(bmi) {
        let bmiClass = '';
        switch (true) {
            case bmi <= 16 :
                bmiClass = 'Выраженный дефицит массы тела'
                console.log(`Выраженный дефицит массы тела`);
                break;
            case bmi >= 16 && bmi <= 18.5:
                bmiClass = 'Недостаточная (дефицит) масса тела'
                console.log(`Недостаточная (дефицит) масса тела`);
                break;
            case bmi >= 18.5 && bmi <= 25:
                bmiClass = 'Норма'
                console.log(`Норма`);
                break;
            case bmi >= 25 && bmi <= 30:
                bmiClass = 'Избыточная масса тела (предожирение)'
                console.log(`Избыточная масса тела (предожирение)`);
                break;
            case bmi >= 30 && bmi <= 35:
                bmiClass = 'Ожирение'
                console.log(`Ожирение`);
                break;
            case bmi >= 35 && bmi <= 40:
                bmiClass = 'Ожирение резкое'
                console.log(`Ожирение резкое`);
                break;
            case bmi >= 40:
                bmiClass = 'Очень резкое ожирение'
                console.log(`Очень резкое ожирение`);
                break;
            default:
                bmiClass = 'error'
                break;
        }

        this.setState({
            bmiClass: bmiClass
        })
    }

    // https://www.kalkulaator.ee/ru/indeks-massy-tela
    // https://ru.wikipedia.org/wiki/%D0%98%D0%BD%D0%B4%D0%B5%D0%BA%D1%81_%D0%BC%D0%B0%D1%81%D1%81%D1%8B_%D1%82%D0%B5%D0%BB%D0%B0

    render() {
        return (
            <div className={'app-wrapper'}>
                <h1>BMI Calculator</h1>
                <form className={'form-container'}>
                    <Range
                        label={this.state.inputs[0].name}
                        value={this.state.height}
                        maxValue={this.state.maxValues.height}
                        emitValues={this.onChangeHeight}
                    />
                    <Range
                        label={this.state.inputs[1].name}
                        value={this.state.weight}
                        maxValue={this.state.maxValues.weight}
                        emitValues={this.onChangeWeight}
                    />
                </form>

                <Output
                    height={this.state.height}
                    weight={this.state.weight}
                    bmi = {this.state.bmi}
                    bmiClass={this.state.bmiClass}
                />
            </div>
        );
    }


}

export default App;

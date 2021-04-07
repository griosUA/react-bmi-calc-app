import React from 'react';
import './App.css';
import Range from './components/RangeComponent/Range'
import Output from "./components/OutputComponent/Output";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            needConvert: false,
            maxValues: {
                height: 250,
                weight: 250
            },
            heightStep: 1,
            weightStep: 1,
            heightUnit: 'CM',
            weightUnit: 'KG',
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
            bmiClass: 'Норма',
            bmiStyleClass: 'normal'
        }
    }

    coefficients = {
        foot: 30.48, //cм
        pound: 0.45, //кг
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
        let weight = this.state.weight;
        let height;
        if (this.state.needConvert) {
            height = this.state.height;
        } else {
            height = this.state.height / 100
        }
        const countBmi = Number((weight / Math.pow((height), 2)).toFixed(2));
        const bmi = !isNaN(countBmi) ? countBmi : '-'
        this.setState({
            bmi: bmi
        })
        this.getBmiClass(bmi)
    }

    onChangeMode = () => {
        this.setState({
            needConvert: !this.state.needConvert,
        }, this.setCoefficients);
    }

    setCoefficients() {
        if (this.state.needConvert) {
            this.setState({
                height: Number((this.state.height / this.coefficients.foot).toFixed(1)),
                weight: this.state.weight * this.coefficients.pound,
                maxValues: {
                    height: (250 / this.coefficients.foot),
                    weight: (250 / this.coefficients.pound)
                },
                heightStep: 0.1,
                weightStep: 1,
                heightUnit: 'FT',
                weightUnit: 'LB',
            });
        } else {
            this.setState({
                height: Number((this.state.height * this.coefficients.foot).toFixed(0)),
                weight: this.state.weight / this.coefficients.pound,
                maxValues: {
                    height: 250,
                    weight: 250
                },
                heightStep: 1,
                weightStep: 1,
                heightUnit: 'CM',
                weightUnit: 'KG',
            });
        }
    }

    getBmiClass(bmi) {
        let bmiClass = '';
        let styleClass= '';
        switch (true) {
            case bmi <= 16 :
                bmiClass = 'Выраженный дефицит массы тела';
                styleClass= 'no-weight';
                break;
            case bmi >= 16 && bmi <= 18.5:
                bmiClass = 'Недостаточная (дефицит) масса тела';
                styleClass= 'inadequate-weight';
                break;
            case bmi >= 18.5 && bmi <= 25:
                bmiClass = 'Норма';
                styleClass= 'normal';
                break;
            case bmi >= 25 && bmi <= 30:
                bmiClass = 'Избыточная масса тела (предожирение)';
                styleClass= 'overweight';
                break;
            case bmi >= 30 && bmi <= 35:
                bmiClass = 'Ожирение';
                styleClass= 'obesity-first';
                break;
            case bmi >= 35 && bmi <= 40:
                bmiClass = 'Ожирение резкое';
                styleClass= 'obesity-second';
                break;
            case bmi >= 40:
                bmiClass = 'Очень резкое ожирение';
                styleClass= 'obesity-thirds';
                break;
            default:
                bmiClass = 'error'
                break;
        }

        this.setState({
            bmiClass: bmiClass,
            bmiStyleClass: styleClass
        })
    }

    render() {
        return (
            <div className={'app-wrapper'}>
                <h1>BMI Calculator</h1>

                <div className={'switcher-container'}>
                    <label className="switch">
                        <input type="checkbox" value={this.state.needConvert} onChange={this.onChangeMode}/>
                        <span className="slider round"></span>
                    </label>
                    <p>Change mode</p>
                </div>
                <form className={'form-container'}>
                    <Range
                        label={this.state.inputs[0].name}
                        value={this.state.height}
                        maxValue={this.state.maxValues.height}
                        emitValues={this.onChangeHeight}
                        step={this.state.heightStep}
                        unit={this.state.heightUnit}
                    />
                    <Range
                        label={this.state.inputs[1].name}
                        value={this.state.weight}
                        maxValue={this.state.maxValues.weight}
                        emitValues={this.onChangeWeight}
                        step={this.state.weightStep}
                        unit={this.state.weightUnit}
                    />
                </form>

                <Output
                    height={this.state.height}
                    weight={this.state.weight}
                    bmi={this.state.bmi}
                    bmiClass={this.state.bmiClass}
                    bmiStyleClass={this.state.bmiStyleClass}
                />
            </div>
        );
    }


}

export default App;

import React from 'react';
import './Range.css'

class Range extends React.Component {
    state = {
        value: this.props.value
    }

    handleOnchangeEvent = (e) => {
        this.setState({value: e.target.value}, () => {
            this.props.emitValues(Number(e.target.value))
        })
    }

    render() {
        return (
            <div className={'input-container'}>
                <label htmlFor="rangeInput">{this.props.label} ({this.props.unit})</label>
                <input
                    id="rangeInput"
                       type="range"
                       min={0}
                       step={this.props.step}
                       value={this.state.value}
                       max={this.props.maxValue}
                       onChange={this.handleOnchangeEvent}/>
            </div>
        )
    }
}

export default Range;

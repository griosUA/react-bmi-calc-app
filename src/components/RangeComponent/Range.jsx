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
                <label htmlFor="rangeInput">{this.props.label}</label>
                <input
                    id="rangeInput"
                       type="range"
                       min={0}
                       step={1}
                       value={this.state.value}
                       max={this.props.maxValue}
                       onChange={this.handleOnchangeEvent}/>
            </div>
        )
    }
}

export default Range;

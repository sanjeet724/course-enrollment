import React, { Component } from 'react';

class Radio extends Component {
    render() {
        const { onStudentRadioClicked, onInstructorRadioClicked } = this.props;
        return (
            <div>
                <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio"
                        id="student"
                        name="radioSelectionGroup"
                        className="custom-control-input"
                        value="student"
                        onClick={(e) => onStudentRadioClicked(e)} />
                    <label className="custom-control-label radio-label" htmlFor="student">Student</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                    <input
                        type="radio"
                        id="instructor"
                        name="radioSelectionGroup"
                        className="custom-control-input"
                        value="instructor"
                        onClick={(e) => onInstructorRadioClicked(e)} />
                    <label className="custom-control-label radio-label" htmlFor="instructor">Instructor</label>
                </div>
            </div>
        )
    }
}

export default Radio;
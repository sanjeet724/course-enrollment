import React, { Component } from 'react';
import './Component.css';

class Search extends Component {
    render() {
        const { onNameChange, onSearch } = this.props;
        return (
            <div className="input-group input-group-sm mb-3 search">
                <div className="input-group-prepend">
                    <button className="btn btn-primary"
                        type="button"
                        id="search-button"
                        onClick={(e) => onSearch(e)}>Search</button>
                </div>
                <input type="text"
                    className="form-control search-input"
                    aria-label="Sizing example input"
                    placeholder="Name"
                    onChange={(e) => onNameChange(e)}
                />
            </div>
        );
    }
}

export default Search;
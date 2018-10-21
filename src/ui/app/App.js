import React, { Component } from 'react';
import './App.css';
import Search from '../components/Search';
import Radio from '../components/Radio';
import ResultTable from '../components/ResultTable';
import axios from 'axios';

const PATH_URL = "http://localhost:8080/api";

class App extends Component {
  state = {
    searchCriteria: {
      tableKey: "",
      searchTerm: ""
    },
    query: {
      result: [],
      error: {
        message: ""
      }
    }
  };

  componentDidMount() {
    console.log("Component mounted....");
    //check if db is up

  }

  handleSearch = () => {
    // check if state is valid;
    const validTableKey = this.state.searchCriteria.tableKey;
    const searchTerm = this.state.searchCriteria.searchTerm;
    const query = this.state.query;
    if (searchTerm && validTableKey) {
      // send the request to back-end
      console.log(`Searching for ${searchTerm} in ${validTableKey}`);
      const requestPath = PATH_URL + "/" + validTableKey + "/" + searchTerm;
      axios.get(requestPath).then(success => {
        query.error.message = success.data.length > 0 ? "" : "No results found";
        query.result = success.data;
        this.setState(query);
      }).catch(err => {
        query.error = err;
        this.setState(query);
      });
      return;
    }
    query.error.message = "Not a valid search";
    this.setState(query);
  }

  handleInstructorRadioClicked = (e) => {
    // make sure its coming from instructor label
    if (e.target.value === "instructor" && e.target.checked) {
      const searchCriteria = this.state.searchCriteria;
      searchCriteria.tableKey = "instructors";
      this.setState(searchCriteria);
    }
  }

  handleStudentRadioClicked = (e) => {
    // make sure its coming from student label
    if (e.target.value === "student" && e.target.checked) {
      const searchCriteria = this.state.searchCriteria;
      searchCriteria.tableKey = "students";
      this.setState(searchCriteria);
    }
  }

  handleNameChange = (e) => {
    const searchCriteria = this.state.searchCriteria;
    searchCriteria.searchTerm = e.target.value;
    this.setState(searchCriteria);
  }

  render() {
    const shouldShowTable = this.state.query.result.length > 0;
    const shouldShowError = this.state.query.error !== "";
    return (
      <div className="App">
        <h1 className='header'>Course Enrollment System</h1>
        <div className='search-container'>
          <Search
            onSearch={this.handleSearch}
            onNameChange={this.handleNameChange}
          />
          <Radio
            onStudentRadioClicked={this.handleStudentRadioClicked}
            onInstructorRadioClicked={this.handleInstructorRadioClicked}
          />
          {shouldShowTable ? <ResultTable results={this.state.query.result} /> : null}
          {shouldShowError ? <span className="badge badge-warning">{this.state.query.error.message}</span> : null}

        </div>
      </div >
    );
  }
}

export default App;

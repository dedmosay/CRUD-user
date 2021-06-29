import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.scss";
import { personsFetchData } from "../../actions/persons_get";
import axios from 'axios';
class ViewTable extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    userName: "User",
    userAge: 100,
    userCompany: "Noname",
    deleteID: "",
    putName: undefined,
    putAge: undefined,
    putCompany: undefined,
    putUserID: ""
  };

  /*
   *   будет отправлять данные в store
  */

  componentDidMount() {
    this.props.fetchData("/api/users");
  }

  /**
   * Дописать существующий функционал с использованием hook и redux
  */

  hundleUserName = (event) => {
    this.setState({ userName: event.target.value });
  };
  hundleUserAge = (event) => {
    this.setState({ userAge: event.target.value });
  };
  hundleUserCompany = (event) => {
    this.setState({ userCompany: event.target.value });
  };

  handleSubmit() {
    axios.post("/api/users", {
      name: this.state.userName,
      age: this.state.userAge,
      company: this.state.userCompany,
    });
  }


  isDeleteUser = (event) => {
    this.setState({
      deleteID: event.target.value,
    });
  }

  hundleDeleteUser = () => {
    axios.delete(`/api/users/${this.state.deleteID}`);
  }


  hundlePutUser = () => {
    if (this.state.putUserID !== "") {
      axios.put(`/api/users/${this.state.putUserID}`, {
        name: this.state.putName,
        age: this.state.putAge,
        company: this.state.putCompany,
      })
    }
  }

  isPutUserName = (event) => {
    if (event.target.value !== "") {
      this.setState({ putName: event.target.value })
    }
  }
  isPutUserAge = (event) => {
    if (event.target.value !== "") {
      this.setState({ putAge: event.target.value })
    }
  }
  isPutUserCompany = (event) => {
    if (event.target.value !== "") {
      this.setState({ putCompany: event.target.value })
    }
  }
  isPutUserID = (event) => {
    if (event.target.value !== "") {
      this.setState({ putUserID: event.target.value })
    }
  }


  render() {
    return (
      <div className="ViewTable">
        This is ViewTable
        <br />
        <div>
          <input type="text" onChange={this.hundleUserName} placeholder="User name"></input>
          <input type="text" onChange={this.hundleUserAge} placeholder="Age user" ></input>
          <input type="text" onChange={this.hundleUserCompany} placeholder="Company"></input>
          <button onClick={this.handleSubmit}>Send</button>
        </div>
        <br />
        <div>
          <input type="text" onChange={this.isDeleteUser} placeholder="ID user" ></input>
          <button onClick={this.hundleDeleteUser}>Delete</button>
        </div>
        <br />
        <div>
          <input type="text" onChange={this.isPutUserName} placeholder="User name" ></input>
          <input type="text" onChange={this.isPutUserAge} placeholder="Age user" ></input>
          <input type="text" onChange={this.isPutUserCompany} placeholder="Company" ></input>
          <input type="text" onChange={this.isPutUserID} placeholder="User ID" ></input>
          <button onClick={this.hundlePutUser}>Change</button>
        </div>
        <ul>
          {this.props.persons.map((person, index) => {
            return (
              <li key={index}>
                <div> Name is: {person.name} </div>
                <div> Age is: {person.age} </div>
                <div> Company is: {person.company} </div>
                <div> ID is: {person._id} </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    persons: state.persons,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => {
      dispatch(personsFetchData(url));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTable);
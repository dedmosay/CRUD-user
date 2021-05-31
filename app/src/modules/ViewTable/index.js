import React, { Component } from 'react';
import { connect } from "react-redux";
import './index.scss';
import { personsFetchData } from "../../actions/persons_get"

class ViewTable extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
       
    state = {
        userName: "q",
        userAge: 1,
        userCompany: "asd"
    }

    /*
    *   будет отправлять данные в store
    */
    componentDidMount() {
        this.props.fetchData("/api/users")
    }

    hundleUserName = (event) => {
        this.setState({ userName: event.target.value })
    }
    hundleUserAge = (event) => {
        this.setState({ userAge: event.target.value })
    }
    hundleUserCompany = (event) => {
        this.setState({ userCompany: event.target.value })
    }

    handleSubmit(event){ 
        event.preventDefault();
        fetch('/api/users', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: 
                JSON.stringify({
                    "name":this.state.userName,
                    "age": this.state.userAge,
                    "company": this.state.userCompany
                })
        });
    };
    render() {
        return (
            <div className="ViewTable">
                This is ViewTable
                <form>
                    <input type="text" onChange={this.hundleUserName} placeholder="User name"></input>
                    <input type="text" onChange={this.hundleUserAge} placeholder="Age user"></input>
                    <input type="text" onChange={this.hundleUserCompany} placeholder="Company"></input>
                </form>
                <button onClick={this.handleSubmit}>Send</button>
                <ul>
                    {this.props.persons.map((person, index) => {
                        return (
                            <li key={index}>
                                <div> Name is: {person.name} </div>
                                <div> Age is: {person.age} </div>
                                <div> Company is: {person.company} </div>
                                <div> ID is: {person._id} </div>
                            </li>
                        )
                    })}
                </ul>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        persons: state.persons
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => { dispatch(personsFetchData(url)) }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTable);

        /**
         * Комметрировано в связи с проверкой и дописания запросов POST/DELETE/PUT
         */

        /* DELETE 
        var data = JSON.stringify({
          "name": "Nick"
        });
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log(this.responseText);
          }
        });
        
        xhr.open("DELETE", "/api/users/60aeb659ff2627223a4abbf7");
        xhr.setRequestHeader("content-type", "application/json");
        
        xhr.send(data);

      */


        /* PUT
        var data = JSON.stringify({
          "company": "JOHN",
          "age": 2112123123
        });
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log(this.responseText);
          }
        });
        
        xhr.open("PUT", "/api/users/60aeb659ff2627223a4abbf7");
        xhr.setRequestHeader("content-type", "application/json");
        
        xhr.send(data);
        */
        // }, 2500)
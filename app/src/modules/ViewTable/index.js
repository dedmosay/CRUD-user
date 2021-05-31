import React, { Component } from 'react';
import { connect } from "react-redux";
import './index.scss';
import { personsFetchData } from "../../actions/persons_get"

class ViewTable extends Component {

    /*
    *   будет отправлять данные в store
    */
    componentDidMount() {
        // setTimeout(()=> {
            this.props.fetchData("/api/users")

/**
 * Комметрировано в связи с проверкой и дописания запросов POST/DELETE/PUT
 */

           /* POST
            var data = JSON.stringify({
                "name": "Larry1",
                "age": 21,
                "company": "Adidas1"
              });
              
              var xhr = new XMLHttpRequest();
              xhr.withCredentials = true;
              
              xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                  console.log(this.responseText);
                }
              });
              
              xhr.open("POST", "/api/users");
              xhr.setRequestHeader("content-type", "application/json");
              xhr.setRequestHeader("cache-control", "no-cache");
              xhr.setRequestHeader("postman-token", "1c1286bc-6afc-adbc-bde9-76ae29ecf485");
              
              xhr.send(data);
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
              
              xhr.open("DELETE", "/api/users/60b4d85f5cd6fc3e72861487");
              xhr.setRequestHeader("content-type", "application/json");
              xhr.setRequestHeader("cache-control", "no-cache");
              xhr.setRequestHeader("postman-token", "f775d9c1-87ac-445f-f87f-fec1eade090c");
              
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
              xhr.setRequestHeader("cache-control", "no-cache");
              xhr.setRequestHeader("postman-token", "4a95d084-ea47-5b95-bac3-ab71d63bea70");
              
              xhr.send(data);
              */
        // }, 2500)
    }

    render() {
        return (
            <div className="ViewTable">
                This is ViewTable
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

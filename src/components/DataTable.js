import React, {Component} from 'react';
import axios from '../axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import TableButton from "react-bootstrap/Button";
import {Link} from "react-router-dom";

class DataTable extends Component {

    state = {
        count : 1,
        elements: []
    };

    componentDidMount(){
        console.log("data component mounted");
    }

   async retrieveData(){
        await axios.get('http://localhost:1000/list/' + this.state.count )
            .then((result) => {
                console.log(result.data);
                let currentElements = [...this.state.elements];
                currentElements.push(result.data);
                this.setState({count: this.state.count + 1 , elements: currentElements});
            });

    }

    render() {
        let myTableData = this.state.elements.map((element, elIndex) => {
            return <tr key={elIndex} >
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.url}</td>
                <td>{element.httpMethod}</td>
                <td>{element.period}</td>
                <td>{element.status}</td>
                <Link id="infoid" to={{pathname:'/graph/'+ element.id}}>See the Graph</Link>
            </tr>;

        });

        let myTable = <Table striped bordered hover variant="dark">

            <thead>
            <tr>
                <th>ID</th>
                <th>Ad</th>
                <th>Url</th>
                <th>Request Türü</th>
                <th>Periyot (s)</th>
                <th>Durum</th>
            </tr>
            </thead>
            <tbody>
            {myTableData}
            </tbody>
        </Table>

        return <div className ="col-sm-11"  >
            <br/>
            <br/>
            {myTable}
            <br/>

            <TableButton className="btn btn-warning" onClick={() =>
                this.retrieveData()}>
                Next Data
            </TableButton>
            <br/>
            <br/>
            <br/>

        </div>;
    }

}

export default DataTable;
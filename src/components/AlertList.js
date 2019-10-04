import React from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";
import DataTable from "./DataTable";

class AlertList extends React.Component {

    state = {
        name: '',
        url: '',
        httpMethod: '',
        period: 0,
        urlStatus: '',
        count : 1
    }

    handleChange1 = event => {
        this.setState({
            name: event.target.value
        });
    }

    handleChange2 = event => {
        this.setState({
            url: event.target.value

        });
    }


    handleChange4 = event => {
        this.setState({
            period: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.getStatus();

    }


    async postData() {
        await axios.post('http://localhost:1000/list',
            {name: this.state.name,
                url: this.state.url,
                httpMethod: 'GET',
                period: this.state.period,
                status : this.state.urlStatus})
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
    }

    async getStatus(){
        await axios.get('http://localhost:1000/status/' + this.state.count )
            .then((result) => {
                console.log(result.data);

                this.setState({count: this.state.count + 1 , urlStatus: result.data });
            });

        this.postData();
        console.log("state:" + this.state.urlStatus + "name:" + this.state.name);

    }


    render() {
        return (<div className="col-sm-4" >
                <br/>
                <form onSubmit={this.handleSubmit}>

                    <Form.Row>
                        <Form.Group as={Col} controlId="name" >
                            <Form.Label>Ad:</Form.Label>
                            <FormControl type="text" name="name" onChange={this.handleChange1}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="url">
                        <Form.Label>Url:</Form.Label>
                        <FormControl type="text" name="url" onChange={this.handleChange2}/>
                    </Form.Group>

                    <Form.Row>

                        <Form.Group as={Col} controlId="httpMethod">
                            <Form.Label>Http Method</Form.Label>
                            <Form.Control as="select" name="httpMethod" >
                                <option >Seç..</option>
                                <option >
                                    GET
                                </option>

                            </Form.Control >

                        </Form.Group>


                        <Form.Group as={Col} controlId="period">
                            <Form.Label>Kontrol Periyodu</Form.Label>
                            <FormControl type="text" name="period" onChange={this.handleChange4}/>
                        </Form.Group>

                    </Form.Row>
                    <br/>
                    <Button type = "submit" variant="info" >Gönder</Button>

                </form>

                <DataTable/>
            </div>

        )
    }
}

export default AlertList;
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Card, Container, Form, Button} from "react-bootstrap";

function AddItem() {

    const [payload, setPayload] = useState({
        name:"",
        price:0.00,
    });

    const handleInputChange = async (e) =>{
        const {name, value} = e.target;
        setPayload((input) => ({...input, [name]:value
        }));
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        //add request
        const res = await axios.post("http://localhost:8082/item/add", {
            //item name, price
            payload
        })

        const data = await res.data;

        if(data.data ===1){
            alert("Item has been added");
            window.location.reload();
        } else {
            alert("Error");
        }
    }

    return (
        <Container className="d-flex justify-content-center">

            <Card style={{width: "22rem"}}>
                <Card.Title><h3>Add Product</h3></Card.Title>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                type="text"
                                value={payload.name}
                                placeholder="Enter name"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                name="price"
                                type="number"
                                value={payload.price}
                                placeholder="Enter price"
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleAdd}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AddItem;
import React, {useState} from 'react';
import {Button, Card,Form} from "react-bootstrap";
import axios from "axios";

function PriceList({name, price, promotion, qualified}) {

    const [payload, setPayload] = useState({
        name, price, promotion, qualified
    });
    const [enable, setEnable] = useState(true);

    //toggle item input boxes
    const toggleEnable = () => {
        setEnable(!enable);
    }

    const handleInputChange = async (e) =>{
        const {name, value} = e.target;
        setPayload((input) => ({...input, [name]:value
        }));
    }

    //delete item
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            //delete request
            const res = await axios.delete(
                `http://localhost:8082/item/delete?name=${name}`,
            )
            const data = await res.data;
            //if successful
            if(data.data === 1){
                alert("Item deleted");
                window.location.reload();
            } else {
                alert("Error");
            }

        }catch(err){
            console.log(err);
        }
    }

    //save edit
    const handleUpdate = async () => {
        try {
            const res = await axios.post(
                `http://localhost:8082/item/update`,
                payload,
            )
            const data = await res.data;

            if(data.data === 1){
                alert("Item Updated");
                window.location.reload();
            } else {
                alert("Error");
            }

        }catch(err){
            console.log(err);
        }
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{payload.name}</Card.Title>
                <Card.Text>
                    Name:
                    <Form.Control
                        name="name"
                        type="text"
                        disabled={enable}
                        defaultValue={payload.name}
                        onChange ={handleInputChange}
                    />
                    Price:
                    <Form.Control
                        name="price"
                        type="number"
                        disabled={enable}
                        defaultValue={payload.price}
                        step="0.01"
                        onChange ={handleInputChange}
                    />
                    Promotion:
                    <Form.Control
                        name="promotion"
                        type="number"
                        disabled={enable}
                        defaultValue={payload.promotion}
                        onChange ={handleInputChange}
                    />
                    Qualified:
                    <Form.Control
                        name="qualified"
                        type="number"
                        disabled={enable}
                        defaultValue={payload.qualified}
                        onChange ={handleInputChange}
                    />
                </Card.Text>

                <Button
                    className="btn"
                    variant="outline-dark"
                    onClick={toggleEnable}
                >Edit
                </Button>
                <Button
                    className="btn"
                    variant="outline-dark"
                    type = "submit"
                    onClick={handleUpdate}
                >Save
                </Button>
                <Button
                    className="btn"
                    variant="outline-dark"
                    onClick={handleDelete}
                >Delete
                </Button>
            </Card.Body>
        </Card>
    );
}

export default PriceList;
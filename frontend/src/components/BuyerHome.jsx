import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import PriceList from "./PriceList";
import axios from "axios";

function BuyerHome() {
    const [cartItems, setItems] = useState([]);
    const [count, setCount] = useState(0);

    const handleCheckout = () =>{

    }

    const handlePlaceOrder = () =>{

    }

    const handleAdd = () => {

    }
    const handleDecrease = () => {

    }

    const handleCount = (e) => {
        if(e.target.value >= 1){
            setCount(e.target.value);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            try{
                // const res = await axios.get("http://localhost:8082/item/priceList");
                // setItems(res.data);

            }catch(e){
                alert("No products found");
            }
        }
        fetch();
    }, []);

    return (
        <Container >
            <h3>Buyer</h3>
            <Row className="justify-content-center">
                {cartItems.filter(item => item.qualified === 1)
                    .map(item=>(
                    <Col key={item.name} lg={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    Price: ${item.price}
                                </Card.Text>
                                <Button variant="success" type="submit" onClick={handleAdd}>
                                    +
                                </Button>
                                <Button variant="success" type="submit" onClick={handleDecrease}>
                                    -
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Button variant="success" type="submit" onClick={handleCheckout}>
                Checkout
            </Button>
            <Button variant="success" type="submit" onClick={handlePlaceOrder}>
                Place Order
            </Button>
        </Container>
    );
}

export default BuyerHome;
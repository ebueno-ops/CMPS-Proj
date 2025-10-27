import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row,Form} from "react-bootstrap";
import PriceList from "./PriceList";
import axios from "axios";

function BuyerHome() {
    const [cartItems, setCartItems] = useState([]);

    const [memberShipStatus, setMemberShipStatus] = useState("No");

    let total = 0;

    const handleCount = (itemName, operator ) => {
        setCartItems(items => items.map(item=>{
            if (item.name === itemName){
                let count = item.count;

                if (operator === "+"){
                    count += 1;
                }
                if (operator === "-" && count >=1){
                    count -= 1;
                }
                return {...item, count: count, }
            }
            return item;
        }));
    }

    const handleCheckout = async (e) =>{
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8082/item/total", {
                cartItems
            });

            const data = await res.data;
            total = data.total;

            if(data){
                alert(`Total is: ${total}`)
            }else {
                alert("Error");
            }
        } catch (e) {
            console.log(e);
        }

    }

    const handlePlaceOrder = async () =>{
        try {
            const user = localStorage.getItem("username");

            const res = await axios.post("http://localhost:8082/item/buy", {
                user, total
            });

            const data = await res.data;

            if(data){
                alert(`Order Placed`);
            }else {
                alert("Error");
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        const fetch = async () => {
            try{
                // const res = await axios.get("http://localhost:8082/item/priceList");
                // setItems(res.data);
                const price_list = [
                    {
                        name: "A",
                        price: 0,
                        promotion:0,
                        qualified:1,
                        count: 1,
                    },
                    {
                        name: "B",
                        price: 2,
                        promotion:0,
                        qualified:1,
                        count:1,
                    },
                    {
                        name: "C",
                        price: 22,
                        promotion:1,
                        qualified:1,
                        count:1
                    },
                ]
                setCartItems(price_list);
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
                                    Price: ${item.price}<br />
                                    <Button className="w-10" variant="success" type="submit" onClick={()=>handleCount(item.name, "-")}>
                                        -
                                    </Button>
                                    {item.count}
                                    <Button variant="success" type="submit" onClick={()=>handleCount(item.name, "+")}>
                                        +
                                    </Button>

                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}

            </Row>
            <Form.Group controlId="member">
                <Form.Label>Member ?:</Form.Label>

                <br/><Form.Check
                    type="radio"
                    label="Yes"
                    name="member"
                    value="Yes"
                    checked={memberShipStatus === "Yes"}
                    onChange={(e) => setMemberShipStatus(e.target.value)}
                />

                <Form.Check
                    type="radio"
                    label="No"
                    name="member"
                    value="No"
                    checked={memberShipStatus === "No"}
                    onChange={(e) => setMemberShipStatus(e.target.value)}
                />
            </Form.Group>
            <Row className="justify-content-center">
                <Button className="w-25" variant="success" type="submit" onClick={handleCheckout}>
                    Checkout
                </Button>
            </Row>
            <Row className="justify-content-center">
                <Button className="w-25" variant="success" type="submit" onClick={handlePlaceOrder}>
                    Place Order
                </Button>
            </Row>
        </Container>
    );
}

export default BuyerHome;
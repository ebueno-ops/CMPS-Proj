import React, {useEffect} from 'react';
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, Col, Container, Row, Form, Button} from "react-bootstrap";

function SellerHome() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try{
                // const res = await axios.get("http://localhost:8082/item/itemList");
                const item_list = [
                    {
                        name: "A",
                        price: 0,
                        promotion:0,
                        qualified:0,
                    },
                    {
                        name: "B",
                        price: 2,
                        promotion:0,
                        qualified:1,
                    },
                    {
                        name: "C",
                        price: 22,
                        promotion:1,
                        qualified:1,
                    },
                ]
                setItems(item_list)
                // setItems(res.data);
            }catch(e){
                console.log(e);
            }
        }
        fetch();
    }, []);

    return (
        <Container>
            <h3>Seller</h3>
            <div className="text-center">
            <Button variant="warning" value= "add" type="submit" onClick={()=> navigate("/add-item")}>
                Add Product
            </Button>
            </div>
            <Row className="justify-content-center">
                {items
                    .filter(item => item.qualified === 1)
                    .map(item=>(
                    <Col key={item.name} lg={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    Price: ${item.price}
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default SellerHome;
import React, {useEffect} from 'react';
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, Col, Container, Row, Form, Button} from "react-bootstrap";
import PriceList from "./PriceList";

function AdminHome() {
    const [items, setItems] = useState([]);
    const role = localStorage.getItem("role");

    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await axios.get("http://localhost:8082/item/priceList");
                const data = await res.data;
                // const price_list = [
                //     {
                //         name: "A",
                //         price: 0,
                //         promotion:0,
                //         qualified:0,
                //     },
                //     {
                //         name: "B",
                //         price: 2,
                //         promotion:0,
                //         qualified:0,
                //     },
                //     {
                //         name: "C",
                //         price: 22,
                //         promotion:1,
                //         qualified:0,
                //     },
                // ]
                // setItems(price_list)
                setItems(res.data);
            }catch(e){
                console.log(e);
            }
        }
        fetch();
    }, []);

    return (
        <Container >
            <h3>Admin</h3>
            <Row className="justify-content-center">
                {items.map(item=>(
                    <Col key={item.name} lg={8}>
                        <PriceList
                            name={item.name}
                            price={item.price}
                            promotion={item.promotion}
                            qualified={item.qualified}
                            />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default AdminHome;
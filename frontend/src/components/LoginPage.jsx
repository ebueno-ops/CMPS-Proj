// noinspection RequiredAttributes
import React, {useState} from 'react';
import {Container, Card, Form, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function LoginPage() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const res = await axios.post("http://localhost:8082/user/login", {
        //     username, password
        // });
        //
        // const token = await res.data;

        const token = {
            msg: "success",
            code: 200,
            data: "Buyer_buyer_1500",
        }
        //if login is successful
        if (token.data) {

            const data = (token.data).split("_");
            const role = data[1];
            const balance = data[2];

            localStorage.setItem("token", token.data);
            localStorage.setItem("role", role);
            localStorage.setItem("balance", balance);

            if(role === "buyer"){
                navigate("/buyer");
            } else if (role === "admin"){
                navigate("/admin");
            } else if (role === "seller"){
                navigate("/seller");
            } else {
                navigate("/");
            }

            //display login success
            alert("Login Successful");

        } else {
            //display error
            alert("Invalid username/password");
        }

    }

    const handleUsername = (e) =>{
        setUsername(e.target.value);
        setUsernameError(validateUsername(e.target.value));
    }
    const validateUsername = (username) => {
        if (!username){
            return "Username is required";
        } else if(username.length < 4){
            return "Username length must be >= 4"
        }
    }
    const validatePassword = (password) => {
        if (!password){
            return "Password is required";
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setPasswordError(validatePassword(e.target.value));
    }

    return (
        <Container className="d-flex justify-content-center">
            <Card style={{width: "22rem"}}>
                <Card.Title><h3>Login</h3></Card.Title>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value= {username}
                                placeholder="Enter username"
                                onChange={handleUsername}
                            />
                            {usernameError ? <span style={{color:"red"}}>{usernameError}</span> : <span />}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Enter password"
                                onChange={handlePassword}
                            />
                            {passwordError ? <span style={{color:"red"}}>{passwordError}</span> : <span />}
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginPage;
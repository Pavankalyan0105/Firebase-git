import React, { useState, useContext } from "react";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Input,
  Row,
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from "reactstrap";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {  UserContext } from '../Context/UserContext'; 

import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";


 const  Signup = () => {

  const [ email , setEmail ] = useState("")
  const [ password , setPassword ] = useState("")
  const context = useContext(UserContext);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(getAuth(), email, password)
    .then( (userCredential) => {
        // setEmail(userCredential.user.email),
        // setPassword(userCredential.user.password)
        // context.setUser( {"email": userCredential.user.email, "password": userCredential.user.password })
        console.log(userCredential);
        context.setUser( {email: userCredential.user.email, uid: userCredential.user.uid});
        console.log(context.user);
        }
      )
      .catch(err => alert("User Credentials are invalid"))
  }

  const handleSubmit = e => {
    e.preventDefault();
    handleSignUp();
  };
 

  if(context.user?.uid){
    console.log("Im signed");
    return <Navigate to="/" />;
  }

  return (
    <div>
       <Container className="text-center">
      <Row>
        <Col lg={6} className="offset-lg-3 mt-5">
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardHeader className="">Signup here</CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for="email" sm={3}>
                    Email
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="provide your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm={3}>
                    Password
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="your password here"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" block color="primary">
                  Sign In
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  )
}
export default Signup;
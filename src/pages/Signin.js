import React , { useContext , useState }from 'react'
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
import {Navigate} from 'react-router-dom'

import { UserContext } from '../Context/UserContext';

import {toast} from 'react-toastify';
//firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {Link} from 'react-router-dom';

const Signin = () => {

    const context = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = () => {
            signInWithEmailAndPassword(getAuth(), email, password)
            .then( (userCredential) =>  context.setUser({ email: userCredential.email, uid: userCredential.user.uid})
            )
            .catch( error => {
                alert(" User Credentials are invalid ");
            })
    }

    const handleSubmit = e => {
        e.preventDefault();
        handleSignin();
      };

    if(context.user?.uid){
        console.log("Im signed");
        return <Navigate to="/" />;
      }


    return (
        <Container className="text-center">
      <Row>
        <Col lg={6} className="offset-lg-3 mt-5">
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardHeader className="">Signin here</CardHeader>
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
    )
}

export default Signin;

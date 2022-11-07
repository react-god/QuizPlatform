import { WindowSharp } from "@mui/icons-material";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroup,
  Container,
  Col,
  Modal,
  ModalBody,
} from "reactstrap";
import {user1, user2, user3, user4} from "../mockup_data/user";

function LoginPage() {
  const [firstFocus, setFirstFocus] = React.useState<boolean>(false);
  const [lastFocus, setLastFocus] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [modalSmall, setModalSmall] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<String>("");

  const users_data = [user1, user2, user3, user4];
  let users = new Array;
  for(const user of users_data){
    const dat = {"id":user.id, "password":user.password};
    users.push(dat);
  }

  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>, type:string) => {
    if (type === "email") setEmail(e.target.value);
    else setPassword(e.target.value);
  };

  const loginHandler = async (email:string, password:string) => {
    try {

      setModalSmall(true);
      setErrorMsg("Loading");
      let auth = false;
      for (const user of users){
        if(email===user['id'] && password==user['password']) {
          auth = true;
          setTimeout(()=>{
            setErrorMsg("Login Success");
            window.location.href = "/";
          }, 1000);
          break;
        }
      }

      if(!auth) {
        setTimeout(()=>{
          setErrorMsg("Can't find User information");
        }, 1000);
      }
    } catch(e) {
      if (e instanceof TypeError) {
        setErrorMsg(String(e));
      }
      else if (e instanceof SyntaxError) {
        setErrorMsg(String(e));
      }
      else if (typeof e === 'string') {
        setErrorMsg(String(e));
      }
      else {
        setErrorMsg(String(e));
      }
    }
  };

  const signUpHandler = () => {
    window.location.href = "/signup";
  }

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../assets/img/login.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("../assets/img/logo.png")}
                      ></img>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <Input
                        placeholder="Email..."
                        type="email"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                        onChange={(e) => onChangeHandler(e, "email")}
                        value={email}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <Input
                        placeholder="Password..."
                        type="password"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                        onChange={(e) => onChangeHandler(e, "pw")}
                        value={password}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                       <Button
                        block
                        className="btn-round"
                        color="info"
                        onClick={() => loginHandler(email, password)}
                        size="lg"
                      >
                        Login
                      </Button>

                     <Button
                        block
                        className="btn-link"
                        color="white"
                        onClick={() => signUpHandler()}
                        size="lg"
                      >
                        Create Account 
                      </Button>

                      <Modal
                        modalClassName="modal-mini modal-info"
                        toggle={() => setModalSmall(false)}
                        isOpen={modalSmall}
                      >
                        <div className="modal-header justify-content-center">
                          <div className="modal-profile"></div>
                        </div>
                        <ModalBody>
                          <p>{errorMsg}</p>
                        </ModalBody>
                        <div className="modal-footer">
                          <Button
                            className="btn-neutral"
                            color="link"
                            type="button"
                            onClick={() => setModalSmall(false)}
                          >
                            Close
                          </Button>
                        </div>
                      </Modal>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

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

// import "../assets/css/bootsrap.min.css"
// import "assets/now-ui-kit.css"

function LoginPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [modalSmall, setModalSmall] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("")
  let User = {};

  // const onChangeHandler = (e, value:string) => {
  //   if (value === "email") setEmail(e.target.value);
  //   else setPassword(e.target.value);
  // };

  // const loginHandler = async (email:string, password:string) => {
  //   try {

  //     setModalSmall(true);
  //     setErrorMsg("Loading");

  //     authService.onAuthStateChanged(function (user) {
  //       if (user) {
  //         User = user;
  //         window.location.href = "/index";
  //       }
  //     });
  //   } catch (e) {
  //     alert(e.toString());
  //   }
  // };

  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../assets/img/login.jpg").default + ")",
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
                        // onChange={(e) => onChangeHandler(e, "email")}
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
                        // onChange={(e) => onChangeHandler(e, "pw")}
                        value={password}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                       <Button
                        block
                        className="btn-round"
                        color="info"
                        // onClick={() => loginHandler(email, password)}
                        size="lg"
                      >
                        Login
                      </Button>

                     <Button
                        block
                        className="btn-round"
                        color="info"
                        // onClick={() => loginHandler(email, password)}
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
                          <div className="modal-profile">
                            <i className="now-ui-icons users_circle-08"></i>
                          </div>
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

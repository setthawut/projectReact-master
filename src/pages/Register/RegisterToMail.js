import React from "react";
import { Divider, Tabs, Row, Col, Button } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

const RegisterForm = () => {
  let name = "Verify E-Mail";
  let pathUrl = `/login`;
  let history = useHistory();

  return (
    <React.Fragment>
      <div>
        <div
          className="d-sm-flex align-items-center justify-content-between"
          style={{
            padding: "10px 20px",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px rgba(28, 39, 60, 0.05)",
            border: "1px solid rgba(72, 94, 144, 0.16)",
          }}
        >
          <div></div>
          <div className="d-none d-md-block"></div>
        </div>
      </div>
      <div
        className="card card-body"
        style={{
          marginLeft: "160px",
          marginRight: "160px",
          marginTop: "60px",
          paddingTop: "0px",
        }}
      >
        <Tabs animated={false}>
          <TabPane tab={name} key={name}>
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 12 }} offset={6}>
                <Col xs={{ span: 24 }} md={{ span: 20 }}>
                  <p style={{ paddingLeft: "80px" }}>
                    <div style={{ fontSize: "15px", fontWeight: "600" }}>
                      A verification link has been sent to your email accont
                    </div>
                  </p>
                  <Divider />

                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/mail.jpg`}
                  />

                  <Button
                    onClick={() => {
                      history.push(pathUrl);
                    }}
                    style={{ left: "260px" }}
                  >
                    Back
                  </Button>
                </Col>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default RegisterForm;

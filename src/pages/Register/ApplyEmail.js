import React, { useEffect, useState } from "react";
import { Tabs, Row, Col, Button, Typography } from "antd";
import Api from "../../services/httpClient";
import { useHistory } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
const { Title } = Typography;
const { TabPane } = Tabs;

const RegisterForm = () => {
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  let name = "Verify E-Mail";
  let pathUrl = `/login`;
  let history = useHistory();
  let url = new URL(window.location.href);
  let query = new URLSearchParams(url.search);
  let params = query.get("code");

  useEffect(() => {
    verifyApi();
  }, []);
  const verifyApi = async () => {
    setLoading(true);
    let data = {
      code: params,
    };
    try {
      let res = await Api.post(`/api/v1/admin/verify`, data);

      res.data.status === "success" ? setCheck(true) : setCheck(false);

      setLoading(false);
    } catch (error) {
      setCheck(false);
    }
  };

  const Success = () => {
    return (
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <img src={`${process.env.PUBLIC_URL}/assets/images/confirm.jpg`} />
        <Title level={2} style={{ paddingLeft: "180px" }}>
          Verication Success
        </Title>

        <Button
          onClick={() => {
            history.push(pathUrl);
          }}
          style={{ left: "260px" }}
        >
          Back
        </Button>
      </Col>
    );
  };

  const Failed = () => {
    return (
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <img src={`${process.env.PUBLIC_URL}/assets/images/cancel.jpg`} />
        <Title level={2} style={{ paddingLeft: "250px" }}>
          Failed
        </Title>

        <Button
          onClick={() => {
            history.push(pathUrl);
          }}
          style={{ left: "260px" }}
        >
          Back
        </Button>
      </Col>
    );
  };

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
              <Col xs={{ span: 24 }} md={{ span: 24 }} offset={6}>
                {console.log("check", check)}
                {loading ? (
                  <Col
                    xs={{ span: 24 }}
                    md={{ span: 12 }}
                    offset={4}
                    style={{ marginTop: "130px" }}
                  >
                    <FadeLoader color={"#ff7200"} size={200} radius={10} />
                  </Col>
                ) : check ? (
                  <Success />
                ) : (
                  <Failed />
                )}
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default RegisterForm;

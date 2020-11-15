import React, { createRef, useState } from "react";
import { Tabs, Form, Input, Row, Col, Button, Breadcrumb } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import { formSize } from "../../components/settings";
import { SaveOutlined } from "@ant-design/icons";
import { notificationWithIcon } from "../../components/Notification";
import Api from "../../services/httpClient";
const { TabPane } = Tabs;
const ResetPassword = () => {
  const formRef = createRef();
  let name = "เปลี่ยนรหัสผ่าน";
  let pathUrl = `/dashbord`;
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      lg: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      lg: { span: 20 },
    },
  };

  const colLayout = {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 24 },
    lg: { span: 8 },
  };
  let history = useHistory();
  let { id } = useParams();
  const navigation = [
    { key: 1, title: "หน้าแรก", link: "/dashboard" },
    { key: 2, title: name, link: "" },
  ];
  const onFinish = async () => {
    formRef.current
      .validateFields()

      .then(async (values) => {
        let data = {
          id: id,
          ...values,
        };
        try {
          let result = await Api.post(`api/v1/password/reset`, data);
          notificationWithIcon("success", "Reset Password sussces.");
          setPasswordSuccess(true);
        } catch (err) {
          console.log("err=>", err);
          notificationWithIcon("warning", "Reset Password fail.");
        }
      })
      .catch((err) => {
        console.log(err);
        notificationWithIcon("warning", "Reset Password fail.");
      });
  };
  return (
    <React.Fragment>
      <div
        className="d-sm-flex align-items-center justify-content-between"
        style={{
          padding: "10px 20px",
          backgroundColor: "#fff",
        }}
      >
        <Breadcrumb>
          {navigation.map((item) => (
            <Breadcrumb.Item key={item.key}>
              {item.link ? (
                <Link to={item.link}>{item.title}</Link>
              ) : (
                item.title
              )}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="card card-body" style={{ margin: "20px", paddingTop: 0 }}>
        <Tabs animated={false}>
          {passwordSuccess ? (
            <TabPane tab="RESET PASSWORD SUCCESS" key="Reset password success">
              <Row gutter={24}>
                <Col xs={6} sm={6} md={6} lg={9} offset={6}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/confirm.jpg`}
                  />
                </Col>
              </Row>
              <div style={{ float: "right" }}>
                <Button
                  size={"large'"}
                  onClick={() => {
                    history.push(pathUrl);
                  }}
                >
                  Back
                </Button>
              </div>
            </TabPane>
          ) : (
            <TabPane tab="เปลี่ยนรหัสผ่าน" key="Reset password">
              <Form
                ref={formRef}
                scrollToFirstError
                {...formItemLayout}
                labelAlign="left"
              >
                <Row gutter={24}>
                  <Col
                    {...colLayout}
                    style={{ marginLeft: "15px", marginTop: "25px" }}
                  >
                    <Form.Item name="current_password" label="รหัสผ่านปัจุบัน">
                      <Input size={formSize} autoComplete="off" />
                    </Form.Item>

                    <Form.Item
                      name="title_name"
                      label="รหัสผ่านใหม่"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password ",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password size={formSize} />
                    </Form.Item>

                    <Form.Item
                      name="confirm"
                      label="ยืนยันรหัสผ่าน"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject(
                              "The two passwords that you entered do not match!",
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password size={formSize} />
                    </Form.Item>
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={7} offset={2}>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/resetpassword.jpg`}
                    />
                  </Col>
                </Row>
              </Form>
              <div style={{ float: "right" }}>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  style={{ marginRight: "5px" }}
                  onClick={onFinish}
                >
                  บันทึก
                </Button>
                <Button
                  onClick={() => {
                    history.push(pathUrl);
                  }}
                >
                  กลับ
                </Button>
              </div>
            </TabPane>
          )}
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;

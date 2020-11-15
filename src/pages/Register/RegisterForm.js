import React, { createRef, useState } from "react";
import {
  message,
  Tabs,
  Form,
  Input,
  Row,
  Col,
  Descriptions,
  Upload,
  Button,
  Select,
} from "antd";
import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { formSize } from "../../components/settings";
import { notificationWithIcon } from "../../components/Notification";
import Api from "../../services/httpClient";
import "./Register.css";
const { TabPane } = Tabs;

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
  lg: { span: 10 },
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const RegisterForm = () => {
  const formRef = createRef();
  let name = "Register";
  let pathUrl = `/login`;
  let history = useHistory();

  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [isRemoveLogo, setIsRemoveLogo] = useState(false);
  const [getBase64ToSubmit, setGetBase64ToSubmit] = useState();

  const getBase64 = (img, callback) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.addEventListener("load", () => callback(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(img);
    });
  };

  const handleChangeImage = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      let resultBase64 = await getBase64(
        info.file.originFileObj,
        (imageUrl) => setImageUrl(imageUrl),
        setLoading(false),
      );

      setGetBase64ToSubmit(resultBase64);
    }
    if (info.file.status === "error") {
      setLoading(false);
      notificationWithIcon(
        "warning",
        "อัพโหลดภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง!!",
      );
      setImageUrl("");
    }
  };

  const onFinish = async () => {
    formRef.current
      .validateFields()
      .then(async (values) => {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        /// กำหนดเป็น user
        formData.append("role", "user");
        formData.append(" path_file_avatar", getBase64ToSubmit);
        formData.append(" create_by", "yourself");
        formData.append("comment", null);

        try {
          const config = { headers: { "Content-Type": "multipart/form-data" } };
          let result = await Api.post(`api/v1/admin`, formData, config);
          notificationWithIcon("success", "Register sussces.");
          localStorage.setItem("userLoing", "aun");
          history.push(pathUrl);
        } catch (err) {
          console.log("err=>", err);
          notificationWithIcon("warning", "Register fail.");
        }
      })
      .catch((err) => {
        console.log(err);
        notificationWithIcon("warning", "Register fail.");
      });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}

      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <React.Fragment>
      <div className="layout-register">
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
          <TabPane tab={"สมัครสมาชิก"} key={name}>
            <Form
              ref={formRef}
              scrollToFirstError
              labelAlign="left"
              {...formItemLayout}
            >
              <Row>
                <Col span={4} style={{ marginLeft: "2%", marginTop: "2%" }}>
                  <Form.Item>
                    <Upload
                      accept="image/*"
                      action={`https://www.mocky.io/v2/5cc8019d300000980a055e76`}
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleChangeImage}
                    >
                      {imageUrl ? (
                        <img src={imageUrl} style={{ width: "100%" }} />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Form.Item>
                  <Col span={20}>
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        setImageUrl("");
                        setIsRemoveLogo(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Col>
                </Col>

                <Col {...colLayout}>
                  <Descriptions title="ข้อมูลทั่วไป" />
                  <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name !",
                      },
                    ]}
                  >
                    <Input size={formSize} autoComplete="off" />
                  </Form.Item>

                  <Form.Item
                    name="name"
                    label="ชื่อ-นามสกุล"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name !",
                      },
                    ]}
                  >
                    <Input size={formSize} autoComplete="off" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                    ]}
                  >
                    <Input size={formSize} autoComplete="off" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="รหัสผ่าน"
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
                    {/* </Form.Item>

                  <Form.Item
                    name="role"
                    label="สิทธิ์"
                    rules={[
                      {
                        required: true,
                        message: "Please input your role !",
                      },
                    ]}
                  >
                    <Select size={formSize}>
                      <Option value="superAdmin">Super Admin</Option>
                      <Option value="manage">Mange</Option>
                      <Option value="user">User</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="comment" label="หมายเหตุ">
                    <TextArea rows={4} size={formSize} /> */}
                  </Form.Item>
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 7 }} offset={1}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/register.jpg`}
                    style={{ width: "120%" }}
                  />
                </Col>
              </Row>
            </Form>
            <div style={{ float: "right" }}>
              <Button
                type="primary"
                style={{ marginRight: "5px" }}
                onClick={onFinish}
                icon={<SaveOutlined />}
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
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default RegisterForm;

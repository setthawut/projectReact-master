import React, { useState, useEffect } from "react";
import {
  Form,
  Col,
  Button,
  message,
  Upload,
  Input,
  Descriptions,
  Row,
  Switch,
  Select,
  Checkbox,
  Typography,
  Table,
} from "antd";
import {
  SaveOutlined,
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { formSize } from "../../../components/settings/index";
import _ from "lodash";

import { useHistory } from "react-router-dom";
import { notificationWithIcon } from "../../../components/Notification";
const { Option } = Select;

const { TextArea } = Input;
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
const DetailForm = (props) => {
  let history = useHistory();
  let pathUrl = `/master/user`;
  const { isNew, dataId, submit } = props;

  const [loading, setLoading] = useState(false);
  const [isRemoveLogo, setIsRemoveLogo] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [handleChange, setHandleChange] = useState();

  const getBase64 = (img, callback) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.addEventListener("load", () => callback(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(img);
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      lg: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      lg: { span: 12 },
    },
  };

  const colLayout = {
    xs: { span: 24 },
    lg: { span: 8 },
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

      props.setBase64(resultBase64);
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
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}

      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div>
      {isNew || Object.keys(dataId).length > 0 ? (
        <Form
          ref={props.formRef}
          scrollToFirstError
          initialValues={{
            name: dataId.name,
            email: dataId.email,
            role: dataId.role,
            username: dataId.username,
            is_active: dataId.is_active === 1 ? true : false,
            comment: dataId.comment === null ? "" : dataId.comment,
          }}
          {...formItemLayout}
          labelAlign="left"
        >
          <Row>
            <Col {...colLayout} style={{ marginLeft: "2%" }}>
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
                  {/* {imageUrl ? (
                    <img src={imageUrl} style={{ width: "100%" }} />
                  ) : !isRemoveLogo && dataId.full_path ? (
                    <img src={dataId.full_path} style={{ width: "100%" }} />
                  ) : (
                    uploadButton
                  )} */}
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
              <Form.Item
                style={{ fontWeight: "medium" }}
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
              {isNew ? (
                <Form.Item
                  {...formItemLayout}
                  name="password"
                  label="รหัสผ่าน"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password 6 character",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password size={formSize} />
                </Form.Item>
              ) : (
                ""
              )}
              {isNew ? (
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
              ) : (
                ""
              )}

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
                  {/* <Option value="superAdmin">Super Admin</Option> */}
                  <Option value="manage">Manage</Option>
                  <Option value="user">User</Option>
                </Select>
              </Form.Item>
              {!isNew ? (
                <Form.Item
                  label="สถานะ"
                  name="is_active"
                  valuePropName="checked"
                >
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked={dataId.is_active === 1 ? true : false}
                  />
                </Form.Item>
              ) : (
                ""
              )}
              <Form.Item name="comment" label="หมายเหตุ">
                <TextArea rows={4} size={formSize} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : (
        <Table loading={true} />
      )}
      <div style={{ float: "right" }}>
        <Button
          type="primary"
          size={"large'"}
          style={{ marginRight: "5px" }}
          onClick={submit}
          icon={<SaveOutlined />}
        >
          บันทึก
        </Button>
        <Button
          size={"large'"}
          onClick={() => {
            history.push(pathUrl);
          }}
        >
          กลับ
        </Button>
      </div>
    </div>
  );
};

export default DetailForm;

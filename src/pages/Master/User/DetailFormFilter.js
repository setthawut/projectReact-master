import React from "react";
import { formSize } from "../../../components/settings";
import { Form, Col, Input, Select, Row, Badge } from "antd";

const { Option } = Select;

const DetailFormFilter = (props) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 6 },
    },
    // wrapperCol: {
    //   xs: { span: 24 },
    //   sm: { span: 20 },
    //   md: { span: 20 },
    //   lg: { span: 16 },
    // },
  };

  // const colLayout = {
  //   xs: { span: 24 },
  //   sm: { span: 12 },
  //   md: { span: 12 },
  //   lg: { span: 8 },
  // };
  const marginBottom = { marginBottom: "0px" };
  return (
    <div>
      <Form layout="horizontal" ref={props.formRef} {...formItemLayout}>
        <Row gutter={24}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="name" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder={"ชื่อ-นามสกุล"}
              />
            </Form.Item>
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="email" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder={"E-mail"}
              />
            </Form.Item>
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="is_active" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกสิทธิ์--">
                <Option value={"1"}>
                  <Badge status="processing" color="#87d068" text={"Active"} />
                </Option>
                <Option value={"0"}>
                  <Badge status="processing" color="#f50" text={"Inactive"} />
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="role" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกสิทธิ์--">
                <Option value="user"> User</Option>
                <Option value="manage">Manage</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DetailFormFilter;

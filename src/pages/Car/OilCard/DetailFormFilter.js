import React from "react";
import { formSize } from "../../../components/settings/index";
import { Form, Col, Input, Select, Row, DatePicker, Badge } from "antd";

const { Option } = Select;

const DetailFormFilter = (props) => {
  const { cardTypeValue, companyValue, bankTypeValue } = props;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
      lg: { span: 12 },
    },
    // wrapperCol: {
    //   xs: { span: 24 },
    //   sm: { span: 10 },
    //   lg: { span: 16 },
    // },
  };

  // const colLayout = {
  //   xs: { span: 24 },
  //   lg: { span: 8 },
  // };
  let optioncardTypeValue = cardTypeValue.map((item, index) => {
    return (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    );
  });
  let optioncompanyValue = companyValue.map((item, index) => {
    return (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    );
  });
  let optionbankTypeValue = bankTypeValue.map((item, index) => {
    return (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    );
  });
  const marginBottom = { marginBottom: "0px" };
  return (
    <div>
      <Form ref={props.formRef} {...formItemLayout} layout="horizontal">
        <Row gutter={24}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="card_number" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="เลขที่บัตร"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="type" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกสถานะบัตร--">
                <Option value={"active"}>
                  <Badge status="processing" color="#87d068" text={"ใช้งาน"} />
                </Option>
                <Option value={"inactive"}>
                  <Badge status="processing" color="#f50" text={"ไม่ใช้งาน"} />
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="bank_type_id" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกธนาคารผู้ออกบัตร--">
                {optionbankTypeValue}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="card_type_id" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกประเภทบัตร--">
                {optioncardTypeValue}
              </Select>
            </Form.Item>
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="company_id" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกบริษัท--">
                {optioncompanyValue}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item
              style={marginBottom}
              name="identification_card"
              rules={[
                {
                  pattern: new RegExp(/^[0-9\b]+$/),
                  message: "Please enter numbers only!",
                },
              ]}
            >
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="เลขประจำบัตร"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item
              style={marginBottom}
              name="card_last_number"
              rules={[
                {
                  pattern: new RegExp(/^[0-9\b]+$/),
                  message: "Please enter numbers only!",
                },
              ]}
            >
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="เลขหลังบัตร"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item
              style={marginBottom}
              name="card_limit"
              rules={[
                {
                  pattern: new RegExp(/^[0-9\b]+$/),
                  message: "Please enter numbers only!",
                },
              ]}
            >
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="วงเงินในบัตร"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="expired_card" style={marginBottom}>
              <DatePicker
                format={"MM/YY"}
                picker="month"
                size={formSize}
                style={{ width: "100%" }}
                placeholder="บัตรหมดอายุ"
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
              <Select size={formSize} placeholder="--เลือกสถานะ--">
                <Option value={1}>
                  <Badge status="processing" color="#87d068" text={"Active"} />
                </Option>
                <Option value={0}>
                  <Badge status="processing" color="#f50" text={"Inactive"} />
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="condition" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกเงื่อนไข--">
                <Option value="comment"> เฉพาะที่มีหมายเหตุ</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DetailFormFilter;

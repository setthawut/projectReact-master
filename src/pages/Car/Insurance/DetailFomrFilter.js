import React from "react";
import { formSize } from "../../../components/settings/index";
import { Form, Col, Input, Select, Row, DatePicker, Badge } from "antd";

const { Option } = Select;

const DetailFormFilter = (props) => {
  const { insuranceCompany, insuranceType } = props;
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
  let optionInsuranceCompany = insuranceCompany.map((item, index) => (
    <Option value={item.id} key={index}>
      {item.name}
    </Option>
  ));

  let optionInsuranceType = insuranceType.map((item, index) => (
    <Option value={item.id} key={index}>
      {item.name}
    </Option>
  ));
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
            <Form.Item name="insurance_page_id" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="รหัสเอกสาร"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="insurance_type_id" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกประเภทเอกสาร--">
                {optionInsuranceType}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="type" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกประเภท--">
                <Option value="ชั้น1">ชั้น 1</Option>
                <Option value="ชั้น2">ชั้น 2</Option>
                <Option value="ชั้น3">ชั้น 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="insurance_company_id" style={marginBottom}>
              <Select size={formSize} placeholder="เลือกบริษัทประกัน">
                {optionInsuranceCompany}
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
              name="insurance_number"
              style={marginBottom}
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
                placeholder="เลขกรรมธรรฆ์"
              />
            </Form.Item>
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="start_date_coverage" style={marginBottom}>
              <DatePicker
                size={formSize}
                style={{ width: "100%" }}
                placeholder="วันที่เริ่มคุ้มครอง"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="last_date_coverage" style={marginBottom}>
              <DatePicker
                size={formSize}
                style={{ width: "100%" }}
                placeholder="วันสิ้นสุดคุ้มครอง"
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
              name="insurance_premium"
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
                placeholder="เบี้ยประกัน"
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
            lg={{ span: 5 }}
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

import React from "react";
import { formSize } from "../../../components/settings/index";
import { Form, Col, Input, Select, Row, DatePicker, Badge } from "antd";

const { Option } = Select;

const DetailFormFilter = (props) => {
  const { companyValue } = props;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 8 },
    },
    // wrapperCol: {
    //   xs: { span: 24 },
    //   sm: { span: 20 },
    //   md: { span: 20 },
    //   lg: { span: 16 },
    // },
  };

  const colLayout = {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
    lg: { span: 8 },
  };
  let optionCompany = companyValue.map((item, index) => {
    return (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    );
  });
  const marginBottom = { marginBottom: "0px" };
  return (
    <div>
      <Form ref={props.formRef} {...formItemLayout}>
        <Row gutter={24}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="driver_id" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="รหัสคนขับ"
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
              <Select size={formSize} placeholder="--เลือกสถานะคนขับรถ--">
                <Option value={"active"}>
                  <Badge
                    status="processing"
                    color="#87d068"
                    text={"ทำงานอยู่"}
                  />
                </Option>
                <Option value={"inactive"}>
                  <Badge status="processing" color="#f50" text={"ลาออกแล้ว"} />
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
            <Form.Item name="title_name" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกคำนำหน้า--">
                <Option value="นาย"> นาย</Option>
                <Option value="นาง"> นาง</Option>
                <Option value="นางสาว"> นางสาว</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="name" style={marginBottom}>
              <Input size={formSize} placeholder="ชื่อ-นามสกุล" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="finish_date_work" style={marginBottom}>
              <DatePicker
                size={formSize}
                style={{ width: "100%" }}
                placeholder="วันที่ทำงานวันสุดท้าย"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="nickname" style={marginBottom}>
              <Input size={formSize} placeholder="ชื่อเล่น" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="phobe_number" style={marginBottom}>
              <Input size={formSize} placeholder="เบอร์โทร" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="birthday" style={marginBottom}>
              <DatePicker
                size={formSize}
                style={{ width: "100%" }}
                placeholder="วันเดือนปีเกิด"
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
            <Form.Item
              style={marginBottom}
              name="identity_card_number"
              rules={[
                {
                  pattern: new RegExp(/^[0-9\b]+$/),
                  message: "Please enter numbers only!",
                },
                {
                  max: 13,
                  message: "Please input your  13 characters!",
                },
              ]}
            >
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="เลขบัตรประจำตัวประชาชน"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="company_id" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกสังกััดบริษัท--">
                {optionCompany}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="start_date_work" style={marginBottom}>
              <DatePicker
                size={formSize}
                style={{ width: "100%" }}
                placeholder="วันที่เริ่มทำงาน"
              />
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
                <Option value="identity_card"> เฉพาะที่มีรูปบัตรประชาชน</Option>
                <Option value="driver_card"> เฉพาะที่มีรูปใบขับขี่</Option>
                <Option value="employee"> เฉพาะที่มีรูปพนักงาน</Option>
                <Option value="no_identity_card">
                  เฉพาะที่ไม่มีรูปบัตรประชาชน
                </Option>
                <Option value="no_driver_card">เฉพาะที่ไม่มีรูปใบขับขี่</Option>
                <Option value="no_employee"> เฉพาะที่ไม่มีรูปพนักงาน</Option>
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

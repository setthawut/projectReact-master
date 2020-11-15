import React from "react";
import { formSize } from "../../../components/settings/index";
import {
  Form,
  Col,
  Input,
  Select,
  Row,
  DatePicker,
  Badge,
  InputNumber,
} from "antd";

const { Option } = Select;

const DetailFormFilter = (props) => {
  const { purchasingValue, financialValue, paymentValue } = props;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 6 },
    },
    // wrapperCol: {
    //   xs: { span: 24 },
    //   sm: { span: 10 },
    //   lg: { span: 16 },
    // },
  };

  // const colLayout = {
  //   xs: { span: 24 },
  //   sm: { span: 12 },
  //   md: { span: 12 },
  //   lg: { span: 8 },
  // };
  let optionPurchasingValue = purchasingValue.map((item, index) => {
    return (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    );
  });
  let optionFinancialValue = financialValue.map((item, index) => {
    return (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    );
  });
  let optionPaymentValue = paymentValue.map((item, index) => {
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
            <Form.Item name="financial_id" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                style={{
                  color: "black",
                }}
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
            <Form.Item name="purchasing_pattern_id" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกรูปแบบการจัดซื้อ--">
                {optionPurchasingValue}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="financial_service_company_id" style={marginBottom}>
              <Select
                size={formSize}
                placeholder="--เลือกบริษัทที่ให้บริการทางการเงิน--"
              >
                {optionFinancialValue}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="contract_number" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="เลขสัญญา"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="down_payment" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="ยอดดาวน์"
              />
            </Form.Item>
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="top_finance" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="ยอดจัดไฟแนนซ์"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="flat_rate" style={marginBottom}>
              <InputNumber
                size={formSize}
                //formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                style={{ width: "100%" }}
                placeholder="อัตราดอกเบี้ย (Flat Rate)"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="number_installment" style={marginBottom}>
              <Select placeholder={"--เลือกจำนวนงวด--"} size={formSize}>
                <Option value={24}>24</Option>
                <Option value={36}>36</Option>
                <Option value={48}>48</Option>
                <Option value={60}>60</Option>
                <Option value={72}>72</Option>
                <Option value={84}>84</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="first_installment_date" style={marginBottom}>
              <DatePicker
                size={formSize}
                style={{ width: "100%" }}
                placeholder="เลือกงวดแรกวันที่"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="last_installment_date" style={marginBottom}>
              <DatePicker
                size={formSize}
                style={{ width: "100%" }}
                placeholder="งวดสุดท้ายวันที่"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="monthly_installment_date" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="วันที่ต้องชำระงวดของแต่ละงวด"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="payment_channel_id" style={marginBottom}>
              <Select size={formSize} placeholder="--ช่องทางการชำระค่างวด--">
                {optionPaymentValue}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="installment" style={marginBottom}>
              <Input size={formSize} autoComplete="off" placeholder="ค่างวด" />
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
                <Option value="instalment_contract">
                  เฉพาะที่มีรูปสัญญาเช่าซื้อ
                </Option>
                <Option value="instalment_card"> เฉพาะที่มีรูปบัตรผ่อน</Option>
                <Option value="no_instalment_contract">
                  เฉพาะที่ไม่มีรูปสัญญาเช่าซื้อ
                </Option>
                <Option value="no_instalment_card">
                  เฉพาะที่ไม่มีรูปบัตรผ่อน
                </Option>
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

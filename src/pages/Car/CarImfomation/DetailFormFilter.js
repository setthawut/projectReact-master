import React, { useEffect } from "react";
import { formSize } from "../../../components/settings/index";
import { Form, Col, Input, Select, Row, DatePicker, Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";

const { Option } = Select;

const DetailFormFilter = (props) => {
  const Vehicle_step_all_option = useSelector(
    ({ Vehicle_step_all_option }) => Vehicle_step_all_option,
  );

  let optionVehicle_type = Vehicle_step_all_option.result.vehicleType.map(
    (item, i) => (
      <Option value={item.id} key={i}>
        {item.name}
      </Option>
    ),
  );
  let optionVehicle_brand = Vehicle_step_all_option.result.vehicleBrand.map(
    (item, i) => (
      <Option value={item.id} key={i}>
        {item.name}
      </Option>
    ),
  );
  let optionVehicle_model = Vehicle_step_all_option.result.vehicleModel.map(
    (item, i) => (
      <Option value={item.id} key={i}>
        {item.name}
      </Option>
    ),
  );
  let optionVehicle_modelYear = Vehicle_step_all_option.result.vehicleModelYear.map(
    (item, i) => (
      <Option value={item.id} key={i}>
        {item.name}
      </Option>
    ),
  );
  let optionVehicle_color = Vehicle_step_all_option.result.vehicleColor.map(
    (item, i) => (
      <Option value={item.id} key={i}>
        {item.name}
      </Option>
    ),
  );
  let optionOwnerBranch = Vehicle_step_all_option.result.ownerBranch.map(
    (item, i) => (
      <Option value={item.id} key={i}>
        {item.name}
      </Option>
    ),
  );
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

  const colLayout = {
    xs: { span: 24 },
    lg: { span: 8 },
  };
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
            <Form.Item name="vehicle_id" style={marginBottom}>
              <Input size={formSize} autoComplete="off" placeholder="รหัสรถ" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="status" style={marginBottom}>
              <Select
                size={formSize}
                placeholder="please select"
                placeholder="สถานะการทำงาน"
              >
                <Option value="active">
                  <Badge status="processing" color="#87d068" text={"ใช้งาน"} />
                </Option>
                <Option value="inactive">
                  <Badge status="processing" color="#f50" text={"ไม่ใช่งาน"} />
                </Option>
                <Option value="sale">
                  <Badge status="processing" color="#ffd700" text={"ขายแล้ว"} />
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
            <Form.Item name="owner_vehicle" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="ผู้ครอบครองรถ"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="nickowner_shipname" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="ผู้ถือกรรมสิทธิ์"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="vehicle_type_id" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกประเภทรถ--">
                {optionVehicle_type}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="vehicle_brand_id" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกยี่ห้อ--">
                {optionVehicle_brand}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="vehicle_model_id" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกรุ่น--">
                {optionVehicle_model}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="vehicle_model_year_id" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกรุ่นปี--">
                {optionVehicle_modelYear}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="vehicle_color_id" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกสี--">
                {optionVehicle_color}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="license_page" style={marginBottom}>
              <Input size={formSize} autoComplete="off" placeholder="ทะเบียน" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="tank_numbers" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="เลขตัวถัง"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="engine_number" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="เลขเครื่องยนต์"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="key_code" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="รหัสกุญแจ"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="owner_branch" style={marginBottom}>
              <Select size={formSize} placeholder="--เลือกสังกัดงาน--">
                {optionOwnerBranch}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="asset_register_code" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder=" รหัสทะเบียนทรัพสิน (ทางบัญชี) "
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="owner_date" style={marginBottom}>
              <DatePicker
                size={formSize}
                placeholder="วันที่ครอบครอง"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="purchase_date" style={marginBottom}>
              <DatePicker
                style={{ width: "100%" }}
                size={formSize}
                placeholder="วันที่ซื้อ/วันที่รับรถ"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="purchase_price" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="ราคาที่ซื้อ(ไม่รวมvat)"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="purchase_vat" style={marginBottom}>
              <Input size={formSize} autoComplete="off" placeholder="vat 7%" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="purchase_price_vat" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="ราคาที่ซื้อ(รวมvat)"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="vehicle_seller" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="ผู้ขายรถ "
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="sale_date" style={marginBottom}>
              <DatePicker
                size={formSize}
                placeholder="วันที่ขาย"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <Form.Item name="sale_price" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="ราคาที่ขาย(ไม่รวมvat)"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="sale_vat" style={marginBottom}>
              <Input size={formSize} autoComplete="off" placeholder="vat 7%" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="sale_price_vat">
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="ราคาที่ขาย(รวมvat)"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 5 }}
          >
            <Form.Item name="vehicle_buyer" style={marginBottom}>
              <Input
                size={formSize}
                autoComplete="off"
                placeholder="ผู้ซื้อรถ"
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
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
                <Option value="vehicle"> เฉพาะที่มีรูปรถ</Option>
                <Option value="contract_buy"> เฉพาะที่มีรูปสัญญาตอนซื้อ</Option>
                <Option value="contract_sale"> เฉพาะที่มีรูปสัญญาตอนขาย</Option>
                <Option value="license_plate">เฉพาะที่มีป้ายทะเบียน</Option>
                <Option value="no_vechicle"> เฉพาะที่ไม่มีรูปรถ</Option>
                <Option value="no_contract_buy">
                  เฉพาะที่ไม่มีรูปสัญญาตอนซื้อ
                </Option>
                <Option value="no_contract_sale">
                  เฉพาะที่ไม่มีรูปสัญญาตอนขาย
                </Option>
                <Option value="no_license_plate">
                  เฉพาะที่ไม่มีป้ายทะเบียน
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

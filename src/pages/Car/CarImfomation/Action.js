import React, { useState, createRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationWrapper from "../../../components/Layout/NavigationWrapper";
import { notificationWithIcon } from "../../../components/Notification";
import Api from "../../../services/httpClient";
import moment from "moment";
import { formSize } from "../../../components/settings/index";
import { useHistory, Link } from "react-router-dom";
import Vehicle from "./Car_step";
import Financial from "./Financial_step";
import Insurance from "./Insurance_step";
import Driver from "./Driver_step";

import {
  Form,
  Col,
  Divider,
  Upload,
  Input,
  Tabs,
  Row,
  Switch,
  Select,
  Modal,
  Button,
  DatePicker,
  Steps,
  Badge,
  Breadcrumb,
  Typography,
  Spin,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  CarOutlined,
  FileTextOutlined,
  InsuranceOutlined,
  UserOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import * as Vehile_step_all from "../../../actions/Vehicle_step_all.action";
import "./index.css";
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { Title } = Typography;

const Action = () => {
  const dispatch = useDispatch();
  let getUsername = localStorage.getItem("userProfile");
  let UserProfile = JSON.parse(getUsername);
  const Vehicle_step_all_option = useSelector(
    ({ Vehicle_step_all_option }) => Vehicle_step_all_option,
  );
  useEffect(() => {
    dispatch(Vehile_step_all.fetchVehicle());
  }, []);
  const [loading, setLoading] = useState(false);
  const [formStep1] = Form.useForm();
  const [formStep2] = Form.useForm();
  const [formStep3] = Form.useForm();
  const [formStep4] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [dataStep1, setDataStep1] = useState({});
  const [dataStep2, setDataStep2] = useState({});
  const [dataStep3, setDataStep3] = useState({});
  const [dataStep4, setDataStep4] = useState({});

  // Vehicle
  const [base64_car, setBase64_car] = useState([]);
  const [base64_buy, setBase64_buy] = useState([]);
  const [base64_sale, setBase64_sale] = useState([]);
  const [base64_license_plate, setBase64_license_plate] = useState([]);
  const [stateResultNonVat_Buy, setStateResulNontVat_Buy] = useState();
  const [stateResultresultVat7_Buy, setstateResultResultVat7_Buy] = useState();
  const [stateResultNonVat_Sale, setStateResulNontVat_Sale] = useState();
  const [
    stateResultresultVat7_Sale,
    setstateResultResultVat7_Sale,
  ] = useState();

  // Financial
  const [base64_instalment_contract, setBase64_instalment_contract] = useState(
    [],
  );
  const [base64_instalment_card, setBase64_instalment_card] = useState([]);
  // Driver
  const [base64_employee, setBase64_employee] = useState([]);
  const [base64_identity, setBase64_identity] = useState([]);
  const [base64_driver, setBase64_driver] = useState([]);
  //Insurance
  const [base64_Insurance, setBase64_Insurance] = useState([]);

  //// state ไว้เช็คปุ่มถ้ารูปเกิน 20 รูป--------------------------------------------------
  ///vehicle
  const [buttonCheck_Vehicle_car, setButtonCheck_Vehicle_car] = useState([]);
  const [buttonCheck_Vehicle_buy, setButtonCheck_Vehicle_buy] = useState([]);
  const [buttonCheck_Vehicle_sale, setButtonCheck_Vehicle_sale] = useState([]);
  const [
    buttonCheck_Vehicle_license_plate,
    setButtonCheck_Vehicle_license_plate,
  ] = useState([]);
  ///Financial
  const [
    buttonCheck_instalment_contract,
    setButtonCheck_instalment_contract,
  ] = useState([]);
  const [
    buttonCheck_instalment_card,
    setButtonCheck_instalment_card,
  ] = useState([]);
  //Insurance
  const [buttonCheck_Insurance, setButtonCheck_Insurance] = useState([]);
  // Driver
  const [buttonCheck_Employee, setButtonCheck_Employee] = useState([]);
  const [buttonCheck_Identity, setButtonCheck_Identity] = useState([]);
  const [buttonCheck_Driver, setButtonCheck_Driver] = useState([]);
  //---------------------------------------------------------------------------------
  const [statusCreate, setStatusCreate] = useState(false);

  let name = "ข้อมูลรถ";
  let history = useHistory();
  let pathUrl = `/car/carInfomation`;

  const navigation = [
    { key: 1, title: "หน้าแรก", link: "/dashboard" },
    { key: 2, title: name, link: "" },
  ];
  const steps = [
    {
      title: "ข้อมูลรถ",
    },
    {
      title: "ข้อมูลทางการเงิน",
    },
    {
      title: "ประกัน พรบ ภาษี",
    },
    {
      title: "พนักงานขับรถ",
    },
    {
      title: "ยืนยันข้อมูล",
    },
    {
      title: "สถานะ",
    },
  ];
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 14 },
      lg: { span: 11 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      lg: { span: 24 },
    },
  };
  const FetchAPI = () => {
    //------------------------------------------------------------------------------------ Vehicle----------------------------/
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [previewVisible, setPreviewVisible] = useState(false);
    const colLayout = {
      xs: { span: 24 },
      lg: { span: 11 },
    };
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
    let fileList_car =
      base64_car.length > 0
        ? base64_car.map((item, index) => ({
            uid: index,
            url: item.file,
          }))
        : [];
    let fileList_license_plate =
      base64_license_plate.length > 0
        ? base64_license_plate.map((item, index) => ({
            uid: index,
            url: item.file,
          }))
        : [];

    let fileList_buy =
      base64_buy.length > 0
        ? base64_buy.map((item, index) => ({
            uid: index,
            url: item.file,
          }))
        : [];
    let fileList_sale =
      base64_sale.length > 0
        ? base64_sale.map((item, index) => ({
            uid: index,
            url: item.file,
          }))
        : [];
    const handlePreview = async (file) => {
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
      );
    };
    const handleCancel = () => setPreviewVisible(false);
    //------------------------------------------------------------------------------------ Financial----------------------------/
    let optionPurchasingValue = Vehicle_step_all_option.result.purchasingPattern.map(
      (item, index) => {
        return (
          <Option key={index} value={item.id}>
            {item.name}
          </Option>
        );
      },
    );
    let optionFinancialValue = Vehicle_step_all_option.result.purchasingPattern.map(
      (item, index) => {
        return (
          <Option key={index} value={item.id}>
            {item.name}
          </Option>
        );
      },
    );
    let optionPaymentValue = Vehicle_step_all_option.result.paymentChannel.map(
      (item, index) => {
        return (
          <Option key={index} value={item.id}>
            {item.name}
          </Option>
        );
      },
    );
    let fileList_instalment_contract =
      base64_instalment_contract.length > 0
        ? base64_instalment_contract.map((item, index) => ({
            uid: index,
            url: item.file,
          }))
        : [];
    let fileList_instalment_card =
      base64_instalment_card.length > 0
        ? base64_instalment_card.map((item, index) => ({
            uid: index,
            url: item.file,
          }))
        : [];
    //------------------------------------------------------------------------------------ Insurance----------------------------/
    let optionInsuranceCompany = Vehicle_step_all_option.result.InsuranceCompany.map(
      (item, index) => (
        <Option value={item.id} key={index}>
          {item.name}
        </Option>
      ),
    );
    let optionInsuranceType = Vehicle_step_all_option.result.InsuranceType.map(
      (item, index) => (
        <Option value={item.id} key={index}>
          {item.name}
        </Option>
      ),
    );

    let fileList_Insurance =
      base64_Insurance.length > 0
        ? [
            {
              uid: 1,
              url: base64_Insurance,
            },
          ]
        : [];
    //------------------------------------------------------------------------------------ Driver----------------------------/
    let companyValue = Vehicle_step_all_option.result.company.map((item, i) => (
      <Option value={item.id} key={i}>
        {item.name}
      </Option>
    ));
    let fileList_employee =
      base64_employee.length > 0
        ? base64_employee.map((item, index) => ({
            uid: index,
            url: item.file,
          }))
        : [];
    let fileList_identity =
      base64_identity.length > 0
        ? base64_identity.map((item, index) => ({
            uid: index,
            url: item.file,
          }))
        : [];
    let fileList_driver =
      base64_driver.length > 0
        ? base64_driver.map((item, index) => ({
            uid: index,
            url: item.file,
          }))
        : [];

    return (
      <Tabs defaultActiveKey="1" tabPosition={"left"}>
        <TabPane
          tab={
            <span>
              <CarOutlined /> ข้อมูลรถ
            </span>
          }
          key="1"
        >
          <Form scrollToFirstError {...formItemLayout} labelAlign="left">
            <Row gutter={24}>
              <Col span={7} style={{ marginLeft: "15px", marginRight: "15px" }}>
                <Divider orientation="left">รูปรถ</Divider>
                <Form.Item>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList_car}
                    onPreview={handlePreview}
                  ></Upload>
                  <Modal
                    visible={previewVisible}
                    onCancel={handleCancel}
                    width={820}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
                <Divider orientation="left">ป้ายทะเบียน</Divider>
                <Form.Item>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList_license_plate}
                    onPreview={handlePreview}
                  ></Upload>
                  <Modal
                    visible={previewVisible}
                    onCancel={handleCancel}
                    width={820}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>

                <Divider orientation="left">สัญญาตอนซื้อ</Divider>
                <Form.Item>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList_buy}
                    onPreview={handlePreview}
                  ></Upload>
                  <Modal
                    visible={previewVisible}
                    onCancel={handleCancel}
                    width={820}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
                <Divider orientation="left">สัญญาตอนขาย</Divider>
                <Form.Item>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList_sale}
                    onPreview={handlePreview}
                  ></Upload>
                  <Modal
                    visible={previewVisible}
                    onCancel={handleCancel}
                    width={820}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
              </Col>

              <Col {...colLayout}>
                <Form.Item name="status" label="สถานะ">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep1.status}
                    disabled
                  >
                    <Option value="active">
                      <Badge
                        status="processing"
                        color="#87d068"
                        text={"ใช้งาน"}
                      />
                    </Option>
                    <Option value="inactive">
                      <Badge
                        status="processing"
                        color="#f50"
                        text={"ไม่ใช่งาน"}
                      />
                    </Option>
                    <Option value="sale">
                      <Badge
                        status="processing"
                        color="#ffd700"
                        text={"ขายแล้ว"}
                      />
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item name="owner_vehicle" label="ผู้ครอบครองรถ">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.owner_vehicle}
                    disabled
                  />
                </Form.Item>

                <Form.Item name="owner_ship" label="ผู้ถือกรรมสิทธิ์">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.owner_ship}
                    disabled
                  />
                </Form.Item>

                <Form.Item name="vehicle_type_id" label="ประเภทรถ">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep1.vehicle_type_id}
                    disabled
                  >
                    {optionVehicle_type}
                  </Select>
                </Form.Item>
                <Form.Item name="vehicle_brand_id" label="ยี่ห้อรถ">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep1.vehicle_brand_id}
                    disabled
                  >
                    {optionVehicle_brand}
                  </Select>
                </Form.Item>
                <Form.Item name="vehicle_model_id" label="รุ่น">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep1.vehicle_model_id}
                    disabled
                  >
                    {optionVehicle_model}
                  </Select>
                </Form.Item>
                <Form.Item name="vehicle_model_year_id" label="รุ่นปี">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep1.vehicle_model_year_id}
                    disabled
                  >
                    {optionVehicle_modelYear}
                  </Select>
                </Form.Item>
                <Form.Item name="vehicle_color_id" label="สี">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep1.vehicle_color_id}
                    disabled
                  >
                    {optionVehicle_color}
                  </Select>
                </Form.Item>
                <Form.Item name="license_page" label="ทะเบียน">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.license_page}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="เลขตัวถัง" name="tank_numbers">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.tank_numbers}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="เลขเครื่องยนต์" name="engine_number">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.engine_number}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="รหัสกุญแจ " name="key_code">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.key_code}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="สังกัดงาน " name="owner_branch">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep1.key_code}
                    disabled
                  >
                    {optionOwnerBranch}
                  </Select>
                </Form.Item>
                <Form.Item
                  label=" รหัสทะเบียนทรัพสิน (ทางบัญชี) "
                  name="asset_register_code"
                >
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.asset_register_code}
                    disabled
                  />
                </Form.Item>
                <Form.Item label=" วันที่ครอบครอง" name="owner_date">
                  <DatePicker
                    size={formSize}
                    defaultValue={
                      dataStep1.owner_date === undefined
                        ? undefined
                        : moment(dataStep1.owner_date)
                    }
                    disabled
                  />
                </Form.Item>
                <Form.Item label="วันที่ซื้อ/วันที่รับรถ" name="purchase_date">
                  <DatePicker
                    size={formSize}
                    defaultValue={
                      dataStep1.purchase_date === undefined
                        ? undefined
                        : moment(dataStep1.purchase_date)
                    }
                    disabled
                  />
                </Form.Item>
                <Form.Item label="ราคาที่ซื้อ(ไม่รวมvat)" name="purchase_price">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.purchase_price}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="vat 7%" name="purchase_vat">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.purchase_vat}
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  label="ราคาที่ซื้อ(รวมvat)"
                  name="purchase_price_vat"
                >
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.purchase_price_vat}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="ผู้ขายรถ " name="vehicle_seller">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.vehicle_seller}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="วันที่ขาย " name="sale_date">
                  <DatePicker
                    size={formSize}
                    defaultValue={
                      dataStep1.sale_date === undefined
                        ? undefined
                        : moment(dataStep1.sale_date)
                    }
                    disabled
                  />
                </Form.Item>
                <Form.Item label="ราคาที่ขาย(ไม่รวมvat)" name="sale_price">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.sale_price}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="vat 7%" name="sale_vat">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.sale_vat}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="ราคาที่ขาย(รวมvat)" name="sale_price_vat">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.sale_price_vat}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="ผู้ซื้อรถ" name="vehicle_buyer">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep1.vehicle_buyer}
                    disabled
                  />
                </Form.Item>
                <Form.Item name="comment" label="หมายเหตุ">
                  <TextArea
                    rows={4}
                    size={formSize}
                    defaultValue={dataStep1.comment}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane
          tab={
            <span>
              <FileTextOutlined /> ข้อมูลทางการเงิน
            </span>
          }
          key="2"
        >
          <Form scrollToFirstError {...formItemLayout} labelAlign="left">
            <Row gutter={24}>
              <Col span={7} style={{ marginLeft: "15px", marginRight: "15px" }}>
                <Divider orientation="left">รูปสัญญาเช่าซื้อ</Divider>
                <Form.Item>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    onPreview={handlePreview}
                    fileList={fileList_instalment_contract}
                  ></Upload>
                  <Modal
                    visible={previewVisible}
                    onCancel={handleCancel}
                    width={820}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
                <Divider orientation="left">บัตรผ่อน</Divider>
                <Form.Item>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    onPreview={handlePreview}
                    fileList={fileList_instalment_card}
                  ></Upload>
                  <Modal
                    visible={previewVisible}
                    onCancel={handleCancel}
                    width={820}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
              </Col>
              <Col {...colLayout}>
                <Form.Item
                  name="purchasing_pattern_id"
                  label="รูปแบบการจัดซื้อ"
                >
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep2.purchasing_pattern_id}
                    disabled
                  >
                    {optionPurchasingValue}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="financial_service_company_id"
                  label="บริษัทที่ให้บริการทางการเงิน"
                >
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep2.financial_service_company_id}
                    disabled
                  >
                    {optionFinancialValue}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="contract_number"
                  label="เลขสัญญา"
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
                    defaultValue={dataStep2.contract_number}
                    disabled
                  />
                </Form.Item>
                <Form.Item name="down_payment" label="ยอดดาวน์">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep2.down_payment}
                    disabled
                  />
                </Form.Item>
                <Form.Item name="top_finance" label="ยอดจัดไฟแนนซ์">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep2.top_finance}
                    disabled
                  />
                </Form.Item>
                <Form.Item name="flat_rate" label="อัตราดอกเบี้ย (Flat Rate)">
                  <Input
                    size={formSize}
                    defaultValue={`${dataStep2.flat_rate}%`}
                    disabled
                  />
                </Form.Item>
                <Form.Item name="number_installment" label="จำนวนงวด">
                  <Select
                    placeholder={"Plaese select"}
                    size={formSize}
                    defaultValue={dataStep2.number_installment}
                    disabled
                  >
                    <Option value={24}>24</Option>
                    <Option value={36}>36</Option>
                    <Option value={48}>48</Option>
                    <Option value={60}>60</Option>
                    <Option value={72}>72</Option>
                    <Option value={84}>84</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="first_installment_date" label="งวดแรกวันที่">
                  <DatePicker
                    size={formSize}
                    defaultValue={
                      dataStep2.first_installment_date === undefined
                        ? undefined
                        : moment(dataStep2.first_installment_date)
                    }
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  name="last_installment_date"
                  label="งวดสุดท้ายวันที่"
                >
                  <DatePicker
                    size={formSize}
                    defaultValue={
                      dataStep2.last_installment_date === undefined
                        ? undefined
                        : moment(dataStep2.last_installment_date)
                    }
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  name="monthly_installment_date"
                  label="วันที่ต้องชำระงวดของแต่ละงวด"
                >
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep2.monthly_installment_date}
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  name="payment_channel_id"
                  label="ช่องทางการชำระค่างวด"
                >
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep2.payment_channel_id}
                    disabled
                  >
                    {optionPaymentValue}
                  </Select>
                </Form.Item>
                <Form.Item name="installment" label="ค่างวด">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    disabled
                    defaultValue={dataStep2.installment}
                  />
                </Form.Item>
                <Form.Item
                  label="สถานะ"
                  name="is_active"
                  valuePropName="checked"
                >
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked={dataStep2.is_active}
                    disabled
                  />
                </Form.Item>
                <Form.Item name="comment" label="หมายเหตุ">
                  <TextArea
                    rows={4}
                    size={formSize}
                    defaultValue={dataStep2.comment}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane
          tab={
            <span>
              <InsuranceOutlined /> ประกัน พรบ ภาษี
            </span>
          }
          key="3"
        >
          <Form scrollToFirstError {...formItemLayout} labelAlign="left">
            <Row gutter={24}>
              <Col span={7} style={{ marginLeft: "15px", marginRight: "15px" }}>
                <Divider orientation="left">หน้ากรรมธรรฆ์</Divider>
                <Form.Item>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    onPreview={handlePreview}
                    fileList={fileList_Insurance}
                  ></Upload>
                  <Modal
                    visible={previewVisible}
                    onCancel={handleCancel}
                    width={820}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
              </Col>
              <Col {...colLayout}>
                <Form.Item name="insurance_type_id" label="ประเภทเอกสาร">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep3.insurance_type_id}
                    disabled
                  >
                    {optionInsuranceType}
                  </Select>
                </Form.Item>
                <Form.Item name="type" label="ประเภท">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep3.type}
                    disabled
                  >
                    <Option value="ชั้น1">ชั้น 1</Option>
                    <Option value="ชั้น2">ชั้น 2</Option>
                    <Option value="ชั้น3">ชั้น 3</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="insurance_company_id" label="บริษัทประกัน">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep3.insurance_company_id}
                    disabled
                  >
                    {optionInsuranceCompany}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="insurance_number"
                  label="เลขกรรมธรรฆ์"
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
                    defaultValue={dataStep3.insurance_number}
                    disabled
                  />
                </Form.Item>

                <Form.Item
                  name="start_date_coverage"
                  label="วันที่เริ่มคุ้มครอง"
                >
                  <DatePicker
                    size={formSize}
                    defaultValue={
                      dataStep3.start_date_coverage === undefined
                        ? undefined
                        : moment(dataStep3.start_date_coverage)
                    }
                    disabled
                  />
                </Form.Item>
                <Form.Item name="last_date_coverage" label="วันสิ้นสุดคุ้มครอง">
                  <DatePicker
                    size={formSize}
                    defaultValue={
                      dataStep3.last_date_coverage === undefined
                        ? undefined
                        : moment(dataStep3.last_date_coverage)
                    }
                    disabled
                  />
                </Form.Item>

                <Form.Item
                  name="insurance_premium"
                  label="เบี้ยประกัน"
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
                    defaultValue={dataStep3.insurance_premium}
                    disabled
                  />
                </Form.Item>

                <Form.Item label="สถานะ" name="is_active">
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked={dataStep3.is_active}
                    disabled
                  />
                </Form.Item>
                <Form.Item name="comment" label="หมายเหตุ">
                  <TextArea rows={4} size={formSize} disabled />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane
          tab={
            <span>
              <UserOutlined /> พนักงานขับรถ
            </span>
          }
          key="4"
        >
          <Form scrollToFirstError {...formItemLayout} labelAlign="left">
            <Row gutter={24}>
              <Col span={7} style={{ marginLeft: "15px", marginRight: "15px" }}>
                <Divider orientation="left">รูปพนักงาน</Divider>
                <Form.Item>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    onPreview={handlePreview}
                    fileList={fileList_employee}
                  ></Upload>
                  <Modal
                    visible={previewVisible}
                    onCancel={handleCancel}
                    width={820}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>

                <Divider orientation="left">สำเนาบัตรประชาชน</Divider>
                <Form.Item>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    onPreview={handlePreview}
                    fileList={fileList_identity}
                  ></Upload>
                  <Modal
                    visible={previewVisible}
                    onCancel={handleCancel}
                    width={820}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
                <Divider orientation="left">สำเนาใบขับขี่</Divider>
                <Form.Item>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    onPreview={handlePreview}
                    fileList={fileList_driver}
                  ></Upload>
                  <Modal
                    visible={previewVisible}
                    onCancel={handleCancel}
                    width={820}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
              </Col>

              <Col {...colLayout}>
                <Form.Item name="type" label="สถานะคนขับรถ">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep4.type}
                    disabled
                  >
                    <Option value={"active"}>
                      <Badge
                        status="processing"
                        color="#87d068"
                        text={"ทำงานอยู่"}
                      />
                    </Option>
                    <Option value={"inactive"}>
                      <Badge
                        status="processing"
                        color="#f50"
                        text={"ลาออกแล้ว"}
                      />
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item name="title_name" label="คำนำหน้า">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep4.title_name}
                    disabled
                  >
                    <Option value="นาย">นาย</Option>
                    <Option value="นาง">นาง</Option>
                    <Option value="นางสาว">นางสาว</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="name" label="ชื่อ-นามสกุล">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep4.name}
                    disabled
                  />
                </Form.Item>

                <Form.Item name="nickname" label="ชื่อเล่น">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep4.nickname}
                    disabled
                  />
                </Form.Item>

                <Form.Item name="phone_number" label="เบอร์โทร">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    defaultValue={dataStep4.phone_number}
                    disabled
                  />
                </Form.Item>
                <Form.Item name="birthday" label="วันเดือนปีเกิด">
                  <DatePicker
                    size={formSize}
                    defaultValue={
                      dataStep4.birthday === undefined
                        ? undefined
                        : moment(dataStep4.birthday)
                    }
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  name="identity_card_number"
                  label="เลขบัตรประจำตัวประชาชน"
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
                    defaultValue={dataStep4.identity_card_number}
                    disabled
                  />
                </Form.Item>
                <Form.Item name="company_id" label="สังกััดบริษัท">
                  <Select
                    size={formSize}
                    placeholder="Please select"
                    defaultValue={dataStep4.company_id}
                    disabled
                  >
                    {companyValue}
                  </Select>
                </Form.Item>
                <Form.Item name="start_date_work" label="วันที่เริ่มทำงาน">
                  <DatePicker
                    size={formSize}
                    defaultValue={
                      dataStep4.start_date_work === undefined
                        ? undefined
                        : moment(dataStep4.start_date_work)
                    }
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  name="finish_date_work"
                  label="วันที่ทำงานวันสุดท้าย"
                >
                  <DatePicker
                    size={formSize}
                    defaultValue={
                      dataStep4.finish_date_work === undefined
                        ? undefined
                        : moment(dataStep4.finish_date_work)
                    }
                    disabled
                  />
                </Form.Item>
                <Form.Item label="สถานะ" name="status" valuePropName="checked">
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked={dataStep4.status}
                    disabled
                  />
                </Form.Item>
                <Form.Item name="comment" label="หมายเหตุ">
                  <TextArea
                    rows={4}
                    size={formSize}
                    defaultValue={dataStep4.comment}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    );
  };

  const Success = () => {
    return !loading ? (
      <Row>
        <Col xs={6} sm={6} md={6} lg={8} offset={10}>
          <Title>
            <Spin size="large" />
          </Title>
        </Col>
      </Row>
    ) : statusCreate ? (
      <Row>
        <Col xs={6} sm={6} md={6} lg={7} offset={9}>
          <Title>Successfully !!</Title>
        </Col>

        <Col xs={6} sm={6} md={6} lg={7} offset={6}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/confirm.jpg`} />
        </Col>
      </Row>
    ) : (
      <Row>
        <Col xs={6} sm={6} md={6} lg={7} offset={9}>
          <Title>Create Fail !!</Title>
        </Col>

        <Col xs={6} sm={6} md={6} lg={7} offset={6}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/cancel.jpg`} />
        </Col>
      </Row>
    );
  };

  const DefaultContent = () => {
    return <h1>Default Content</h1>;
  };

  const next = async () => {
    try {
      if (current === 0) {
        let step1 = await formStep1.validateFields();

        let data = {
          ...step1,
          purchase_price: stateResultNonVat_Buy,
          purchase_vat: stateResultresultVat7_Buy,
          sale_price: stateResultNonVat_Sale,
          sale_vat: stateResultresultVat7_Sale,
          sale_date:
            step1.sale_date === undefined || step1.sale_date === null
              ? undefined
              : moment(step1.sale_date).format("YYYY-MM-DD"),
          owner_date:
            step1.owner_date === undefined
              ? undefined
              : moment(step1.owner_date).format("YYYY-MM-DD"),
          purchase_date:
            step1.purchase_date === undefined
              ? undefined
              : moment(step1.purchase_date).format("YYYY-MM-DD"),
          comment: step1.comment === undefined ? null : step1.comment,

          path_file: [].concat(
            base64_car,
            base64_license_plate,
            base64_buy,
            base64_sale,
          ),
          create_by: UserProfile.name,
        };
        console.log({ ...data });
        setDataStep1({ ...data });
      } else if (current === 1) {
        let step2 = await formStep2.validateFields();

        let data = {
          ...step2,
          first_installment_date:
            step2.first_installment_date === undefined
              ? undefined
              : moment(step2.first_installment_date).format("YYYY-MM-DD"),
          last_installment_date:
            step2.last_installment_date === undefined
              ? undefined
              : moment(step2.last_installment_date).format("YYYY-MM-DD"),
          comment: step2.comment === undefined ? null : step2.comment,
          path_file: [].concat(
            base64_instalment_contract,
            base64_instalment_card,
          ),
          create_by: UserProfile.name,
        };
        setDataStep2({ ...data });
      } else if (current === 2) {
        let step3 = await formStep3.validateFields();

        let data = {
          ...step3,
          start_date_coverage:
            step3.start_date_coverage === undefined
              ? undefined
              : moment(step3.start_date_coverage).format("YYYY-MM-DD"),
          last_date_coverage:
            step3.last_date_coverage === undefined
              ? undefined
              : moment(step3.last_date_coverage).format("YYYY-MM-DD"),
          comment: step3.comment === undefined ? null : step3.comment,
          path_file_insurance_page: base64_Insurance,
          create_by: UserProfile.name,
        };

        setDataStep3({ ...data });
      } else if (current === 3) {
        let step4 = await formStep4.validateFields();
        if (Object.keys(step4).length === 1) {
          setDataStep4({ ...step4 });
        } else {
          let data = {
            ...step4,
            birthday:
              step4.birthday === undefined
                ? undefined
                : moment(step4.birthday).format("YYYY-MM-DD"),
            start_date_work:
              step4.start_date_work === undefined
                ? undefined
                : moment(step4.start_date_work).format("YYYY-MM-DD"),
            finish_date_work:
              step4.finish_date_work === undefined
                ? undefined
                : moment(step4.finish_date_work).format("YYYY-MM-DD"),
            comment: step4.comment === undefined ? null : step4.comment,
            path_file: [].concat(
              base64_employee,
              base64_identity,
              base64_driver,
            ),
            admin_id: UserProfile.id,
            create_by: UserProfile.name,
          };
          setDataStep4({ ...data });
        }
      }
      setCurrent(current + 1);
    } catch (err) {}
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onSubmit = async () => {
    let data = {
      Vehicle: dataStep1,
      Financial: dataStep2,
      Insurance: dataStep3,
      Driver: dataStep4,
    };

    Api.post(`api/v1/manage-vehicle`, data)
      .then((respone) => {
        if (respone.status === 200) {
          setLoading(true);
          setStatusCreate(true);
          notificationWithIcon("success", "Create sussces.");

          //history.push(pathUrl);
          return;
        }

        console.log(respone);
        notificationWithIcon("warning", "Create fail.");
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
        notificationWithIcon("warning", "Create fail.");
      });
    setCurrent(current + 1);
  };

  const setFormContent = () => {
    switch (current) {
      case 0:
        return (
          <Vehicle
            formStep1={formStep1}
            setBase64_car={setBase64_car}
            setBase64_buy={setBase64_buy}
            setBase64_sale={setBase64_sale}
            setBase64_license_plate={setBase64_license_plate}
            setButtonCheck_Vehicle_car={setButtonCheck_Vehicle_car}
            setButtonCheck_Vehicle_buy={setButtonCheck_Vehicle_buy}
            setButtonCheck_Vehicle_sale={setButtonCheck_Vehicle_sale}
            setButtonCheck_Vehicle_license_plate={
              setButtonCheck_Vehicle_license_plate
            }
            setStateResulNontVat_Buy={setStateResulNontVat_Buy}
            setstateResultResultVat7_Buy={setstateResultResultVat7_Buy}
            setStateResulNontVat_Sale={setStateResulNontVat_Sale}
            setstateResultResultVat7_Sale={setstateResultResultVat7_Sale}
          />
        );
      case 1:
        return (
          <Financial
            formStep2={formStep2}
            setBase64_instalment_contract={setBase64_instalment_contract}
            setBase64_instalment_card={setBase64_instalment_card}
            setButtonCheck_instalment_contract={
              setButtonCheck_instalment_contract
            }
            setButtonCheck_instalment_card={setButtonCheck_instalment_card}
          />
        );
      case 2:
        return (
          <Insurance
            formStep3={formStep3}
            setBase64_Insurance={setBase64_Insurance}
            setButtonCheck_Insurance={setButtonCheck_Insurance}
          />
        );
      case 3:
        return (
          <Driver
            formStep4={formStep4}
            setBase64_employee={setBase64_employee}
            setBase64_identity={setBase64_identity}
            setBase64_driver={setBase64_driver}
            setButtonCheck_Employee={setButtonCheck_Employee}
            setButtonCheck_Identity={setButtonCheck_Identity}
            setButtonCheck_Driver={setButtonCheck_Driver}
          />
        );
      case 4:
        return <FetchAPI />;
      case 5:
        return <Success />;
      default:
        return <DefaultContent />;
    }
  };

  const checkButtonImage = () => {
    return (
      buttonCheck_Vehicle_car.length > 20 ||
      buttonCheck_Vehicle_buy.length > 20 ||
      buttonCheck_Vehicle_sale.length > 20 ||
      buttonCheck_Vehicle_license_plate.length > 20 ||
      buttonCheck_instalment_contract.length > 20 ||
      buttonCheck_instalment_card.length > 20 ||
      buttonCheck_Insurance.length > 20 ||
      buttonCheck_Employee.length > 20 ||
      buttonCheck_Identity.length > 20 ||
      buttonCheck_Driver.length > 20
    );
  };

  return Object.keys(Vehicle_step_all_option.result).length > 0 ? (
    <React.Fragment>
      <div>
        <NavigationWrapper>
          <div>
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
          <div className="d-none d-md-block"></div>
        </NavigationWrapper>
      </div>
      <div className="card card-body" style={{ margin: "20px", paddingTop: 0 }}>
        <Tabs>
          <TabPane tab={name} key={name}>
            <Steps current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{setFormContent()}</div>
            <div className="steps-action">
              {current < 5 - 1 && (
                <Button
                  type="primary"
                  onClick={() => next()}
                  disabled={checkButtonImage()}
                >
                  ต่อไป
                </Button>
              )}
              {current === 5 - 1 && (
                <Button
                  type="primary"
                  onClick={() => onSubmit()}
                  icon={<SaveOutlined />}
                >
                  บันทึก
                </Button>
              )}
              {current > 0 && current < 5 && (
                <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  ย้อนกลับ
                </Button>
              )}
              {current === 5 && (
                <Button
                  type="primary"
                  style={{ margin: "0 8px" }}
                  onClick={() => {
                    history.push(pathUrl);
                  }}
                >
                  กลับสู่เมนู
                </Button>
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </React.Fragment>
  ) : (
    ""
  );
};

export default Action;

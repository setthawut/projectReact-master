import React, { useState, useEffect } from "react";
import {
  Form,
  Col,
  Divider,
  Upload,
  Input,
  Row,
  Select,
  Modal,
  Button,
  Table,
  Badge,
  DatePicker,
  Switch,
  Alert,
  Spin
} from "antd";
import Api from "../../../../services/httpClient";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import {
  SaveOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { formSize } from "../../../../components/settings/index";
import dummyRequest from "../../../../components/Image/DummyRequest";
import ShowImgWrapper from "../../../../components/Image/ShowImg_Wrapper";
import { notificationWithIcon } from "../../../../components/Notification";
import * as Vehicle_img_Action from "../../../../actions/Vehicle_Img.action";
import { useSelector, useDispatch } from "react-redux";

const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

const DetailVehicle = (props) => {
  const Vehicle_step_all_option = useSelector(
    ({ Vehicle_step_all_option }) => Vehicle_step_all_option,
  );
  const {
    isNew,
    dataId,
    submit,
    setBase64_car,
    setBase64_buy,
    setBase64_sale,
    setBase64_license_plate,
    setStateResulNontVat_Buy,
    setstateResultResultVat7_Buy,
    setStateResulNontVat_Sale,
    setstateResultResultVat7_Sale,
  } = props;
  const dispatch = useDispatch();
  let history = useHistory();
  let { id } = useParams();
  const Vehicle_Img = useSelector(({ Vehicle_Img }) => Vehicle_Img);
  ///// Modalสำหรับโชว์รูป
  const [showModal, setShowModal] = useState(false);
  ////// path รูปจาก components ShowImg_Wrapper มาโชว์ในmodal
  const [imgInModal, setImgInModal] = useState();
  ///////// fileList มาทำตัวนับจำนวนอัพรูปไม่เกิน 20 รูป ต่อครั้ง
  const [fileList_Car, setFileList_Car] = useState([]);
  const [fileList_License_Plate, setFileList_License_Plate] = useState([]);
  const [fileList_Buy, setFileList_Buy] = useState([]);
  const [fileList_Sale, setFileList_Sale] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  ////// stateไว้เก็บค่าคำนวน vat
  const [resultNonVat_Buy, setResulNontVat_Buy] = useState();
  const [resultVat7_Buy, setResultVat7_Buy] = useState();
  const [resultNonVat_Sale, setResulNontVat_Sale] = useState();
  const [resultVat7_Sale, setResultVat7_Sale] = useState();
  const [dataOwner_vehicle, setDataOwner_vehicle] = useState([]);
  const [fetching, setFetching] = useState(false);
  const arrBase64 = [];

  useEffect(() => {
    if (Object.keys(dataId).length > 0) {
      facthVatBuy(dataId.purchase_price_vat);
      facthVatSale(dataId.sale_price_vat);
    }
  }, [dataId]);

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
      sm: { span: 14 },
      lg: { span: 11 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      lg: { span: 24 },
    },
  };

  const colLayout = {
    xs: { span: 24 },
    lg: { span: 11 },
  };

  const getBase64 = (file, maxWidth = 760, maxHeight = null) => {
    if (!file) {
      return null;
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          let ratio = 0;
          if (img.width < maxWidth) {
            resolve(reader.result);
            return;
          } else if (img.width > maxWidth && maxHeight === null) {
            ratio = maxWidth / img.width;
            maxWidth = img.width * ratio;
            maxHeight = img.height * ratio;
          } else if (img.height > maxHeight && maxWidth === null) {
            ratio = maxHeight / img.height;
            maxWidth = img.width * ratio;
            maxHeight = img.height * ratio;
          }
          const elem = document.createElement("canvas");
          const ctx = elem.getContext("2d");
          elem.width = maxWidth;
          elem.height = maxHeight;
          ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
          resolve(elem.toDataURL());
        };
        img.onerror = (error) => {
          reject(error);
        };
      };
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    );
  };
  const handleCancel = () => setPreviewVisible(false);

  const handleChange_car = ({ fileList }) => {
    setFileList_Car(fileList);
    fileList.map(async (item) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push({ file: resultBase64, type: "vehicle" });
      setBase64_car(arrBase64);
    });
  };
  const handleChange_license_plate = ({ fileList }) => {
    setFileList_License_Plate(fileList);
    fileList.map(async (item) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push({ file: resultBase64, type: "license_plate" });
      setBase64_license_plate(arrBase64);
    });
  };
  const handleChange_buy = ({ fileList }) => {
    setFileList_Buy(fileList);
    fileList.map(async (item) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push({ file: resultBase64, type: "contract_buy" });
      setBase64_buy(arrBase64);
    });
  };
  const handleChange_sale = ({ fileList }) => {
    setFileList_Sale(fileList);
    fileList.map(async (item) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push({ file: resultBase64, type: "contract_sale" });
      setBase64_sale(arrBase64);
    });
  };

  const handleRemove = (val) => {
    val === "Car" && setBase64_car(null);
    val === "License_Plate" && setBase64_license_plate(null);
    val === "Contract_Buy" && setBase64_buy(null);
    val === "Sale" && setBase64_sale(null);
  };

  const checkMomentDatePicker = () => {
    return Object.keys(dataId).length === 0;
  };

  const checkSaleDateWork = () => {
    return dataId.sale_date === null || dataId.sale_date === undefined;
  };

  /////////////////////////// function เกี่ยวกับ modal IMG ///////////////////////////
  const handleModalImg = (value) => {
    setShowModal(!showModal);
    setImgInModal(value);
  };

  const handleCancelModalImg = () => {
    setShowModal(!showModal);
  };

  const handleDelete = (id_img) => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return Api.delete(`api/v1/vehicle/image/${id_img}`)
          .then((res) => {
            notificationWithIcon("success", "Delete sussces.");
            dispatch(Vehicle_img_Action.fetchImg(id));
          })
          .catch((err) => console.log(err));
      },
      onCancel() {},
    });
  };
  ///////////////////////////////////////////////////////////////////////////

  const buyVat = (e) => {
    let a = (e.target.value * 100) / 107; ///คำนวนราคาที่ไม่รวม vat
    let b = e.target.value - a; /// ราคาของ 7 %
    let result_a = Number.parseFloat(a).toFixed(2);
    let result_b = Number.parseFloat(b).toFixed(2);
    setResulNontVat_Buy(result_a);
    setResultVat7_Buy(result_b);
    setStateResulNontVat_Buy(result_a);
    setstateResultResultVat7_Buy(result_b);
  };

  const saleVat = (e) => {
    let a = (e.target.value * 100) / 107; ///คำนวนราคาที่ไม่รวม vat
    let b = e.target.value - a; /// ราคาของ 7 %
    let result_a = Number.parseFloat(a).toFixed(2);
    let result_b = Number.parseFloat(b).toFixed(2);
    setResulNontVat_Sale(result_a);
    setResultVat7_Sale(result_b);
    setStateResulNontVat_Sale(result_a);
    setstateResultResultVat7_Sale(result_b);
  };

  const facthVatBuy = (val) => {
    let i = val.replace(/,/, "");
    let convert = parseInt(i);
    let a = (convert * 100) / 107; ///คำนวนราคาที่ไม่รวม vat
    let b = convert - a; /// ราคาของ 7 %
    let result_a = Number.parseFloat(a).toFixed(2);
    let result_b = Number.parseFloat(b).toFixed(2);
    setResulNontVat_Buy(result_a);
    setResultVat7_Buy(result_b);
  };

  const facthVatSale = (val) => {
    let i = val.replace(/,/, "");
    let convert = parseInt(i);
    let a = (convert * 100) / 107; ///คำนวนราคาที่ไม่รวม vat
    let b = convert - a; /// ราคาของ 7 %
    let result_a = Number.parseFloat(a).toFixed(2);
    let result_b = Number.parseFloat(b).toFixed(2);
    setResulNontVat_Sale(result_a);
    setResultVat7_Sale(result_b);
  };

  /////////// Function Search Dropdown  ค้นหาผู้ครอบครองรถ
  const fetchOwnerVehicle = async (value) => {
    setFetching(true);
    await Api.get(`api/v1/owner-vehicle`, {
      params: {
        search: value,
      },
    }).then((res) => {
      setDataOwner_vehicle(res.data.result);
      setFetching(false);
    });
  };
  //////////////////////
  return (
    <React.Fragment>
      {isNew || Object.keys(dataId).length > 0 ? (
        <Form
          ref={props.formRef}
          scrollToFirstError
          initialValues={{
            vehicle_id: dataId.vehicle_id,
            status: dataId.status,
            owner_vehicle: dataId.owner_vehicle,
            owner_ship: dataId.owner_ship,
            vehicle_brand_id: dataId.vehicle_brand_id,
            vehicle_type_id: dataId.vehicle_type_id,
            vehicle_brand_id: dataId.vehicle_brand_id,
            vehicle_model_id: dataId.vehicle_model_id,
            vehicle_model_year_id: dataId.vehicle_model_year_id,
            vehicle_color_id: dataId.vehicle_color_id,
            license_page: dataId.license_page,
            tank_numbers: dataId.tank_numbers,
            engine_number: dataId.engine_number,
            owner_branch_id: dataId.owner_branch_id,
            key_code: dataId.key_code,
            asset_register_code: dataId.asset_register_code,
            owner_date: checkMomentDatePicker()
              ? dataId.owner_date
              : moment(dataId.owner_date),
            purchase_date: checkMomentDatePicker()
              ? dataId.purchase_date
              : moment(dataId.purchase_date),
            purchase_price: dataId.purchase_price,

            purchase_vat: dataId.purchase_vat,
            purchase_price_vat: dataId.purchase_price_vat,
            vehicle_seller: dataId.vehicle_seller,
            sale_date: checkSaleDateWork()
              ? undefined
              : moment(dataId.sale_date),
            sale_vat: dataId.sale_vat,
            sale_price: dataId.sale_price,
            sale_price_vat: dataId.sale_price_vat,
            vehicle_buyer: dataId.vehicle_buyer,
            is_active: dataId.is_active === 1 ? true : false,
            comment: dataId.comment === null ? "" : dataId.comment,
          }}
          {...formItemLayout}
          labelAlign="left"
        >
          <Row gutter={24}>
            <Col span={7} style={{ marginLeft: "15px", marginRight: "15px" }}>
              <Divider orientation="left">รูปรถ</Divider>
              <Form.Item>
                <Upload
                  listType="picture-card"
                  onPreview={handlePreview}
                  onChange={handleChange_car}
                  multiple={true}
                  customRequest={dummyRequest}
                  accept={"image/png, image/jpeg,image/jpg"}
                  onRemove={() => handleRemove("Car")}
                >
                  {fileList_Car.length >= 20 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                  width={820}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
                {fileList_Car.length >= 20 ? (
                  <Alert
                    description="จำกัดไฟล์ภาพไม่เกิน 20 ภาพ"
                    type="warning"
                    showIcon
                  />
                ) : (
                  ""
                )}
              </Form.Item>
              <Modal
                visible={showModal}
                onCancel={handleCancelModalImg}
                width={820}
              >
                <img src={imgInModal} style={{ width: "100%" }} />
              </Modal>

              <ShowImgWrapper Modal={handleModalImg} DeleteModal={handleDelete}>
                {Vehicle_Img.result.length > 0
                  ? Vehicle_Img.result.filter(
                      (item, index) => item.type === "vehicle",
                    )
                  : ""}
              </ShowImgWrapper>
              <Divider orientation="left">ป้ายทะเบียน</Divider>
              <Form.Item>
                <Upload
                  listType="picture-card"
                  onPreview={handlePreview}
                  onChange={handleChange_license_plate}
                  multiple={true}
                  customRequest={dummyRequest}
                  accept={"image/png, image/jpeg,image/jpg"}
                  onRemove={() => handleRemove("License_Plate")}
                >
                  {fileList_License_Plate.length >= 20 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                  width={820}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
                {fileList_License_Plate.length >= 20 ? (
                  <Alert
                    description="จำกัดไฟล์ภาพไม่เกิน 20 ภาพ"
                    type="warning"
                    showIcon
                  />
                ) : (
                  ""
                )}
              </Form.Item>
              <Modal
                visible={showModal}
                onCancel={handleCancelModalImg}
                width={820}
              >
                <img src={imgInModal} style={{ width: "100%" }} />
              </Modal>
              <ShowImgWrapper Modal={handleModalImg} DeleteModal={handleDelete}>
                {Vehicle_Img.result.length > 0
                  ? Vehicle_Img.result.filter((item) => {
                      return item.type === "license_plate";
                    })
                  : ""}
              </ShowImgWrapper>
              <Divider orientation="left">สัญญาตอนซื้อ</Divider>
              <Form.Item>
                <Upload
                  listType="picture-card"
                  onPreview={handlePreview}
                  onChange={handleChange_buy}
                  customRequest={dummyRequest}
                  accept={"image/png, image/jpeg,image/jpg"}
                  onRemove={() => handleRemove("Contract_Buy")}
                  multiple={true}
                >
                  {fileList_Buy.length >= 20 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                  width={820}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
                {fileList_Buy.length >= 20 ? (
                  <Alert
                    description="จำกัดไฟล์ภาพไม่เกิน 20 ภาพ"
                    type="warning"
                    showIcon
                  />
                ) : (
                  ""
                )}
              </Form.Item>
              <Modal
                visible={showModal}
                onCancel={handleCancelModalImg}
                width={820}
              >
                <img src={imgInModal} style={{ width: "100%" }} />
              </Modal>
              <ShowImgWrapper Modal={handleModalImg} DeleteModal={handleDelete}>
                {Vehicle_Img.result.length > 0
                  ? Vehicle_Img.result.filter(
                      (item) => item.type === "contract_buy",
                    )
                  : ""}
              </ShowImgWrapper>
              <Divider orientation="left">สัญญาตอนขาย</Divider>
              <Form.Item>
                <Upload
                  listType="picture-card"
                  onPreview={handlePreview}
                  onChange={handleChange_sale}
                  customRequest={dummyRequest}
                  accept={"image/png, image/jpeg,image/jpg"}
                  onRemove={() => handleRemove("Sale")}
                  multiple={true}
                >
                  {fileList_Sale.length >= 20 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                  width={820}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
                {fileList_Sale.length >= 20 ? (
                  <Alert
                    description="จำกัดไฟล์ภาพไม่เกิน 20 ภาพ"
                    type="warning"
                    showIcon
                  />
                ) : (
                  ""
                )}
              </Form.Item>
              <Modal
                visible={showModal}
                onCancel={handleCancelModalImg}
                width={820}
              >
                <img src={imgInModal} style={{ width: "100%" }} />
              </Modal>
              <ShowImgWrapper Modal={handleModalImg} DeleteModal={handleDelete}>
                {Vehicle_Img.result.length > 0
                  ? Vehicle_Img.result.filter(
                      (item) => item.type === "contract_sale",
                    )
                  : ""}
              </ShowImgWrapper>
            </Col>

            <Col {...colLayout}>
              <Form.Item name="vehicle_id" label="รหัสรถ">
                <Input size={formSize} autoComplete="off" disabled />
              </Form.Item>
              <Form.Item name="status" label="สถานะ">
                <Select size={formSize} placeholder="Please select">
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
                      text={"ไม่ใช้งาน"}
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
              <Select
              showSearch
              placeholder="ค้นหาผู้ครอบครองรถ..."
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={fetchOwnerVehicle}
              // onChange={handleChangeOwnerVehicle}
              size={formSize}
              allowClear
            >
              {dataOwner_vehicle.map((item, index) => (
                <Option key={index} value={item.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div> {item.first_name}</div>
                    <div> {item.last_name}</div>
                  </div>
                </Option>
              ))}
            </Select>
              </Form.Item>
              <Form.Item name="owner_ship" label="ผู้ถือกรรมสิทธิ์">
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item name="vehicle_type_id" label="ประเภทรถ">
                <Select size={formSize} placeholder="Please select">
                  {optionVehicle_type}
                </Select>
              </Form.Item>
              <Form.Item name="vehicle_brand_id" label="ยี่ห้อรถ">
                <Select size={formSize} placeholder="Please select">
                  {optionVehicle_brand}
                </Select>
              </Form.Item>
              <Form.Item name="vehicle_model_id" label="รุ่น">
                <Select size={formSize} placeholder="Please select">
                  {optionVehicle_model}
                </Select>
              </Form.Item>
              <Form.Item name="vehicle_model_year_id" label="รุ่นปี">
                <Select size={formSize} placeholder="Please select">
                  {optionVehicle_modelYear}
                </Select>
              </Form.Item>
              <Form.Item name="vehicle_color_id" label="สี">
                <Select size={formSize} placeholder="Please select">
                  {optionVehicle_color}
                </Select>
              </Form.Item>
              <Form.Item name="license_page" label="ทะเบียน">
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item label="เลขตัวถัง" name="tank_numbers">
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item label="เลขเครื่องยนต์" name="engine_number">
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item label="รหัสกุญแจ " name="key_code">
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item label="สังกัดงาน " name="owner_branch_id">
                <Select size={formSize} placeholder="Please select">
                  {optionOwnerBranch}
                </Select>
              </Form.Item>
              <Form.Item
                label=" รหัสทะเบียนทรัพสิน (ทางบัญชี) "
                name="asset_register_code"
              >
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item label=" วันที่ครอบครอง" name="owner_date">
                <DatePicker size={formSize} />
              </Form.Item>

              <Divider>ส่วนซื้อ</Divider>
              <Form.Item label="ผู้ซื้อรถ" name="vehicle_buyer">
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item label="วันที่ซื้อ/วันที่รับรถ" name="purchase_date">
                <DatePicker size={formSize} />
              </Form.Item>
              <Form.Item
                label="ราคาที่ซื้อ(รวมvat)"
                name="purchase_price_vat"
                rules={[
                  {
                    pattern: new RegExp(/^[0-9\b]+$/),
                    message: "Please enter numbers only!",
                  },
                ]}
              >
                <Input size={formSize} autoComplete="off" onChange={buyVat} />
              </Form.Item>
              <Form.Item label="ราคาที่ซื้อ(ไม่รวมvat)" name="purchase_price">
                <Input
                  size={formSize}
                  autoComplete="off"
                  value={resultNonVat_Buy}
                />
                <span style={{ color: "red" }}>*ระบบคำนวน</span>
              </Form.Item>
              <Form.Item label="vat 7%" name="purchase_vat">
                <Input
                  size={formSize}
                  autoComplete="off"
                  value={resultVat7_Buy}
                />
                <span style={{ color: "red" }}>*ระบบคำนวน</span>
              </Form.Item>
              <Divider>ส่วนขาย</Divider>
              <Form.Item label="ผู้ขายรถ " name="vehicle_seller">
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item label="วันที่ขาย " name="sale_date">
                <DatePicker size={formSize} />
              </Form.Item>
              <Form.Item label="ราคาที่ขาย(รวมvat)" name="sale_price_vat">
                <Input size={formSize} autoComplete="off" onChange={saleVat} />
              </Form.Item>
              <Form.Item label="ราคาที่ขาย(ไม่รวมvat)" name="sale_price">
                <Input
                  size={formSize}
                  autoComplete="off"
                  value={resultNonVat_Sale}
                />
                <span style={{ color: "red" }}>*ระบบคำนวน</span>
              </Form.Item>
              <Form.Item label="vat 7%" name="sale_vat">
                <Input
                  size={formSize}
                  autoComplete="off"
                  value={resultVat7_Sale}
                />
                <span style={{ color: "red" }}>*ระบบคำนวน</span>
              </Form.Item>

              {isNew ? (
                ""
              ) : (
                <Form.Item
                  label="สถานะ"
                  name="is_active"
                  valuePropName="checked"
                >
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                  />
                </Form.Item>
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
            history.push(`/car/carInfomation`);
          }}
        >
          กลับ
        </Button>
      </div>
    </React.Fragment>
  );
};

export default DetailVehicle;

import React, { useState } from "react";
import {
  Form,
  Col,
  Divider,
  Upload,
  Input,
  Spin,
  Row,
  Alert,
  Select,
  Modal,
  Button,
  DatePicker,
  Badge,
} from "antd";
import Api from "../../../services/httpClient";
import { PlusOutlined } from "@ant-design/icons";
import { formSize } from "../../../components/settings/index";
import { useSelector } from "react-redux";
import dummyRequest from "../../../components/Image/DummyRequest";

const { TextArea } = Input;
const { Option } = Select;

const Driver_step = (props) => {
  const {
    formStep4,
    setBase64_employee,
    setBase64_identity,
    setBase64_driver,
    setButtonCheck_Employee,
    setButtonCheck_Identity,
    setButtonCheck_Driver,
  } = props;

  const Vehicle_step_all_option = useSelector(
    ({ Vehicle_step_all_option }) => Vehicle_step_all_option,
  );

  ///////// fileList มาทำตัวนับจำนวนอัพรูปไม่เกิน 20 รูป ต่อครั้ง
  const [fileList_Employee, setFileList_Employee] = useState([]);
  const [fileList_Identity, setFileList_Identity] = useState([]);
  const [fileList_Diver, setFileList_Diver] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [dataDriver, setDataDriver] = useState([]);
  const [newDriver, setNewDriver] = useState(false);
  let arrBase64 = [];

  let companyValue = Vehicle_step_all_option.result.company.map((item, i) => (
    <Option value={item.id} key={i}>
      {item.name}
    </Option>
  ));

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

  const handleChange_employee = ({ fileList }) => {
    setButtonCheck_Employee(fileList);
    setFileList_Employee(fileList);
    fileList.map(async (item) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push({
        file: resultBase64,
        type: "employee",
      });
      setBase64_employee(arrBase64);
    });
  };

  const handleChange_identity = ({ fileList }) => {
    setButtonCheck_Identity(fileList);
    setFileList_Identity(fileList);
    fileList.map(async (item) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push({
        file: resultBase64,
        type: "identity_card",
      });
      setBase64_identity(arrBase64);
    });
  };
  const handleChange_driver = ({ fileList }) => {
    setButtonCheck_Driver(fileList);
    setFileList_Diver(fileList);
    fileList.map(async (item) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push({
        file: resultBase64,
        type: "driver_card",
      });
      setBase64_driver(arrBase64);
    });
  };

  const handleRemove = (val) => {
    val === "Employee" && setBase64_employee(null);
    val === "Identity" && setBase64_identity(null);
    val === "Driver" && setBase64_driver(null);
  };

  const fetchDriver = async (value) => {
    setFetching(true);
    await Api.get(`api/v1/vehicle/dropdown-vehicle-driver-search`, {
      params: {
        search: value,
      },
    }).then((res) => {
      setDataDriver(res.data.result);
      setFetching(false);
    });
  };
  const formItemLayoutSearchDriver = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      lg: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      lg: { span: 18 },
    },
  };
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
  return newDriver ? (
    <Form
      scrollToFirstError
      {...formItemLayout}
      labelAlign="left"
      form={formStep4}
    >
      <Row gutter={24}>
        <Col span={7} style={{ marginLeft: "15px", marginRight: "15px" }}>
          <Divider orientation="left">รูปพนักงาน</Divider>
          <Form.Item>
            <Upload
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange_employee}
              multiple={true}
              onRemove={() => handleRemove("Employee")}
              customRequest={dummyRequest}
              accept={"image/png, image/jpeg,image/jpg"}
            >
              {fileList_Employee.length > 20 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
              width={820}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
            {fileList_Employee.length > 20 ? (
              <Alert
                description="จำกัดไฟล์ภาพไม่เกิน 20 ภาพ"
                type="warning"
                showIcon
              />
            ) : (
              ""
            )}
          </Form.Item>

          <Divider orientation="left">สำเนาบัตรประชาชน</Divider>
          <Form.Item>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange_identity}
              multiple={true}
              onRemove={() => handleRemove("Identity")}
              customRequest={dummyRequest}
              accept={"image/png, image/jpeg,image/jpg"}
            >
              {fileList_Identity.length > 20 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
              width={820}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
            {fileList_Identity.length > 20 ? (
              <Alert
                description="จำกัดไฟล์ภาพไม่เกิน 20 ภาพ"
                type="warning"
                showIcon
              />
            ) : (
              ""
            )}
          </Form.Item>
          <Divider orientation="left">สำเนาใบขับขี่</Divider>
          <Form.Item>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange_driver}
              onRemove={() => handleRemove("Driver")}
              multiple={true}
              customRequest={dummyRequest}
              accept={"image/png, image/jpeg,image/jpg"}
            >
              {fileList_Diver.length > 20 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
              width={820}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
            {fileList_Identity.length > 20 ? (
              <Alert
                description="จำกัดไฟล์ภาพไม่เกิน 20 ภาพ"
                type="warning"
                showIcon
              />
            ) : (
              ""
            )}
          </Form.Item>
        </Col>

        <Col {...colLayout}>
          <Form.Item name="type" label="สถานะคนขับรถ">
            <Select size={formSize} placeholder="Please select">
              <Option value={"active"}>
                <Badge status="processing" color="#87d068" text={"ทำงานอยู่"} />
              </Option>
              <Option value={"inactive"}>
                <Badge status="processing" color="#f50" text={"ลาออกแล้ว"} />
              </Option>
            </Select>
          </Form.Item>
          <Form.Item name="title_name" label="คำนำหน้า">
            <Select size={formSize} placeholder="Please select">
              <Option value="นาย">นาย</Option>
              <Option value="นาง">นาง</Option>
              <Option value="นางสาว">นางสาว</Option>
            </Select>
          </Form.Item>
          <Form.Item name="name" label="ชื่อ-นามสกุล">
            <Input size={formSize} autoComplete="off" />
          </Form.Item>

          <Form.Item name="nickname" label="ชื่อเล่น">
            <Input size={formSize} autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="เบอร์โทร"
            rules={[
              {
                pattern: new RegExp(/^[0-9\b]+$/),
                message: "Please enter numbers only!",
              },
            ]}
          >
            <Input size={formSize} autoComplete="off" />
          </Form.Item>
          <Form.Item name="birthday" label="วันเดือนปีเกิด">
            <DatePicker size={formSize} />
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
            <Input size={formSize} autoComplete="off" />
          </Form.Item>
          <Form.Item name="company_id" label="สังกััดบริษัท">
            <Select size={formSize} placeholder="Please select">
              {companyValue}
            </Select>
          </Form.Item>
          <Form.Item name="start_date_work" label="วันที่เริ่มทำงาน">
            <DatePicker size={formSize} />
          </Form.Item>
          <Form.Item name="finish_date_work" label="วันที่ทำงานวันสุดท้าย">
            <DatePicker size={formSize} />
          </Form.Item>
          <Form.Item name="comment" label="หมายเหตุ">
            <TextArea rows={4} size={formSize} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  ) : (
    <Form
      scrollToFirstError
      {...formItemLayoutSearchDriver}
      labelAlign="left"
      form={formStep4}
    >
      <Row gutter={24}>
        <Col xs={24} md={6} lg={10} offset={6}>
          <Form.Item name="driver_id" label="ชื่อพนักงานขับรถ">
            <Select
              showSearch
              placeholder="ค้นหาด้วยชื่อพนักงานขับรถ..."
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={fetchDriver}
              size={formSize}
              allowClear
            >
              {dataDriver.map((item, index) => (
                <Option key={index} value={item.driver_id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div> {item.name}</div>
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Button type="primary" onClick={() => setNewDriver(true)}>
            เพิ่มพนักงานขับรถใหม่
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Driver_step;

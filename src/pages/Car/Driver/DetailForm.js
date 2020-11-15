import React, { useState } from "react";
import {
  Form,
  Col,
  Divider,
  Upload,
  Input,
  Row,
  Switch,
  Select,
  Modal,
  Button,
  Table,
  Badge,
  DatePicker,
  Alert,
} from "antd";
import moment from "moment";
import Api from "../../../services/httpClient";
import { useHistory, useParams } from "react-router-dom";
import {
  SaveOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { formSize } from "../../../components/settings/index";
import { useSelector, useDispatch } from "react-redux";
import ShowImgWrapper from "../../../components/Image/ShowImg_Wrapper";
import * as Driver_img_Action from "../../../actions/Driver_Img.action";
import { notificationWithIcon } from "../../../components/Notification";
import dummyRequest from "../../../components/Image/DummyRequest";

const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

const DetailForm = (props) => {
  const {
    isNew,
    dataId,
    submit,
    companyValue,
    setBase64_employee,
    setBase64_identity,
    setBase64_driver,
  } = props;
  const Driver_img = useSelector(({ Driver_img }) => Driver_img);
  let history = useHistory();
  let pathUrl = `/car/driver`;

  let { id } = useParams();
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  ///// Modalสำหรับโชว์รูป
  const [showModal, setShowModal] = useState(false);
  ////// path รูปจาก components ShowImg_Wrapper มาโชว์ในmodal
  const [imgInModal, setImgInModal] = useState();
  ///////// fileList มาทำตัวนับจำนวนอัพรูปไม่เกิน 20 รูป ต่อครั้ง
  const [fileList_Employee, setFileList_Employee] = useState([]);
  const [fileList_Identity, setFileList_Identity] = useState([]);
  const [fileList_Diver, setFileList_Diver] = useState([]);
  const arrBase64 = [];

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

  const handleChange_employee = ({ fileList }) => {
    setFileList_Employee(fileList);
    fileList.map(async (item) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push(resultBase64);
      setBase64_employee(arrBase64);
    });
  };

  const handleChange_identity = ({ fileList }) => {
    setFileList_Identity(fileList);
    fileList.map(async (item, index) => {
      let resultBase64 = await getBase64(item.originFileObj);

      arrBase64.push(resultBase64);
      setBase64_identity(arrBase64);
    });
  };
  const handleChange_driver = ({ fileList }) => {
    setFileList_Diver(fileList);
    fileList.map(async (item, index) => {
      let resultBase64 = await getBase64(item.originFileObj);

      arrBase64.push(resultBase64);
      setBase64_driver(arrBase64);
    });
  };

  const handleRemove = (val) => {
    val === "Employee" && setBase64_employee(null);
    val === "Identity" && setBase64_identity(null);
    val === "Driver" && setBase64_driver(null);
  };

  let optionCompany = companyValue.map((item, index) => {
    return (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    );
  });

  const checkMomentDatePicker = () => {
    return Object.keys(dataId).length === 0;
  };
  const checkFinishDateWork = () => {
    return (
      dataId.finish_date_work === null || dataId.finish_date_work === undefined
    );
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
        return Api.delete(`api/v1/driver/image/${id_img}`)
          .then((res) => {
            notificationWithIcon("success", "Delete sussces.");
            dispatch(Driver_img_Action.fetchImg(id));
          })
          .catch((err) => console.log(err));
      },
      onCancel() {},
    });
  };

  const checkButtonImage = () => {
    return (
      fileList_Employee.length > 20 ||
      fileList_Identity.length > 20 ||
      fileList_Diver.length > 20
    );
  };

  return (
    <React.Fragment>
      {isNew || Object.keys(dataId).length > 0 ? (
        <Form
          ref={props.formRef}
          scrollToFirstError
          initialValues={{
            driver_id: dataId.driver_id,
            type: dataId.type,
            title_name: dataId.title_name,
            company_id: dataId.company_id,
            name: dataId.name,
            phone_number: dataId.phone_number,
            identity_card_number: dataId.identity_card_number,
            start_date_work: checkMomentDatePicker()
              ? undefined
              : moment(dataId.start_date_work),
            finish_date_work: checkFinishDateWork()
              ? undefined
              : moment(dataId.finish_date_work),
            nickname: dataId.nickname,
            birthday: checkMomentDatePicker()
              ? undefined
              : moment(dataId.birthday),

            comment: dataId.comment === null ? "" : dataId.comment,
            is_active: dataId.is_active === 1 ? true : false,
          }}
          {...formItemLayout}
          labelAlign="left"
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
                  {fileList_Employee.length >= 20 ? null : uploadButton}
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
                {fileList_Employee.length >= 20 ? (
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
                {Driver_img.result.length > 0
                  ? Driver_img.result.filter((item, index) => {
                      return item.type === "employee";
                    })
                  : ""}
              </ShowImgWrapper>

              <Divider orientation="left">สำเนาบัตรประชาชน</Divider>
              <Form.Item>
                <Upload
              
                  listType="picture-card"
                  onPreview={handlePreview}
                  onChange={handleChange_identity}
                  multiple={true}
                  onRemove={() => handleRemove("Identity")}
                  customRequest={dummyRequest}
                  accept={"image/png, image/jpeg,image/jpg"}
                >
                  {fileList_Identity.length >= 20 ? null : uploadButton}
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
                {fileList_Identity.length >= 20 ? (
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
                {Driver_img.result.length > 0
                  ? Driver_img.result.filter((item, index) => {
                      return item.type === "identity_card";
                    })
                  : ""}
              </ShowImgWrapper>
              <Divider orientation="left">สำเนาใบขับขี่</Divider>
              <Form.Item>
                <Upload
                 
                  listType="picture-card"
                  onPreview={handlePreview}
                  onChange={handleChange_driver}
                  onRemove={() => handleRemove("Driver")}
                  multiple={true}
                  customRequest={dummyRequest}
                  accept={"image/png, image/jpeg,image/jpg"}
                >
                  {fileList_Diver.length >= 20 ? null : uploadButton}
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
                {fileList_Identity.length >= 20 ? (
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
                {Driver_img.result.length > 0
                  ? Driver_img.result.filter((item, index) => {
                      return item.type === "driver_card";
                    })
                  : ""}
              </ShowImgWrapper>
            </Col>

            <Col {...colLayout}>
              {isNew ? (
                ""
              ) : (
                <Form.Item name="driver_id" label="รหัสพนักงาน">
                  <Input size={formSize} autoComplete="off" disabled />
                </Form.Item>
              )}
              <Form.Item name="type" label="สถานะคนขับรถ">
                <Select size={formSize} placeholder="Please select">
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

              <Form.Item name="phone_number" label="เบอร์โทร">
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
                  {optionCompany}
                </Select>
              </Form.Item>
              <Form.Item name="start_date_work" label="วันที่เริ่มทำงาน">
                <DatePicker size={formSize} />
              </Form.Item>
              <Form.Item name="finish_date_work" label="วันที่ทำงานวันสุดท้าย">
                <DatePicker size={formSize} />
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
          style={{ marginRight: "5px" }}
          onClick={submit}
          icon={<SaveOutlined />}
          disabled={checkButtonImage()}
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
    </React.Fragment>
  );
};

export default DetailForm;

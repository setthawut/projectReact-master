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
  Button,
  Table,
  DatePicker,
  Spin,
  Badge,
  Modal,
  Alert,
} from "antd";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { notificationWithIcon } from "../../../components/Notification";
import {
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { formSize } from "../../../components/settings/index";
import Api from "../../../services/httpClient";
import { useSelector, useDispatch } from "react-redux";
import ShowImgWrapper from "../../../components/Image/ShowImg_Wrapper";
import * as OilCard_img_Action from "../../../actions/OilCard_Img.action";
import dummyRequest from "../../../components/Image/DummyRequest";

const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

const DetailForm = (props) => {
  const {
    isNew,
    dataId,
    submit,
    bankTypeValue,
    cardTypeValue,
    companyValue,
    setBase64_front,
    setBase64_back,
  } = props;

  let history = useHistory();
  let pathUrl = `/car/oilcard`;
  const OilCard_Img = useSelector(({ OilCard_Img }) => OilCard_Img);
  const dispatch = useDispatch();
  let { id } = useParams();

  const [fetching, setFetching] = useState(false);
  const [datavehicle, setDatavehicle] = useState([]);
  ///////// fileList มาทำตัวนับจำนวนอัพรูปไม่เกิน 20 รูป ต่อครั้ง
  const [fileList_Front, setFileList_Front] = useState([]);
  const [fileList_Back, setFileList_Back] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  ///// Modalสำหรับโชว์รูป
  const [showModal, setShowModal] = useState(false);
  ////// path รูปจาก components ShowImg_Wrapper มาโชว์ในmodal
  const [imgInModal, setImgInModal] = useState();
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
        img.onerror = (error) => reject(error);
      };
    });
  };

  const handleChange_Front = ({ fileList }) => {
    setFileList_Front(fileList);
    fileList.map(async (item, index) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push(resultBase64);
      setBase64_front(arrBase64);
    });
  };
  const handleChange_Back = ({ fileList }) => {
    setFileList_Back(fileList);
    fileList.map(async (item, index) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push(resultBase64);
      setBase64_back(arrBase64);
    });
  };

  const handleRemove = (val) => {
    val === "Front" && setBase64_front(null);
    val === "Back" && setBase64_back(null);
  };

  let optionbankType = bankTypeValue.map((item, index) => {
    return (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    );
  });
  let optioncardType = cardTypeValue.map((item, index) => {
    return (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    );
  });
  let optionCompany = companyValue.map((item, index) => {
    return (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    );
  });
  const fetchVehicle = async (value) => {
    setFetching(true);
    await Api.get(`api/v1/vehicle/dropdown-vehicle`, {
      params: {
        search: value,
      },
    }).then((res) => {
      console.log(res.data.result);
      setDatavehicle(res.data.result);
      setFetching(false);
    });
  };
  const handleChange = () => {
    setDatavehicle([]);
    setFetching(false);
  };

  const checkMomentDatePicker = () => {
    return Object.keys(dataId).length === 0;
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
        return Api.delete(`api/v1/oil-card/image/${id_img}`)
          .then((res) => {
            notificationWithIcon("success", "Delete sussces.");
            dispatch(OilCard_img_Action.fetchImg(id));
          })
          .catch((err) => console.log(err));
      },
      onCancel() {},
    });
  };
  const checkButtonImage = () => {
    return fileList_Front.length > 20 || fileList_Back.length > 20;
  };
  ///////////////////////////////////////////////////////////////////////////

  return (
    <React.Fragment>
      {isNew || Object.keys(dataId).length > 0 ? (
        <Form
          ref={props.formRef}
          scrollToFirstError
          initialValues={{
            vehicle_id: dataId.vehicle_id,
            type: dataId.type,
            bank_type_id: dataId.bank_type_id,
            card_type_id: dataId.card_type_id,
            company_id: dataId.company_id,
            card_number: dataId.card_number,
            identification_card: dataId.identification_card,
            card_last_number: dataId.card_last_number,
            card_limit: dataId.card_limit,
            expired_card: checkMomentDatePicker()
              ? dataId.expired_card
              : moment(dataId.expired_card, "MM/YY"),
            is_active: dataId.is_active === 1 ? true : false,
            comment: dataId.comment === null ? "" : dataId.comment,
          }}
          {...formItemLayout}
          labelAlign="left"
        >
          <Row gutter={24}>
            <Col span={7} style={{ marginLeft: "15px", marginRight: "15px" }}>
              <Divider orientation="left">รูปบัตรด้านหน้า</Divider>
              <Form.Item>
                <Upload
                  listType="picture-card"
                  action={`https://www.mocky.io/v2/5cc8019d300000980a055e76`}
                  onPreview={handlePreview}
                  onChange={handleChange_Front}
                  multiple={true}
                  onRemove={() => handleRemove("Front")}
                  customRequest={dummyRequest}
                  accept={"image/png, image/jpeg,image/jpg"}
                >
                  {fileList_Front.length >= 20 ? null : uploadButton}
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
                {fileList_Front.length >= 20 ? (
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
                {OilCard_Img.result.length > 0
                  ? OilCard_Img.result.filter((item, index) => {
                      return item.type === "front_card";
                    })
                  : ""}
              </ShowImgWrapper>
              <Divider orientation="left">รูปบัตรด้านหลัง</Divider>
              <Form.Item>
                <Upload
                  listType="picture-card"
                  action={`https://www.mocky.io/v2/5cc8019d300000980a055e76`}
                  onPreview={handlePreview}
                  onChange={handleChange_Back}
                  multiple={true}
                  onRemove={() => handleRemove("Back")}
                  customRequest={dummyRequest}
                  accept={"image/png, image/jpeg,image/jpg"}
                >
                  {fileList_Back.length >= 20 ? null : uploadButton}
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
                {fileList_Back.length >= 20 ? (
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
                {OilCard_Img.result.length > 0
                  ? OilCard_Img.result.filter((item, index) => {
                      return item.type === "back_card";
                    })
                  : ""}
              </ShowImgWrapper>
            </Col>

            <Col {...colLayout}>
              <Form.Item name="vehicle_id" label="รหัสรถ">
                <Select
                  showSearch
                  placeholder="ค้นหาด้วยรหัสรถ หรือ ป้ายทะเบียน..."
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={fetchVehicle}
                  onChange={handleChange}
                  size={formSize}
                  disabled
                >
                  {datavehicle.map((item, index) => (
                    <Option key={index} value={item.vehicle_id}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div> {item.vehicle_id}</div>
                        <div> {item.license_page}</div>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="type" label="สถานะบัตร">
                <Select size={formSize} placeholder="Please select">
                  <Option value={"active"}>
                    <Badge
                      status="processing"
                      color="#87d068"
                      text={"ใช้งาน"}
                    />
                  </Option>
                  <Option value={"inactive"}>
                    <Badge
                      status="processing"
                      color="#f50"
                      text={"ไม่ใช่งาน"}
                    />
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item name="bank_type_id" label="ธนาคารผู้ออกบัตร">
                <Select size={formSize} placeholder="Please select">
                  {optionbankType}
                </Select>
              </Form.Item>
              <Form.Item name="card_type_id" label="ประเภทบัตร">
                <Select size={formSize} placeholder="Please select">
                  {optioncardType}
                </Select>
              </Form.Item>
              <Form.Item name="company_id" label="บริษัท">
                <Select size={formSize} placeholder="Please select">
                  {optionCompany}
                </Select>
              </Form.Item>

              <Form.Item name="card_number" label="เลขที่บัตร">
                <Input size={formSize} autoComplete="off" />
              </Form.Item>

              <Form.Item
                name="identification_card"
                label="เลขประจำบัตร"
                rules={[
                  {
                    pattern: new RegExp(/^[0-9\b]+$/),
                    message: "Please enter numbers only!",
                  },
                ]}
              >
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="card_last_number"
                label="เลขหลังบัตร"
                rules={[
                  {
                    pattern: new RegExp(/^[0-9\b]+$/),
                    message: "Please enter numbers only!",
                  },
                ]}
              >
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="card_limit"
                label="วงเงินในบัตร"
                rules={[
                  {
                    pattern: new RegExp(/^[0-9\b]+$/),
                    message: "Please enter numbers only!",
                  },
                ]}
              >
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item name="expired_card" label="บัตรหมดอายุ">
                <DatePicker format={"MM/YY"} picker="month" size={formSize} />
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

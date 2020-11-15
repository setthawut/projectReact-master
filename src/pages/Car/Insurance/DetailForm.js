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
  Spin,
  DatePicker,
  Alert,
  Modal,
} from "antd";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import {
  SaveOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { formSize } from "../../../components/settings/index";
import { notificationWithIcon } from "../../../components/Notification";
import Api from "../../../services/httpClient";
import { useSelector, useDispatch } from "react-redux";
import * as Insurance_img_Action from "../../../actions/Insurance_Img.action";
import ShowImgWrapper from "../../../components/Image/ShowImg_Wrapper";
import dummyRequest from "../../../components/Image/DummyRequest";

const { confirm } = Modal;
const { TextArea } = Input;
const { Option } = Select;

const DetailForm = (props) => {
  const {
    isNew,
    dataId,
    submit,
    insuranceCompany,
    insuranceType,
    setBase64_insurance,
  } = props;
  let { id } = useParams();
  let history = useHistory();
  let pathUrl = `/car/insurance`;
  const dispatch = useDispatch();
  const Insurance_Img = useSelector(({ Insurance_Img }) => Insurance_Img);

  const [fetching, setFetching] = useState(false);
  const [datavehicle, setDatavehicle] = useState([]);
  ///////// fileList มาทำตัวนับจำนวนอัพรูปไม่เกิน 20 รูป ต่อครั้ง
  const [fileList_Insurance, setFileList_Insurance] = useState([]);
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

  const handleChange_Insurance = ({ fileList }) => {
    setFileList_Insurance(fileList);
    fileList.map(async (item, index) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push(resultBase64);
      setBase64_insurance(arrBase64);
    });
  };

  const handleRemove = (val) => {
    val === "Insurance" && setBase64_insurance(null);
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
        return Api.delete(`api/v1/insurance/image/${id_img}`)
          .then((res) => {
            notificationWithIcon("success", "Delete sussces.");
            dispatch(Insurance_img_Action.fetchImg(id));
          })
          .catch((err) => console.log(err));
      },
      onCancel() {},
    });
  };
  const checkButtonImage = () => {
    return fileList_Insurance.length > 20;
  };
  ///////////////////////////////////////////////////////////////////////////

  const fetchVehicle = async (value) => {
    setFetching(true);
    await Api.get(`api/v1/vehicle/dropdown-vehicle`, {
      params: {
        search: value,
      },
    }).then((res) => {
      setDatavehicle(res.data.result);
      setFetching(false);
    });
  };
  const handleChange = () => {
    setDatavehicle([]);
    setFetching(false);
  };

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
  const checkMomentDatePicker = () => {
    return Object.keys(dataId).length === 0;
  };
console.log("....", dataId.insurance_type_id)
  return (
    <React.Fragment>
      
      {isNew || Object.keys(dataId).length > 0 ? (
        <Form
          ref={props.formRef}
          scrollToFirstError
          initialValues={{
            vehicle_id: dataId.vehicle_id,
            insurance_page_id: dataId.insurance_page_id,
            insurance_type_id: dataId.insurance_type_id,
            type: dataId.type,
            insurance_company_id: dataId.insurance_company_id,
            insurance_number: dataId.insurance_number,
            start_date_coverage: checkMomentDatePicker()
              ? dataId.start_date_coverage
              : moment(dataId.start_date_coverage),
            last_date_coverage: checkMomentDatePicker()
              ? dataId.last_date_coverage
              : moment(dataId.last_date_coverage),
            insurance_premium: dataId.insurance_premium,
            comment: dataId.comment === null ? "" : dataId.comment,
          }}
          {...formItemLayout}
          labelAlign="left"
        >
          <Row gutter={24}>
            <Col span={7} style={{ marginLeft: "15px", marginRight: "15px" }}>
              <Divider orientation="left">หน้ากรรมธรรฆ์</Divider>
              <Form.Item>
                <Upload
                  listType="picture-card"
                  action={`https://www.mocky.io/v2/5cc8019d300000980a055e76`}
                  onPreview={handlePreview}
                  onChange={handleChange_Insurance}
                  multiple={true}
                  onRemove={() => handleRemove("Insurance")}
                  customRequest={dummyRequest}
                  accept={"image/png, image/jpeg,image/jpg"}
                >
                  {fileList_Insurance.length >= 20 ? null : uploadButton}
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
                {fileList_Insurance.length >= 20 ? (
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
                {Insurance_Img.result.length > 0
                  ? Insurance_Img.result.filter((item, index) => {
                      return item.type === "insurance";
                    })
                  : ""}
              </ShowImgWrapper>
            </Col>

            <Col {...colLayout}>
              {isNew ? (
                ""
              ) : (
                <Form.Item name="insurance_page_id" label="รหัสเอกสาร">
                  <Input size={formSize} autoComplete="off" disabled />
                </Form.Item>
              )}
              <Form.Item name="vehicle_id" label="รหัสรถ">
                <Select
                  showSearch
                  placeholder="ค้นหาด้วยรหัสรถ หรือ ป้ายทะเบียน..."
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={fetchVehicle}
                  onChange={handleChange}
                  size={formSize}
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

              <Form.Item name="insurance_type_id" label="ประเภทเอกสาร">
                <Select size={formSize} placeholder="Please select">
                  {optionInsuranceType}
                </Select>
              </Form.Item>

              <Form.Item name="type" label="ประเภท">
                <Select size={formSize} placeholder="Please select">
                  <Option value="ชั้น1">ชั้น 1</Option>
                  <Option value="ชั้น2">ชั้น 2</Option>
                  <Option value="ชั้น3">ชั้น 3</Option>
                </Select>
              </Form.Item>

              <Form.Item name="insurance_company_id" label="บริษัทประกัน">
                <Select size={formSize} placeholder="Please select">
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
                <Input size={formSize} autoComplete="off" />
              </Form.Item>

              <Form.Item name="start_date_coverage" label="วันที่เริ่มคุ้มครอง">
                <DatePicker size={formSize} />
              </Form.Item>
              <Form.Item name="last_date_coverage" label="วันสิ้นสุดคุ้มครอง">
                <DatePicker size={formSize} />
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
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              {isNew ? (
                ""
              ) : (
                <Form.Item label="สถานะ" name="is_active">
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked={dataId.is_active === 1 ? true : false}
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

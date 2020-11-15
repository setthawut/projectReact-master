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
  InputNumber,
  DatePicker,
  Alert,
} from "antd";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LoadingOutlined,
  SaveOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { formSize } from "../../../components/settings/index";
import * as Financial_img_Action from "../../../actions/Financial_Img.action";
import { notificationWithIcon } from "../../../components/Notification";
import Api from "../../../services/httpClient";
import ShowImgWrapper from "../../../components/Image/ShowImg_Wrapper";
import dummyRequest from "../../../components/Image/DummyRequest";

const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

const DetailForm = (props) => {
  const {
    isNew,
    dataId,
    submit,
    purchasingValue,
    financialValue,
    paymentValue,
    setBase64_instalment_contract,
    setBase64_instalment_card,
  } = props;
  const Financial_img = useSelector(({ Financial_img }) => Financial_img);
  let history = useHistory();
  let pathUrl = `/car/clash`;
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
  const [fileList_Instalment_contract, setInstalment_contract] = useState([]);
  const [fileList_Instalment_card, setInstalment_card] = useState([]);
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

  const getBase64 = (file, maxWidth = 320, maxHeight = 320) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          if (maxWidth > img.width) {
            resolve(reader.result);
            return;
          }
          const elem = document.createElement("canvas");
          elem.width = maxWidth;
          elem.height = maxHeight;
          const ctx = elem.getContext("2d");

          ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
          resolve(elem.toDataURL());
        };
        img.onerror = (error) => reject(error);
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

  const handleChange_instalment_contract = ({ fileList }) => {
    setInstalment_contract(fileList);
    fileList.map(async (item, index) => {
      let resultBase64 = await getBase64(item.originFileObj);

      arrBase64.push(resultBase64);
      setBase64_instalment_contract(arrBase64);
    });
  };

  const handleChange_instalment_card = ({ fileList }) => {
    setInstalment_card(fileList);
    fileList.map(async (item, index) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push(resultBase64);
      setBase64_instalment_card(arrBase64);
    });
  };

  const handleRemove = (val) => {
    val === "Instalment_contract" && setBase64_instalment_contract(null);
    val === "Instalment_card" && setBase64_instalment_card(null);
  };

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
        return Api.delete(`api/v1/financial/image/${id_img}`)
          .then((res) => {
            notificationWithIcon("success", "Delete sussces.");
            dispatch(Financial_img_Action.fetchImg(id));
          })
          .catch((err) => console.log(err));
      },
      onCancel() {},
    });
  };

  const checkButtonImage = () => {
    return (
      fileList_Instalment_contract.length > 20 ||
      fileList_Instalment_card.length > 20
    );
  };

  return (
    <React.Fragment>
      {isNew || Object.keys(dataId).length > 0 ? (
        <Form
          ref={props.formRef}
          scrollToFirstError
          initialValues={{
            financial_id: dataId.financial_id,
            purchasing_pattern_id: dataId.purchasing_pattern_id,
            financial_service_company_id: dataId.financial_service_company_id,
            contract_number: dataId.contract_number,
            down_payment: dataId.down_payment,
            flat_rate: dataId.flat_rate,
            number_installment: dataId.number_installment,
            top_finance: dataId.top_finance,
            first_installment_date: checkMomentDatePicker()
              ? dataId.first_installment_date
              : moment(dataId.first_installment_date),
            last_installment_date: checkMomentDatePicker()
              ? dataId.last_installment_date
              : moment(dataId.last_installment_date),
            monthly_installment_date: dataId.monthly_installment_date,
            payment_channel_id: dataId.payment_channel_id,
            installment: dataId.installment,
            is_active: dataId.is_active === 1 ? true : false,
            comment: dataId.comment === null ? "" : dataId.comment,
          }}
          {...formItemLayout}
          labelAlign="left"
        >
          <Row gutter={24}>
            <Col span={7} style={{ marginLeft: "15px", marginRight: "15px" }}>
              <Divider orientation="left">รูปสัญญาเช่าซื้อ</Divider>
              <Form.Item>
                <Upload
                  listType="picture-card"
                  onPreview={handlePreview}
                  onChange={handleChange_instalment_contract}
                  multiple={true}
                  onRemove={() => handleRemove("Instalment_contract")}
                  customRequest={dummyRequest}
                  accept={"image/png, image/jpeg,image/jpg"}
                >
                  {fileList_Instalment_contract.length >= 20
                    ? null
                    : uploadButton}
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
                {fileList_Instalment_contract.length >= 20 ? (
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
                {Financial_img.result.length > 0
                  ? Financial_img.result.filter((item, index) => {
                      return item.type === "instalment_contract";
                    })
                  : ""}
              </ShowImgWrapper>
              <Divider orientation="left">บัตรผ่อน</Divider>
              <Form.Item>
                <Upload
                  listType="picture-card"
                  onPreview={handlePreview}
                  onChange={handleChange_instalment_card}
                  multiple={true}
                  onRemove={() => handleRemove("instalment_card")}
                  customRequest={dummyRequest}
                  accept={"image/png, image/jpeg,image/jpg"}
                >
                  {fileList_Instalment_contract.length >= 20
                    ? null
                    : uploadButton}
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
                {fileList_Instalment_card.length >= 20 ? (
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
                {Financial_img.result.length > 0
                  ? Financial_img.result.filter((item, index) => {
                      return item.type === "instalment_card";
                    })
                  : ""}
              </ShowImgWrapper>
            </Col>

            <Col {...colLayout}>
              {isNew ? (
                ""
              ) : (
                <Form.Item name="financial_id" label="รหัสเอกสาร">
                  <Input
                    size={formSize}
                    autoComplete="off"
                    style={{
                      color: "black",
                    }}
                    disabled
                  />
                </Form.Item>
              )}

              <Form.Item name="purchasing_pattern_id" label="รูปแบบการจัดซื้อ">
                <Select size={formSize} placeholder="Please select">
                  {optionPurchasingValue}
                </Select>
              </Form.Item>
              <Form.Item
                name="financial_service_company_id"
                label="บริษัทที่ให้บริการทางการเงิน"
              >
                <Select size={formSize} placeholder="Please select">
                  {optionFinancialValue}
                </Select>
              </Form.Item>

              <Form.Item name="contract_number" label="เลขสัญญา">
                <Input size={formSize} autoComplete="off" />
              </Form.Item>

              <Form.Item
                name="down_payment"
                label="ยอดดาวน์"
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
                name="top_finance"
                label="ยอดจัดไฟแนนซ์"
                rules={[
                  {
                    pattern: new RegExp(/^[0-9\b]+$/),
                    message: "Please enter numbers only!",
                  },
                ]}
              >
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item name="flat_rate" label="อัตราดอกเบี้ย (Flat Rate)">
                <InputNumber
                  size={formSize}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                />
              </Form.Item>

              <Form.Item name="number_installment" label="จำนวนงวด">
                <Select placeholder={"Plaese select"} size={formSize}>
                  <Option value={24}>24</Option>
                  <Option value={36}>36</Option>
                  <Option value={48}>48</Option>
                  <Option value={60}>60</Option>
                  <Option value={72}>72</Option>
                  <Option value={84}>84</Option>
                </Select>
              </Form.Item>
              <Form.Item name="first_installment_date" label="งวดแรกวันที่">
                <DatePicker size={formSize} />
              </Form.Item>
              <Form.Item name="last_installment_date" label="งวดสุดท้ายวันที่">
                <DatePicker size={formSize} />
              </Form.Item>
              <Form.Item
                name="monthly_installment_date"
                label="วันที่ต้องชำระงวดของแต่ละงวด"
              >
                <Input size={formSize} autoComplete="off" />
              </Form.Item>
              <Form.Item name="payment_channel_id" label="ช่องทางการชำระค่างวด">
                <Select size={formSize} placeholder="Please select">
                  {optionPaymentValue}
                </Select>
              </Form.Item>
              <Form.Item
                name="installment"
                label="ค่างวด"
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

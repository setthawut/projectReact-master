import React, { useState } from "react";
import {
  Form,
  Col,
  Divider,
  Upload,
  Input,
  InputNumber,
  Row,
  Select,
  Modal,
  DatePicker,
  Alert,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { formSize } from "../../../components/settings/index";
import { useSelector } from "react-redux";
import dummyRequest from "../../../components/Image/DummyRequest";

const { TextArea } = Input;
const { Option } = Select;

const Financial_step = (props) => {
  const {
    setBase64_instalment_contract,
    setBase64_instalment_card,
    formStep2,
    setButtonCheck_instalment_contract,
    setButtonCheck_instalment_card,
  } = props;
  const Vehicle_step_all_option = useSelector(
    ({ Vehicle_step_all_option }) => Vehicle_step_all_option,
  );

  ///////// fileList มาทำตัวนับจำนวนอัพรูปไม่เกิน 20 รูป ต่อครั้ง
  const [fileList_Instalment_contract, setFileList_Instalment_contract] = useState([]);
  const [fileList_Instalment_card, setFileList_Instalment_card] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  let arrBase64 = [];

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
    setButtonCheck_instalment_contract(fileList);
    setFileList_Instalment_contract(fileList);
    fileList.map(async (item) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push({
        file: resultBase64,
        type: "instalment_contract",
      });
      setBase64_instalment_contract(arrBase64);
    });
  };

  const handleChange_instalment_card = ({ fileList }) => {
    setFileList_Instalment_card(fileList);
    setButtonCheck_instalment_card(fileList);
    fileList.map(async (item) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push({
        file: resultBase64,
        type: "instalment_card",
      });
      setBase64_instalment_card(arrBase64);
    });
  };
  let optionPurchasingValue = Vehicle_step_all_option.result.purchasingPattern.map(
    (item, index) => {
      return (
        <Option key={index} value={item.id}>
          {item.name}
        </Option>
      );
    },
  );
  let optionFinancialValue = Vehicle_step_all_option.result.financialServiceCompany.map(
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

  const handleRemove = (val) => {
    val === "Instalment_contract" && setBase64_instalment_contract(null);
    val === "Instalment_card" && setBase64_instalment_card(null);
  };

  return (
    <Form
      scrollToFirstError
      {...formItemLayout}
      labelAlign="left"
      form={formStep2}
    >
      <Row gutter={24}>
        <Col span={7} style={{ marginLeft: "15px", marginRight: "15px" }}>
          <Divider orientation="left">รูปสัญญาเช่าซื้อ</Divider>
          <Form.Item>
            <Upload
              listType="picture-card"
              onPreview={handlePreview}
              customRequest={dummyRequest}
              onChange={handleChange_instalment_contract}
              onRemove={() => handleRemove("Instalment_contract")}
              accept={"image/png, image/jpeg,image/jpg"}
              multiple={true}
            >
              {fileList_Instalment_contract.length > 20 ? null : uploadButton}
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
            {fileList_Instalment_contract.length > 20 ? (
              <Alert
                description="จำกัดไฟล์ภาพไม่เกิน 20 ภาพ"
                type="warning"
                showIcon
              />
            ) : (
              ""
            )}
          </Form.Item>
          <Divider orientation="left">บัตรผ่อน</Divider>
          <Form.Item>
            <Upload
              multiple={true}
              onRemove={() => handleRemove("instalment_card")}
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange_instalment_card}
              customRequest={dummyRequest}
              accept={"image/png, image/jpeg,image/jpg"}
            >
              {fileList_Instalment_contract.length > 20 ? null : uploadButton}
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
            {fileList_Instalment_card.length >= 2 ? (
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
            <Input size={formSize} autoComplete="off" />
          </Form.Item>
          <Form.Item name="down_payment" label="ยอดดาวน์">
            <Input size={formSize} autoComplete="off" />
          </Form.Item>
          <Form.Item name="top_finance" label="ยอดจัดไฟแนนซ์">
            <Input size={formSize} autoComplete="off" />
          </Form.Item>
          <Form.Item name="flat_rate" label="อัตราดอกเบี้ย (Flat Rate)">
            <InputNumber
              defaultValue={100}
              size={formSize}
              parser={(value) => value.replace("%", "")}
              formatter={(value) => `${value}%`}
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
            rules={[
              {
                pattern: new RegExp(/^[0-9\b]+$/),
                message: "Please enter numbers only!",
              },
            ]}
          >
            <Input size={formSize} autoComplete="off" />
          </Form.Item>
          <Form.Item name="payment_channel_id" label="ช่องทางการชำระค่างวด">
            <Select size={formSize} placeholder="Please select">
              {optionPaymentValue}
            </Select>
          </Form.Item>
          <Form.Item name="installment" label="ค่างวด">
            <Input size={formSize} autoComplete="off" />
          </Form.Item>

          <Form.Item name="comment" label="หมายเหตุ">
            <TextArea rows={4} size={formSize} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Financial_step;

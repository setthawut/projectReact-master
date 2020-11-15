import React, { useEffect, useState } from "react";
import {
  Form,
  Col,
  Divider,
  Upload,
  Input,
  Row,
  Select,
  Alert,
  DatePicker,
  Modal,
  
} from "antd";

import {  PlusOutlined } from "@ant-design/icons";
import { formSize } from "../../../components/settings/index";
import { useSelector } from "react-redux";
import dummyRequest from "../../../components/Image/DummyRequest";

const { TextArea } = Input;
const { Option } = Select;

const Insurance_step = (props) => {
  const { formStep3, setBase64_Insurance, setButtonCheck_Insurance } = props;

  const Vehicle_step_all_option = useSelector(
    ({ Vehicle_step_all_option }) => Vehicle_step_all_option,
  );


  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  let arrBase64 = [];
  ///////// fileList มาทำตัวนับจำนวนอัพรูปไม่เกิน 20 รูป ต่อครั้ง
  const [fileList_Insurance, setFleList_Insurance] = useState([]);

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

  const handleChange_Insurance = ({ fileList }) => {
    setButtonCheck_Insurance(fileList);
    setFleList_Insurance(fileList);
    fileList.map(async (item) => {
      let resultBase64 = await getBase64(item.originFileObj);
      arrBase64.push({
        file: resultBase64,
        type: "insurance",
      });
      setBase64_Insurance(arrBase64);
    });
  };

 
  const handleCancel = () => setPreviewVisible(false);
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

  const handleRemove = (val) => {
    val === "Insurance" && setBase64_Insurance(null);
  };

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
  return (
    <Form
      scrollToFirstError
      {...formItemLayout}
      labelAlign="left"
      form={formStep3}
    >
      <Row gutter={24}>
        <Col span={7} style={{ marginLeft: "15px", marginRight: "15px" }}>
          <Divider orientation="left">หน้ากรรมธรรฆ์</Divider>
          <Form.Item>
            <Upload
              accept={"image/png, image/jpeg,image/jpg"}
              listType="picture-card"
              multiple={true}
              customRequest={dummyRequest}
              onChange={handleChange_Insurance}
              onRemove={() => handleRemove("Insurance")}
              onPreview={handlePreview}
            >
              {fileList_Insurance.length > 20 ? null : uploadButton}
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
            {fileList_Insurance.length > 20 ? (
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

          <Form.Item name="comment" label="หมายเหตุ">
            <TextArea rows={4} size={formSize} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Insurance_step;

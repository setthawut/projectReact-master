import React, { useState } from "react";
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
  Switch,
  DatePicker,
  InputNumber,
} from "antd";
import _ from "lodash";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { CloseOutlined, CheckOutlined, EditOutlined } from "@ant-design/icons";
import { formSize } from "../../../../components/settings/index";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Option } = Select;

const DetailVehicle = (props) => {
  const Financial_img = useSelector(({ Financial_img }) => Financial_img);

  const Vehicle_step_all_option = useSelector(
    ({ Vehicle_step_all_option }) => Vehicle_step_all_option,
  );

  const { isNew, dataId } = props;
  let history = useHistory();
  let pathUrl = `/car/clash`;
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  ///// Modalสำหรับโชว์รูป
  const [showModal, setShowModal] = useState(false);

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

  let fileList_instalment_contract =
    Object.keys(Financial_img.result).length > 0
      ? Financial_img.result
          .filter((item) => {
            return item.type === "instalment_contract";
          })
          .map((item, index) => {
            return {
              uid: index,
              url: item.full_path,
            };
          })
      : [];
  let fileList_instalment_card =
    Object.keys(Financial_img.result).length > 0
      ? Financial_img.result
          .filter((item) => {
            return item.type === "instalment_card";
          })
          .map((item, index) => {
            return {
              uid: index,
              url: item.full_path,
            };
          })
      : [];

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  const handleCancel = () => setPreviewVisible(false);

  const checkMomentDatePicker = () => {
    return Object.keys(dataId).length === 0;
  };

  const ShowImgModal = () => {
    return (
      <Modal visible={previewVisible} onCancel={handleCancel} width={820}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
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
            top_finance: dataId.top_finance,
            flat_rate: dataId.flat_rate,
            number_installment: dataId.number_installment,
            first_installment_date: checkMomentDatePicker()
              ? dataId.first_installment_date
              : moment(dataId.first_installment_date),
            last_installment_date: checkMomentDatePicker()
              ? dataId.last_installment_date
              : moment(dataId.last_installment_date),
            monthly_installment_date: dataId.monthly_installment_date,
            payment_channel_id: dataId.payment_channel_id,
            installment: dataId.installment,

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
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  onPreview={handlePreview}
                  fileList={fileList_instalment_contract}
                ></Upload>
              </Form.Item>

              <Divider orientation="left">บัตรผ่อน</Divider>
              <Form.Item>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  onPreview={handlePreview}
                  fileList={fileList_instalment_card}
                ></Upload>
              </Form.Item>
              <ShowImgModal />
            </Col>

            <Col {...colLayout}>
              <Form.Item name="financial_id" label="รหัสเอกสาร">
                <Input size={formSize} disabled />
              </Form.Item>
              <Form.Item name="purchasing_pattern_id" label="รูปแบบการจัดซื้อ">
                <Select size={formSize} placeholder="Please select" disabled>
                  {optionPurchasingValue}
                </Select>
              </Form.Item>
              <Form.Item
                name="financial_service_company_id"
                label="บริษัทที่ให้บริการทางการเงิน"
              >
                <Select size={formSize} placeholder="Please select" disabled>
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
                <Input size={formSize} autoComplete="off" disabled />
              </Form.Item>
              <Form.Item name="down_payment" label="ยอดดาวน์">
                <Input size={formSize} autoComplete="off" disabled />
              </Form.Item>
              <Form.Item name="top_finance" label="ยอดจัดไฟแนนซ์">
                <Input size={formSize} autoComplete="off" disabled />
              </Form.Item>
              <Form.Item name="flat_rate" label="อัตราดอกเบี้ย (Flat Rate)">
                <InputNumber
                  size={formSize}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  disabled
                />
              </Form.Item>
              <Form.Item name="number_installment" label="จำนวนงวด">
                <Select placeholder={"Plaese select"} size={formSize} disabled>
                  <Option value={24}>24</Option>
                  <Option value={36}>36</Option>
                  <Option value={48}>48</Option>
                  <Option value={60}>60</Option>
                  <Option value={72}>72</Option>
                  <Option value={84}>84</Option>
                </Select>
              </Form.Item>
              <Form.Item name="first_installment_date" label="งวดแรกวันที่">
                <DatePicker size={formSize} disabled />
              </Form.Item>
              <Form.Item name="last_installment_date" label="งวดสุดท้ายวันที่">
                <DatePicker size={formSize} disabled />
              </Form.Item>
              <Form.Item
                name="monthly_installment_date"
                label="วันที่ต้องชำระงวดของแต่ละงวด"
              >
                <Input size={formSize} autoComplete="off" disabled />
              </Form.Item>
              <Form.Item name="payment_channel_id" label="ช่องทางการชำระค่างวด">
                <Select size={formSize} placeholder="Please select" disabled>
                  {optionPaymentValue}
                </Select>
              </Form.Item>
              <Form.Item name="installment" label="ค่างวด">
                <Input size={formSize} autoComplete="off" disabled />
              </Form.Item>
              <Form.Item label="สถานะ" name="is_active" valuePropName="checked">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked={dataId.type === 1 ? true : false}
                  disabled
                />
              </Form.Item>
              <Form.Item name="comment" label="หมายเหตุ">
                <TextArea rows={4} size={formSize} disabled />
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
          onClick={() => {
            history.push(`${pathUrl}/${dataId.id}`);
          }}
          icon={<EditOutlined />}
        >
          แก้ไข
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

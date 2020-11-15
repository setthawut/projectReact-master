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
  const Insurance_Img = useSelector(({ Insurance_Img }) => Insurance_Img);

  const Vehicle_step_all_option = useSelector(
    ({ Vehicle_step_all_option }) => Vehicle_step_all_option,
  );

  const { isNew, dataId } = props;
  let history = useHistory();
  let pathUrl = `/car/insurance`;
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  ///// Modalสำหรับโชว์รูป
  const [showModal, setShowModal] = useState(false);
  ////// path รูปจาก components ShowImg_Wrapper มาโชว์ในmodal
  const [imgInModal, setImgInModal] = useState();

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

  let fileList_path_file_insurance_page =
    Object.keys(Insurance_Img.result).length > 0
      ? Insurance_Img.result.map((item, index) => {
          return {
            uid: index,
            url: item.full_path,
          };
        })
      : [];

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    );
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
            insurance_page_id: dataId.insurance_page_id,
            insurance_type_id: dataId.insurance_type_id,
            type: dataId.type,
            insurance_company_id: dataId.insurance_company_id,
            insurance_number: dataId.insurance_number,
            insurance_premium: dataId.insurance_premium,
            flat_rate: dataId.flat_rate,
            number_installment: dataId.number_installment,
            start_date_coverage: checkMomentDatePicker()
              ? dataId.start_date_coverage
              : moment(dataId.start_date_coverage),
            last_date_coverage: checkMomentDatePicker()
              ? dataId.last_date_coverage
              : moment(dataId.last_date_coverage),

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
                  fileList={fileList_path_file_insurance_page}
                ></Upload>
              </Form.Item>
              <ShowImgModal />
            </Col>

            <Col {...colLayout}>
              <Form.Item name="insurance_page_id" label="รหัสเอกสาร">
                <Input size={formSize} autoComplete="off" disabled />
              </Form.Item>
              <Form.Item name="insurance_type_id" label="ประเภทเอกสาร">
                <Select size={formSize} placeholder="Please select" disabled>
                  {optionInsuranceType}
                </Select>
              </Form.Item>

              <Form.Item name="type" label="ประเภท">
                <Select size={formSize} placeholder="Please select" disabled>
                  <Option value="ชั้น1">ชั้น 1</Option>
                  <Option value="ชั้น2">ชั้น 2</Option>
                  <Option value="ชั้น3">ชั้น 3</Option>
                </Select>
              </Form.Item>

              <Form.Item name="insurance_company_id" label="บริษัทประกัน">
                <Select size={formSize} placeholder="Please select" disabled>
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
                <Input size={formSize} autoComplete="off" disabled />
              </Form.Item>

              <Form.Item name="start_date_coverage" label="วันที่เริ่มคุ้มครอง">
                <DatePicker size={formSize} disabled />
              </Form.Item>
              <Form.Item name="last_date_coverage" label="วันสิ้นสุดคุ้มครอง">
                <DatePicker size={formSize} disabled />
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
                <Input size={formSize} autoComplete="off" disabled />
              </Form.Item>

              <Form.Item
                label="สถานะ"
                name="is_active"
                valuePropName={"checked"}
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked={dataId.is_active === 1 ? true : false}
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

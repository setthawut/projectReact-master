import React, { useEffect, useState, createRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Api from "../../../services/httpClient";
import { notificationWithIcon } from "../../../components/Notification";

import { Tabs, Breadcrumb } from "antd";
import DetailForm from "./DetailForm";
import DetailImage from "./DetailImage";
import * as Financial_img_Action from "../../../actions/Financial_Img.action";
import { useSelector, useDispatch } from "react-redux";

const { TabPane } = Tabs;

const Detail = (props) => {
  let getUsername = localStorage.getItem("userProfile");
  let UserProfile = JSON.parse(getUsername);

  const dispatch = useDispatch();
  let history = useHistory();
  let { id } = useParams();
  const formRef = createRef();
  const [stateDataById, setStateDataById] = useState({});
  const [isNew, setIsnew] = useState(false);
  const [purchasingValue, setPurchasingValue] = useState([]);
  const [financialValue, setFinancialValue] = useState([]);
  const [paymentValue, setPaymentValue] = useState([]);
  const [base64_instalment_contract, setBase64_instalment_contract] = useState(
    null,
  );
  const [base64_instalment_card, setBase64_instalment_card] = useState(null);

  let name = "ข้อมูลทางการเงิน";
  let pathUrl = `/car/clash`;
  const navigation = [
    { key: 1, title: "หน้าแรก", link: "/dashboard" },
    { key: 2, title: name, link: "" },
  ];
  useEffect(() => {
    const {
      match: { params },
    } = props;
    fetchPurchasing();
    fetchfinancial();
    fetchPayment();
    if (params.id === "new") {
      dispatch(Financial_img_Action.fetchImg_Blank());
      setIsnew(true);
      navigation.push({ key: 4, title: "New", link: "" });
    } else {
      fetchById(params.id);
      dispatch(Financial_img_Action.fetchImg(params.id));
      navigation.push({ key: 4, title: "Edit", link: "" });
    }
  }, []);

  const fetchPurchasing = async () => {
    try {
      let res = await Api.get(`api/v1/purchasing-pattern`);
      setPurchasingValue(res.data.result);
    } catch (error) {}
  };
  const fetchfinancial = async () => {
    try {
      let res = await Api.get(`api/v1/financial-service-company`);
      setFinancialValue(res.data.result);
    } catch (error) {}
  };
  const fetchPayment = async () => {
    try {
      let res = await Api.get(`api/v1/payment-channel`);
      setPaymentValue(res.data.result);
    } catch (error) {}
  };
  const onSubmit = () => {
    formRef.current.validateFields().then((values) => {
      const formData = new FormData();

      if (isNew) {
        formData.append("purchasing_pattern_id", values.purchasing_pattern_id);
        formData.append(
          "financial_service_company_id",
          values.financial_service_company_id,
        );
        formData.append("contract_number", values.contract_number);
        formData.append("down_payment", values.down_payment);
        formData.append("top_finance", values.top_finance);
        formData.append("flat_rate", values.flat_rate);
        formData.append("number_installment", values.number_installment);
        formData.append(
          "first_installment_date",
          values.first_installment_date === undefined
            ? ""
            : moment(values.first_installment_date).format("YYYY-MM-DD"),
        );
        formData.append(
          "last_installment_date",
          values.last_installment_date === undefined
            ? ""
            : moment(values.last_installment_date).format("YYYY-MM-DD"),
        );
        formData.append("payment_channel_id", values.payment_channel_id);
        formData.append("installment", values.installment);
        formData.append(
          "monthly_installment_date",
          values.monthly_installment_date,
        );

        formData.append(
          "comment",
          values.comment === undefined ? null : values.comment,
        );
        formData.append(" create_by", UserProfile.name);
        formData.append("is_active", values.is_active === true ? 1 : 0);

        let index = 0;
        if (base64_instalment_contract != null) {
          base64_instalment_contract.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "instalment_contract");
            index += 1;
          });
        }
        if (base64_instalment_card != null) {
          base64_instalment_card.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "instalment_card");
            index += 1;
          });
        }

        create(formData);
      } else {
        formData.append("id", id);
        formData.append("purchasing_pattern_id", values.purchasing_pattern_id);
        formData.append(
          "financial_service_company_id",
          values.financial_service_company_id,
        );
        formData.append("contract_number", values.contract_number);
        formData.append("down_payment", values.down_payment);
        formData.append("top_finance", values.top_finance);
        formData.append("flat_rate", values.flat_rate);
        formData.append("number_installment", values.number_installment);
        formData.append(
          "first_installment_date",
          values.first_installment_date === undefined
            ? ""
            : moment(values.first_installment_date).format("YYYY-MM-DD"),
        );
        formData.append(
          "last_installment_date",
          values.last_installment_date === undefined
            ? ""
            : moment(values.last_installment_date).format("YYYY-MM-DD"),
        );
        formData.append("payment_channel_id", values.payment_channel_id);
        formData.append("installment", values.installment);
        formData.append(
          "monthly_installment_date",
          values.monthly_installment_date,
        );
        formData.append(
          "comment",
          values.comment === undefined ? null : values.comment,
        );
        formData.append(" update_by", UserProfile.name);
        formData.append(
          "is_active",
          values.is_active === undefined || values.is_active === true ? 1 : 0,
        );
        let index = 0;
        if (base64_instalment_contract != null) {
          base64_instalment_contract.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "instalment_contract");
            index += 1;
          });
        }
        if (base64_instalment_card != null) {
          base64_instalment_card.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "instalment_card");
            index += 1;
          });
        }
        update(formData);
      }
    });
  };
  const create = (data) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    Api.post(`api/v1/financial`, data, config)
      .then((respone) => {
        if (respone.status === 200) {
          notificationWithIcon("success", "Create sussces.");
          history.push(pathUrl);
          return;
        }

        console.log(respone);
        notificationWithIcon("warning", "Create fail.");
      })
      .catch((error) => {
        console.log(error);
        notificationWithIcon("warning", "Create fail.");
      });
  };

  const update = (data) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    Api.post(`api/v1/financial/update`, data, config)
      .then((respone) => {
        if (respone.status === 200) {
          notificationWithIcon("success", "Update sussces.");
          history.push(pathUrl);
          return;
        }

        console.log(respone);
        notificationWithIcon("warning", "Update fail.");
      })
      .catch((error) => {
        console.log(error);
        notificationWithIcon("warning", "Update fail.");
      });
  };

  const fetchById = async (id) => {
    try {
      let res = await Api.get(`api/v1/financial/${id}`);

      setStateDataById(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <div
        className="d-sm-flex align-items-center justify-content-between"
        style={{
          padding: "10px 20px",
          backgroundColor: "#fff",
        }}
      >
        <Breadcrumb>
          {navigation.map((item) => (
            <Breadcrumb.Item key={item.key}>
              {item.link ? (
                <Link to={item.link}>{item.title}</Link>
              ) : (
                item.title
              )}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="card card-body" style={{ margin: "20px", paddingTop: 0 }}>
        <Tabs animated={false}>
          <TabPane tab="GENERAL INFORMATIONS" key="generalInformations">
            <DetailForm
              formRef={formRef}
              dataId={stateDataById}
              isNew={isNew}
              setBase64_instalment_contract={setBase64_instalment_contract}
              setBase64_instalment_card={setBase64_instalment_card}
              submit={onSubmit}
              purchasingValue={purchasingValue}
              financialValue={financialValue}
              paymentValue={paymentValue}
            />
          </TabPane>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default Detail;

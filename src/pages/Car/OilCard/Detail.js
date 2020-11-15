import React, { useEffect, useState, createRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Api from "../../../services/httpClient";
import { notificationWithIcon } from "../../../components/Notification";
import * as OilCard_img_Action from "../../../actions/OilCard_Img.action";
import { Tabs, Breadcrumb } from "antd";
import DetailForm from "./DetailForm";
import { useDispatch } from "react-redux";

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
  const [cardTypeValue, setCardTypeValue] = useState([]);
  const [bankTypeValue, setBankTypeValue] = useState([]);
  const [companyValue, setCompanyValue] = useState([]);
  const [base64_front, setBase64_front] = useState(null);
  const [base64_back, setBase64_back] = useState(null);

  let name = "บัตรน้ำมัน";
  let pathUrl = `/car/oilcard`;
  const navigation = [
    { key: 1, title: "หน้าแรก", link: "/dashboard" },
    { key: 2, title: name, link: "" },
  ];
  useEffect(() => {
    const {
      match: { params },
    } = props;
    fetchBankType();
    fetchCardType();
    fetchCompany();
    if (params.id === "new") {
      setIsnew(true);
      navigation.push({ key: 4, title: "New", link: "" });
    } else {
      fetchById(params.id);
      dispatch(OilCard_img_Action.fetchImg(params.id));
      navigation.push({ key: 4, title: "Edit", link: "" });
    }
  }, []);

  const fetchCardType = async () => {
    try {
      let res = await Api.get(`api/v1/card-type`);
      setCardTypeValue(res.data.result);
    } catch (error) {}
  };
  const fetchBankType = async () => {
    try {
      let res = await Api.get(`api/v1/bank-type`);
      setBankTypeValue(res.data.result);
    } catch (error) {}
  };
  const fetchCompany = async () => {
    try {
      let res = await Api.get(`api/v1/company`);
      setCompanyValue(res.data.result);
    } catch (error) {}
  };
  const onSubmit = () => {
    formRef.current.validateFields().then((values) => {
      const formData = new FormData();

      if (isNew) {
        formData.append("vehicle_id", values.vehicle_id);

        formData.append("bank_type_id", values.bank_type_id);
        formData.append("card_type_id", values.card_type_id);
        formData.append("company_id", values.company_id);
        formData.append("card_number", values.card_number);
        formData.append("identification_card", values.identification_card);
        formData.append("card_last_number", values.card_last_number);
        formData.append("card_limit", values.card_limit);
        formData.append(
          "expired_card",
          values.expired_card === undefined
            ? ""
            : moment(values.expired_card).format("MM/YY"),
        );

        formData.append(
          "comment",
          values.comment === undefined ? undefined : values.comment,
        );
        formData.append(" create_by", UserProfile.name);

        let index = 0;
        if (base64_front != null) {
          base64_front.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "front_card");
            index += 1;
          });
        }
        if (base64_back != null) {
          base64_back.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "back_card");
            index += 1;
          });
        }
        create(formData);
      } else {
        formData.append("id", id);
        formData.append("vehicle_id", values.vehicle_id);
        formData.append(
          "is_active",
          values.is_active === undefined || values.is_active === true ? 1 : 0,
        );
        formData.append("type", values.type);

        formData.append("bank_type_id", values.bank_type_id);
        formData.append("card_type_id", values.card_type_id);
        formData.append("company_id", values.company_id);
        formData.append("card_number", values.card_number);
        formData.append("identification_card", values.identification_card);
        formData.append("card_last_number", values.card_last_number);
        formData.append("card_limit", values.card_limit);
        formData.append(
          "expired_card",
          values.expired_card === undefined
            ? ""
            : moment(values.expired_card).format("MM/YY"),
        );

        formData.append(
          "comment",
          values.comment === undefined ? undefined : values.comment,
        );
        formData.append(" update_by", UserProfile.name);
        let index = 0;
        if (base64_front != null) {
          base64_front.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "front_card");
            index += 1;
          });
        }
        if (base64_back != null) {
          base64_back.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "back_card");
            index += 1;
          });
        }
        update(formData);
      }
    });
  };
  const create = (data) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    Api.post(`api/v1/oil-card`, data, config)
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
    Api.post(`api/v1/oil-card/update`, data, config)
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
      let res = await Api.get(`api/v1/oil-card/${id}`);

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
              setBase64_front={setBase64_front}
              setBase64_back={setBase64_back}
              submit={onSubmit}
              cardTypeValue={cardTypeValue}
              bankTypeValue={bankTypeValue}
              companyValue={companyValue}
            />
          </TabPane>
        </Tabs>
      </div>

      {/* <DetailImage dataId={stateDataById} /> */}
    </React.Fragment>
  );
};

export default Detail;

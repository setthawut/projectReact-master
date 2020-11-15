import React, { useEffect, useState, createRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Api from "../../../services/httpClient";
import { notificationWithIcon } from "../../../components/Notification";

import { Tabs, Breadcrumb } from "antd";
import DetailForm from "./DetailForm";

import * as Insurance_img_Action from "../../../actions/Insurance_Img.action";
import { useDispatch } from "react-redux";
const { TabPane } = Tabs;

const Detail = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  let { id } = useParams();
  const formRef = createRef();
  const [stateDataById, setStateDataById] = useState({});
  const [isNew, setIsnew] = useState(false);
  const [insuranceCompany, setInsuranceCompany] = useState([]);
  const [insuranceType, setInsuranceType] = useState([]);
  const [base64_insurance, setBase64_insurance] = useState(null);

  let getUsername = localStorage.getItem("userProfile");
  let UserProfile = JSON.parse(getUsername);

  let name = "Insurance";
  let pathUrl = `/car/insurance`;

  const navigation = [
    { key: 1, title: "Dashboard", link: "/dashboard" },
    { key: 2, title: "Car", link: "" },
    { key: 3, title: name, link: "" },
  ];
  useEffect(() => {
    const {
      match: { params },
    } = props;
    fetchInsuranceCompany();
    fetchInsuranceType();
    if (params.id === "new") {
      setIsnew(true);
      navigation.push({ key: 4, title: "New", link: "" });
    } else {
      fetchById(params.id);
      dispatch(Insurance_img_Action.fetchImg(params.id));
      navigation.push({ key: 4, title: "Edit", link: "" });
    }
  }, []);

  const fetchInsuranceCompany = async () => {
    try {
      let res = await Api.get(`api/v1/insurance-company`);
      setInsuranceCompany(res.data.result);
    } catch (error) {}
  };
  const fetchInsuranceType = async () => {
    try {
      let res = await Api.get(`api/v1/insurance-type`);
      setInsuranceType(res.data.result);
    } catch (error) {}
  };
  const onSubmit = () => {
    formRef.current.validateFields().then((values) => {
      const formData = new FormData();

      if (isNew) {
        formData.append("vehicle_id", values.vehicle_id);
        formData.append("type", values.type);
        formData.append("insurance_type_id", values.insurance_type_id);
        formData.append("insurance_company_id", values.insurance_company_id);
        formData.append("insurance_number", values.insurance_number);

        formData.append(
          "start_date_coverage",
          values.start_date_coverage === undefined
            ? ""
            : moment(values.start_date_coverage).format("YYYY-MM-DD"),
        );
        formData.append(
          "last_date_coverage",
          values.last_date_coverage === undefined
            ? ""
            : moment(values.last_date_coverage).format("YYYY-MM-DD"),
        );
        formData.append("insurance_premium", values.insurance_premium);
        formData.append("create_by", UserProfile.name);

        formData.append(
          "comment",
          values.comment == undefined ? undefined : values.comment,
        );
        formData.append(" create_by", UserProfile.name);
        let index = 0;
        if (base64_insurance != null) {
          base64_insurance.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "insurance");
            index += 1;
          });
        }
        formData.append("is_active", values.is_active === true ? 1 : 0);
        create(formData);
      } else {
        formData.append("id", id);
        formData.append("vehicle_id", values.vehicle_id);
        formData.append("type", values.type);
        formData.append("insurance_type_id", values.insurance_type_id);
        formData.append("insurance_company_id", values.insurance_company_id);
        formData.append("insurance_number", values.insurance_number);
        formData.append("insurance_premium", values.insurance_premium);
        formData.append(
          "start_date_coverage",
          values.start_date_coverage === undefined
            ? ""
            : moment(values.start_date_coverage).format("YYYY-MM-DD"),
        );
        formData.append(
          "last_date_coverage",
          values.last_date_coverage === undefined
            ? ""
            : moment(values.last_date_coverage).format("YYYY-MM-DD"),
        );
        formData.append(
          "comment",
          values.comment == undefined ? undefined : values.comment,
        );
        formData.append(" update_by", UserProfile.name);
        if (base64_insurance != null) {
          formData.append(" path_file_insurance_page", base64_insurance);
        }
        formData.append(
          "is_active",
          values.is_active === undefined || values.is_active === true ? 1 : 0,
        );
        let index = 0;
        if (base64_insurance != null) {
          base64_insurance.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "insurance");
            index += 1;
          });
        }
        update(formData);
      }
    });
  };
  const create = (data) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    Api.post(`api/v1/insurance`, data, config)
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
    Api.post(`api/v1/insurance/update`, data, config)
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
      let res = await Api.get(`api/v1/insurance/${id}`);
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
              insuranceCompany={insuranceCompany}
              insuranceType={insuranceType}
              setBase64_insurance={setBase64_insurance}
              submit={onSubmit}
            />
          </TabPane>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default Detail;

import React, { useEffect, useState, createRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Api from "../../../services/httpClient";
import { notificationWithIcon } from "../../../components/Notification";
import { Tabs, Breadcrumb } from "antd";
import DetailForm from "./DetailForm";
import * as Driver_img_Action from "../../../actions/Driver_Img.action";
import { useDispatch } from "react-redux";

const { TabPane } = Tabs;

const Detail = (props) => {
  const dispatch = useDispatch();

  let history = useHistory();
  let { id } = useParams();
  const formRef = createRef();
  const [stateDataById, setStateDataById] = useState({});
  const [isNew, setIsnew] = useState(false);
  const [companyValue, setCompanyValue] = useState([]);
  const [base64_employee, setBase64_employee] = useState(null);
  const [base64_identity, setBase64_identity] = useState(null);
  const [base64_driver, setBase64_driver] = useState(null);

  let getUsername = localStorage.getItem("userProfile");
  let UserProfile = JSON.parse(getUsername);

  let name = "พนักงานขับรถ";
  let pathUrl = `/car/driver`;
  const navigation = [
    { key: 1, title: "หน้าแรก", link: "/dashboard" },
    { key: 2, title: name, link: "" },
  ];
  useEffect(() => {
    const {
      match: { params },
    } = props;
    fetchCompany();
    if (params.id === "new") {
      setIsnew(true);
      dispatch(Driver_img_Action.fetchImg_Blank());
      navigation.push({ key: 4, title: "New", link: "" });
    } else {
      fetchById(params.id);
      dispatch(Driver_img_Action.fetchImg(params.id));
      navigation.push({ key: 4, title: "Edit", link: "" });
    }
  }, []);

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
        formData.append("admin_id", UserProfile.id);
        formData.append("type", values.type);
        formData.append("title_name", values.title_name);
        formData.append("name", values.name);
        formData.append("nickname", values.nickname);
        formData.append("phone_number", values.phone_number);
        formData.append(
          "birthday",
          values.birthday === undefined
            ? ""
            : moment(values.birthday).format("YYYY-MM-DD"),
        );
        formData.append("identity_card_number", values.identity_card_number);
        formData.append("company_id", values.company_id);
        formData.append(
          "start_date_work",
          values.start_date_work === undefined
            ? ""
            : moment(values.start_date_work).format("YYYY-MM-DD"),
        );
        formData.append(
          "finish_date_work",
          values.finish_date_work === undefined
            ? ""
            : moment(values.finish_date_work).format("YYYY-MM-DD"),
        );
        formData.append(
          "comment",
          values.comment === undefined ? null : values.comment,
        );
        formData.append(" create_by", UserProfile.name);
        let index = 0;
        if (base64_employee != null) {
          base64_employee.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "employee");
            index += 1;
          });
        }
        if (base64_identity != null) {
          base64_identity.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "identity_card");
            index += 1;
          });
        }
        if (base64_driver != null) {
          base64_driver.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "driver_card");
            index += 1;
          });
        }

        create(formData);
      } else {
        formData.append("id", id);
        formData.append("admin_id", UserProfile.id);
        formData.append("driver_id", values.driver_id);
        formData.append(
          "is_active",
          values.is_active === undefined || values.is_active === true ? 1 : 0,
        );
        formData.append("type", values.type);
        formData.append("title_name", values.title_name);
        formData.append("name", values.name);
        formData.append("nickname", values.nickname);
        formData.append("phone_number", values.phone_number);
        formData.append(
          "birthday",
          values.birthday === undefined
            ? ""
            : moment(values.birthday).format("YYYY-MM-DD"),
        );
        formData.append("identity_card_number", values.identity_card_number);
        formData.append("company_id", values.company_id);
        formData.append(
          "start_date_work",
          values.start_date_work === undefined
            ? ""
            : moment(values.start_date_work).format("YYYY-MM-DD"),
        );
        formData.append(
          "finish_date_work",
          values.finish_date_work === undefined ||
            values.finish_date_work === null
            ? ""
            : moment(values.finish_date_work).format("YYYY-MM-DD"),
        );

        formData.append(
          "comment",
          values.comment === "" ? null : values.comment,
        );
        formData.append("create_by", UserProfile.name);
        let index = 0;
        if (base64_employee != null) {
          base64_employee.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "employee");
            index += 1;
          });
        }
        if (base64_identity != null) {
          base64_identity.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "identity_card");
            index += 1;
          });
        }
        if (base64_driver != null) {
          base64_driver.map((item) => {
            formData.append(`path_file[${index}][file]`, item);
            formData.append(`path_file[${index}][type]`, "driver_card");
            index += 1;
          });
        }
        update(formData);
      }
    });
  };
  const create = (data) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    Api.post(`api/v1/driver`, data, config)
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
    Api.post(`api/v1/driver/update`, data, config)
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
      let res = await Api.get(`api/v1/driver/${id}`);

      //setGetPath_file(res.data.result.driver_image);
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
              setBase64_employee={setBase64_employee}
              setBase64_identity={setBase64_identity}
              setBase64_driver={setBase64_driver}
              submit={onSubmit}
              companyValue={companyValue}
            />
          </TabPane>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default Detail;

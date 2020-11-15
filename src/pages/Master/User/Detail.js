import React, { useEffect, useState, createRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { notificationWithIcon } from "../../../components/Notification";
import { Tabs, Breadcrumb, Tooltip } from "antd";
import DetailForm from "./DetailForm";
import DetailImage from "./DetailImage";
import Api from "./../../../services/httpClient";

const { TabPane } = Tabs;

const Detail = (props) => {
  let getUsername = localStorage.getItem("userProfile");
  let UserProfile = JSON.parse(getUsername);
  let history = useHistory();
  let { id } = useParams();
  const formRef = createRef();
  const [stateDataById, setStateDataById] = useState({});
  const [isNew, setIsnew] = useState(false);
  const [base64, setBase64] = useState(null);

  let name = "User";
  let pathUrl = `/master/user`;

  const navigation = [
    { key: 1, title: "หน้าแรก", link: "/dashboard" },
    { key: 2, title: "ผู้ใช้ระบบ", link: "" },
  ];
  useEffect(() => {
    const {
      match: { params },
    } = props;

    if (params.id === "new") {
      setIsnew(true);
      navigation.push({ key: 4, title: "New", link: "" });
    } else {
      fetchById(params.id);
      navigation.push({ key: 4, title: "Edit", link: "" });
    }
  }, []);

  const onSubmit = () => {
    formRef.current.validateFields().then((values) => {
      if (isNew) {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("role", values.role);
        formData.append(" path_file_avatar", base64);
        formData.append(
          "comment",
          values.comment == undefined ? "" : values.comment,
        );
        formData.append(" create_by", UserProfile.name);
        create(formData);
      } else {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("username", values.username);
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("role", values.role);
        formData.append(
          "is_active",
          values.is_active === undefined || values.is_active === true ? 1 : 0,
        );
        formData.append(
          "comment",
          values.comment == undefined ? null : values.comment,
        );
        if (base64 != null) {
          formData.append(" path_file_avatar", base64);
        }
        formData.append(" update_by", UserProfile.name);
        update(formData);
      }
    });
  };

  const fetchById = async (id) => {
    try {
      let res = await Api.get(`api/v1/admin/${id}`);
      setStateDataById(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const create = (data) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    Api.post(`api/v1/admin`, data, config)
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
    Api.post(`api/v1/admin/update`, data, config)
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

  return (
    <React.Fragment>
      <div
        className="d-sm-flex align-items-center justify-content-between"
        style={{
          padding: "10px 20px",
          backgroundColor: "#fff",
        }}
      >
        <div>
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
      </div>
      <div className="card card-body" style={{ margin: "20px", paddingTop: 0 }}>
        <Tabs>
          <TabPane tab="GENERAL INFORMATIONS" key="1">
            <DetailForm
              formRef={formRef}
              dataId={stateDataById}
              isNew={isNew}
              setBase64={setBase64}
              submit={onSubmit}
            />
          </TabPane>
        </Tabs>
      </div>
      <DetailImage dataId={stateDataById} />
    </React.Fragment>
  );
};
export default Detail;

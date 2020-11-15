import React, { useEffect, useState, createRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { notificationWithIcon } from "../../../components/Notification/index";
import { Tabs, Breadcrumb } from "antd";
import DetailVehicle from "./ShowDetail/DetailVehicle";
import DetailFinance from "./ShowDetail/DetailFinancial";
import DetailInsurnace from "./ShowDetail/DetailInsurance";
import DetailDriver from "./ShowDetail/DetailDriver";
import * as Vehicle_Img_Action from "../../../actions/Vehicle_Img.action";
import * as Insurance_Img_Action from "../../../actions/Insurance_Img.action";
import * as Finanial_Img_Action from "../../../actions/Financial_Img.action";
import * as Vehile_step_all from "../../../actions/Vehicle_step_all.action";
import Api from "../../../services/httpClient";
import moment from "moment";
const { TabPane } = Tabs;

const Detail = (props) => {
  let getUsername = localStorage.getItem("userProfile");
  let UserProfile = JSON.parse(getUsername);
  const dispatch = useDispatch();
  let history = useHistory();
  let { id } = useParams();
  const formRef = createRef();
  const [stateDataByIdVehicle, setStateDataByIdVehicle] = useState({});
  const [stateDataByIdFinance, setStateDataByIdFinance] = useState({});
  const [stateDataByIdInsurance, setStateDataByIdInsurance] = useState({});
  const [stateDataByIdDriver, setStateDataByIdDriver] = useState({});
  const [isNew, setIsnew] = useState(false);
  const [base64_car, setBase64_car] = useState(null);
  const [base64_buy, setBase64_buy] = useState(null);
  const [base64_sale, setBase64_sale] = useState(null);
  const [base64_license_plate, setBase64_license_plate] = useState(null);
  const [stateResultNonVat_Buy, setStateResulNontVat_Buy] = useState();
  const [stateResultresultVat7_Buy, setstateResultResultVat7_Buy] = useState();
  const [stateResultNonVat_Sale, setStateResulNontVat_Sale] = useState();
  const [
    stateResultresultVat7_Sale,
    setstateResultResultVat7_Sale,
  ] = useState();

  let name = "ข้อมูลรถ";
  let pathUrl = `/car/carInfomation`;

  const navigation = [
    { key: 1, title: "หน้าแรก", link: "/dashboard" },
    { key: 2, title: name, link: "" },
  ];
  useEffect(() => {
    dispatch(Vehile_step_all.fetchVehicle());
    const {
      match: { params },
    } = props;

    if (params.id === "new") {
      setIsnew(true);
      navigation.push({ key: 4, title: "New", link: "" });
    } else {
      fetchById(params.id);
      dispatch(Finanial_Img_Action.fetchImg_Financial_vehicle(params.id));
      dispatch(Vehicle_Img_Action.fetchImg(params.id));
      dispatch(Insurance_Img_Action.fetchImg_Insurance_vehicle(params.id));
      navigation.push({ key: 4, title: "Edit", link: "" });
    }
  }, []);
  const Vehicle_step_all_option = useSelector(
    ({ Vehicle_step_all_option }) => Vehicle_step_all_option,
  );
  const fetchById = async (id) => {
    try {
      let res = await Api.get(`api/v1/vehicle/${id}`);
      setStateDataByIdVehicle(res.data.result.vehicle);
      setStateDataByIdFinance(res.data.result.financial);
      setStateDataByIdInsurance(res.data.result.insurance_page);
      setStateDataByIdDriver(res.data.result.driver);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = () => {
    formRef.current.validateFields().then((values) => {
      let data = {
        ...values,
        purchase_price: stateResultNonVat_Buy,
        purchase_vat: stateResultresultVat7_Buy,
        sale_price: stateResultNonVat_Sale,
        sale_vat: stateResultresultVat7_Sale,
        id: id,
        is_active:
          values.is_active === undefined || values.is_active === true ? 1 : 0,
        sale_date:
          values.sale_date === undefined || values.sale_date === null
            ? ""
            : moment(values.sale_date).format("YYYY-MM-DD"),
        owner_date:
          values.owner_date === undefined
            ? undefined
            : moment(values.owner_date).format("YYYY-MM-DD"),
        purchase_date:
          values.purchase_date === undefined
            ? undefined
            : moment(values.purchase_date).format("YYYY-MM-DD"),
        comment: values.comment === undefined ? null : values.comment,

        path_file:
          base64_car != null ||
          base64_license_plate != null ||
          base64_buy != null ||
          base64_sale != null
            ? [].concat(
                base64_car,
                base64_license_plate,
                base64_buy,
                base64_sale,
              )
            : null,
        update_by: UserProfile.name,
      };

      update(data);
    });
  };

  const update = (data) => {
    Api.post(`api/v1/vehicle/update`, data)
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
  return Object.keys(Vehicle_step_all_option.result).length > 0 ? (
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
          <TabPane tab="ข้อมูลรถทั่วไป" key="1">
            <DetailVehicle
              submit={onSubmit}
              formRef={formRef}
              dataId={stateDataByIdVehicle}
              isNew={isNew}
              setBase64_car={setBase64_car}
              setBase64_buy={setBase64_buy}
              setBase64_sale={setBase64_sale}
              setBase64_license_plate={setBase64_license_plate}
              setStateResulNontVat_Buy={setStateResulNontVat_Buy}
              setstateResultResultVat7_Buy={setstateResultResultVat7_Buy}
              setStateResulNontVat_Sale={setStateResulNontVat_Sale}
              setstateResultResultVat7_Sale={setstateResultResultVat7_Sale}
            />
          </TabPane>
          <TabPane tab="ข้อมูลทางการเงิน" key="2">
            <DetailFinance dataId={stateDataByIdFinance} isNew={isNew} />
          </TabPane>
          <TabPane tab="ข้อมูลประกัน พรบ. ภาษี" key="3">
            <DetailInsurnace dataId={stateDataByIdInsurance} isNew={isNew} />
          </TabPane>
          <TabPane tab="พนักงานขับรถ" key="4">
            <DetailDriver dataId={stateDataByIdDriver} isNew={isNew} />
          </TabPane>
        </Tabs>
      </div>
    </React.Fragment>
  ) : (
    ""
  );
};

export default Detail;

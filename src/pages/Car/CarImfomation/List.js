import React, { useState, useRef, useEffect, createRef } from "react";
import moment from "moment";
import {
  Table,
  Button,
  Modal,
  Breadcrumb,
  Tabs,
  Badge,
  Card,
  Form,
  Row,
  Col,
} from "antd";

import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import Api from "../../../services/httpClient";
import { notificationWithIcon } from "../../../components/Notification";
import NavigationWrapper from "../../../components/Layout/NavigationWrapper";
import DetailFormFilter from "./DetailFormFilter";
import { useSelector, useDispatch } from "react-redux";
import * as Vehile_step_all from "../../../actions/Vehicle_step_all.action";
import TableExport from "tableexport";
import numeral from "numeral";

const { TabPane } = Tabs;
const { confirm } = Modal;

const List = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const formRef = createRef();
  let name = "ข้อมูลรถ";
  let pathUrl = `/car/carInfomation`;
  const navigation = [
    { key: 1, title: "หน้าแรก", link: "/dashboard" },
    { key: 2, title: name, link: "" },
  ];
  const [stateFilter, setStateFilter] = useState({});
  const [showFilter, setShowFilter] = useState(true);
  const [dataTable, setDataTable] = useState();
  const [loading, setLoading] = useState(false);
  const [paginations, setPaginations] = useState({
    limit: 10,
    page: 1,
  });
  const [renderExcel, setRenderExcel] = useState();

  useEffect(() => {
    dispatch(Vehile_step_all.fetchVehicle());
    fetch();
  }, []);

  const columns = [
    {
      title: "รหัสรถ",
      dataIndex: "vehicle_id",
      width: 220,
      key: "vehicle_id",
      sorter: (a, b) => a.vehicle_id.length - b.vehicle_id.length,
      render: (text, row) => (
        <div>
          <Link to={`/car/carInfomation/${row.id}`}>{text}</Link>
        </div>
      ),
    },
    {
      title: "เลขที่สัญญา",
      dataIndex: "financial_id",
      width: 230,
      key: "financial_id",
      sorter: (a, b) => a.financial_id.length - b.financial_id.length,
    },
    {
      title: "สถานะการทำงาน",
      dataIndex: "status",
      key: "status",
      width: 300,
      sorter: (a, b) => a.status.length - b.status.length,
      render: (text, row) => {
        return (
          <React.Fragment>
            {row.status === "active" ? (
              <Badge status="processing" color="#87d068" text={"ใช้งาน"} />
            ) : row.status === "inactive" ? (
              <Badge status="processing" color="#f50" text={"ไม่ใช่งาน"} />
            ) : (
              <Badge status="processing" color="#ffd700" text={"ขายแล้ว"} />
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: "ผู้ครอบครองรถ",
      dataIndex: "owner_vehicle",
      width: 250,
      key: "owner_vehicle",
      sorter: (a, b) => a.owner_vehicle.length - b.owner_vehicle.length,
    },
    {
      title: "ผู้ถือกรรมสิทธิ์",
      width: 330,
      dataIndex: "owner_ship",
      key: "owner_ship",
      sorter: (a, b) => a.owner_ship.length - b.owner_ship.length,
    },
    {
      title: "ประเภทรถ",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
      width: 180,
      sorter: (a, b) => a.vehicle_type.length - b.vehicle_type.length,
      render: (text, row) => text.name,
    },

    {
      title: "ยี่ห้อรถ",
      dataIndex: "vehicle_brand",
      key: "vehicle_brand",
      width: 200,
      sorter: (a, b) => a.vehicle_brand.length - b.vehicle_brand.length,
      render: (text, row) => text.name,
    },
    {
      title: "รุ่น",
      dataIndex: "vehicle_model",
      key: "vehicle_model",
      width: 220,
      sorter: (a, b) => a.vehicle_model.length - b.vehicle_model.length,
      render: (text, row) => text.name,
    },
    {
      title: "รุ่นปี",
      dataIndex: "vehicle_model_year",
      width: 320,
      key: "vehicle_model_year",
      sorter: (a, b) => a.vehicle_model_year - b.vehicle_model_year,
      render: (text) => text.name,
    },
    {
      title: "สี",
      dataIndex: "vehicle_color",
      width: 230,
      key: "vehicle_color",
      sorter: (a, b) => a.vehicle_color.length - b.vehicle_color.length,
      render: (text) => text.name,
    },
    {
      title: "ทะเบียนรถ",
      dataIndex: "license_page",
      width: 260,
      key: "license_page",
      sorter: (a, b) => a.license_page.length - b.license_page.length,
    },
    {
      title: "เลขตัวถังรถ",
      dataIndex: "tank_numbers",
      key: "tank_numbers",
      className: "tableexport-string",
      width: 260,
      sorter: (a, b) => a.tank_numbers.length - b.tank_numbers.length,
    },
    {
      title: "เลขเครื่องยนต์",
      dataIndex: "engine_number",
      key: "engine_number",
      className: "tableexport-string",
      width: 200,
      sorter: (a, b) => a.engine_number.length - b.engine_number.length,
    },
    {
      title: "รหัสกุญแจ",
      dataIndex: "key_code",
      key: "key_code",
      width: 200,
      sorter: (a, b) => a.key_code.length - b.key_code.length,
    },
    {
      title: "สังกัดงาน",
      dataIndex: "owner_branch",
      width: 230,
      key: "owner_branch",
      sorter: (a, b) => a.owner_branch.length - b.owner_branch.length,
      render: (text) => text.name,
    },
    {
      title: "รหัสทะเบียนทรัพย์สิน (ทางบัญชี)",
      dataIndex: "asset_register_code",
      width: 500,
      key: "asset_register_code",
      sorter: (a, b) =>
        a.asset_register_code.length - b.asset_register_code.length,
    },
    {
      title: "วันที่ครอบครอง",
      dataIndex: "owner_date",
      key: "owner_date",
      width: 280,
      sorter: (a, b) => a.owner_date.length - b.owner_date.length,
      render: (text, row) => <div>{moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "วันที่ซื้อ/วันที่รับรถ",
      dataIndex: "purchase_date",
      key: "purchase_date",
      width: 300,
      sorter: (a, b) => a.purchase_date.length - b.purchase_date.length,
      render: (text) => <div>{moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "ราคาที่ซื้อ (ไม่รวมvat)",
      dataIndex: "purchase_price",
      width: 320,
      key: "purchase_price",
      sorter: (a, b) => a.purchase_price - b.purchase_price,
      render: (text) => numeral(text).format("0,0.00"),
    },
    {
      title: "Vat 7%",
      dataIndex: "purchase_vat",
      width: 160,
      key: "purchase_vat",
      className: "purchase_vat-string",
      sorter: (a, b) => a.purchase_vat - b.purchase_vat,
      render: (text) => numeral(text).format("0,0.00"),
    },
    {
      title: "ราคาที่ซื้อ (รวมvat)",
      dataIndex: "purchase_price_vat",
      width: 320,
      key: "purchase_price_vat",
      sorter: (a, b) => a.purchase_price_vat - b.purchase_price_vat,
      render: (text) => numeral(text).format("0,0.00"),
    },
    {
      title: "ผู้ขายรถ",
      dataIndex: "vehicle_seller",
      width: 320,
      key: "vehicle_seller",
      sorter: (a, b) => a.vehicle_seller - b.vehicle_seller,
      render: (text) => text,
    },
    {
      title: "วันที่ขาย",
      dataIndex: "sale_date",
      key: "sale_date",
      width: 200,
      sorter: (a, b) => a.sale_date.length - b.sale_date.length,
      render: (text, row) => {
        return (
          <React.Fragment>
            {row.sale_date === null ? (
              ""
            ) : (
              <div>{moment(text).format("DD-MM-YYYY")}</div>
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: "ราคาที่ขาย(ไม่รวมVat)",
      dataIndex: "sale_price",
      width: 320,
      key: "sale_price",
      sorter: (a, b) => a.sale_price - b.sale_price,
      render: (text) => numeral(text).format("0,0.00"),
    },
    {
      title: "Vat 7%",
      dataIndex: "sale_vat",
      width: 320,
      key: "sale_vat",
      sorter: (a, b) => a.sale_vat - b.sale_vat,
      render: (text) => numeral(text).format("0,0.00"),
    },
    {
      title: "ราคาที่ขาย(รวมvat)",
      dataIndex: "sale_price_vat",
      width: 320,
      key: "sale_price_vat",
      sorter: (a, b) => a.sale_price_vat - b.sale_price_vat,
      render: (text) => numeral(text).format("0,0.00"),
    },
    {
      title: "ผู้ซื้อรถ",
      dataIndex: "vehicle_buyer",
      width: 320,
      key: "vehicle_buyer",
      sorter: (a, b) => a.vehicle_buyer.length - b.vehicle_buyer.length,
      render: (text) => text,
    },
    {
      title: "สถานะ",
      dataIndex: "is_active",
      key: "is_active",
      width: 250,
      sorter: (a, b) => a.is_active - b.is_active,
      render: (row) => {
        return (
          <React.Fragment>
            {row === 1 ? (
              <Badge status="processing" color="#87d068" text={"Active"} />
            ) : (
              <Badge status="processing" color="#f50" text={"Inavtive"} />
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (text, row) => (
        <div>
          <Link to={`${pathUrl}/${row.id}`}>
            <EditTwoTone style={{ fontSize: "16px" }} />
          </Link>

          <span
            style={{
              paddingLeft: 14,
              marginRight: 12,
              cursor: "pointer",
            }}
          >
            <DeleteTwoTone
              onClick={() => handleDelete(row.id)}
              style={{ fontSize: "16px" }}
            />
          </span>
        </div>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    let dd = {
      limit: pagination.pageSize,
      page: pagination.current,
      total: pagination.total,
      ...stateFilter,
    };

    fetch(dd);
  };

  const fetch = (value) => {
    let convertPage = {
      limit: paginations.pageSize,
      page: paginations.current != 1 ? 1 : paginations.current,
    };

    let params = { ...convertPage, ...value };
    setLoading(true);
    Api.get(`api/v1/vehicle`, {
      params: {
        ...params,
      },
    })
      .then((respone) => {
        const pagination = {
          current: respone.data.result.current_page,
          pageSize: parseInt(respone.data.result.per_page),
          total: respone.data.result.total,
        };

        setPaginations(pagination);

        setDataTable(respone.data.result.data);
        setLoading(false);
        exportExcel();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchFilter = () => {
    formRef.current
      .validateFields()
      .then((values) => {
        console.log(values);
        let data = {
          ...values,
          owner_date:
            values.owner_date === undefined
              ? ""
              : moment(values.finish_date_work).format("YYYY-MM-DD"),
          purchase_date:
            values.purchase_date === undefined
              ? ""
              : moment(values.purchase_date).format("YYYY-MM-DD"),
          sale_date:
            values.sale_date === undefined
              ? ""
              : moment(values.sale_date).format("YYYY-MM-DD"),
        };
        setStateFilter(data);
        fetch(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetFilter = () => {
    formRef.current.resetFields();
    setStateFilter({});
    let dd = {
      limit: 10,
      page: 1,
    };
    fetch(dd);
  };

  const exportExcel = () => {
    const DetailExcel = {
      headers: true, // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
      footers: true, // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
      formats: ["xlsx"], // (String[]), filetype(s) for the export, (default: ['xls', 'csv', 'txt'])
      filename: new Date(), // (id, String), filename for the downloaded file, (default: 'id')
      exportButtons: true, // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
      position: "top", // (top, bottom), position of the caption element relative to table, (default: 'bottom')
      ignoreRows: null, // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
      ignoreCols: null, // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
      trimWhitespace: true, // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
    };
    if (!renderExcel) {
      TableExport.prototype.formatConfig.xlsx = {
        defaultClass: "xlsx",
        buttonContent: "Excel",
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        fileExtension: ".xlsx",
      };

      let setExcel;
      setExcel = TableExport(
        document.getElementsByClassName("tableexcel"),
        DetailExcel,
      );
      setRenderExcel(setExcel);
    } else {
      renderExcel.update(DetailExcel);
    }
  };

  const handleDelete = (value) => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        Isdelete(value);
      },
      onCancel() {},
    });
  };

  const Isdelete = (id) => {
    Api.delete(`api/v1/vehicle/${id}`)
      .then((respone) => {
        if (respone.status === 200) {
          notificationWithIcon("success", "Delete sussces.");
          fetch();
        } else {
          notificationWithIcon("warning", "Delete fail.");
        }
      })
      .catch((err) => {
        console.error(err);
        notificationWithIcon("warning", "Delete fail.");
      });
  };

  const Vehicle_step_all_option = useSelector(
    ({ Vehicle_step_all_option }) => Vehicle_step_all_option,
  );

  return (
    <React.Fragment>
      <div>
        <NavigationWrapper>
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
          <div className="d-none d-md-block"></div>
        </NavigationWrapper>
      </div>
      <div className="card card-body" style={{ margin: "20px", paddingTop: 0 }}>
        <Tabs>
          <TabPane tab={name} key={name}>
            <div>
              {Object.keys(Vehicle_step_all_option.result).length > 0
                ? showFilter && (
                    <Card>
                      <Form className="ant-advanced-search-form">
                        <Row>
                          <Col span={24}>
                            <DetailFormFilter formRef={formRef} />
                            <Col>
                              <Button
                                type="primary"
                                onClick={searchFilter}
                                icon={<SearchOutlined />}
                              >
                                ค้นหา
                              </Button>
                              <Button
                                style={{ marginLeft: 8 }}
                                onClick={resetFilter}
                                icon={<SyncOutlined spin />}
                              >
                                เริ่มใหม่
                              </Button>
                            </Col>
                          </Col>
                        </Row>
                      </Form>
                    </Card>
                  )
                : ""}
            </div>

            <div style={{ paddingTop: "15px" }}>
              <div style={{ float: "right" }}>
                <Button
                  type="primary"
                  size={"large'"}
                  style={{ marginRight: "5px" }}
                  icon={<PlusOutlined />}
                  onClick={() => {
                    history.push(`${pathUrl}-create`);
                  }}
                >
                  เพิ่ม
                </Button>
                {/* <Button
                  size={"large'"}
                  style={{ marginRight: "5px" }}
                  icon={<FunnelPlotOutlined />}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  ตัวกรอง
                </Button> */}
              </div>

              <Table
                columns={columns}
                dataSource={dataTable}
                loading={loading}
                pagination={paginations}
                scroll={{ x: 5000 }}
                onChange={handleTableChange}
                className={"tableexcel"}
                rowKey={(record) => record}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default List;

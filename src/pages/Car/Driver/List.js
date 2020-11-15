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
  FunnelPlotOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import Api from "../../../services/httpClient";
import { notificationWithIcon } from "../../../components/Notification";
import NavigationWrapper from "../../../components/Layout/NavigationWrapper";
import DetailFormFilter from "./DetailFormFilter";

import TableExport from "tableexport";

const { TabPane } = Tabs;

const { confirm } = Modal;

const List = () => {
  let history = useHistory();
  const formRef = createRef();
  let name = "พนักงานขับรถ";
  let pathUrl = `/car/driver`;
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
  const [companyValue, setCompanyValue] = useState([]);

  useEffect(() => {
    fetch();
    fetchCompany();
  }, []);

  const columns = [
    {
      title: "รหัสคนขับ",
      dataIndex: "driver_id",
      width: 180,
      key: "driver_id",
      sorter: (a, b) => a.driver_id.length - b.driver_id.length,
      render: (text, row) => (
        <div>
          <Link to={`/car/driver/${row.id}`}>{text}</Link>
        </div>
      ),
    },
    {
      title: "สถานะคนขับรถ",
      dataIndex: "type",
      key: "type",
      width: 250,
      sorter: (a, b) => a.type.length - b.type.length,
      render: (text, row) => {
        return (
          <React.Fragment>
            {row.type === "active" ? (
              <Badge status="processing" color="#87d068" text={"ทำงานอยู่"} />
            ) : (
              <Badge status="processing" color="#f50" text={"ลาออกแล้ว"} />
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: "คำนำหน้า",
      dataIndex: "title_name",
      width: 150,
      key: "title_name",
      sorter: (a, b) => a.title_name.length - b.title_name.length,
    },
    {
      title: "ชื่อ-นามสกุล",
      width: 350,
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "ชื่อเล่น",
      dataIndex: "nickname",
      key: "nickname",
      width: 200,
      sorter: (a, b) => a.nickname.length - b.nickname.length,
    },

    {
      title: "เบอร์โทร",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 200,
      sorter: (a, b) => a.phone_number.length - b.phone_number.length,
    },
    {
      title: "วัน/เดือน/ปี เกิด",
      dataIndex: "birthday",
      key: "birthday",
      width: 260,
      sorter: (a, b) => a.birthday.length - b.birthday.length,
      render: (text, row) => <div>{moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "เลขบัตรประจำตัวประชาชน",
      dataIndex: "identity_card_number",
      width: 320,
      key: "identity_card_number",
      className: "tableexport-string",
      sorter: (a, b) => a.identity_card_number - b.identity_card_number,
      render: (text) => text,
    },
    {
      title: "สังกัด",
      dataIndex: "company",
      width: 230,
      key: "company",
      sorter: (a, b) => a.company.length - b.company.length,
      render: (text) => text.name,
    },
    {
      title: "วันที่เริ่มงานวันแรก",
      dataIndex: "start_date_work",
      width: 280,
      key: "start_date_work",
      sorter: (a, b) => a.start_date_work.length - b.start_date_work.length,
      render: (text, row) => <div>{moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "วันที่ทำงานวันสุดท้าย",
      dataIndex: "finish_date_work",
      key: "finish_date_work",
      width: 280,
      sorter: (a, b) => a.finish_date_work.length - b.finish_date_work.length,
      render: (text, row) => {
        return (
          <React.Fragment>
            {row.finish_date_work === null ? (
              ""
            ) : (
              <div>{moment(text).format("DD-MM-YYYY")}</div>
            )}
          </React.Fragment>
        );
      },

      // <div>{moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "วันที่สร้าง",
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      sorter: (a, b) => a.created_at.length - b.created_at.length,
      render: (text, row) => <div>{moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "วันที่แก้ไข",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 200,
      sorter: (a, b) => a.updated_at.length - b.updated_at.length,
      render: (text, row) => <div>{moment(text).format("DD-MM-YYYY")}</div>,
    },

    {
      title: "สถานะ",
      dataIndex: "is_active",
      key: "is_active",
      width: 250,
      sorter: (a, b) => a.is_active - b.is_active,
      render: (text, row) => {
        return (
          <React.Fragment>
            {row.is_active === 1 ? (
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
  const fetchCompany = async () => {
    try {
      let res = await Api.get(`api/v1/company`);
      setCompanyValue(res.data.result);
    } catch (error) {}
  };

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
    Api.get(`api/v1/driver`, {
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
        let data = {
          ...values,
          finish_date_work:
            values.finish_date_work === undefined
              ? ""
              : moment(values.finish_date_work).format("YYYY-MM-DD"),
          birthday:
            values.birthday === undefined
              ? ""
              : moment(values.birthday).format("YYYY-MM-DD"),
          start_date_work:
            values.start_date_work === undefined
              ? ""
              : moment(values.start_date_work).format("YYYY-MM-DD"),
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
    Api.delete(`api/v1/driver/${id}`)
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
              {showFilter && (
                <Card>
                  <Form className="ant-advanced-search-form">
                    <Row>
                      <Col span={24}>
                        <DetailFormFilter
                          formRef={formRef}
                          companyValue={companyValue}
                        />
                        <Col style={{ marginTop: "10px" }}>
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
              )}
            </div>

            <div style={{ paddingTop: "15px" }}>
              <div style={{ float: "right" }}>
                <Button
                  type="primary"
                  size={"large'"}
                  style={{ marginRight: "5px" }}
                  icon={<PlusOutlined />}
                  onClick={() => {
                    history.push(`${pathUrl}/new`);
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
                scroll={{ x: 2500 }}
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

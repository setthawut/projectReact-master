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
import React, { useState, useEffect, createRef } from "react";
import { useHistory } from "react-router-dom";
import NavigationWrapper from "../../../components/Layout/NavigationWrapper";
import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { notificationWithIcon } from "../../../components/Notification";
import { Link } from "react-router-dom";
import Api from "../../../services/httpClient";
import DetailFormFilter from "./DetailFormFilter";
import TableExport from "tableexport";

const { TabPane } = Tabs;
const { confirm } = Modal;

const List = () => {
  let history = useHistory();
  const formRef = createRef();
  const [paginations, setPaginations] = useState({
    limit: 10,
    page: 1,
  });
  const [stateFilter, setStateFilter] = useState({});
  const [renderExcel, setRenderExcel] = useState();
  const [dataTable, setDataTable] = useState();
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(true);

  let name = "ผู้ใช้ระบบ";
  let pathUrl = `/master/user`;

  useEffect(() => {
    fetch();
  }, []);
  const navigation = [
    { key: 1, title: "หน้าแรก", link: "/dashboard" },
    { key: 2, title: name, link: "" },
  ];
  const columns = [
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      width: "25%",
      render: (text, row) => (
        <div>
          <Link to={`/master/user/${row.id}`}>{text}</Link>
        </div>
      ),
    },

    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      width: "25%",
    },

    {
      title: "สิทธิ์",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.length - b.role.length,
      width: "25%",
    },

    {
      title: "สถานะ",
      dataIndex: "is_active",
      key: "is_active",
      width: "15%",
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
    Api.get(`api/v1/admin`, {
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
  const resetFilter = () => {
    formRef.current.resetFields();
    setStateFilter({});
    let dd = {
      limit: 10,
      page: 1,
    };
    fetch(dd);
  };
  const searchFilter = () => {
    setLoading(true);
    formRef.current
      .validateFields()
      .then(async (values) => {
        try {
          setStateFilter(values);
          fetch(values);
        } catch (err) {
          console.log("err=>", err);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
    Api.delete(`api/v1/admin/${id}`)
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

  return (
    <React.Fragment>
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
      </NavigationWrapper>
      <div className="card card-body" style={{ margin: "20px", paddingTop: 0 }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={name} key="1">
            <div>
              {showFilter && (
                <Card>
                  <Form className="ant-advanced-search-form">
                    <Row>
                      <Col span={24}>
                        <DetailFormFilter formRef={formRef} />
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
                onChange={handleTableChange}
                loading={loading}
                Pagination={paginations}
                // scroll={{ x: 1300 }}
                className={"tableexcel"}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default List;

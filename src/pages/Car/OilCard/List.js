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
  SearchOutlined,
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  FunnelPlotOutlined,
  PlusOutlined,
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
  let name = "บัตรน้ำมัน";
  let pathUrl = `/car/oilcard`;
  const navigation = [
    { key: 1, title: "หน้าแรก", link: "/dashboard" },
    { key: 2, title: name, link: "" },
  ];
  const [stateFilter, setStateFilter] = useState({});
  const [showFilter, setShowFilter] = useState(true);
  const [dataTable, setDataTable] = useState();
  const [cardTypeValue, setCardTypeValue] = useState([]);
  const [bankTypeValue, setBankTypeValue] = useState([]);
  const [companyValue, setCompanyValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginations, setPaginations] = useState({
    limit: 10,
    page: 1,
  });
  const [renderExcel, setRenderExcel] = useState();

  useEffect(() => {
    fetch();
    fetchCardType();
    fetchBankType();
    fetchCompany();
  }, []);

  const columns = [
    {
      title: "เลขที่บัตร",
      dataIndex: "card_number",
      width: 150,
      key: "card_number",
      sorter: (a, b) => a.card_number.length - b.card_number.length,
      render: (text, row) => (
        <div>
          <Link to={`/car/oilcard/${row.id}`}>{text}</Link>
        </div>
      ),
    },
    {
      title: "สถานะบัตร",
      dataIndex: "type",
      width: 150,
      key: "type",
      sorter: (a, b) => a.type.length - b.type.length,
      render: (text, row) => {
        return (
          <React.Fragment>
            {row.type === "active" ? (
              <Badge status="processing" color="#87d068" text={"ใช้งาน"} />
            ) : (
              <Badge status="processing" color="#f50" text={"ไม่ใช่งาน"} />
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: "ธนาคารผู้ออกบัตร",
      width: 150,
      dataIndex: "bank_type",
      key: "bank_type",
      sorter: (a, b) => a.bank_type.length - b.bank_type.length,
      render: (text, row) => text.name,
    },
    {
      title: "ประเภทบัตร",
      width: 150,
      dataIndex: "card_type",
      key: "card_type",
      sorter: (a, b) => a.card_type.length - b.card_type.length,
      render: (text, row) => text.name,
    },

    {
      title: "บริษัท",
      dataIndex: "company",
      key: "company",
      width: 130,
      sorter: (a, b) => a.company.length - b.company.length,
      render: (text, row) => text.name,
    },
    {
      title: "รหัสประจำบัตร",
      dataIndex: "identification_card",
      key: "identification_card",
      width: 130,
      sorter: (a, b) =>
        a.identification_card.length - b.identification_card.length,
    },
    {
      title: "เลขหลังบัตร",
      dataIndex: "card_last_number",
      width: 130,
      key: "card_last_number",
      sorter: (a, b) => a.card_last_number.length - b.card_last_number.length,
    },
    {
      title: "วงเงินในบัตร",
      dataIndex: "card_limit",
      width: 130,
      key: "card_limit",
      sorter: (a, b) => a.card_limit.length - b.card_limit.length,
    },
    {
      title: "บัตรหมดอายุ",
      dataIndex: "expired_card",
      width: 130,
      key: "expired_card",
      sorter: (a, b) => a.expired_card.length - b.expired_card.length,
      render: (text, row) => <div>{moment(text, "MM/YY").format("MM/YY")}</div>,
    },

    {
      title: "ผู้สร้าง",
      dataIndex: "create_by",
      key: "create_by",
      width: 130,
      sorter: (a, b) => a.create_by.length - b.create_by.length,
    },

    {
      title: "วันที่สร้าง",
      dataIndex: "created_at",
      key: "created_at",
      width: 130,
      sorter: (a, b) => a.created_at.length - b.created_at.length,
      render: (text, row) => <div>{moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "ผู้แก้ไข",
      dataIndex: "update_by",
      key: "update_by",
      width: 130,
      sorter: (a, b) => a.update_by.length - b.update_by.length,
    },
    {
      title: "วันที่แก้ไข",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 130,
      sorter: (a, b) => a.updated_at.length - b.updated_at.length,
      render: (text, row) => <div>{moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "สถานะ",
      dataIndex: "is_active",
      width: 150,
      key: "is_active",
      sorter: (a, b) => a.is_active - b.is_active,
      render: (row) => {
        return (
          <React.Fragment>
            {row === 1 ? (
              <Badge status="processing" color="#87d068" text={"Active"} />
            ) : (
              <Badge status="processing" color="#f50" text={"Inactive"} />
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
    Api.get(`api/v1/oil-card`, {
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
          expired_card:
            values.expired_card === undefined
              ? ""
              : moment(values.expired_card).format("MM/YY"),
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
                          cardTypeValue={cardTypeValue}
                          companyValue={companyValue}
                          bankTypeValue={bankTypeValue}
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
                scroll={{ x: 3000 }}
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

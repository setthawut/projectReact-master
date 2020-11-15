import React, { useState, useRef, useEffect, createRef } from "react";
import moment from "moment";
import {
  Table,
  Input,
  Button,
  Modal,
  Breadcrumb,
  Tooltip,
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
import TableExport from "tableexport";
import numeral from "numeral";
const { TabPane } = Tabs;

const { confirm } = Modal;

const List = () => {
  let history = useHistory();
  const formRef = createRef();
  let name = "ข้อมูลทางการเงิน";
  let pathUrl = `/car/clash`;
  const navigation = [
    { key: 1, title: "หน้าแรก", link: "/dashboard" },
    { key: 2, title: name, link: "" },
  ];
  const [stateFilter, setStateFilter] = useState({});
  const [showFilter, setShowFilter] = useState(true);
  const [dataTable, setDataTable] = useState();
  const [purchasingValue, setPurchasingValue] = useState([]);
  const [financialValue, setFinancialValue] = useState([]);
  const [paymentValue, setPaymentValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginations, setPaginations] = useState({
    limit: 10,
    page: 1,
  });
  const [renderExcel, setRenderExcel] = useState();

  useEffect(() => {
    fetch();
    fetchPurchasing();
    fetchfinancial();
    fetchPayment();
  }, []);

  const columns = [
    {
      title: "รหัสเอกสาร",
      dataIndex: "financial_id",
      width: 150,
      key: "financial_id",
      sorter: (a, b) => a.financial_id.length - b.financial_id.length,
      render: (text, row) => (
        <div>
          <Link to={`/car/clash/${row.id}`}>{text}</Link>
        </div>
      ),
    },
    {
      title: "รูปแบบการจัดซื้อ",
      dataIndex: "purchasing_pattern",
      width: 200,
      key: "purchasing_pattern",
      sorter: (a, b) =>
        a.purchasing_pattern.length - b.purchasing_pattern.length,
      render: (text, row) => text.name,
    },
    {
      title: "บริษัทที่ให้บริการทางการเงิน",
      width: 270,
      dataIndex: "financial_service_company",
      key: "financial_service_company",
      sorter: (a, b) =>
        a.financial_service_company.length - b.financial_service_company.length,
      render: (text, row) => text.name,
    },
    {
      title: "เลขสัญญา",
      dataIndex: "contract_number",
      key: "contract_number",
      className: "tableexport-string",
      width: 150,
      sorter: (a, b) => a.contract_number.length - b.contract_number.length,
    },

    {
      title: "ยอดดาวน์",
      dataIndex: "down_payment",
      key: "down_payment",
      width: 150,
      sorter: (a, b) => a.down_payment.length - b.down_payment.length,
      render: (text) => numeral(text).format("0,0.00"),
    },
    {
      title: "ยอดจัดไฟแนนซ์",
      dataIndex: "top_finance",
      key: "top_finance",
      width: 180,
      sorter: (a, b) => a.top_finance.length - b.top_finance.length,
      render: (text) => numeral(text).format("0,0.00"),
    },
    {
      title: "อัตราดอกเบี้ย(Flat Rate)",
      dataIndex: "flat_rate",
      width: 230,
      key: "flat_rate",
      sorter: (a, b) => a.flat_rate.length - b.flat_rate.length,
      render: (text, row) => {
        return (
          <React.Fragment>
            {row.flat_rate === "" ? "" : `${text}%`}
          </React.Fragment>
        );
      },
    },
    {
      title: "จำนวนงวด",
      dataIndex: "number_installment",
      width: 150,
      key: "number_installment",
      sorter: (a, b) =>
        a.number_installment.length - b.number_installment.length,
    },
    {
      title: "งวดแรกวันที่",
      dataIndex: "first_installment_date",
      width: 150,
      key: "first_installment_date",
      sorter: (a, b) =>
        a.first_installment_date.length - b.first_installment_date.length,
      render: (text) => <div>{moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "งวดสุดท้ายวันที่",
      dataIndex: "last_installment_date",
      key: "last_installment_date",
      width: 170,
      sorter: (a, b) =>
        a.last_installment_date.length - b.last_installment_date.length,
      render: (text) => <div>{moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "วันที่ต้องชำระค่างวดของแต่ละเดือน",
      dataIndex: "monthly_installment_date",
      key: "monthly_installment_date",
      width: 310,
      sorter: (a, b) =>
        a.monthly_installment_date.length - b.monthly_installment_date.length,
    },
    {
      title: "ช่องทางการชำระค่างวด",
      dataIndex: "payment_channel",
      key: "payment_channel",
      width: 220,
      sorter: (a, b) => a.payment_channel.length - b.payment_channel.length,
      render: (text, row) => text.name,
    },

    {
      title: "ค่างวด",
      dataIndex: "installment",
      key: "installment",
      width: 200,
      sorter: (a, b) => a.installment.length - b.installment.length,
      render: (text) => numeral(text).format("0,0.00"),
    },
    {
      title: "ผู้สร้าง",
      dataIndex: "create_by",
      key: "create_by",
      width: 200,
      sorter: (a, b) => a.create_by.length - b.create_by.length,
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
      title: "ผู้แก้ไข",
      dataIndex: "update_by",
      key: "update_by",
      width: 200,
      sorter: (a, b) => a.update_by.length - b.update_by.length,
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
      width: 200,
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
    Api.get(`api/v1/financial`, {
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
          first_installment_date:
            values.first_installment_date === undefined
              ? ""
              : moment(values.first_installment_date).format("YYYY-MM-DD"),
          last_installment_date:
            values.last_installment_date === undefined
              ? ""
              : moment(values.last_installment_date).format("YYYY-MM-DD"),
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
    Api.delete(`api/v1/financial/${id}`)
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
                          purchasingValue={purchasingValue}
                          financialValue={financialValue}
                          paymentValue={paymentValue}
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
                scroll={{ x: 3500 }}
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

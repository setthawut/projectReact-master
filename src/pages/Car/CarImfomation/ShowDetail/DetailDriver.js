import React, { useState, useRef, useEffect, createRef } from "react";
import moment from "moment";
import { Table, Modal, Breadcrumb, Tabs, Badge } from "antd";

import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import Api from "../../../../services/httpClient";
import { notificationWithIcon } from "../../../../components/Notification";
import NavigationWrapper from "../../../../components/Layout/NavigationWrapper";

const { TabPane } = Tabs;

const { confirm } = Modal;

const List = (props) => {
  const { isNew, dataId } = props;
  let name = "Driver";
  let pathUrl = `/car/driver`;
  const navigation = [
    { key: 1, title: "Dashboard", link: "/dashboard" },
    { key: 2, title: "Car", link: "" },
    { key: 3, title: name, link: "" },
  ];
  const [stateFilter, setStateFilter] = useState({});
  const [dataTable, setDataTable] = useState();
  const [loading, setLoading] = useState(false);
  const [paginations, setPaginations] = useState({
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    fetch();
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
      width: 280,
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
      width: 200,
      key: "company",
      sorter: (a, b) => a.company.length - b.company.length,
      render: (text) => text.name,
    },
    {
      title: "วันที่เริ่มงานวันแรก",
      dataIndex: "start_date_work",
      width: 300,
      key: "start_date_work",
      sorter: (a, b) => a.start_date_work.length - b.start_date_work.length,
      render: (text, row) => <div>{moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "วันที่ทำงานวันสุดท้าย",
      dataIndex: "finish_date_work",
      key: "finish_date_work",
      width: 300,
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
          <span
            style={{
              paddingLeft: 14,
              marginRight: 12,
              cursor: "pointer",
            }}
          >
            <Link to={`${pathUrl}/${row.id}`}>
              <EditTwoTone style={{ fontSize: "16px" }} />
            </Link>
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
    setLoading(true);
    const pagination = {
      current: dataId.current_page,
      pageSize: parseInt(dataId.per_page),
      total: dataId.total,
    };

    setPaginations(pagination);
    setDataTable(dataId.data);
    setLoading(false);
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
      {isNew || Object.keys(dataId).length > 0 ? (
        <div style={{ paddingTop: "15px" }}>
          <Table
            columns={columns}
            dataSource={dataTable}
            loading={loading}
            pagination={paginations}
            scroll={{ x: 2200 }}
            onChange={handleTableChange}
            className={"tableexcel"}
            rowKey={(record) => record}
          />
        </div>
      ) : (
        <Table loading={true} />
      )}
    </React.Fragment>
  );
};

export default List;

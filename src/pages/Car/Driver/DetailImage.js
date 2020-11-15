import React, { useEffect, useState, createRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import _ from "lodash";
import Api from "../../../services/httpClient";
import { notificationWithIcon } from "../../../components/Notification";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Tabs, Card, Row, Col, Button, Table, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import * as Driver_img_Action from "../../../actions/Driver_Img.action";
const { confirm } = Modal;
const { TabPane } = Tabs;

const DetailImage = (props) => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const Driver_img = useSelector(({ Driver_img }) => Driver_img);
  const [showImg, setShowimg] = useState([]);

  useEffect(() => {
    groupImgage();
  }, [Driver_img.result]);

  const groupImgage = () => {
    let img;
    img = _.chain(Driver_img.result)
      .groupBy("type")
      .map((item, index) => {
        return {
          id: index,
          images: item,
        };
      })
      .value();

    setShowimg(img);
  };

  const handleDelete = (id_img) => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return Api.delete(`api/v1/driver/image/${id_img}`)
          .then((res) => {
            notificationWithIcon("success", "Delete sussces.");
            dispatch(Driver_img_Action.fetchImg(id));
          })
          .catch((err) => console.log(err));
      },
      onCancel() {},
    });
  };

  return (
    <React.Fragment>
    
      {showImg.length > 0 ? (
        <div
          className="card card-body"
          style={{ margin: "20px", paddingTop: 0 }}
        >
          <Tabs animated={false}>
            {showImg.map((item, index) =>
              item.id === "identity_card" ? (
                <TabPane tab={"บัตรประชาชน"} key={item.id}>
                  <Row gutter={24}>
                    {item.images.map((item2, index2) => (
                      <Col span={4}>
                        <Card
                          bodyStyle={{ display: "none" }}
                          hoverable
                          style={{ width: "100%", marginTop: 16 }}
                          actions={[
                            <a href={item2.full_path} target="_blank">
                              <Button
                                size={"small"}
                                style={{
                                  background: "#4CAF50",
                                  borderColor: "#4CAF50",
                                  color: "#fff",
                                }}
                              >
                                View
                              </Button>
                            </a>,

                            <Button
                              size={"small"}
                              type="danger"
                              onClick={() => handleDelete(item2.id)}
                            >
                              Delete
                            </Button>,
                          ]}
                          cover={
                            <a href={item2.full_path} target="_blank">
                              <img
                                alt="example"
                                src={item2.full_path}
                                style={{ maxHeight: "240px", width: "100%" }}
                              />
                            </a>
                          }
                        ></Card>
                      </Col>
                    ))}
                  </Row>
                </TabPane>
              ) : item.id === "driver_card" ? (
                <TabPane tab={"ใบขับขี่"} key={item.id}>
                  <Row gutter={24}>
                    {item.images.map((item2, index2) => (
                      <Col span={4}>
                        <Card
                          bodyStyle={{ display: "none" }}
                          hoverable
                          style={{ width: "100%", marginTop: 16 }}
                          actions={[
                            <a href={item2.full_path} target="_blank">
                              <Button
                                size={"small"}
                                style={{
                                  background: "#4CAF50",
                                  borderColor: "#4CAF50",
                                  color: "#fff",
                                }}
                              >
                                View
                              </Button>
                            </a>,

                            <Button
                              size={"small"}
                              type="danger"
                              onClick={() => handleDelete(item2.id)}
                            >
                              Delete
                            </Button>,
                          ]}
                          cover={
                            <a href={item2.full_path} target="_blank">
                              <img
                                alt="example"
                                src={item2.full_path}
                                style={{ maxHeight: "240px", width: "100%" }}
                              />
                            </a>
                          }
                        ></Card>
                      </Col>
                    ))}
                  </Row>
                </TabPane>
              ) : item.id === "employee" ? (
                <TabPane tab={"พนักงาน"} key={item.id}>
                  <Row gutter={24}>
                    {item.images.map((item2, index2) => (
                      <Col span={4}>
                        <Card
                          bodyStyle={{ display: "none" }}
                          hoverable
                          style={{ width: "100%", marginTop: 16 }}
                          actions={[
                            <a href={item2.full_path} target="_blank">
                              <Button
                                size={"small"}
                                style={{
                                  background: "#4CAF50",
                                  borderColor: "#4CAF50",
                                  color: "#fff",
                                }}
                              >
                                View
                              </Button>
                            </a>,

                            <Button
                              size={"small"}
                              type="danger"
                              onClick={() => handleDelete(item2.id)}
                            >
                              Delete
                            </Button>,
                          ]}
                          cover={
                            <a href={item2.full_path} target="_blank">
                              <img
                                alt="example"
                                src={item2.full_path}
                                style={{ maxHeight: "240px", width: "100%" }}
                              />
                            </a>
                          }
                        ></Card>
                      </Col>
                    ))}
                  </Row>
                </TabPane>
              ) : (
                ""
              ),
            )}
          </Tabs>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default DetailImage;

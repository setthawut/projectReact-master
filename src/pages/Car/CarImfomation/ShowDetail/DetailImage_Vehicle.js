import React, { useEffect, useState, createRef } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import Api from "../../../../services/httpClient";
import { notificationWithIcon } from "../../../../components/Notification";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Tabs, Card, Row, Col, Button, Table, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import * as Vehicle_Img_Action from "../../../../actions/Vehicle_Img.action";
const { confirm } = Modal;
const { TabPane } = Tabs;

const DetailImage = (props) => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const Vehicle_Img = useSelector(({ Vehicle_Img }) => Vehicle_Img);
  const [showImg, setShowimg] = useState([]);

  useEffect(() => {
    groupImgage();
  }, [Vehicle_Img.result]);

  const groupImgage = () => {
    let img;
    img = _.chain(Vehicle_Img.result)
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
        return Api.delete(`api/v1/vehicle/image/${id_img}`)
          .then((res) => {
            notificationWithIcon("success", "Delete sussces.");
            dispatch(Vehicle_Img_Action.fetchImg(id));
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
              item.id === "vehicle" ? (
                <TabPane tab={"รูปรถ"} key={item.id}>
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
              ) : item.id === "license_plate" ? (
                <TabPane tab={"ป้ายทะเบียน"} key={item.id}>
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
              ) : item.id === "contract_buy" ? (
                <TabPane tab={"สัญญาตอนซื้อ"} key={item.id}>
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
              ) : item.id === "contract_sale" ? (
                <TabPane tab={"สัญญาตอนขาย"} key={item.id}>
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

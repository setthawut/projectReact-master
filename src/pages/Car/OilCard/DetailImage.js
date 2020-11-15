import React from "react";

import { Tabs, Card, Row, Col, Button } from "antd";

const { TabPane } = Tabs;

const DetailImage = (props) => {
  const { dataId } = props;

  return (
    <React.Fragment>
      {Object.keys(dataId).length > 0 ? (
        <div
          className="card card-body"
          style={{ margin: "20px", paddingTop: 0 }}
        >
          <Tabs animated={false}>
            <TabPane tab={"รูปหน้าบัตร"} key={1}>
              <Row gutter={24}>
                <Col span={4}>
                  <Card
                    bodyStyle={{ display: "none" }}
                    hoverable
                    style={{ width: "100%", marginTop: 16 }}
                    actions={[
                      <a href={dataId.full_path.file_front} target="_blank">
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
                    ]}
                    cover={
                      <a href={dataId.full_path.file_front} target="_blank">
                        <img
                          alt="example"
                          src={dataId.full_path.file_front}
                          style={{ maxHeight: "240px", width: "100%" }}
                        />
                      </a>
                    }
                  ></Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={"รูปหลังบัตร"} key={2}>
              <Row gutter={24}>
                <Col span={4}>
                  <Card
                    bodyStyle={{ display: "none" }}
                    hoverable
                    style={{ width: "100%", marginTop: 16 }}
                    actions={[
                      <a href={dataId.full_path.file_back} target="_blank">
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
                    ]}
                    cover={
                      <a href={dataId.full_path.file_back} target="_blank">
                        <img
                          alt="example"
                          src={dataId.full_path.file_back}
                          style={{ maxHeight: "240px", width: "100%" }}
                        />
                      </a>
                    }
                  ></Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default DetailImage;

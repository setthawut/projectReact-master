import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { notificationWithIcon } from "../../components/Notification";
import Api from "../../services/httpClient";
import { useHistory, Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const layout = {
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 24,
  },
};
const LoginForm = () => {
  let history = useHistory();
  const [load, setLoad] = useState(false);

  const login = async (data) => {
    // const formData = new FormData();
    // formData.append("username", data.username);
    // formData.append("password", data.password);

    setLoad(true);

    await Api.post(`api/v1/login`, data)
      .then(({ data }) => {
        if (data.status === "success") {
          setLoad(false);
          //แปลง object เป็น JSON
          console.log(">>>>>>>>",data.result.access_token)
          let userProfile = JSON.stringify(data.result);
          localStorage.setItem("userProfile", userProfile);
          localStorage.setItem("userLogin", data.result.access_token);
          localStorage.setItem("token", data.result.access_token);
          localStorage.setItem("userId", data.result.id);

          history.push("/dashboard");
        } else {
          setLoad(false);
          notificationWithIcon("warning", "Username or Password is incorrect");
        }
      })
      .catch((error) => {
        notificationWithIcon("warning", "Username or Password is incorrect");
        setLoad(false);
        console.log(error);
      });
  };

  return (
    <div>
      <Form {...layout} onFinish={login}>
        <Form.Item
          name="username"
          rules={[
            {
              message: "Username",
            },
          ]}
        >
          <Input
            autoComplete="off"
            placeholder="Username"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        {/* 
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
          <Link to={"forgotpassword"} style={{ float: "right" }}>
            Forgot password
          </Link>
        </Form.Item> */}

        <Form.Item {...tailLayout}>
          {load ? (
            <BeatLoader
              color={"#5d5b5b"}
              css={{ paddingLeft: "163px" }}
              loading={load}
            />
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                height: 38,
                marginTop: 15,
                fontWeight: 500,
              }}
            >
              {"Login"}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;

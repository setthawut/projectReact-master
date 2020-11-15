import { Redirect, Link } from "react-router-dom";
import React, { Component } from "react";
import { notificationWithIcon } from "../../components/Notification";
import LoginForm from "./LoginForm";
import SignInStyleWrapper from "./style";


export default class Login extends Component {
  state = { messageLogin: "", redirectToReferrer: false };

  componentDidMount() {
    localStorage.clear();
  }

  onSubmit = (values) => {
    this.setState({ redirectToReferrer: true });
    // this.login(values);
  };

  detailFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <h1>LOGISTICS</h1>
            </div>

            <div className="isoSignInForm">
              <LoginForm onSubmit={this.onSubmit} />

              <div className="isoCenterComponent isoHelperWrapper">
                {"คุณต้องการสร้างบัญชี ? "}
                <Link to="/register">สร้างบัญชี</Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

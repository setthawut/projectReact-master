import React from "react"

export default props => (
    <div
        className="d-sm-flex align-items-center justify-content-between"
        style={{
            padding: "10px 25px",
            backgroundColor: "#fff",
         
        }}
    >
        <div>
            {props.children}
        </div>
        <div className="d-none d-md-block"></div>
    </div>
)

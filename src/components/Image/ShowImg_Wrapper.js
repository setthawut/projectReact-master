import React from "react";

export default (props) => {
  return (
    <div class="ant-upload-picture-card-wrapper">
      <div class="ant-upload-list ant-upload-list-picture-card">
        {props.children.length > 0
          ? props.children.map((item, index) => (
              <div class="ant-upload-list-picture-card-container">
                <span>
                  <div className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card">
                    <div className="ant-upload-list-item-info">
                      <span>
                        <a
                          className="ant-upload-list-item-thumbnail"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={item.full_path}
                        >
                          <img
                            src={item.full_path}
                            className="ant-upload-list-item-image"
                          />
                        </a>
                        {/* <span
                  className="ant-upload-list-item-name ant-upload-list-item-name-icon-count-1"
                  title="1597293320930.jpg"
                >
                  1597293320930.jpg
                </span> */}
                      </span>
                    </div>
                    <span className="ant-upload-list-item-actions">
                      <a
                        href
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Preview file"
                      >
                        <span
                          role="img"
                          aria-label="eye"
                          className="anticon anticon-eye"
                          onClick={() => props.Modal(item.full_path)}
                        >
                          <svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            className
                            data-icon="eye"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                          </svg>
                        </span>
                      </a>
                      <button
                        title="Remove file"
                        type="button"
                        className="ant-btn ant-upload-list-item-card-actions-btn ant-btn-text ant-btn-sm ant-btn-icon-only"
                        onClick={() => props.DeleteModal(item.id)}
                      >
                        <span
                          role="img"
                          aria-label="delete"
                          tabIndex={-1}
                          className="anticon anticon-delete"
                        >
                          <svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            className
                            data-icon="delete"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                          </svg>
                        </span>
                      </button>
                    </span>
                  </div>
                </span>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

import { notification } from "antd"

const notificationWithIcon = (type, message) => {
    notification.config({ placement: "topRight" })
    notification[type]({
        message: message,
        description: "",
        style: {
            minHeight: 80
        }
    })
}

export { notificationWithIcon }

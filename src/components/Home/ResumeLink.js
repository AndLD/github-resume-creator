import { message } from 'antd'
import { Link } from 'react-router-dom'

export default function ResumeLink({ username }) {
    const [messageApi, contextHolder] = message.useMessage()

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Username required'
        })
    }
    return (
        <div>
            {contextHolder}
            <Link to={username.length ? `/${username}` : '#'}>
                <button type="submit" onClick={error}>
                    Open
                </button>
            </Link>
        </div>
    )
}

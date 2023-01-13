import moment from 'moment'
import { useContext } from 'react'
import { resumeContext } from '../../context'

export default function Userinfo() {
    const user = useContext(resumeContext).user

    return (
        <div className="userinfo">
            <div>{user.login}</div>
            <div>{user.name}</div>
            <div>
                {user.public_repos} public repos since {moment(user.created_at).format('DD.MM.YYYY')}
            </div>
        </div>
    )
}

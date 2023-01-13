import { useContext } from 'react'
import { resumeContext } from '../../context'

export default function Avatar() {
    const avatar_url = useContext(resumeContext).user?.avatar_url

    return (
        <div className="avatar">
            <img src={avatar_url} alt="GitHub user avatar" />
        </div>
    )
}

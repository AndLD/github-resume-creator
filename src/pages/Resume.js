import { LoadingOutlined } from '@ant-design/icons'
import moment from 'moment'
import { Octokit } from 'octokit'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/Resume.scss'

export default function Resume() {
    const params = useParams()

    const [username] = useState(params.username)
    const [user, setUser] = useState()

    useEffect(() => {
        console.log(username)
        const octokit = new Octokit()

        octokit.request(`GET /users/${username}`).then((value) => {
            setUser(value.data)
            console.log(value.data)
        })
    }, [])

    if (!user) {
        return (
            <div className="loading">
                <LoadingOutlined />
            </div>
        )
    }

    return (
        <div className="resume">
            <div className="layout">
                <header>
                    <div className="avatar">
                        <img src={user.avatar_url} alt="GitHub user avatar" />
                    </div>
                    <div className="username">
                        <div>{user.login}</div>
                        <div>{user.name}</div>
                        <div>
                            {user.public_repos} public repos since {moment(user.created_at).format('DD.MM.YYYY')}
                        </div>
                    </div>
                </header>

                <main></main>
                <footer></footer>
            </div>
        </div>
    )
}

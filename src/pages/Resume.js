import { LoadingOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import Avatar from '../components/Resume/Avatar'
import RepoLngsBar from '../components/Resume/RepoLngsBar'
import Repositories from '../components/Resume/Repositories'
import Userinfo from '../components/Resume/Userinfo'
import { resumeContext } from '../context'
import useResume from '../hooks/useResume'
import '../styles/Resume.scss'

export default function Resume() {
    const params = useParams()

    const { user, repos, repoLngs } = useResume(params.username)

    if (!user) {
        return (
            <div className="loading">
                <LoadingOutlined />
            </div>
        )
    }

    return (
        <resumeContext.Provider
            value={{
                user,
                repos,
                repoLngs
            }}
        >
            <div className="resume">
                <header>
                    <Avatar />
                    <Userinfo />
                </header>

                <main>
                    <RepoLngsBar />
                    <Repositories />
                </main>
            </div>
        </resumeContext.Provider>
    )
}

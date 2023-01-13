import { LoadingOutlined } from '@ant-design/icons'
import { Bar } from '@ant-design/plots'
import moment from 'moment'
import { Octokit } from 'octokit'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/Resume.scss'

export default function Resume() {
    const params = useParams()

    const [username] = useState(params.username)
    const [user, setUser] = useState()
    const [repos, setRepos] = useState([])
    const [repoLngs, setRepoLngs] = useState([])

    useEffect(() => {
        const octokit = new Octokit()

        octokit.request(`GET /users/${username}`).then(({ data }) => {
            setUser({
                avatar_url: data.avatar_url,
                login: data.login,
                name: data.name,
                public_repos: data.public_repos,
                repos_url: data.repos_url,
                created_at: data.created_at
            })
        })
    }, [])

    useEffect(() => {
        if (user) {
            const octokit = new Octokit()

            octokit.request(user.repos_url).then(({ data }) => {
                setRepos(
                    data
                        .map((repo) => ({
                            full_name: repo.full_name,
                            language: repo.language,
                            languages_url: repo.languages_url,
                            updated_at: repo.updated_at,
                            html_url: repo.html_url
                        }))
                        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                )
            })
        }
    }, [user])

    useEffect(() => {
        if (repos.length) {
            const octokit = new Octokit()

            const promises = []

            for (const repo of repos) {
                promises.push(octokit.request(repo.languages_url))
            }

            Promise.all(promises).then((values) => {
                const repoLngs = values.reduce((accumulator, { data }) => {
                    for (const key in data) {
                        if (accumulator[key]) {
                            accumulator[key] += data[key]
                        } else {
                            accumulator[key] = data[key]
                        }
                    }

                    return accumulator
                }, {})

                let total = 0

                for (const key in repoLngs) {
                    total += repoLngs[key]
                }

                setRepoLngs(
                    Object.keys(repoLngs).map((key) => ({
                        language: key,
                        percent: parseFloat(((repoLngs[key] * 100) / total).toFixed(1))
                    }))
                )
            })
        }
    }, [repos])

    if (!user) {
        return (
            <div className="loading">
                <LoadingOutlined />
            </div>
        )
    }

    const config = {
        data: repoLngs,
        xField: 'percent',
        yField: 'language',
        seriesField: 'language',
        legend: {
            position: 'top'
        }
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

                <main>
                    <Bar {...config} />

                    <div>
                        <h3>Last updated repositories:</h3>
                        {repos.slice(0, 10).map((repo) => (
                            <div className="repo" key={repo.full_name}>
                                <div>
                                    <div>
                                        <a href={repo.html_url} className="repo-name">
                                            {repo.full_name}
                                        </a>
                                    </div>
                                    <div>{repo.language}</div>
                                </div>
                                <div className="repo-updated-at">{moment(repo.updated_at).format('DD.MM.YYYY')}</div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

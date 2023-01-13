import { Octokit } from 'octokit'
import { useEffect, useState } from 'react'

export default function useResume(username) {
    const octokit = new Octokit()

    const [user, setUser] = useState()
    const [repos, setRepos] = useState([])
    const [repoLngs, setRepoLngs] = useState([])

    useEffect(() => {
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

    return {
        user,
        repos,
        repoLngs
    }
}

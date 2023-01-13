import moment from 'moment'
import { useContext } from 'react'
import { resumeContext } from '../../context'

export default function Repositories() {
    const repos = useContext(resumeContext).repos

    return (
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
    )
}

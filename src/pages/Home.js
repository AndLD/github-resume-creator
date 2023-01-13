import { useState } from 'react'
import ResumeLink from '../components/Home/ResumeLink'
import '../styles/Home.scss'

export default function Home() {
    const [username, setUsername] = useState('')

    return (
        <div className="home">
            <form className="form">
                <div className="label">Type GitHub username to retrieve user resume:</div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <ResumeLink username={username} />
            </form>
        </div>
    )
}

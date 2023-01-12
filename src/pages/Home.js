import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.scss'

export default function Home() {
    const [username, setUsername] = useState('')

    return (
        <div className="home">
            <form className="form">
                <div className="label">Введіть username користувача GitHub, щоб отримати його резюме:</div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <div>
                    <Link to={username.length ? `/${username}` : '#'}>
                        <button type="submit" onClick={() => {}}>
                            Відкрити
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

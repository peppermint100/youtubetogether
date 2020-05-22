import React, { useState, ReactElement } from 'react'
import { Link } from "react-router-dom";
import styles from "./Join.module.css"
interface Props {

}

export default function Join({ }: Props): ReactElement {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    return (
        <div className={styles.container}>
            <div className={styles.joinBox}>
                <div className={styles.bar}></div>
                <h1 className={styles.header}>Join</h1>
                <div className={styles.inputSection}>
                    <input className={styles.joinInput} placeholder="     name" onChange={e => {
                        setName(e.target.value)
                    }} />
                    <input className={styles.joinInput} placeholder="     room" onChange={e => {
                        setRoom(e.target.value)
                    }} /></div>
                <Link className={styles.joinAnchor} onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className={styles.joinButton} type="submit">Sign in</button>
                </Link></div>
        </div>
    )
}

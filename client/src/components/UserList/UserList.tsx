import React, { ReactElement, useState, useEffect } from 'react'
import ToggleButton from '../ToggleButton/ToggleButton';
import { user } from '../../types';
import styles from "./UserList.module.css"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
interface Props {
    users: user[]
}

export default function UserList({ users }: Props): ReactElement {
    const [showing, setShowing] = useState<boolean>(false);

    const toggle = () => {
        setShowing(!showing);
    }
    useEffect(() => {

    }, [users])

    return (
        <div>
            {showing && users ?
                <div className={styles.container}>
                    <div className={styles.bar}>
                        <div className={styles.greenDot}></div>
                        <button onClick={toggle} className={styles.closeButton}><FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <ul>
                        {users.map((user: user) => {
                            return <li className={styles.user} key={user.id}>{user.name}</li>
                        })}
                    </ul>
                </div> : <ToggleButton toggle={toggle} showing={showing} />}
        </div>
    )
}

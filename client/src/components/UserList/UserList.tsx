import React, { ReactElement, useState, useEffect } from 'react'
import ToggleButton from '../ToggleButton/ToggleButton';
import { user } from '../../types';
import styles from "./UserList.module.css"

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
                        <button onClick={toggle} className={styles.closeButton}>X</button>
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

{/* {Object.values(users).map(user => <div key={user.id}>name : {user.name}</div>)} */ }
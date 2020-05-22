import React, { ReactElement } from 'react'
import { queryStringType } from '../../customs/index';
import styles from "./Message.module.css";

interface Props {
    user: string
    text: string
    name: queryStringType
}

export default function Message({ user, text, name }: Props): ReactElement {

    return (
        <div className={styles.container}>
            {user === name ?
                <div className={styles.mine}>{text}</div> :
                <>
                    <div className={styles.others}>{text}</div>
                    <p className={styles.username}>{user}</p>
                </>
            }
        </div>
    )
}

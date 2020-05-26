import React, { ReactElement, useEffect } from 'react'
import Message from '../Message/Message';
import { messageProps, queryStringType } from '../../types/index';
import styles from "./Messages.module.css"
import { animateScroll } from "react-scroll";

interface Props {
    messages: messageProps[]
    name: queryStringType
}

export default function Messages({ messages, name }: Props): ReactElement {
    const scrollToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: "scrollToBottom",
            checkInterval: 17
        })
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    return (
        <div className={styles.container} id="scrollToBottom">
            {messages.map((message, i) => {
                return (<div key={i}>
                    <Message text={message.text} name={name} user={message.user} />
                </div>)
            })}
        </div>
    )
}
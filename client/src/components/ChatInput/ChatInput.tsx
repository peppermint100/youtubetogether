import React from 'react';
import { messageProps } from '../../types/index';
import styles from "./ChatInput.module.css";

interface Props {
    setMessage: (value: messageProps) => void
    sendMessage: (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    message: messageProps
}

const ChatInput: React.FC<Props> = ({ setMessage, sendMessage, message }) => {
    if (message.text.length > 35) {
        alert('Message cannot be longer than 35 bytes.')
        setMessage({ user: message.user, text: '' });
    }
    return (
        <form className={styles.container}>
            <input
                className={styles.chatInput}
                type="text"
                placeholder="    Type a message..."
                value={message.text}
                onChange={({ target: { value } }) => setMessage({ text: value, user: message.user })}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className={styles.chatButton} onClick={e => sendMessage(e)}>Send</button>
        </form>
    )
}

export default ChatInput;
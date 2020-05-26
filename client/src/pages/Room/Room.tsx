import React, { ReactElement, useState, useEffect } from 'react'
import queryString from "query-string"
import io from "socket.io-client"
import dotenv from "dotenv";
import ChatInput from '../../components/ChatInput/ChatInput';
import Messages from '../../components/Messages/Messages';
import { messageProps, queryStringType, user, videoStateProps } from '../../types/index';
import Video from '../../components/Video/Video';
import styles from "./Room.module.css"
import UserList from '../../components/UserList/UserList';
import ReactHelmet from '../../components/Helmet/Helmet';

dotenv.config();

interface Props {
    location: any
    history: any
}

const ENDPOINT = process.env.REACT_APP_ENDPOINT || "http://localhost:5000";

const initialMessageState: messageProps = {
    user: "",
    text: ""
}

export default function Chat({ location, history }: Props): ReactElement {
    const [name, setName] = useState<queryStringType>("")
    const [room, setRoom] = useState<queryStringType>("")
    const [message, setMessage] = useState<messageProps>(initialMessageState)
    const [messages, setMessages] = useState<messageProps[]>([])
    const [socketState, setSocketState] = useState<SocketIOClient.Socket | null>(null);
    const [users, setUsers] = useState<user[]>([]);
    const [seek, setSeek] = useState({ payload: 0, refresh: 0 });
    const [videoState, setVideoState] = useState<videoStateProps>({
        id: null,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        room: ""
    })

    useEffect(() => {
        let socket: SocketIOClient.Socket = io(ENDPOINT);
        setSocketState(socket);

        const { name, room } = queryString.parse(location.search);
        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, (error: string) => {
            if (error) {
                alert(error);
                history.push("/")
            }
        })

        socket.on('message', (message: messageProps) => {
            setMessages(messages => [...messages, message])
        })

        socket.on('set', (videoState: videoStateProps) => {
            setVideoState(videoState);

        })

        socket.on("roomData", (users: {
            users: user[]
        }) => {
            setUsers(users.users);
        });


        socket.on('trigger', ({ payload }: { payload: number }) => {
            setSeek(seek => ({ payload, refresh: seek.refresh + 1 }));
        })


        return () => {
            socket.emit('disconnect', { socket })
            socket.close()
        }
    }, [ENDPOINT, location.search])

    const sendMessage = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (message.text) {
            socketState!.emit('sendMessage', message, () => setMessage(initialMessageState))
        }
    }

    return (
        <div className={styles.container}>
            <ReactHelmet title={room ? room.toString() : "Youtube-Together"} />
            <div className={styles.videoSection}>
                <UserList users={users} />
                <Video seek={seek} videoState={videoState} setVideoState={setVideoState} room={room} socketProp={socketState} />
            </div>
            <div className={styles.chatSection}>
                <Messages messages={messages} name={name} />
                <ChatInput setMessage={setMessage} sendMessage={sendMessage} message={message} />
            </div>
        </div>
    )
}

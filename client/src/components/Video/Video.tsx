import React, { ReactElement, useState, useEffect, useRef } from 'react'
import YouTube, { Options } from 'react-youtube';
import VideoControl from '../VideoControl/VideoControl';
import styles from "./Video.module.css"
import queryString from "query-string";
import { queryStringType, youtubeEventProps, videoStateProps } from '../../customs/index';
import dotenv from "dotenv";

dotenv.config();

interface Props {
    videoState: videoStateProps
    setVideoState: (state: videoStateProps) => void
    room: queryStringType
    socketProp: SocketIOClient.Socket | null
}

const opts: Options = {
    height: '390',
    width: '640',
    playerVars: {
        controls: 0,
        autoplay: 0,
        disablekb: 0
    }
}

export default function Video({ videoState, setVideoState, room, socketProp }: Props): ReactElement {
    const [URL, setURL] = useState<string>("https://www.youtube.com/watch?v=0eIY5b0RKE0");
    const videoRef: any = useRef(null);

    const onReady = (e: youtubeEventProps) => {
        // console.log("ready : ", e);
    }

    const onStateChange = (e: youtubeEventProps) => {
        // console.log("state change : ", e);
    }
    const onPlay = (e: youtubeEventProps) => {
        const duration = e.target.playerInfo.duration;
        setVideoState({ ...videoState, duration })
        console.log(e.target.getMediaReferenceTime())
    }
    const onPause = (e: youtubeEventProps) => {
        // console.log(e.target.getMediaReferenceTime())
    }

    const hitVideo = () => {
        if (socketProp) {
            const id = Object.values(queryString.parse(URL))[0];
            socketProp.emit('hit', { ...videoState, id, room })
        }
    }
    const playVideo = () => {
        if (videoRef !== null && videoRef.current !== null && socketProp !== null) {
            socketProp.emit('hit', { ...videoState, isPlaying: true })
            videoRef.current.internalPlayer.getPlayerState().then((state: any) => {
                console.log(state);
            })
        }
    }

    const pauseVideo = () => {
        if (videoRef !== null && videoRef.current !== null && socketProp !== null) {
            socketProp.emit('hit', { ...videoState, isPlaying: false })
            videoRef.current.internalPlayer.getPlayerState().then((state: any) => {
                console.log(state);
            })
        }
    }

    const debug = () => {
        console.log
            (videoRef.current.internalPlayer.getCurrentTime().then((time: any) => {
                console.log(time)
            }))
    }

    useEffect(() => {
        console.log("Ref : ", videoRef.current.internalPlayer)
        console.log("videoState : ", videoState)
        if (videoState.isPlaying) {
            videoRef.current.internalPlayer.playVideo()
        } else {
            videoRef.current.internalPlayer.pauseVideo()
        }
    }, [videoState])

    return (
        <div>
            <YouTube ref={videoRef} videoId={videoState.id?.toString()} opts={opts} onReady={onReady} onStateChange={onStateChange} onPlay={e => { onPlay(e) }} onPause={onPause}
            />
            <section className={styles.inputSection}>
                <input className={styles.urlInput} type="text" placeholder="Paste youtube URL here" onChange={e => {
                    setURL(e.target.value);
                }} value={URL} />
                <button className={styles.button} onClick={hitVideo}>Hit</button>
                <button className={styles.button} onClick={debug}>Debug</button>
            </section>
            <VideoControl playVideo={playVideo} pauseVideo={pauseVideo} />
        </div>
    )
}

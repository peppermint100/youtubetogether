import React, { ReactElement, useState, useEffect, useRef, useMemo } from 'react'
import YouTube, { Options } from 'react-youtube';
import VideoControl from '../VideoControl/VideoControl';
import styles from "./Video.module.css"
import queryString from "query-string";
import { queryStringType, youtubeEventProps, videoStateProps } from '../../types/index';

interface Props {
    videoState: videoStateProps
    setVideoState: (state: videoStateProps) => void
    room: queryStringType
    socketProp: SocketIOClient.Socket | null
    seek: {
        payload: number
        refresh: number
    }
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

export default function Video({ videoState, setVideoState, room, socketProp, seek }: Props): ReactElement {
    const [URL, setURL] = useState<string>("https://www.youtube.com/watch?v=rR4n-0KYeKQ&t=1s");
    const videoRef: any = useRef(null);
    let interval: any;

    const updateLocalCurrentTime = async () => {
        if (videoRef !== null && videoRef.current !== null && socketProp) {
            const currentTime = await videoRef.current.internalPlayer.getCurrentTime()
            const duration = await videoRef.current.internalPlayer.getDuration();
            setVideoState({ ...videoState, currentTime, duration })
        }
    }

    const hitVideo = async () => {
        if (socketProp) {
            const id = Object.values(queryString.parse(URL))[0];
            console.log("URL", URL)
            console.log("id", id)
            socketProp.emit('hit', { ...videoState, id, room })
        }
    }

    const playVideo = async () => {
        if (videoRef !== null && videoRef.current !== null && socketProp !== null) {
            socketProp.emit('hit', { ...videoState, isPlaying: true })
        }
    }

    const pauseVideo = () => {
        if (videoRef !== null && videoRef.current !== null && socketProp !== null) {
            socketProp.emit('hit', { ...videoState, isPlaying: false })
        }
    }

    const syncVideoByPayload = (payload: number) => {
        if (videoState.room && videoRef !== null && videoRef.current !== null && socketProp !== null) {
            socketProp.emit('seek', { payload, room: videoState.room.toString() })
        }
    }

    const debug = () => {
        console.log("videostate : ", videoState);
        console.log("Ref : ", videoRef.current.internalPlayer)
    }

    useEffect(() => {
        if (videoRef) {
            videoRef.current.internalPlayer.seekTo(seek.payload + videoState.currentTime)
        }
    }, [seek.refresh])

    useEffect(() => {
        const intervalId = setInterval(updateLocalCurrentTime, 2000)
        return () => clearInterval(intervalId)
    }, [videoState.isPlaying])

    useEffect(() => {
        if (videoState.isPlaying) {
            videoRef.current.internalPlayer.playVideo()
        } else {
            videoRef.current.internalPlayer.pauseVideo()
        }
    }, [videoState.isPlaying])

    return (
        <div>
            <YouTube ref={videoRef} videoId={videoState.id?.toString()} opts={opts} />
            <section className={styles.inputSection}>
                <input className={styles.urlInput} type="text" placeholder="Paste youtube URL here" onChange={e => {
                    setURL(e.target.value);
                }} value={URL} />
                <button className={styles.button} onClick={hitVideo}>Hit</button>
                <button className={styles.button} onClick={debug}>Debug</button>
            </section>
            <VideoControl videoState={videoState} playVideo={playVideo} pauseVideo={pauseVideo} syncVideoByPayload={syncVideoByPayload} />
        </div>
    )
}

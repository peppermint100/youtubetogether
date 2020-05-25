import React, { ReactElement, useState, useEffect, useRef, useMemo } from 'react'
import YouTube, { Options } from 'react-youtube';
import VideoControl from '../VideoControl/VideoControl';
import styles from "./Video.module.css"
import queryString from "query-string";
import { queryStringType, youtubeEventProps, videoStateProps } from '../../types/index';
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
    let interval: any;

    const onReady = (e: youtubeEventProps) => {
        // console.log("ready : ", e);
    }

    const onStateChange = (e: youtubeEventProps) => {
        // console.log("state change : ", e);
        const duration = e.target.playerInfo.duration;
        const currentTime = e.target.getMediaReferenceTime()
        setVideoState({ ...videoState, duration, currentTime })
        socketProp?.emit('hit', { ...videoState, duration, currentTime })
    }

    const onPlay = (e: youtubeEventProps) => {
    }

    const onPause = (e: youtubeEventProps) => {
    }

    const updateLocalCurrentTime = () => {
        if (videoRef !== null && videoRef.current !== null && socketProp) {
            videoRef.current.internalPlayer.getCurrentTime().then((currentTime: number) => {
                socketProp.emit('hit', { ...videoState, currentTime })
            })
        }
    }

    const hitVideo = () => {
        if (socketProp) {
            const id = Object.values(queryString.parse(URL))[0];
            socketProp.emit('hit', { ...videoState, id, room })
        }
    }

    const playVideo = async () => {
        if (videoRef !== null && videoRef.current !== null && socketProp !== null) {
            socketProp.emit('hit', { ...videoState, isPlaying: true })
            try {
                const currentTime = await videoRef.current.internalPlayer.getCurrentTime()
                const duration = await videoRef.current.internalPlayer.getDuration();
                setVideoState({ ...videoState, currentTime, duration });
            } catch (err) {
                console.log(err);
            }
        }
    }

    // const playVideo = async () => {
    //     if (videoRef !== null && videoRef.current !== null && socketProp !== null) {
    //         socketProp.emit('hit', { ...videoState, isPlaying: true })
    //         videoRef.current.internalPlayer.getCurrentTime().then((currentTime: number) => {
    //             setVideoState({ ...videoState, currentTime })
    //         })
    //     }
    // }
    const pauseVideo = () => {
        if (videoRef !== null && videoRef.current !== null && socketProp !== null) {
            socketProp.emit('hit', { ...videoState, isPlaying: false })
            videoRef.current.internalPlayer.getPlayerState().then((state: any) => {
                // console.log(state);
            })
        }
    }

    const setCurrentTimeByPayload = (payload: number) => {
        if (videoRef !== null && videoRef.current !== null && socketProp !== null) {
            const currentTime = videoState.currentTime + payload;
            // setVideoState({ ...videoState, currentTime })
            socketProp.emit('seek', { ...videoState, currentTime }, () => {
                socketProp.on('seekTo', () => {
                    console.log('seek')
                    videoRef.current.internalPlayer.seekTo(currentTime);
                })
            })
        }
    }

    const debug = () => {
        // console.log("duration : ", videoState?.duration)
        // videoRef.current.internalPlayer.getCurrentTime().then((currentTime: number) => {
        //     setVideoState({ ...videoState, currentTime })
        // })
        console.log("videostate : ", videoState);
        console.log("Ref : ", videoRef.current.internalPlayer)

        console.log("Ref : ", videoRef.current.internalPlayer.getDuration());
    }

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
            <YouTube ref={videoRef} videoId={videoState.id?.toString()} opts={opts} onReady={onReady} onStateChange={onStateChange} onPlay={e => { onPlay(e) }} onPause={onPause}
            />
            <section className={styles.inputSection}>
                <input className={styles.urlInput} type="text" placeholder="Paste youtube URL here" onChange={e => {
                    setURL(e.target.value);
                }} value={URL} />
                <button className={styles.button} onClick={hitVideo}>Hit</button>
                <button className={styles.button} onClick={debug}>Debug</button>
            </section>
            <VideoControl videoState={videoState} playVideo={playVideo} pauseVideo={pauseVideo} setCurrentTimeByPayLoad={setCurrentTimeByPayload} />
        </div>
    )
}

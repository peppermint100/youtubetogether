import React, { ReactElement } from 'react'
import styles from "./VideoControl.module.css"
import { videoStateProps } from '../../types/index';
import ProgressBar from '../ProgressBar/ProgressBar';

interface Props {
    playVideo: () => void
    pauseVideo: () => void
    syncVideoByPayload: (payload: number) => void
    videoState: videoStateProps
}



export default function VideoControl({ videoState, playVideo, pauseVideo, syncVideoByPayload }: Props): ReactElement {
    return (
        <div className={styles.container}>
            <ProgressBar current={videoState.currentTime} total={videoState.duration} />
            <section className={styles.buttonSection}>
                <button onClick={playVideo} className={styles.button}>Play</button>
                <button onClick={pauseVideo} className={styles.button}>Pause</button>
                <button onClick={() => {
                    syncVideoByPayload(-10)
                }} className={styles.button}>-10</button>
                <button onClick={() => {
                    syncVideoByPayload(10)
                }} className={styles.button}>+10</button>
                <button onClick={() => {
                    syncVideoByPayload(-100)
                }} className={styles.button}>-100</button>
                <button onClick={() => {
                    syncVideoByPayload(100)
                }} className={styles.button}>+100</button>
            </section>
        </div >
    )
}

;



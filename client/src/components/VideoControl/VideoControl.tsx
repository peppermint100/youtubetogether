import React, { ReactElement, useEffect } from 'react'
import styles from "./VideoControl.module.css"
import { youtubeEventProps } from "../../types"
import { videoStateProps } from '../../types/index';
import styled from "styled-components";
import ProgressBar from '../ProgressBar/ProgressBar';

interface Props {
    playVideo: () => void
    pauseVideo: () => void
    syncVideoByPayload: (payload: number) => void
    videoState: videoStateProps
}

export default function VideoControl({ videoState, playVideo, pauseVideo, syncVideoByPayload }: Props): ReactElement {

    const forwardTen = () => {
        syncVideoByPayload(10);
    }

    return (
        <div className={styles.container}>
            {!(videoState.currentTime > 0 && videoState.duration > 0) ? (<p>Loading</p>)
                :
                (<section className={styles.progressBar}>
                </section>)
            }
            <ProgressBar current={videoState.currentTime} total={videoState.duration} />
            <section className={styles.buttonSection}>
                <button onClick={playVideo} className={styles.button}>Play</button>
                <button onClick={pauseVideo} className={styles.button}>Pause</button>
                <button onClick={forwardTen} className={styles.button}>+10</button>
            </section>
        </div>
    )
}

;



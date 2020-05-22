import React, { ReactElement } from 'react'
import styles from "./VideoControl.module.css"
import { youtubeEventProps } from "./../../customs"

interface Props {
    playVideo: () => void
    pauseVideo: () => void
}

export default function VideoControl({ playVideo, pauseVideo }: Props): ReactElement {
    return (
        <div className={styles.container}>
            <section className={styles.progressBar}>
                <div className={styles.bar}></div>
                <div className={styles.controlBlock}></div>
            </section>
            <section className={styles.buttonSection}>
                <button onClick={playVideo} className={styles.button}>Play</button>
                <button onClick={pauseVideo} className={styles.button}>Pause</button>
            </section>
        </div>
    )
}

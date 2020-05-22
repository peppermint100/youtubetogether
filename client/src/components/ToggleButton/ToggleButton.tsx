import React, { ReactElement } from 'react'
import styles from "./ToggleButton.module.css"
interface Props {
    showing: boolean
    toggle: () => void
}

export default function ToggleButton({ showing, toggle }: Props): ReactElement {
    return (
        <>
            {showing ? null : <button onClick={() => {
                toggle();
            }} className={styles.toggleButton}>U</button>}
        </>
    )
}

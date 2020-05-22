import React, { ReactElement } from 'react'

interface Props {
    room: string | null | undefined | string[]
}

export default function InfoBar({ room }: Props): ReactElement {
    return (
        <div>
            {room}
            <a href="/">Close</a>
        </div>
    )
}

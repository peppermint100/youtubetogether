export interface messageProps {
    user: string
    text: string
}

export type queryStringType = string | string[] | null | undefined

export interface user {
    id: string
    name: string
    room: string
}

export interface youtubeEventProps {
    target: any;
    data: number;
}

export interface videoStateProps {
    id: queryStringType,
    isPlaying: boolean
    currentTime: number,
    duration: number,
    room: queryStringType
}
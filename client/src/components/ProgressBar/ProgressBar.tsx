import React, { ReactElement, useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import { videoStateProps } from '../../types/index';

interface Props {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: Props): ReactElement {
    const controlBlockRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const timeLineRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const [time, setTime] = useState<number>(0);
    const getPositionOfTimeLine = () => {
        const start = 0
        const end = 500
        console.log(timeLineRef.current.offsetWidth);
    }
    useEffect(() => {
        if (controlBlockRef) {
            const controlBlock = controlBlockRef.current;
            const progress = Math.floor((current / total) * 100) * 25
            controlBlock.style.transform = `translateX(${progress}%)`
        }
    }, [current])

    const timeLineChange = () => {
        console.log('you have clicked the timeline')
        getPositionOfTimeLine();
    }
    return (
        <>
            <Container ref={timeLineRef} onClick={timeLineChange}>
                <Bar />
                <ControlBlock ref={controlBlockRef} />
            </Container>
            <button onClick={() => { console.log(Math.floor((current / total) * 100)) }}>debug</button>
        </>
    )
}

// video width 640px
const Container = styled.div`
    position:relative;
    width:500px; 
    height:20px;
`

const Bar = styled.div`
position:absolute;
width: 100%;
  height: 2px;
  background-color: #6c5ce7;
  transform:translateY(400%);
`
// limit 32 times
const ControlBlock = styled.div`
position:absolute;
  width: 20px;
  height: 20px;
  border-radius:50%;
  background-color: #6c5ce7;
`
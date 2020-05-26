import React, { ReactElement, useEffect, useRef } from 'react'
import styled from "styled-components";

interface Props {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: Props): ReactElement {
    const controlBlockRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const timeLineRef = useRef() as React.MutableRefObject<HTMLInputElement>

    useEffect(() => {
        const controlBlock = controlBlockRef.current;
        const progress: number = Math.floor((Math.floor(current) / Math.floor(total)) * 100) * 25
        controlBlock.style.transform = `translateX(${progress}%)`
    }, [current, total])

    return (
        <>
            <Container ref={timeLineRef}>
                <Bar />
                <ControlBlock ref={controlBlockRef} />
            </Container>
        </>
    )
}

// video width 640px
const Container = styled.div`
    position:relative;
    align-self:center;
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
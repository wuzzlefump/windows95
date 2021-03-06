import React, { useRef, useEffect, useState } from 'react';
import './paint.css'

function Paint() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const divRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = 3850;
    canvas.height = 1950;
    canvas.style.width = `${1000}px`;
    canvas.style.height = `${750}px`;

    const context = canvas.getContext("2d")
    context.scale(3.85, 2.58);
    context.lineCap = "round"
    //this line will provide the color - maybe change that to let users type in a color or click a color
    context.strokeStyle = "black"
    //here the line thickness is defined
    context.lineWidth = 5
    contextRef.current = context
  }, [])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  return (
    <div id="canvasDiv" ref={divRef}>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  )
}

export default Paint

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

 function ImageMagnifier({
  src,
  width,
  height,
  magnifierHeight = 150,
  magnifieWidth = 150,
  zoomLevel = 1.7,
}: {
  src: string
  width?: string
  height?: string
  magnifierHeight?: number
  magnifieWidth?: number
  zoomLevel?: number
}) {
  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)
  return (
    <div
      style={{
        position: 'relative',
        height: height,
        width: width,
      }}>
      <img
        src={src}
        className='rounded-md'
        style={{ height: height, width: width }}
        onMouseEnter={e => {
          const elem = e.currentTarget
          const { width, height } = elem.getBoundingClientRect()
          setSize([width, height])
          setShowMagnifier(true)
        }}
        onMouseMove={e => {
          const elem = e.currentTarget
          const { top, left } = elem.getBoundingClientRect()
          const x = e.pageX - left - window.pageXOffset
          const y = e.pageY - top - window.pageYOffset
          setXY([x, y])
        }}
        onMouseLeave={() => {
          setShowMagnifier(false)
        }}
        alt={'img'}
      />
      <div
        style={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',
          pointerEvents: 'none',
          borderRadius: '100%',
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifieWidth / 2}px`,
          opacity: '1',
          border: '1px solid lightgray',
          backgroundColor: 'white',
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}></div>
    </div>
  )
}
export default ImageMagnifier
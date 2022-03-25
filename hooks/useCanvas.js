import { useEffect, useRef } from 'react'

export function useCanvas(width, height, cb) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio ?? 1

      if (canvas && ctx) {
        // 캔버스 크기 설정
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'

        // 캔버스가 쓸 픽셀 갯수 설정
        canvas.width = width * devicePixelRatio
        canvas.height = height * devicePixelRatio

        // 캔버스 크기와 실제 그려지는 것의 크기를 똑같게 매칭 시키기
        ctx.scale(devicePixelRatio, devicePixelRatio)
      }
    }
    setCanvas()

    if (ctx) cb?.forEach((func) => func(ctx))
  }, [width, height, cb])

  return canvasRef
}

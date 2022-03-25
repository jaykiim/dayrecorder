export class Clock {
  constructor(width) {
    this.width = width
    this.height = width
    this.radius = this.width / 2
  }

  drawArc(ctx, targetMin, min) {
    ctx.beginPath()

    ctx.moveTo(this.radius, this.radius)

    // 원 중심의 x, y, 원 반지름, 시작 각도, 종료 각도, 시계뱡향or반시계방향
    ctx.arc(
      this.radius, // 원 중심의 x
      this.radius, // 원 중심의 y
      this.radius * 0.75, // 원 반지름
      -Math.PI / 2, // 시작 각도 (0일 때 3시 방향이 디폴트이므로 -90도에서 시작)
      2 * Math.PI * (min / targetMin) - Math.PI / 2,
      false // 시계 방향 (false) or 반시계 방향 (true)
    )

    // ? 👆 종료 각도: 만약 타이머를 120분으로 맞추고 현재 10분 지난 경우,
    // 360도 * 10/120 = 30인데 시작을 -90도에서 했기 때문에 -90도(12시) ~ 0도(3시) ~ 30도(4시)까지 그려지므로 90도(1/2파이)를 빼줌

    ctx.closePath()

    ctx.fillStyle = '#b91c1c80'
    ctx.fill()
  }

  drawIndicator(ctx, targetMin) {
    this.drawMin(ctx, targetMin)
    this.drawHr(ctx, targetMin)
    this.drawNumber(ctx, targetMin)
  }

  drawMin(ctx, targetMin) {
    ctx.beginPath()

    ctx.translate(this.radius, this.radius)
    ctx.rotate(Math.PI / 2)

    for (let i = 0; i < targetMin; i++) {
      if (i % 5 !== 0) {
        ctx.moveTo(this.radius * 0.83, 0)
        ctx.lineTo(this.radius * 0.8, 0)
      }
      ctx.rotate(Math.PI / (targetMin / 2))
    }
    ctx.closePath()

    ctx.strokeStyle = '#525252'
    ctx.stroke()
  }

  drawHr(ctx, targetMin) {
    ctx.rotate(-Math.PI * 0.5)

    ctx.beginPath()
    for (let i = 0; i < targetMin / 5; i++) {
      ctx.moveTo(this.radius * 0.85, 0)
      ctx.lineTo(this.radius * 0.8, 0)
      ctx.rotate(Math.PI / (targetMin / 5 / 2))
    }
    ctx.closePath()

    ctx.lineWidth = 3
    ctx.strokeStyle = '#839EA0'
    ctx.stroke()
  }

  drawNumber(ctx, targetMin) {
    let ang
    let num
    ctx.font = this.radius * 0.08 + 'px Roboto'
    ctx.fillStyle = '#839EA0'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    for (num = 0; num < targetMin / 5; num++) {
      ang = (num * Math.PI) / (targetMin / 5 / 2)
      ctx.rotate(ang)
      ctx.translate(0, -this.radius * 0.9)
      ctx.rotate(-ang)
      ctx.fillText((num * 5).toString(), 0, 0)
      ctx.rotate(ang)
      ctx.translate(0, this.radius * 0.9)
      ctx.rotate(-ang)
    }
  }
}

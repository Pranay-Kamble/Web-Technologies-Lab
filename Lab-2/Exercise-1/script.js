const canvas = document.querySelector('#canvas-body')
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'lightgreen'
ctx.fillRect(70,70,200,100)

ctx.beginPath()
ctx.arc(370,120, 50, 0, 2*Math.PI)
ctx.stroke()
ctx.fillStyle = 'orange'
ctx.fill()


ctx.beginPath()
ctx.moveTo(100,245)
ctx.strokeStyle = 'brown'
ctx.lineWidth = 5
ctx.lineTo(355, 245)
ctx.stroke()

ctx.font = '25px Tahoma'
ctx.fillStyle = 'blue'
ctx.fillText('HTML5 Canvas', 160,35)
import React, { useEffect, useRef } from 'react';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const opacityRef = useRef(0.05);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    let lastX, lastY;
    let hue = 0;
    let lastTime = 0;

    function getRandomColor() {
      hue += 5;
      return `hsl(${hue % 360}, 100%, 50%)`;
    }

    const drawLine = (x, y, timeDelta) => {
      if (lastX !== undefined && lastY !== undefined) {
        const speed = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2) / timeDelta;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = getRandomColor();
        ctx.lineWidth = Math.min(20, 10 / (speed + 0.1));
        ctx.stroke();
        ctx.closePath();
      }
      lastX = x;
      lastY = y;
    };

    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      const currentTime = performance.now();
      const timeDelta = currentTime - lastTime;
      drawLine(x, y, timeDelta);
      lastTime = currentTime;
    };

    const handleMouseLeave = () => {
      lastX = undefined;
      lastY = undefined;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const fadeEffect = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${opacityRef.current})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      fadeEffect();
      ctx.filter = 'blur(2px)';
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />;
};

export default CanvasComponent;

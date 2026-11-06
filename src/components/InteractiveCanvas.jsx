import React, { useEffect, useRef } from 'react';

const InteractiveCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, speed: 0 });
  const particlesRef = useRef([]);

  useEffect(() => {
    // Only run on devices with hover/pointer to preserve mobile performance
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Class
    class Particle {
      constructor(x, y, speedX, speedY) {
        this.x = x;
        this.y = y;
        // Float upwards slightly
        this.speedX = speedX * 0.4 + (Math.random() - 0.5) * 0.5;
        this.speedY = speedY * 0.4 - Math.random() * 0.8 - 0.2;
        this.size = Math.random() * 3.5 + 1.5;
        this.alpha = 1.0;
        this.decay = Math.random() * 0.015 + 0.01;
        // Deep warm red/crimson colors matching Yash's visual theme
        this.color = Math.random() > 0.35 ? '#f50604' : '#ff4d4d';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
        if (this.size > 0.1) this.size -= 0.02;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Tracking Mouse Position and Velocity
    const handleMouseMove = (e) => {
      const mouse = mouseRef.current;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn particles when mouse moves, proportional to speed
      const spawnCount = Math.min(Math.floor(mouse.speed / 4), 5);
      for (let i = 0; i < spawnCount; i++) {
        particlesRef.current.push(
          new Particle(
            mouse.x,
            mouse.y,
            dx * 0.15,
            dy * 0.15
          )
        );
      }

      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic rendering loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      // Draw subtle mouse-follow radial spotlight
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.save();
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          320
        );
        // Soft glowing red background spotlight
        gradient.addColorStop(0, 'rgba(245, 6, 4, 0.08)');
        gradient.addColorStop(0.5, 'rgba(245, 6, 4, 0.02)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 320, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw & Update Particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0 || p.size <= 0.1) {
          particles.splice(i, 1);
        } else {
          p.draw();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default InteractiveCanvas;

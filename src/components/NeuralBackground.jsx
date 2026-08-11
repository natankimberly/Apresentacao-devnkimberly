import { useEffect, useRef } from 'react';

// Moved Particle class definition outside the component
class Particle {
    constructor(canvasWidth, canvasHeight) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 1;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
    }

    update(mouseParams) {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
      if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;

      // Mouse interaction
      if (mouseParams.x != null) {
        const dx = mouseParams.x - this.x;
        const dy = mouseParams.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouseParams.radius) {
           const forceDirectionX = dx / distance;
           const forceDirectionY = dy / distance;
           const force = (mouseParams.radius - distance) / mouseParams.radius;
           const directionX = forceDirectionX * force * this.size * 0.05;
           const directionY = forceDirectionY * force * this.size * 0.05;
           
           this.x -= directionX;
           this.y -= directionY;
        }
      }
    }

    draw(ctx) {
      ctx.fillStyle = '#38bdf8'; // Cyan-400
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
}

const NeuralBackground = ({ embedded = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (embedded && canvas.parentElement) {
        const w = canvas.parentElement.clientWidth;
        const h = canvas.parentElement.clientHeight;
        canvas.width = Math.max(1, w);
        canvas.height = Math.max(1, h);
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    let resizeObserver = null;
    if (embedded && canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => resizeCanvas());
      resizeObserver.observe(canvas.parentElement);
      resizeCanvas();
    } else {
      resizeCanvas();
    }

    let particles = [];
    const particleCount = 100;
    const connectionDistance = 150;
    const mouseParams = { x: null, y: null, radius: 200 };

    const init = () => {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.canvasWidth = canvas.width;
        p.canvasHeight = canvas.height;
        
        p.update(mouseParams);
        p.draw(ctx);

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${1 - distance / connectionDistance})`; 
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
        if (embedded && canvas) {
          const rect = canvas.getBoundingClientRect();
          mouseParams.x = event.clientX - rect.left;
          mouseParams.y = event.clientY - rect.top;
        } else {
          mouseParams.x = event.x;
          mouseParams.y = event.y;
        }
    }
    
    const handleMouseLeave = () => {
        mouseParams.x = null;
        mouseParams.y = null;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      resizeObserver?.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [embedded]);

  return (
    <canvas 
        ref={canvasRef} 
        className={
          embedded
            ? "absolute inset-0 w-full h-full z-0 pointer-events-none"
            : "fixed top-0 left-0 w-full h-full -z-10 bg-slate-950"
        }
    />
  );
};

export default NeuralBackground;

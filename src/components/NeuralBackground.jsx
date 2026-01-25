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

const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Re-initialize particles on resize or keep them? 
    // For simplicity, we just update bounds in the loop or let them bounce off new bounds.
    // But since Particle stores canvas dimensions, we should probably update them on resize or pass canvas to update.
    // Let's just re-init on mount for now, and handle bounds dynamically in a better impl, 
    // but here we will just pass canvas dims to the particle instance or check against canvas.width in update (if we passed canvas).
    // The Refactored Particle class stores initial dims. Let's make it robust by updating the bounds check to use current canvas dims.
    // Actually, to avoid complexity, I'll pass canvas width/height to update.

    let particles = []; // Use let to allow reassignment if needed
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
        // Update with current canvas dimensions for bounds checking
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
        mouseParams.x = event.x;
        mouseParams.y = event.y;
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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-950"
    />
  );
};

export default NeuralBackground;

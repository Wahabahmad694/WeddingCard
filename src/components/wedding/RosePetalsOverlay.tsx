import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  type: "petal" | "gold";
}

const RosePetalsOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const petalColors = [
      "rgba(225, 29, 72, 0.45)", // Crimson rose
      "rgba(244, 63, 94, 0.4)",  // Rose
      "rgba(251, 113, 133, 0.35)", // Soft petal
      "rgba(190, 18, 60, 0.5)",  // Deep maroon
    ];

    const goldColors = [
      "rgba(212, 175, 55, 0.5)",
      "rgba(255, 215, 0, 0.45)",
      "rgba(250, 204, 21, 0.4)",
    ];

    const petalCount = window.innerWidth < 768 ? 18 : 32;

    const petals: Petal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      speedX: Math.random() * 1.5 - 0.75,
      speedY: Math.random() * 1.5 + 0.8,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      color:
        Math.random() > 0.3
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : goldColors[Math.floor(Math.random() * goldColors.length)],
      opacity: Math.random() * 0.5 + 0.3,
      type: Math.random() > 0.3 ? "petal" : "gold",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === "petal") {
          // Draw realistic rose petal bezier curve
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, p.size / 2, 0, p.size * 1.5);
          ctx.bezierCurveTo(-p.size, p.size / 2, -p.size / 2, -p.size / 2, 0, 0);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else {
          // Gold sparkle particle
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#ffd700";
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 w-full h-full"
    />
  );
};

export default RosePetalsOverlay;

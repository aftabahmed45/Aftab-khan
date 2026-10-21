import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const HeroSignalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Microwave transmission nodes
    const nodes = [
      { x: 0.12 * width, y: 0.5 * height, label: 'Node A · Sector 01' },
      { x: 0.38 * width, y: 0.32 * height, label: 'Repeater · High Site' },
      { x: 0.65 * width, y: 0.62 * height, label: 'Hub · RTN 980' },
      { x: 0.88 * width, y: 0.42 * height, label: 'Core · NOC Gateway' },
    ];

    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Check theme for colors
      const isDark = theme === 'dark';
      const waveColor = isDark ? 'rgba(163, 230, 53, ' : 'rgba(101, 163, 13, ';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.025)' : 'rgba(0, 0, 0, 0.035)';

      // Draw faint polar / Cartesian coordinate grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw carrier sine waves representing microwave propagating modes (e.g. 18 GHz carrier)
      const waves = [
        { amp: 32, freq: 0.008, speed: 1.5, opacity: 0.35, offset: 0 },
        { amp: 20, freq: 0.014, speed: -1.2, opacity: 0.25, offset: Math.PI / 3 },
        { amp: 45, freq: 0.005, speed: 0.8, opacity: 0.18, offset: Math.PI / 2 },
      ];

      waves.forEach((w) => {
        ctx.beginPath();
        ctx.strokeStyle = `${waveColor}${w.opacity})`;
        ctx.lineWidth = 1.5;

        for (let x = 0; x <= width; x += 4) {
          const y = height * 0.5 + Math.sin(x * w.freq + t * w.speed + w.offset) * w.amp * Math.cos(t * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Update node positions based on width/height
      nodes[0].x = 0.12 * width;
      nodes[0].y = 0.55 * height;
      nodes[1].x = 0.38 * width;
      nodes[1].y = 0.35 * height;
      nodes[2].x = 0.65 * width;
      nodes[2].y = 0.6 * height;
      nodes[3].x = 0.88 * width;
      nodes[3].y = 0.4 * height;

      // Draw microwave hops between nodes
      for (let i = 0; i < nodes.length - 1; i++) {
        const n1 = nodes[i];
        const n2 = nodes[i + 1];

        // Line of Sight path
        ctx.beginPath();
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated signal photon packet
        const progress = (t * 0.6 + i * 0.33) % 1;
        const px = n1.x + (n2.x - n1.x) * progress;
        const py = n1.y + (n2.y - n1.y) * progress;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#a3e635' : '#65a30d';
        ctx.shadowColor = isDark ? '#a3e635' : '#65a30d';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Nodes
      nodes.forEach((n, idx) => {
        // Outer concentric wave pulse
        const pulse = (t * 1.5 + idx * 0.8) % 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6 + pulse * 14, 0, Math.PI * 2);
        ctx.strokeStyle = `${waveColor}${Math.max(0, 0.4 - pulse * 0.2)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node center
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#18181b' : '#ffffff';
        ctx.strokeStyle = isDark ? '#a3e635' : '#65a30d';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        // Node Label
        ctx.fillStyle = isDark ? '#71717a' : '#64748b';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + 18);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-b from-slate-100 to-white dark:from-[#0c1017] dark:to-[#08090d] shadow-sm">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-zinc-400">
        <span className="h-2 w-2 rounded-full bg-[#65a30d] dark:bg-[#a3e635] animate-pulse" />
        <span>Microwave Propagation & Node Topology Model</span>
      </div>
      <div className="absolute top-4 right-4 z-10 text-[10px] font-mono text-slate-400 dark:text-zinc-500">
        18 GHz · LOS Link Simulation
      </div>
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
};

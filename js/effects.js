class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  clear() {
    this.particles = [];
  }

  spawn(x, y, options) {
    const count = options.count || 5;
    for (let i = 0; i < count; i++) {
      const angle = options.angle !== undefined ? options.angle + (Math.random() - 0.5) * (options.spread || Math.PI * 2) : Math.random() * Math.PI * 2;
      const speed = options.speed !== undefined ? options.speed * (0.5 + Math.random() * 0.8) : 2 + Math.random() * 3;
      this.particles.push({
        x: x + (Math.random() - 0.5) * (options.scatter || 0),
        y: y + (Math.random() - 0.5) * (options.scatter || 0),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        _frame: 0,
        maxLife: options.maxLife || 40,
        color: Array.isArray(options.color) ? options.color[Math.floor(Math.random() * options.color.length)] : (options.color || '#FFFFFF'),
        size: options.size !== undefined ? options.size * (0.6 + Math.random() * 0.8) : 4,
        type: options.type || 'circle',
        gravity: options.gravity !== undefined ? options.gravity : 0.1,
      });
    }
  }

  spawnDeath(x, y, playerColor) {
    const colors = [playerColor, '#FFFFFF', '#FFD700', '#FF6B35'];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const speed = 3 + Math.random() * 5;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        _frame: 0,
        maxLife: 50 + Math.floor(Math.random() * 20),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 5,
        type: 'circle',
        gravity: 0.15,
      });
    }
  }

  spawnJump(x, y) {
    for (let i = 0; i < 5; i++) {
      const angle = Math.PI / 2 + (Math.random() - 0.5) * 0.8;
      const speed = 1.5 + Math.random() * 2;
      this.particles.push({
        x: x + (Math.random() - 0.5) * 16,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.5,
        life: 1,
        _frame: 0,
        maxLife: 20 + Math.floor(Math.random() * 10),
        color: '#C8B88A',
        size: 2 + Math.random() * 2,
        type: 'circle',
        gravity: 0.08,
      });
    }
  }

  spawnOrb(x, y, color) {
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const speed = 2.5 + Math.random() * 2;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        _frame: 0,
        maxLife: 30,
        color: color || '#FFD700',
        size: 3 + Math.random() * 2,
        type: 'circle',
        gravity: 0,
      });
    }
  }

  spawnFinish(x, y) {
    const colors = ['#FFD700', '#FF6B35', '#4CAF50', '#2196F3', '#E040FB', '#FFFFFF', '#FFC107'];
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      this.particles.push({
        x: x + (Math.random() - 0.5) * 100,
        y: y + (Math.random() - 0.5) * 100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 1,
        _frame: 0,
        maxLife: 60 + Math.floor(Math.random() * 30),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        type: 'circle',
        gravity: 0.05,
      });
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p._frame++;
      p.life = Math.max(0, 1 - p._frame / p.maxLife);
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  render(ctx, cameraX) {
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = p.life * 0.9;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x - cameraX, p.y, Math.max(0.5, p.size * p.life + 0.5), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

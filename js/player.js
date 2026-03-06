class Player {
  constructor(x, y, speed, color) {
    this.worldX = x;
    this.y = y;
    this.width = PLAYER_SIZE;
    this.height = PLAYER_SIZE;
    this.velocityY = 0;
    this.speed = speed;
    this.onGround = false;
    this.onCeiling = false;
    this.rotation = 0;
    this.mode = 'cube';
    this.gravityDir = 1;
    this.isDead = false;
    this.color = color;
    this.innerColor = '#FFD700';
    this.shipThrusting = false;
  }

  jump() {
    if (this.isDead) return;
    switch (this.mode) {
      case 'cube':
        if (this.onGround) {
          this.velocityY = JUMP_VELOCITY * this.gravityDir;
          this.onGround = false;
        }
        break;
      case 'ship':
        // Ship uses hold-based thrust
        break;
      case 'ball':
        if (this.onGround || this.onCeiling) {
          this.gravityDir *= -1;
          this.velocityY = 0;
          this.onGround = false;
          this.onCeiling = false;
        }
        break;
      case 'ufo':
        this.velocityY = JUMP_VELOCITY * 0.65 * this.gravityDir;
        break;
    }
  }

  release() {
    if (this.mode === 'ship') {
      this.shipThrusting = false;
    }
  }

  startShipThrust() {
    this.shipThrusting = true;
  }

  update() {
    if (this.isDead) return;

    switch (this.mode) {
      case 'cube':
        this.velocityY += GRAVITY * this.gravityDir;
        this.velocityY = Math.max(-20, Math.min(20, this.velocityY));
        break;
      case 'ship':
        if (this.shipThrusting) {
          this.velocityY -= GRAVITY * 2.5 * this.gravityDir;
        } else {
          this.velocityY += GRAVITY * 1.8 * this.gravityDir;
        }
        this.velocityY = Math.max(-12, Math.min(12, this.velocityY));
        break;
      case 'ball':
        this.velocityY += GRAVITY * this.gravityDir * 0.9;
        this.velocityY = Math.max(-16, Math.min(16, this.velocityY));
        break;
      case 'ufo':
        this.velocityY += GRAVITY * 1.3 * this.gravityDir;
        this.velocityY = Math.max(-10, Math.min(10, this.velocityY));
        break;
    }

    this.worldX += this.speed;
    this.y += this.velocityY;

    // Rotation
    if (!this.onGround && !this.onCeiling) {
      this.rotation += this.speed * 0.07;
    } else {
      // Snap to nearest 90 degrees smoothly
      const target = Math.round(this.rotation / (Math.PI / 2)) * (Math.PI / 2);
      this.rotation += (target - this.rotation) * 0.2;
    }

  }

  getBounds() {
    return { x: this.worldX, y: this.y, w: this.width, h: this.height };
  }

  getScreenBounds(cameraX) {
    return { x: this.worldX - cameraX, y: this.y, w: this.width, h: this.height };
  }

  render(ctx, cameraX) {
    const sx = this.worldX - cameraX;
    const sy = this.y;
    const cx = sx + this.width / 2;
    const cy = sy + this.height / 2;

    ctx.save();
    ctx.translate(cx, cy);

    switch (this.mode) {
      case 'cube':
        this._drawCube(ctx);
        break;
      case 'ship':
        this._drawShip(ctx);
        break;
      case 'ball':
        this._drawBall(ctx);
        break;
      case 'ufo':
        this._drawUfo(ctx);
        break;
    }

    ctx.restore();
  }

  _drawCube(ctx) {
    ctx.rotate(this.rotation);
    const s = this.width / 2;

    // Outer square
    ctx.fillStyle = this.color;
    ctx.fillRect(-s, -s, this.width, this.height);

    // Dark border
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(-s + 1, -s + 1, this.width - 2, this.height - 2);

    // Inner square
    const innerSize = s * 0.55;
    ctx.fillStyle = this.innerColor;
    ctx.fillRect(-innerSize, -innerSize, innerSize * 2, innerSize * 2);

    // Corner dots
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    const dc = s - 6;
    const dr = 3;
    ctx.beginPath(); ctx.arc(-dc, -dc, dr, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(dc, -dc, dr, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-dc, dc, dr, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(dc, dc, dr, 0, Math.PI * 2); ctx.fill();
  }

  _drawShip(ctx) {
    const w = this.width;
    const h = this.height;

    // Ship body - arrow/rocket pointing right
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);         // nose
    ctx.lineTo(-w / 4, -h / 2);   // top-back
    ctx.lineTo(-w / 2, -h / 3);
    ctx.lineTo(-w / 2, h / 3);
    ctx.lineTo(-w / 4, h / 2);    // bottom-back
    ctx.closePath();
    ctx.fill();

    // Dark outline
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Cockpit
    ctx.fillStyle = '#87CEEB';
    ctx.beginPath();
    ctx.arc(w / 8, 0, h / 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath();
    ctx.arc(w / 8 - 2, -2, h / 10, 0, Math.PI * 2);
    ctx.fill();

    // Thruster flame when thrusting
    if (this.shipThrusting) {
      ctx.fillStyle = '#FF8C00';
      ctx.beginPath();
      ctx.moveTo(-w / 2, -h / 5);
      ctx.lineTo(-w / 2 - 14, 0);
      ctx.lineTo(-w / 2, h / 5);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#FFFF00';
      ctx.beginPath();
      ctx.moveTo(-w / 2, -h / 8);
      ctx.lineTo(-w / 2 - 8, 0);
      ctx.lineTo(-w / 2, h / 8);
      ctx.closePath();
      ctx.fill();
    }
  }

  _drawBall(ctx) {
    ctx.rotate(this.rotation);
    const r = this.width / 2;

    // Main circle
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    // Dark border
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner line
    ctx.strokeStyle = this.innerColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-r + 4, 0);
    ctx.lineTo(r - 4, 0);
    ctx.stroke();

    // Center dot
    ctx.fillStyle = this.innerColor;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawUfo(ctx) {
    const w = this.width;
    const h = this.height;

    // Bottom saucer dish
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, h / 8, w / 2, h / 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Top dome
    ctx.fillStyle = this.innerColor;
    ctx.beginPath();
    ctx.ellipse(0, -h / 6, w / 3.5, h / 3.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dome window
    ctx.fillStyle = '#87CEEB';
    ctx.beginPath();
    ctx.ellipse(-2, -h / 6, w / 6, h / 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bottom lights
    ctx.fillStyle = '#FFFFFF';
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.arc(i * w / 4, h / 4, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

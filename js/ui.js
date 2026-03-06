class UIRenderer {
  constructor() {
    this._menuCubeX = 80;
    this._menuCubeY = 200;
    this._menuCubeVY = -3;
    this._menuCubeRot = 0;
  }

  // ── helpers ──────────────────────────────────────────────────────────────

  drawButton(ctx, x, y, w, h, text, hovered, color) {
    const r = 8;
    ctx.fillStyle = hovered ? (color ? lightenColor(color, 20) : COLORS.UI_BTN_HOVER) : (color || COLORS.UI_BTN);
    roundRect(ctx, x, y, w, h, r);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, w, h, r);
    ctx.stroke();

    ctx.fillStyle = COLORS.UI_TEXT;
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + w / 2, y + h / 2);
  }

  isHovered(mousePos, x, y, w, h) {
    if (!mousePos) return false;
    return mousePos.x >= x && mousePos.x <= x + w && mousePos.y >= y && mousePos.y <= y + h;
  }

  // ── drawBackground ────────────────────────────────────────────────────────

  drawBackground(ctx, level, cameraX) {
    // Sky gradient
    const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    grad.addColorStop(0, level.bgTop);
    grad.addColorStop(1, level.bgBottom);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  // ── drawObject ────────────────────────────────────────────────────────────

  drawObject(ctx, obj, cameraX) {
    const sx = obj.x - cameraX;
    // Cull objects far off screen
    const objW = obj.w || (obj.r ? obj.r * 2 : 40);
    if (sx + objW < -20 || sx > CANVAS_WIDTH + 20) return;

    switch (obj.type) {
      case 'platform':
        this._drawPlatform(ctx, obj, sx);
        break;
      case 'spike':
        this._drawSpike(ctx, obj, sx, false);
        break;
      case 'spike_down':
        this._drawSpike(ctx, obj, sx, true);
        break;
      case 'orb':
        this._drawOrb(ctx, obj, sx);
        break;
      case 'pad':
        this._drawPad(ctx, obj, sx, false);
        break;
      case 'pad_gravity':
        this._drawPad(ctx, obj, sx, true);
        break;
      case 'portal_gravity':
        this._drawPortal(ctx, obj, sx, 'gravity');
        break;
      case 'portal_cube':
        this._drawPortal(ctx, obj, sx, 'cube');
        break;
      case 'portal_ship':
        this._drawPortal(ctx, obj, sx, 'ship');
        break;
      case 'portal_ball':
        this._drawPortal(ctx, obj, sx, 'ball');
        break;
      case 'portal_ufo':
        this._drawPortal(ctx, obj, sx, 'ufo');
        break;
      case 'speed_ring':
        this._drawSpeedRing(ctx, obj, sx);
        break;
      case 'finish':
        this._drawFinish(ctx, obj, sx);
        break;
      case 'deco_cloud':
        this._drawCloud(ctx, obj, sx);
        break;
      case 'deco_mountain':
        this._drawMountain(ctx, obj, sx);
        break;
    }
  }

  _drawPlatform(ctx, obj, sx) {
    ctx.fillStyle = obj.color || '#4CAF50';
    ctx.fillRect(sx, obj.y, obj.w, obj.h);
    // Darker top edge
    ctx.fillStyle = shadeColor(obj.color || '#4CAF50', -30);
    ctx.fillRect(sx, obj.y, obj.w, 4);
  }

  _drawSpike(ctx, obj, sx, down) {
    ctx.fillStyle = obj.color || '#FF5722';
    const x = sx;
    const y = obj.y;
    const w = obj.w || 40;
    const h = obj.h || 40;
    // Draw a single triangle spike per tile width
    const count = Math.round(w / 40);
    for (let i = 0; i < count; i++) {
      const tx = x + i * 40;
      ctx.beginPath();
      if (!down) {
        ctx.moveTo(tx,       y + h); // bottom-left
        ctx.lineTo(tx + 40,  y + h); // bottom-right
        ctx.lineTo(tx + 20,  y);     // apex
      } else {
        ctx.moveTo(tx,       y);      // top-left
        ctx.lineTo(tx + 40,  y);      // top-right
        ctx.lineTo(tx + 20,  y + h);  // apex (points down)
      }
      ctx.closePath();
      ctx.fill();
      // Outline
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  _drawOrb(ctx, obj, sx) {
    const r = obj.r || 16;
    // Outer circle
    ctx.fillStyle = obj.color || '#FFD700';
    ctx.beginPath();
    ctx.arc(sx, obj.y, r, 0, Math.PI * 2);
    ctx.fill();
    // Inner white ring
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(sx, obj.y, r - 4, 0, Math.PI * 2);
    ctx.stroke();
    // Center dot
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(sx, obj.y, r * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawPad(ctx, obj, sx, gravity) {
    const r = 6;
    ctx.fillStyle = gravity ? '#FF6B35' : (obj.color || '#FFC107');
    roundRect(ctx, sx, obj.y, obj.w, obj.h, r);
    ctx.fill();
    // Arrow decoration
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    const cx = sx + obj.w / 2;
    const cy = obj.y + obj.h / 2;
    const aw = 10, ah = 7;
    if (!gravity) {
      ctx.moveTo(cx,      cy - ah);
      ctx.lineTo(cx + aw, cy + ah);
      ctx.lineTo(cx - aw, cy + ah);
    } else {
      ctx.moveTo(cx,      cy + ah);
      ctx.lineTo(cx + aw, cy - ah);
      ctx.lineTo(cx - aw, cy - ah);
    }
    ctx.closePath();
    ctx.fill();
  }

  _drawPortal(ctx, obj, sx, mode) {
    const w = obj.w || 30;
    const h = obj.h || 200;
    const colors = {
      gravity: '#FF6B35',
      cube:    '#FFC107',
      ship:    '#29B6F6',
      ball:    '#4CAF50',
      ufo:     '#CE93D8',
    };
    const col = colors[mode] || '#FFFFFF';

    // Portal frame
    ctx.fillStyle = col + '44';
    roundRect(ctx, sx, obj.y, w, h, 4);
    ctx.fill();
    ctx.strokeStyle = col;
    ctx.lineWidth = 3;
    roundRect(ctx, sx, obj.y, w, h, 4);
    ctx.stroke();

    // Icon in center
    const cx = sx + w / 2;
    const cy = obj.y + h / 2;
    ctx.fillStyle = col;
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const icons = { gravity: '↕', cube: '□', ship: '▶', ball: '●', ufo: '◎' };
    ctx.fillText(icons[mode] || '?', cx, cy);
  }

  _drawSpeedRing(ctx, obj, sx) {
    const r = obj.r || 18;
    const col = obj.speedMult > 1 ? '#FF5722' : (obj.speedMult < 1 ? '#29B6F6' : '#FFFFFF');
    ctx.strokeStyle = col;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(sx, obj.y, r, 0, Math.PI * 2);
    ctx.stroke();
    // Inner ring
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(sx, obj.y, r - 5, 0, Math.PI * 2);
    ctx.stroke();
    // Arrow inside
    ctx.fillStyle = col;
    ctx.beginPath();
    const s = 6;
    if (obj.speedMult >= 1) {
      ctx.moveTo(sx - s, obj.y - s);
      ctx.lineTo(sx + s, obj.y);
      ctx.lineTo(sx - s, obj.y + s);
    } else {
      ctx.moveTo(sx + s, obj.y - s);
      ctx.lineTo(sx - s, obj.y);
      ctx.lineTo(sx + s, obj.y + s);
    }
    ctx.closePath();
    ctx.fill();
  }

  _drawFinish(ctx, obj, sx) {
    // Glowing vertical beam
    const grad = ctx.createLinearGradient(sx, obj.y, sx + obj.w, obj.y);
    grad.addColorStop(0, 'rgba(255,215,0,0)');
    grad.addColorStop(0.5, 'rgba(255,215,0,0.9)');
    grad.addColorStop(1, 'rgba(255,215,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(sx - 8, obj.y, obj.w + 16, obj.h);

    ctx.fillStyle = '#FFD700';
    ctx.fillRect(sx, obj.y, obj.w, obj.h);

    // Checkered pattern
    ctx.fillStyle = '#000';
    const cs = 10;
    for (let row = 0; row * cs < obj.h; row++) {
      for (let col = 0; col * cs < obj.w; col++) {
        if ((row + col) % 2 === 0) {
          ctx.fillRect(sx + col * cs, obj.y + row * cs, cs, cs);
        }
      }
    }
  }

  _drawCloud(ctx, obj, sx) {
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    const cx = sx + obj.w / 2;
    const cy = obj.y + obj.h / 2;
    const rx = obj.w / 2;
    const ry = obj.h / 2;
    // Three overlapping circles
    ctx.beginPath();
    ctx.arc(cx - rx * 0.35, cy + ry * 0.2,  ry * 0.75, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx,              cy - ry * 0.1,  ry,        0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + rx * 0.35, cy + ry * 0.2,  ry * 0.75, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawMountain(ctx, obj, sx) {
    ctx.fillStyle = obj.color || '#66BB6A';
    ctx.beginPath();
    ctx.moveTo(sx,                obj.y + obj.h);
    ctx.lineTo(sx + obj.w / 2,   obj.y);
    ctx.lineTo(sx + obj.w,       obj.y + obj.h);
    ctx.closePath();
    ctx.fill();
  }

  // ── drawLevel ─────────────────────────────────────────────────────────────

  drawLevel(ctx, level, cameraX) {
    for (const obj of level.objects) {
      this.drawObject(ctx, obj, cameraX);
    }
    // Draw the main ground line
    ctx.fillStyle = level.groundColor;
    ctx.fillRect(0, GROUND_Y + 40, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y - 40);
  }

  // ── drawHUD ───────────────────────────────────────────────────────────────

  drawHUD(ctx, player, level, progress, attempts) {
    ctx.save();

    // Top-left: level name
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    roundRect(ctx, 8, 8, 180, 30, 6);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Level: ' + level.name, 16, 23);

    // Top-center: progress bar
    const barW = 240;
    const barH = 18;
    const barX = CANVAS_WIDTH / 2 - barW / 2;
    const barY = 10;
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    roundRect(ctx, barX - 2, barY - 2, barW + 4, barH + 4, 6);
    ctx.fill();
    ctx.fillStyle = '#444';
    roundRect(ctx, barX, barY, barW, barH, 5);
    ctx.fill();
    const fillW = Math.max(0, (progress / 100) * barW);
    if (fillW > 0) {
      ctx.fillStyle = '#4CAF50';
      roundRect(ctx, barX, barY, fillW, barH, 5);
      ctx.fill();
    }
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(progress + '%', CANVAS_WIDTH / 2, barY + barH / 2);

    // Top-right: attempt
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    roundRect(ctx, CANVAS_WIDTH - 140, 8, 132, 30, 6);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('Attempt ' + attempts, CANVAS_WIDTH - 12, 23);

    // Bottom-right: mode icon
    if (player) {
      const modeColors = { cube: '#FF6B35', ship: '#29B6F6', ball: '#4CAF50', ufo: '#CE93D8' };
      const modeLabel  = player.mode.charAt(0).toUpperCase() + player.mode.slice(1);
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      roundRect(ctx, CANVAS_WIDTH - 90, CANVAS_HEIGHT - 38, 82, 30, 6);
      ctx.fill();
      ctx.fillStyle = modeColors[player.mode] || '#FFF';
      ctx.font = 'bold 13px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(modeLabel, CANVAS_WIDTH - 49, CANVAS_HEIGHT - 23);
    }

    ctx.restore();
  }

  // ── drawDeathScreen ───────────────────────────────────────────────────────

  drawDeathScreen(ctx, progress, attempts, playerColor) {
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = '#FF3333';
    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText('ATTEMPT FAILED', CANVAS_WIDTH / 2 + 3, 153);
    ctx.fillStyle = '#FF3333';
    ctx.fillText('ATTEMPT FAILED', CANVAS_WIDTH / 2, 150);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText('Reached: ' + progress + '%', CANVAS_WIDTH / 2, 208);

    ctx.fillStyle = '#AAAAAA';
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText('Attempt #' + attempts, CANVAS_WIDTH / 2, 242);

    // Restart button
    const bx = CANVAS_WIDTH / 2 - 100;
    this.drawButton(ctx, bx, 270, 200, 50, 'RESTART', false, '#2E7D32');

    // Menu button
    this.drawButton(ctx, CANVAS_WIDTH / 2 - 75, 338, 150, 40, 'MENU', false, '#555');

    ctx.restore();
  }

  // ── drawWinScreen ─────────────────────────────────────────────────────────

  drawWinScreen(ctx, level, progress, attempts, bestProgress, hasNext) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Gold title
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.font = 'bold 44px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LEVEL COMPLETE!', CANVAS_WIDTH / 2 + 3, 83);
    ctx.fillStyle = '#FFD700';
    ctx.fillText('LEVEL COMPLETE!', CANVAS_WIDTH / 2, 80);

    // Level name
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fillText(level.name, CANVAS_WIDTH / 2, 125);

    // 100%
    ctx.fillStyle = '#4CAF50';
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.fillText('100%', CANVAS_WIDTH / 2, 160);

    // Stars (1-3 based on attempts)
    const starCount = attempts <= 5 ? 3 : attempts <= 15 ? 2 : 1;
    const starY = 198;
    ctx.font = '28px Arial, sans-serif';
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < starCount ? '#FFD700' : '#555';
      ctx.fillText('★', CANVAS_WIDTH / 2 + (i - 1) * 40, starY);
    }

    // Stats
    ctx.fillStyle = '#CCCCCC';
    ctx.font = '15px Arial, sans-serif';
    ctx.fillText('Attempts: ' + attempts, CANVAS_WIDTH / 2, 228);
    ctx.fillText('Best: ' + bestProgress + '%', CANVAS_WIDTH / 2, 252);

    // Buttons
    let btnY = 290;
    if (hasNext) {
      this.drawButton(ctx, CANVAS_WIDTH / 2 - 110, btnY, 220, 50, 'NEXT LEVEL ▶', false, '#1565C0');
      btnY += 65;
    }
    this.drawButton(ctx, CANVAS_WIDTH / 2 - 80, btnY, 160, 42, 'RETRY', false, '#555');
    btnY += 55;
    this.drawButton(ctx, CANVAS_WIDTH / 2 - 80, btnY, 160, 40, 'MENU', false, '#333');

    ctx.restore();
  }

  // ── drawMainMenu ──────────────────────────────────────────────────────────

  drawMainMenu(ctx, frame, mousePos) {
    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    grad.addColorStop(0, '#1A237E');
    grad.addColorStop(1, '#283593');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Animated decorative cubes in background
    this._drawMenuDecorations(ctx, frame);

    // Title panel
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    roundRect(ctx, CANVAS_WIDTH / 2 - 200, 30, 400, 120, 12);
    ctx.fill();

    // Title text
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.font = 'bold 62px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GEO DASH', CANVAS_WIDTH / 2 + 3, 83);
    ctx.fillStyle = '#FFC107';
    ctx.fillText('GEO DASH', CANVAS_WIDTH / 2, 80);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fillText('Arcade Edition', CANVAS_WIDTH / 2, 122);

    // Buttons
    const cx = CANVAS_WIDTH / 2;
    const buttons = [
      {x: cx - 100, y: 180, w: 200, h: 50, label: 'PLAY',         color: '#2E7D32'},
      {x: cx - 100, y: 248, w: 200, h: 50, label: 'LEVEL SELECT', color: COLORS.UI_BTN},
      {x: cx - 100, y: 316, w: 200, h: 50, label: 'SETTINGS',     color: COLORS.UI_BTN},
    ];
    for (const btn of buttons) {
      const hov = this.isHovered(mousePos, btn.x, btn.y, btn.w, btn.h);
      this.drawButton(ctx, btn.x, btn.y, btn.w, btn.h, btn.label, hov, btn.color);
    }

    // Hint
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '14px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Press SPACE or Click to Jump', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 18);
  }

  _drawMenuDecorations(ctx, frame) {
    // A few animated bouncing cubes in the background
    const cubes = [
      { baseX: 80,  period: 120, phase: 0,   size: 32, color: '#FF6B35' },
      { baseX: 700, period: 100, phase: 40,  size: 28, color: '#29B6F6' },
      { baseX: 400, period: 140, phase: 70,  size: 24, color: '#4CAF50' },
      { baseX: 200, period: 110, phase: 20,  size: 22, color: '#CE93D8' },
      { baseX: 600, period: 130, phase: 90,  size: 30, color: '#FFD700' },
    ];
    for (const c of cubes) {
      const t = (frame + c.phase) % c.period / c.period;
      const bounce = Math.abs(Math.sin(t * Math.PI));
      const cy = CANVAS_HEIGHT - 60 - bounce * 180;
      const rot = ((frame + c.phase) * 0.04) % (Math.PI * 2);
      ctx.save();
      ctx.translate(c.baseX, cy);
      ctx.rotate(rot);
      ctx.fillStyle = c.color + '88';
      ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
      ctx.strokeStyle = c.color;
      ctx.lineWidth = 2;
      ctx.strokeRect(-c.size / 2, -c.size / 2, c.size, c.size);
      ctx.restore();
    }
  }

  // ── drawLevelSelect ───────────────────────────────────────────────────────

  drawLevelSelect(ctx, levels, saveData, mousePos, scrollY) {
    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    grad.addColorStop(0, '#1A237E');
    grad.addColorStop(1, '#283593');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Header
    ctx.fillStyle = '#FFC107';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SELECT LEVEL', CANVAS_WIDTH / 2, 45);

    const diffColors = {
      'Easy':   '#4CAF50',
      'Normal': '#2196F3',
      'Hard':   '#FF9800',
      'Harder': '#F44336',
      'Insane': '#9C27B0',
    };

    const cardX = 40;
    const cardW = 720;
    const cardH = 82;
    const cardSpacing = 96;

    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      const ld = SaveSystem.getLevelData(saveData, i);
      const cardY = 74 + i * cardSpacing - scrollY;

      if (cardY + cardH < 0 || cardY > CANVAS_HEIGHT - 40) continue;

      const hov = this.isHovered(mousePos, cardX, cardY, cardW, cardH);

      // Card background
      ctx.fillStyle = hov ? 'rgba(92,107,192,0.85)' : 'rgba(40,53,147,0.85)';
      roundRect(ctx, cardX, cardY, cardW, cardH, 10);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1.5;
      roundRect(ctx, cardX, cardY, cardW, cardH, 10);
      ctx.stroke();

      // Level number circle
      const circleX = cardX + 50;
      const circleY = cardY + cardH / 2;
      ctx.fillStyle = diffColors[level.difficulty] || '#FFF';
      ctx.beginPath();
      ctx.arc(circleX, circleY, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(level.id), circleX, circleY);

      // Level name
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(level.name, cardX + 90, cardY + 22);

      // Difficulty tag
      const diffCol = diffColors[level.difficulty] || '#FFF';
      ctx.fillStyle = diffCol;
      ctx.font = 'bold 12px Arial, sans-serif';
      ctx.fillText('[' + level.difficulty + ']', cardX + 90, cardY + 44);

      // Description
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '13px Arial, sans-serif';
      ctx.fillText(level.description, cardX + 90, cardY + 64);

      // Right: progress & star
      const rightX = cardX + cardW - 20;
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFC107';
      ctx.font = 'bold 18px Arial, sans-serif';
      ctx.fillText(ld.bestProgress + '%', rightX, cardY + 28);

      if (ld.completed) {
        ctx.fillStyle = '#FFD700';
        ctx.font = '22px Arial';
        ctx.fillText('★', rightX, cardY + 58);
      }
    }

    // Back button
    const backHov = this.isHovered(mousePos, 20, CANVAS_HEIGHT - 52, 100, 40);
    this.drawButton(ctx, 20, CANVAS_HEIGHT - 52, 100, 40, '← Back', backHov, '#555');
  }

  // ── drawSettings ──────────────────────────────────────────────────────────

  drawSettings(ctx, settings, mousePos) {
    const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    grad.addColorStop(0, '#1A237E');
    grad.addColorStop(1, '#283593');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = '#FFC107';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SETTINGS', CANVAS_WIDTH / 2, 60);

    const panelX = CANVAS_WIDTH / 2 - 200;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    roundRect(ctx, panelX, 100, 400, 220, 12);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Music Volume', panelX + 20, 140);
    this._drawSlider(ctx, panelX + 20, 165, 360, settings.musicVol);

    ctx.fillText('SFX Volume', panelX + 20, 220);
    this._drawSlider(ctx, panelX + 20, 245, 360, settings.sfxVol);

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '13px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('(Audio not yet implemented in this build)', CANVAS_WIDTH / 2, 310);

    const backHov = this.isHovered(mousePos, 20, CANVAS_HEIGHT - 52, 100, 40);
    this.drawButton(ctx, 20, CANVAS_HEIGHT - 52, 100, 40, '← Back', backHov, '#555');
  }

  _drawSlider(ctx, x, y, w, value) {
    const h = 8;
    // Track
    ctx.fillStyle = '#555';
    roundRect(ctx, x, y, w, h, 4);
    ctx.fill();
    // Fill
    ctx.fillStyle = '#FFC107';
    roundRect(ctx, x, y, w * value, h, 4);
    ctx.fill();
    // Thumb
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x + w * value, y + h / 2, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFC107';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// ── Utility functions ─────────────────────────────────────────────────────

function roundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y,     x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x,     y + h, r);
  ctx.arcTo(x,     y + h, x,     y,     r);
  ctx.arcTo(x,     y,     x + w, y,     r);
  ctx.closePath();
}

function shadeColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xFF) + amount));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function lightenColor(hex, amount) {
  return shadeColor(hex, amount);
}

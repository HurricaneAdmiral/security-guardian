class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.width  = CANVAS_WIDTH;
    this.height = CANVAS_HEIGHT;

    this.state             = STATE.MAIN_MENU;
    this.saveData          = SaveSystem.load();
    this.particles         = new ParticleSystem();
    this.ui                = new UIRenderer();

    this.currentLevelIndex = 0;
    this.player            = null;
    this.cameraX           = 0;
    this.attempts          = 0;
    this.jumpPressed       = false;
    this.jumpHeld          = false;
    this.mousePos          = null;
    this.levelSelectScroll = 0;

    this.frame      = 0;
    this.deathTimer = 0;
    this.winTimer   = 0;

    // Track which one-shot triggers have fired
    this.triggeredItems = new Set();

    this.setupInput();
    this.loop();
  }

  // ── Input ─────────────────────────────────────────────────────────────────

  setupInput() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        this.onJumpStart();
      }
      if (e.code === 'Escape') {
        this.onEscape();
      }
      if (e.code === 'KeyR' && this.state === STATE.DEATH) {
        this.restartLevel();
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        this.onJumpRelease();
      }
    });

    this.canvas.addEventListener('mousedown', (e) => {
      const pos = this.getCanvasPos(e);
      this.onMouseDown(pos);
    });

    this.canvas.addEventListener('mouseup', () => {
      this.onJumpRelease();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      this.mousePos = this.getCanvasPos(e);
    });

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.onJumpStart();
    }, { passive: false });

    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.onJumpRelease();
    }, { passive: false });
  }

  getCanvasPos(e) {
    const rect   = this.canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH  / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY,
    };
  }

  onJumpStart() {
    this.jumpPressed = true;
    this.jumpHeld    = true;

    if (this.state === STATE.PLAYING && this.player && !this.player.isDead) {
      this.player.jump();
      if (this.player.mode === 'ship') {
        this.player.startShipThrust();
      }
    }

    if (this.state === STATE.DEATH && this.deathTimer > 30) {
      this.restartLevel();
    }

    if (this.state === STATE.MAIN_MENU) {
      this.startLevel(0);
    }
  }

  onJumpRelease() {
    this.jumpHeld = false;
    if (this.player) this.player.release();
  }

  onEscape() {
    if (this.state === STATE.PLAYING || this.state === STATE.DEATH || this.state === STATE.WIN) {
      this.state = STATE.MAIN_MENU;
    } else if (this.state === STATE.LEVEL_SELECT || this.state === STATE.SETTINGS) {
      this.state = STATE.MAIN_MENU;
    }
  }

  onMouseDown(pos) {
    switch (this.state) {
      case STATE.MAIN_MENU:     this.handleMainMenuClick(pos);    break;
      case STATE.LEVEL_SELECT:  this.handleLevelSelectClick(pos); break;
      case STATE.SETTINGS:      this.handleSettingsClick(pos);    break;
      case STATE.PLAYING:       this.onJumpStart();               break;
      case STATE.DEATH:         this.handleDeathClick(pos);       break;
      case STATE.WIN:           this.handleWinClick(pos);         break;
    }
  }

  // ── Menu button regions ───────────────────────────────────────────────────

  getMainMenuButtons() {
    const cx = CANVAS_WIDTH / 2;
    return [
      { x: cx - 100, y: 180, w: 200, h: 50, action: 'play'         },
      { x: cx - 100, y: 248, w: 200, h: 50, action: 'level_select' },
      { x: cx - 100, y: 316, w: 200, h: 50, action: 'settings'     },
    ];
  }

  handleMainMenuClick(pos) {
    for (const btn of this.getMainMenuButtons()) {
      if (this.pointInRect(pos, btn)) {
        this.executeMenuAction(btn.action);
        return;
      }
    }
  }

  executeMenuAction(action) {
    switch (action) {
      case 'play':         this.startLevel(0);                break;
      case 'level_select': this.state = STATE.LEVEL_SELECT;   break;
      case 'settings':     this.state = STATE.SETTINGS;       break;
    }
  }

  handleLevelSelectClick(pos) {
    // Back button
    if (this.pointInRect(pos, { x: 20, y: CANVAS_HEIGHT - 52, w: 100, h: 40 })) {
      this.state = STATE.MAIN_MENU;
      return;
    }
    const cardSpacing = 96;
    for (let i = 0; i < LEVELS.length; i++) {
      const cardY = 74 + i * cardSpacing - this.levelSelectScroll;
      if (this.pointInRect(pos, { x: 40, y: cardY, w: 720, h: 82 })) {
        if (this.isLevelUnlocked(i)) {
          this.startLevel(i);
        }
        return;
      }
    }
  }

  isLevelUnlocked(index) {
    if (index === 0) return true;
    return SaveSystem.getLevelData(this.saveData, index - 1).completed;
  }

  handleSettingsClick(pos) {
    if (this.pointInRect(pos, { x: 20, y: CANVAS_HEIGHT - 52, w: 100, h: 40 })) {
      this.state = STATE.MAIN_MENU;
    }
  }

  handleDeathClick(pos) {
    if (this.deathTimer < 20) return;
    if (this.pointInRect(pos, { x: CANVAS_WIDTH / 2 - 100, y: 270, w: 200, h: 50 })) {
      this.restartLevel();
      return;
    }
    if (this.pointInRect(pos, { x: CANVAS_WIDTH / 2 - 75, y: 338, w: 150, h: 40 })) {
      this.state = STATE.MAIN_MENU;
    }
  }

  handleWinClick(pos) {
    let btnY = 290;
    if (this.currentLevelIndex < LEVELS.length - 1) {
      if (this.pointInRect(pos, { x: CANVAS_WIDTH / 2 - 110, y: btnY, w: 220, h: 50 })) {
        this.startLevel(this.currentLevelIndex + 1);
        return;
      }
      btnY += 65;
    }
    if (this.pointInRect(pos, { x: CANVAS_WIDTH / 2 - 80, y: btnY, w: 160, h: 42 })) {
      this.restartLevel();
      return;
    }
    btnY += 55;
    if (this.pointInRect(pos, { x: CANVAS_WIDTH / 2 - 80, y: btnY, w: 160, h: 40 })) {
      this.state = STATE.MAIN_MENU;
    }
  }

  pointInRect(pos, rect) {
    return pos.x >= rect.x && pos.x <= rect.x + rect.w &&
           pos.y >= rect.y && pos.y <= rect.y + rect.h;
  }

  // ── Level lifecycle ───────────────────────────────────────────────────────

  startLevel(index) {
    const level = LEVELS[index];
    this.currentLevelIndex = index;
    this.attempts          = 0;
    this.triggeredItems    = new Set();
    this.initPlayer(level);
    this.cameraX  = this.player.worldX - PLAYER_SCREEN_X;
    this.state    = STATE.PLAYING;
    this.winTimer = 0;
    this.particles.clear();
  }

  initPlayer(level) {
    this.player = new Player(
      PLAYER_SCREEN_X + 100,
      GROUND_Y - PLAYER_SIZE,
      level.speed,
      level.playerColor || '#FF6B35'
    );
    this.player.mode       = 'cube';
    this.player.gravityDir = 1;
    this.player.velocityY  = 0;
  }

  restartLevel() {
    const level = LEVELS[this.currentLevelIndex];
    this.attempts++;
    this.triggeredItems = new Set();
    this.initPlayer(level);
    this.cameraX   = this.player.worldX - PLAYER_SCREEN_X;
    this.state     = STATE.PLAYING;
    this.deathTimer = 0;
    this.particles.clear();
  }

  getProgress() {
    if (!this.player) return 0;
    const level  = LEVELS[this.currentLevelIndex];
    const finish = level.objects.find(o => o.type === 'finish');
    if (!finish) return 0;
    const startX   = PLAYER_SCREEN_X + 100;
    const progress = (this.player.worldX - startX) / (finish.x - startX) * 100;
    return Math.min(100, Math.max(0, Math.round(progress)));
  }

  // ── Main game loop ────────────────────────────────────────────────────────

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  }

  update() {
    this.frame++;

    if (this.state === STATE.PLAYING) {
      this.updateGame();
    } else if (this.state === STATE.DEATH) {
      this.deathTimer++;
      this.particles.update();
    } else if (this.state === STATE.WIN) {
      this.winTimer++;
      this.particles.update();
    }

    // Single-frame jump flag consumed after collision check
    this.jumpPressed = false;
  }

  updateGame() {
    if (!this.player || this.player.isDead) return;

    const level = LEVELS[this.currentLevelIndex];

    // Ship thrust (hold-based) — set BEFORE update() so physics AND render both see it
    if (this.player.mode === 'ship' && this.jumpHeld) {
      this.player.startShipThrust();
    } else if (this.player.mode === 'ship') {
      this.player.shipThrusting = false;
    }

    // Update player physics (moves worldX and y)
    this.player.update();

    // Sync camera
    this.cameraX = this.player.worldX - PLAYER_SCREEN_X;

    // Fall out of world
    if (this.player.y > CANVAS_HEIGHT + PLAYER_SIZE || this.player.y < -PLAYER_SIZE * 3) {
      this.killPlayer();
      return;
    }

    // Reset ground/ceiling flags before collision
    this.player.onGround  = false;
    this.player.onCeiling = false;

    // Run collision detection
    const result = CollisionSystem.checkCollisions(
      this.player,
      level.objects,
      this.jumpPressed,
      this.triggeredItems
    );

    if (result.dead) {
      this.killPlayer();
      return;
    }

    // Apply ground landing (works for both normal and flipped gravity)
    if (result.onGround) {
      if (result.landingY !== null) {
        this.player.y = result.landingY;
      }
      this.player.velocityY = 0;
      this.player.onGround  = true;
      this.player.onCeiling = false;
    }

    // Apply ceiling hit (wrong-direction collision — bounce back / die)
    if (result.onCeiling) {
      if (result.ceilingY !== null) {
        this.player.y = result.ceilingY;
      }
      // Reverse velocity with damping so the player bounces off
      if (this.player.gravityDir === 1 && this.player.velocityY < 0) {
        this.player.velocityY = Math.abs(this.player.velocityY) * 0.3;
      } else if (this.player.gravityDir === -1 && this.player.velocityY > 0) {
        this.player.velocityY = -Math.abs(this.player.velocityY) * 0.3;
      }
    }

    // Process triggered events
    for (const event of result.events) {
      this.processEvent(event);
    }

    // Jump dust particle when landing
    if (result.onGround && this.player.velocityY === 0) {
      // occasional dust
    }

    this.particles.update();
  }

  processEvent(event) {
    const key = event.obj
      ? `${event.type}_${event.obj.x}_${event.obj.y}`
      : event.type;

    switch (event.type) {
      case 'orb': {
        if (!this.triggeredItems.has(key)) {
          this.triggeredItems.add(key);
          this.player.velocityY = JUMP_VELOCITY * this.player.gravityDir;
          this.player.onGround  = false;
          this.player.onCeiling = false;
          const sx = event.obj.x - this.cameraX;
          this.particles.spawnOrb(sx, event.obj.y, event.obj.color || '#FFD700');
          // Allow re-trigger after a short cooldown
          setTimeout(() => this.triggeredItems.delete(key), 400);
        }
        break;
      }

      case 'pad': {
        const padKey = key + '_pad';
        if (!this.triggeredItems.has(padKey)) {
          this.triggeredItems.add(padKey);
          this.player.velocityY = JUMP_VELOCITY * 1.3 * this.player.gravityDir;
          this.player.onGround  = false;
          const sx = event.obj.x - this.cameraX;
          this.particles.spawnJump(sx + (event.obj.w || 40) / 2, event.obj.y);
          setTimeout(() => this.triggeredItems.delete(padKey), 100);
        }
        break;
      }

      case 'pad_gravity': {
        if (!this.triggeredItems.has(key)) {
          this.triggeredItems.add(key);
          this.player.gravityDir *= -1;
          this.player.velocityY   = JUMP_VELOCITY * 1.3 * this.player.gravityDir;
          setTimeout(() => this.triggeredItems.delete(key), 100);
        }
        break;
      }

      case 'portal_gravity': {
        if (!this.triggeredItems.has(key)) {
          this.triggeredItems.add(key);
          this.player.gravityDir *= -1;
          this.player.velocityY   = 0;
          // No cooldown needed - portals are one-shot per run
        }
        break;
      }

      case 'portal_cube': {
        if (!this.triggeredItems.has(key)) {
          this.triggeredItems.add(key);
          this.player.mode = 'cube';
        }
        break;
      }

      case 'portal_ship': {
        if (!this.triggeredItems.has(key)) {
          this.triggeredItems.add(key);
          this.player.mode      = 'ship';
          this.player.velocityY = 0;
        }
        break;
      }

      case 'portal_ball': {
        if (!this.triggeredItems.has(key)) {
          this.triggeredItems.add(key);
          this.player.mode      = 'ball';
          this.player.velocityY = 0;
        }
        break;
      }

      case 'portal_ufo': {
        if (!this.triggeredItems.has(key)) {
          this.triggeredItems.add(key);
          this.player.mode      = 'ufo';
          this.player.velocityY = 0;
        }
        break;
      }

      case 'speed_ring': {
        if (!this.triggeredItems.has(key)) {
          this.triggeredItems.add(key);
          const baseSpeed      = LEVELS[this.currentLevelIndex].speed;
          this.player.speed    = baseSpeed * event.speedMult;
        }
        break;
      }

      case 'finish': {
        this.winLevel();
        break;
      }
    }
  }

  killPlayer() {
    if (this.player.isDead) return;
    const screenX = this.player.worldX - this.cameraX;
    this.particles.spawnDeath(
      screenX + PLAYER_SIZE / 2,
      this.player.y  + PLAYER_SIZE / 2,
      this.player.color
    );
    this.player.isDead = true;
    this.deathTimer    = 0;

    const progress = this.getProgress();
    this.saveData = SaveSystem.updateLevelAttempt(this.saveData, this.currentLevelIndex);
    this.saveData = SaveSystem.updateLevelComplete(this.saveData, this.currentLevelIndex, progress);
    SaveSystem.save(this.saveData);

    this.state = STATE.DEATH;
  }

  winLevel() {
    if (this.state === STATE.WIN) return;
    this.winTimer = 0;
    this.saveData = SaveSystem.updateLevelComplete(this.saveData, this.currentLevelIndex, 100);
    SaveSystem.save(this.saveData);
    this.particles.spawnFinish(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.state = STATE.WIN;
  }

  // ── Render ────────────────────────────────────────────────────────────────

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    switch (this.state) {
      case STATE.MAIN_MENU:
        this.ui.drawMainMenu(ctx, this.frame, this.mousePos);
        break;

      case STATE.LEVEL_SELECT:
        this.ui.drawLevelSelect(ctx, LEVELS, this.saveData, this.mousePos, this.levelSelectScroll);
        break;

      case STATE.SETTINGS:
        this.ui.drawSettings(ctx, this.saveData.settings, this.mousePos);
        break;

      case STATE.PLAYING:
        this.renderGame();
        this.renderHUD();
        break;

      case STATE.DEATH:
        this.renderGame();
        this.particles.render(this.ctx, 0);
        this.renderHUD();
        this.ui.drawDeathScreen(this.ctx, this.getProgress(), this.attempts + 1, this.player ? this.player.color : '#FF6B35');
        break;

      case STATE.WIN:
        this.renderGame();
        this.particles.render(this.ctx, 0);
        this.renderWinScreen();
        break;
    }
  }

  renderGame() {
    const ctx   = this.ctx;
    const level = LEVELS[this.currentLevelIndex];
    this.ui.drawBackground(ctx, level, this.cameraX);
    this.ui.drawLevel(ctx, level, this.cameraX);
    // World-space particles during active play
    if (this.state === STATE.PLAYING) {
      this.particles.render(ctx, this.cameraX);
    }
    if (this.player && !this.player.isDead) {
      this.player.render(ctx, this.cameraX);
    }
  }

  renderHUD() {
    const level = LEVELS[this.currentLevelIndex];
    this.ui.drawHUD(this.ctx, this.player, level, this.getProgress(), this.attempts + 1);
  }

  renderWinScreen() {
    const level        = LEVELS[this.currentLevelIndex];
    const bestProgress = SaveSystem.getLevelData(this.saveData, this.currentLevelIndex).bestProgress;
    const hasNext      = this.currentLevelIndex < LEVELS.length - 1;
    this.ui.drawWinScreen(this.ctx, level, 100, this.attempts + 1, bestProgress, hasNext);
  }
}

// ── Bootstrap ─────────────────────────────────────────────────────────────

window.addEventListener('load', () => {
  const canvas  = document.getElementById('gameCanvas');
  canvas.width  = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  new Game(canvas);
});

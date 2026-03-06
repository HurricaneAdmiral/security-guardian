const CollisionSystem = (() => {

  function getObjBounds(obj) {
    if (obj.type === 'orb' || obj.type === 'speed_ring') {
      const r = obj.r || 16;
      return { x: obj.x - r, y: obj.y - r, w: r * 2, h: r * 2 };
    }
    return { x: obj.x, y: obj.y, w: obj.w || 40, h: obj.h || 40 };
  }

  function overlaps(a, b) {
    return a.x < b.x + b.w &&
           a.x + a.w > b.x &&
           a.y < b.y + b.h &&
           a.y + a.h > b.y;
  }

  function shrinkBounds(b, amount) {
    return {
      x: b.x + amount,
      y: b.y + amount,
      w: b.w - amount * 2,
      h: b.h - amount * 2,
    };
  }

  function checkCollisions(player, objects, jumpPressed, triggeredItems) {
    const result = {
      dead: false,
      onGround: false,
      onCeiling: false,
      landingY: null,
      ceilingY: null,
      events: [],
    };

    if (player.isDead) return result;

    const pb = player.getBounds();
    // Previous positions (before this frame's velocity was applied)
    const prevBottom = pb.y + pb.h - player.velocityY;
    const prevTop    = pb.y - player.velocityY;
    const gd = player.gravityDir; // 1 = normal, -1 = flipped

    for (const obj of objects) {
      if (obj.type.startsWith('deco_')) continue;

      const ob = getObjBounds(obj);
      const doesOverlap = overlaps(pb, ob);

      switch (obj.type) {
        case 'platform': {
          if (!doesOverlap) break;

          // Tolerance for "came from this side" checks (must be generous for high-speed)
          const TOL = COLLISION_TOLERANCE;

          if (gd === 1) {
            // Normal gravity: falling down, land on TOP of platform
            const fromAbove = prevBottom <= ob.y + TOL;
            // Hitting BOTTOM of platform (flying up into it)
            const fromBelow = prevTop >= ob.y + ob.h - TOL;

            if (fromAbove && player.velocityY >= 0) {
              result.onGround = true;
              result.landingY = ob.y - player.height;
            } else if (fromBelow && player.velocityY < 0) {
              result.onCeiling = true;
              result.ceilingY  = ob.y + ob.h;
            } else {
              result.dead = true;
            }
          } else {
            // Flipped gravity: "falling" upward, land on BOTTOM of platform
            const fromBelow = prevTop >= ob.y + ob.h - TOL;
            // Hitting TOP of platform (moving down into it against flipped gravity)
            const fromAbove = prevBottom <= ob.y + TOL;

            if (fromBelow && player.velocityY <= 0) {
              // Land on bottom of ceiling platform
              result.onGround = true;
              result.landingY = ob.y + ob.h;
            } else if (fromAbove && player.velocityY > 0) {
              result.onCeiling = true;
              result.ceilingY  = ob.y - player.height;
            } else {
              result.dead = true;
            }
          }
          break;
        }

        case 'spike': {
          if (!doesOverlap) break;
          const shrunkP  = shrinkBounds(pb, 4);
          const shrunkOb = shrinkBounds(ob, 4);
          if (overlaps(shrunkP, shrunkOb)) {
            result.dead = true;
          }
          break;
        }

        case 'spike_down': {
          if (!doesOverlap) break;
          const shrunkP  = shrinkBounds(pb, 4);
          const shrunkOb = shrinkBounds(ob, 4);
          if (overlaps(shrunkP, shrunkOb)) {
            result.dead = true;
          }
          break;
        }

        case 'orb': {
          // Check proximity for orb — slightly larger than the orb itself
          const r = (obj.r || 16);
          const pcx = pb.x + pb.w / 2;
          const pcy = pb.y + pb.h / 2;
          const dx  = pcx - obj.x;
          const dy  = pcy - obj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < r + PLAYER_SIZE / 2 + ORB_ACTIVATION_PADDING && jumpPressed) {
            result.events.push({ type: 'orb', obj });
          }
          break;
        }

        case 'pad': {
          if (!doesOverlap) break;
          const overlapTop = prevBottom <= ob.y + 8;
          if (overlapTop) {
            result.events.push({ type: 'pad', obj });
            result.onGround = true;
            result.landingY = ob.y - player.height;
          }
          break;
        }

        case 'pad_gravity': {
          if (!doesOverlap) break;
          result.events.push({ type: 'pad_gravity', obj });
          break;
        }

        case 'portal_gravity':
        case 'portal_cube':
        case 'portal_ship':
        case 'portal_ball':
        case 'portal_ufo': {
          if (!doesOverlap) break;
          result.events.push({ type: obj.type, obj });
          break;
        }

        case 'speed_ring': {
          if (!doesOverlap) break;
          result.events.push({ type: 'speed_ring', obj, speedMult: obj.speedMult });
          break;
        }

        case 'finish': {
          if (!doesOverlap) break;
          result.events.push({ type: 'finish', obj });
          break;
        }

        default:
          break;
      }

      if (result.dead) break;
    }

    return result;
  }

  return { checkCollisions };
})();

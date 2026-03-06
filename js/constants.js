const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 450;
const TILE = 40;
const PLAYER_SIZE = 36;
const GRAVITY = 0.65;
const JUMP_VELOCITY = -13.5;
const PLAYER_SCREEN_X = 180;
const GROUND_Y = CANVAS_HEIGHT - TILE; // 410

// Physics multipliers
const SHIP_THRUST_MULTIPLIER = 2.5;
const SHIP_FALL_MULTIPLIER   = 1.8;
const UFO_JUMP_MULTIPLIER    = 0.65;

// Collision / interaction tuning
const COLLISION_TOLERANCE  = 10;  // px — how generous the "came from above" check is
const ORB_ACTIVATION_PADDING = 12; // extra px around orb radius for proximity check
const CEILING_BOUNCE_DAMPING = 0.3; // velocity multiplier when bouncing off a ceiling

// Star-rating thresholds (win screen)
const THREE_STAR_THRESHOLD = 5;   // ≤ N attempts → 3 stars
const TWO_STAR_THRESHOLD   = 15;  // ≤ N attempts → 2 stars

// Orb cooldown before it can re-trigger (ms)
const ORB_COOLDOWN_MS = 400;

const STATE = {
  MAIN_MENU: 'main_menu',
  LEVEL_SELECT: 'level_select',
  SETTINGS: 'settings',
  PLAYING: 'playing',
  DEATH: 'death',
  WIN: 'win'
};

const COLORS = {
  L1_BG_TOP: '#87CEEB',
  L1_BG_BOT: '#B0E0E6',
  L1_GROUND: '#4CAF50',
  L1_GROUND_DARK: '#388E3C',
  L1_ACCENT: '#FFC107',

  L2_BG_TOP: '#4FC3F7',
  L2_BG_BOT: '#81D4FA',
  L2_GROUND: '#1565C0',
  L2_GROUND_DARK: '#0D47A1',
  L2_ACCENT: '#FFD54F',

  L3_BG_TOP: '#FFB74D',
  L3_BG_BOT: '#FFCC80',
  L3_GROUND: '#8D6E63',
  L3_GROUND_DARK: '#6D4C41',
  L3_ACCENT: '#FF8F00',

  L4_BG_TOP: '#CE93D8',
  L4_BG_BOT: '#F3E5F5',
  L4_GROUND: '#7B1FA2',
  L4_GROUND_DARK: '#4A148C',
  L4_ACCENT: '#E040FB',

  L5_BG_TOP: '#546E7A',
  L5_BG_BOT: '#78909C',
  L5_GROUND: '#D32F2F',
  L5_GROUND_DARK: '#B71C1C',
  L5_ACCENT: '#FF5722',

  UI_BG: '#1A237E',
  UI_PANEL: '#283593',
  UI_BTN: '#3949AB',
  UI_BTN_HOVER: '#5C6BC0',
  UI_TEXT: '#FFFFFF',
  UI_ACCENT: '#FFC107',
};

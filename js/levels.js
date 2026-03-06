const LEVELS = [
  // =====================================================================
  // LEVEL 1: Green Fields (Easy, speed=5, width=7200)
  // =====================================================================
  {
    id: 1,
    name: 'Green Fields',
    difficulty: 'Easy',
    description: 'A gentle start. Learn the basics.',
    width: 7200,
    speed: 5,
    bgTop: '#87CEEB',
    bgBottom: '#B0E0E6',
    groundColor: '#4CAF50',
    groundDark: '#388E3C',
    accentColor: '#FFC107',
    playerColor: '#FF6B35',
    objects: [
      // Ground floor segments
      {type:'platform', x:0,    y:410, w:480, h:40, color:'#4CAF50'},
      // Gap 480-520 (1 tile = 40px, very easy)
      {type:'platform', x:520,  y:410, w:200, h:40, color:'#4CAF50'},
      // Single spike pair
      {type:'spike', x:640,  y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:680,  y:370, w:40, h:40, color:'#FF5722'},
      {type:'platform', x:720,  y:410, w:200, h:40, color:'#4CAF50'},
      // Longer stretch
      {type:'platform', x:920,  y:410, w:600, h:40, color:'#4CAF50'},
      // Gap 1520-1600 (2 tiles = 80px)
      {type:'platform', x:1600, y:410, w:320, h:40, color:'#4CAF50'},
      {type:'spike', x:1640, y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:1720, y:370, w:40, h:40, color:'#FF5722'},
      {type:'platform', x:1920, y:410, w:480, h:40, color:'#4CAF50'},
      // Elevated platform
      {type:'platform', x:2080, y:330, w:200, h:40, color:'#388E3C'},
      {type:'platform', x:2400, y:410, w:200, h:40, color:'#4CAF50'},
      // Jump pad
      {type:'pad', x:2440, y:394, w:40, h:16, color:'#FFC107'},
      {type:'platform', x:2600, y:410, w:400, h:40, color:'#4CAF50'},
      {type:'spike', x:2640, y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:2680, y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:2720, y:370, w:40, h:40, color:'#FF5722'},
      // Gap 3000-3080 (2 tiles = 80px)
      {type:'platform', x:3080, y:410, w:360, h:40, color:'#4CAF50'},
      {type:'platform', x:3440, y:410, w:160, h:40, color:'#4CAF50'},
      // Gap 3600-3680 (2 tiles)
      {type:'platform', x:3680, y:410, w:280, h:40, color:'#4CAF50'},
      // Jump orb
      {type:'orb', x:3740, y:340, r:16, color:'#FFD700'},
      {type:'platform', x:3960, y:410, w:480, h:40, color:'#4CAF50'},
      {type:'spike', x:4000, y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:4080, y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:4160, y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:4240, y:370, w:40, h:40, color:'#FF5722'},
      {type:'platform', x:4440, y:410, w:240, h:40, color:'#4CAF50'},
      // Raised block section (player must jump over)
      {type:'platform', x:4520, y:370, w:160, h:80, color:'#388E3C'},
      {type:'spike',    x:4560, y:330, w:40,  h:40, color:'#FF5722'},
      {type:'platform', x:4680, y:410, w:600, h:40, color:'#4CAF50'},
      // Gap 5280-5400 (3 tiles = 120px, doable at speed 5)
      {type:'platform', x:5400, y:410, w:200, h:40, color:'#4CAF50'},
      {type:'platform', x:5600, y:410, w:200, h:40, color:'#4CAF50'},
      // Gap 5800-5880 (2 tiles)
      {type:'platform', x:5880, y:410, w:720, h:40, color:'#4CAF50'},
      {type:'spike', x:5920, y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:6000, y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:6080, y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:6160, y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:6280, y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:6360, y:370, w:40, h:40, color:'#FF5722'},
      {type:'platform', x:6600, y:410, w:400, h:40, color:'#4CAF50'},
      {type:'spike', x:6640, y:370, w:40, h:40, color:'#FF5722'},
      {type:'spike', x:6720, y:370, w:40, h:40, color:'#FF5722'},
      {type:'finish', x:6920, y:250, w:20, h:200, color:'#FFD700'},
      // Decorations
      {type:'deco_cloud', x:200,  y:80,  w:120, h:50},
      {type:'deco_cloud', x:800,  y:60,  w:150, h:55},
      {type:'deco_cloud', x:1500, y:90,  w:100, h:40},
      {type:'deco_cloud', x:2200, y:70,  w:130, h:50},
      {type:'deco_cloud', x:3000, y:85,  w:110, h:45},
      {type:'deco_cloud', x:3800, y:75,  w:140, h:52},
      {type:'deco_cloud', x:4500, y:65,  w:120, h:48},
      {type:'deco_cloud', x:5500, y:80,  w:100, h:42},
      {type:'deco_cloud', x:6200, y:70,  w:130, h:50},
      {type:'deco_mountain', x:100,  y:300, w:300, h:110, color:'#66BB6A'},
      {type:'deco_mountain', x:500,  y:320, w:250, h:90,  color:'#81C784'},
      {type:'deco_mountain', x:1200, y:310, w:280, h:100, color:'#66BB6A'},
      {type:'deco_mountain', x:2000, y:305, w:320, h:105, color:'#81C784'},
      {type:'deco_mountain', x:3200, y:315, w:260, h:95,  color:'#66BB6A'},
      {type:'deco_mountain', x:4400, y:300, w:300, h:110, color:'#81C784'},
      {type:'deco_mountain', x:5600, y:310, w:270, h:100, color:'#66BB6A'},
    ]
  },

  // =====================================================================
  // LEVEL 2: Sky Road (Normal, speed=6, width=8800)
  // =====================================================================
  {
    id: 2,
    name: 'Sky Road',
    difficulty: 'Normal',
    description: 'Higher roads, sharper turns.',
    width: 8800,
    speed: 6,
    bgTop: '#4FC3F7',
    bgBottom: '#81D4FA',
    groundColor: '#1565C0',
    groundDark: '#0D47A1',
    accentColor: '#FFD54F',
    playerColor: '#29B6F6',
    objects: [
      // Opening stretch
      {type:'platform', x:0,    y:410, w:520, h:40, color:'#1565C0'},
      {type:'spike',    x:440,  y:370, w:40,  h:40, color:'#FF7043'},
      // Gap 520-600 (80px, easy at speed 6)
      {type:'platform', x:600,  y:410, w:240, h:40, color:'#1565C0'},
      {type:'spike',    x:640,  y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:680,  y:370, w:40,  h:40, color:'#FF7043'},
      {type:'platform', x:840,  y:410, w:200, h:40, color:'#1565C0'},
      // Gap 1040-1160 (120px = 3 tiles at speed 6 = fine)
      {type:'platform', x:1160, y:410, w:280, h:40, color:'#1565C0'},
      {type:'spike',    x:1200, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:1280, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:1360, y:370, w:40,  h:40, color:'#FF7043'},
      // Elevated platform section
      {type:'platform', x:1440, y:410, w:160, h:40, color:'#1565C0'},
      {type:'platform', x:1480, y:330, w:240, h:40, color:'#0D47A1'},
      {type:'spike',    x:1520, y:290, w:40,  h:40, color:'#FF7043'},
      {type:'platform', x:1680, y:410, w:280, h:40, color:'#1565C0'},
      // Jump orb
      {type:'orb',      x:1800, y:340, r:16,  color:'#FFD54F'},
      // Gap 1960-2080 (120px)
      {type:'platform', x:2080, y:410, w:360, h:40, color:'#1565C0'},
      {type:'spike',    x:2120, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:2200, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'platform', x:2440, y:410, w:200, h:40, color:'#1565C0'},
      // Jump pad
      {type:'pad',      x:2480, y:394, w:40,  h:16, color:'#FFD54F'},
      {type:'platform', x:2640, y:410, w:320, h:40, color:'#1565C0'},
      // Gap 2960-3080 (120px)
      {type:'platform', x:3080, y:410, w:240, h:40, color:'#1565C0'},
      {type:'spike',    x:3120, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:3200, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:3240, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'platform', x:3320, y:410, w:160, h:40, color:'#1565C0'},
      // Double orb jump over gap
      {type:'orb',      x:3380, y:330, r:16,  color:'#FFD54F'},
      // Gap 3480-3640 (160px)
      {type:'platform', x:3640, y:410, w:360, h:40, color:'#1565C0'},
      {type:'spike',    x:3680, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:3760, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:3840, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:3920, y:370, w:40,  h:40, color:'#FF7043'},
      // Speed ring - slow down
      {type:'speed_ring', x:4040, y:390, r:18, speedMult:0.8},
      {type:'platform', x:4000, y:410, w:400, h:40, color:'#1565C0'},
      // Elevated section with spikes below
      {type:'platform', x:4400, y:370, w:120, h:40, color:'#0D47A1'},
      {type:'spike',    x:4400, y:410, w:40,  h:40, color:'#FF7043'},  // spike under elevated
      {type:'platform', x:4520, y:410, w:280, h:40, color:'#1565C0'},
      {type:'spike',    x:4560, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:4640, y:370, w:40,  h:40, color:'#FF7043'},
      // Speed ring - resume speed
      {type:'speed_ring', x:4840, y:390, r:18, speedMult:1.0},
      {type:'platform', x:4800, y:410, w:400, h:40, color:'#1565C0'},
      // Gap 5200-5320 (120px)
      {type:'platform', x:5320, y:410, w:280, h:40, color:'#1565C0'},
      {type:'spike',    x:5360, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:5440, y:370, w:40,  h:40, color:'#FF7043'},
      // Orb over gap
      {type:'orb',      x:5640, y:320, r:16,  color:'#FFD54F'},
      {type:'platform', x:5600, y:410, w:160, h:40, color:'#1565C0'},
      // Gap 5760-5920 (160px) - orb helps
      {type:'platform', x:5920, y:410, w:400, h:40, color:'#1565C0'},
      {type:'spike',    x:5960, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:6040, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:6120, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:6200, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'platform', x:6320, y:410, w:240, h:40, color:'#1565C0'},
      // Gap 6560-6680 (120px)
      {type:'platform', x:6680, y:410, w:360, h:40, color:'#1565C0'},
      {type:'spike',    x:6720, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:6800, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'platform', x:7040, y:410, w:200, h:40, color:'#1565C0'},
      {type:'pad',      x:7080, y:394, w:40,  h:16, color:'#FFD54F'},
      {type:'platform', x:7240, y:410, w:280, h:40, color:'#1565C0'},
      {type:'spike',    x:7280, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:7360, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:7440, y:370, w:40,  h:40, color:'#FF7043'},
      // Gap 7520-7640 (120px)
      {type:'platform', x:7640, y:410, w:200, h:40, color:'#1565C0'},
      {type:'platform', x:7840, y:410, w:200, h:40, color:'#1565C0'},
      // Gap 8040-8160 (120px)
      {type:'platform', x:8160, y:410, w:440, h:40, color:'#1565C0'},
      {type:'spike',    x:8200, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:8280, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'spike',    x:8360, y:370, w:40,  h:40, color:'#FF7043'},
      {type:'finish',   x:8520, y:250, w:20,  h:200, color:'#FFD700'},
      // Decorations
      {type:'deco_cloud', x:300,  y:60,  w:140, h:55},
      {type:'deco_cloud', x:900,  y:45,  w:120, h:48},
      {type:'deco_cloud', x:1700, y:70,  w:160, h:60},
      {type:'deco_cloud', x:2500, y:50,  w:130, h:52},
      {type:'deco_cloud', x:3400, y:65,  w:145, h:55},
      {type:'deco_cloud', x:4300, y:55,  w:120, h:48},
      {type:'deco_cloud', x:5200, y:70,  w:140, h:52},
      {type:'deco_cloud', x:6200, y:45,  w:130, h:50},
      {type:'deco_cloud', x:7100, y:60,  w:150, h:55},
      {type:'deco_mountain', x:200,  y:310, w:280, h:100, color:'#1976D2'},
      {type:'deco_mountain', x:900,  y:320, w:240, h:90,  color:'#1E88E5'},
      {type:'deco_mountain', x:1800, y:305, w:300, h:105, color:'#1976D2'},
      {type:'deco_mountain', x:3000, y:315, w:260, h:95,  color:'#1E88E5'},
      {type:'deco_mountain', x:4600, y:310, w:280, h:100, color:'#1976D2'},
      {type:'deco_mountain', x:6000, y:305, w:320, h:105, color:'#1E88E5'},
      {type:'deco_mountain', x:7500, y:315, w:260, h:95,  color:'#1976D2'},
    ]
  },

  // =====================================================================
  // LEVEL 3: Desert Ruins (Hard, speed=7, width=9600)
  // =====================================================================
  {
    id: 3,
    name: 'Desert Ruins',
    difficulty: 'Hard',
    description: 'Ancient traps in scorching sands.',
    width: 9600,
    speed: 7,
    bgTop: '#FFB74D',
    bgBottom: '#FFCC80',
    groundColor: '#8D6E63',
    groundDark: '#6D4C41',
    accentColor: '#FF8F00',
    playerColor: '#FFAB40',
    objects: [
      // Opening
      {type:'platform', x:0,    y:410, w:560, h:40, color:'#8D6E63'},
      {type:'spike',    x:400,  y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:440,  y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:480,  y:370, w:40,  h:40, color:'#BF360C'},
      // Gap 560-680 (120px fine at speed 7)
      {type:'platform', x:680,  y:410, w:280, h:40, color:'#8D6E63'},
      {type:'spike',    x:720,  y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:800,  y:370, w:40,  h:40, color:'#BF360C'},
      {type:'platform', x:960,  y:410, w:240, h:40, color:'#8D6E63'},
      // Gap 1200-1320 (120px)
      {type:'platform', x:1320, y:410, w:320, h:40, color:'#8D6E63'},
      {type:'spike',    x:1360, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:1440, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:1520, y:370, w:40,  h:40, color:'#BF360C'},
      // Jump pad + orb combo
      {type:'platform', x:1640, y:410, w:200, h:40, color:'#8D6E63'},
      {type:'pad',      x:1680, y:394, w:40,  h:16, color:'#FF8F00'},
      {type:'orb',      x:1760, y:310, r:16,  color:'#FFD700'},
      // Gap 1840-1960 (120px, player should be mid-air from pad/orb)
      {type:'platform', x:1960, y:410, w:280, h:40, color:'#8D6E63'},
      {type:'spike',    x:2000, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:2080, y:370, w:40,  h:40, color:'#BF360C'},
      // Raised ruin block
      {type:'platform', x:2240, y:410, w:160, h:40, color:'#8D6E63'},
      {type:'platform', x:2280, y:330, w:160, h:80, color:'#6D4C41'},
      {type:'spike',    x:2320, y:290, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:2360, y:290, w:40,  h:40, color:'#BF360C'},
      {type:'platform', x:2400, y:410, w:200, h:40, color:'#8D6E63'},
      // Gap 2600-2720 (120px)
      {type:'platform', x:2720, y:410, w:360, h:40, color:'#8D6E63'},
      {type:'spike',    x:2760, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:2840, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:2920, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:3000, y:370, w:40,  h:40, color:'#BF360C'},
      // Speed ring (speed up)
      {type:'speed_ring', x:3120, y:390, r:18, speedMult:1.2},
      {type:'platform', x:3080, y:410, w:320, h:40, color:'#8D6E63'},
      // Gap 3400-3560 (160px, speed 7*1.2=8.4, so ~164px ok in jump)
      {type:'platform', x:3560, y:410, w:280, h:40, color:'#8D6E63'},
      {type:'spike',    x:3600, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:3680, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:3760, y:370, w:40,  h:40, color:'#BF360C'},
      // Speed ring (slow down back to normal)
      {type:'speed_ring', x:3880, y:390, r:18, speedMult:1.0},
      {type:'platform', x:3840, y:410, w:280, h:40, color:'#8D6E63'},
      // === GRAVITY PORTAL SECTION ===
      // Short upside-down section
      {type:'portal_gravity', x:4160, y:300, w:30, h:200},
      {type:'platform', x:4120, y:410, w:200, h:40, color:'#8D6E63'},
      // Ceiling platforms for flipped gravity section
      {type:'platform', x:4320, y:0,   w:280, h:40, color:'#6D4C41'},  // ceiling ground
      {type:'spike_down', x:4360, y:40, w:40, h:40, color:'#BF360C'},
      {type:'spike_down', x:4440, y:40, w:40, h:40, color:'#BF360C'},
      // Flip back to normal gravity
      {type:'portal_gravity', x:4640, y:300, w:30, h:200},
      {type:'platform', x:4600, y:0,   w:120, h:40, color:'#6D4C41'},
      {type:'platform', x:4680, y:410, w:280, h:40, color:'#8D6E63'},
      // Gap 4960-5080 (120px)
      {type:'platform', x:5080, y:410, w:360, h:40, color:'#8D6E63'},
      {type:'spike',    x:5120, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:5200, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:5280, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:5360, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'platform', x:5440, y:410, w:200, h:40, color:'#8D6E63'},
      {type:'pad',      x:5480, y:394, w:40,  h:16, color:'#FF8F00'},
      // Gap 5640-5800 (160px, pad helps)
      {type:'platform', x:5800, y:410, w:320, h:40, color:'#8D6E63'},
      {type:'spike',    x:5840, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:5920, y:370, w:40,  h:40, color:'#BF360C'},
      // Orb
      {type:'orb',      x:6080, y:310, r:16,  color:'#FFD700'},
      {type:'platform', x:6120, y:410, w:240, h:40, color:'#8D6E63'},
      // Gap 6360-6480 (120px, orb helps)
      {type:'platform', x:6480, y:410, w:280, h:40, color:'#8D6E63'},
      {type:'spike',    x:6520, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:6600, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:6680, y:370, w:40,  h:40, color:'#BF360C'},
      // Double spikes on raised platform
      {type:'platform', x:6760, y:410, w:200, h:40, color:'#8D6E63'},
      {type:'platform', x:6800, y:350, w:120, h:60, color:'#6D4C41'},
      {type:'spike',    x:6840, y:310, w:40,  h:40, color:'#BF360C'},
      {type:'platform', x:6960, y:410, w:400, h:40, color:'#8D6E63'},
      {type:'spike',    x:7000, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:7080, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:7200, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:7280, y:370, w:40,  h:40, color:'#BF360C'},
      // Gap 7360-7480 (120px)
      {type:'platform', x:7480, y:410, w:320, h:40, color:'#8D6E63'},
      {type:'spike',    x:7520, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:7600, y:370, w:40,  h:40, color:'#BF360C'},
      // Orb over gap
      {type:'orb',      x:7800, y:320, r:16,  color:'#FFD700'},
      {type:'platform', x:7800, y:410, w:160, h:40, color:'#8D6E63'},
      // Gap 7960-8120 (160px, orb helps)
      {type:'platform', x:8120, y:410, w:480, h:40, color:'#8D6E63'},
      {type:'spike',    x:8160, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:8240, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:8320, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:8400, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:8480, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'platform', x:8600, y:410, w:400, h:40, color:'#8D6E63'},
      {type:'spike',    x:8640, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:8720, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'spike',    x:8800, y:370, w:40,  h:40, color:'#BF360C'},
      {type:'finish',   x:9080, y:250, w:20,  h:200, color:'#FFD700'},
      // Decorations
      {type:'deco_cloud', x:300,  y:70,  w:130, h:50},
      {type:'deco_cloud', x:1100, y:55,  w:150, h:55},
      {type:'deco_cloud', x:2100, y:75,  w:120, h:45},
      {type:'deco_cloud', x:3300, y:60,  w:140, h:52},
      {type:'deco_cloud', x:4700, y:70,  w:130, h:50},
      {type:'deco_cloud', x:5800, y:55,  w:145, h:55},
      {type:'deco_cloud', x:7000, y:65,  w:120, h:48},
      {type:'deco_cloud', x:8200, y:70,  w:140, h:52},
      {type:'deco_mountain', x:200,  y:315, w:260, h:95,  color:'#A1887F'},
      {type:'deco_mountain', x:800,  y:305, w:300, h:105, color:'#BCAAA4'},
      {type:'deco_mountain', x:1900, y:310, w:280, h:100, color:'#A1887F'},
      {type:'deco_mountain', x:3100, y:320, w:240, h:90,  color:'#BCAAA4'},
      {type:'deco_mountain', x:5000, y:315, w:270, h:95,  color:'#A1887F'},
      {type:'deco_mountain', x:6800, y:305, w:310, h:105, color:'#BCAAA4'},
      {type:'deco_mountain', x:8400, y:310, w:260, h:100, color:'#A1887F'},
    ]
  },

  // =====================================================================
  // LEVEL 4: Crystal Caves (Harder, speed=7, width=10400)
  // =====================================================================
  {
    id: 4,
    name: 'Crystal Caves',
    difficulty: 'Harder',
    description: 'Gleaming crystals hide deadly traps.',
    width: 10400,
    speed: 7,
    bgTop: '#CE93D8',
    bgBottom: '#F3E5F5',
    groundColor: '#7B1FA2',
    groundDark: '#4A148C',
    accentColor: '#E040FB',
    playerColor: '#CE93D8',
    objects: [
      // Cube mode opening
      {type:'platform', x:0,    y:410, w:480, h:40, color:'#7B1FA2'},
      {type:'spike',    x:320,  y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:360,  y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:400,  y:370, w:40,  h:40, color:'#AA00FF'},
      // Gap 480-600 (120px)
      {type:'platform', x:600,  y:410, w:280, h:40, color:'#7B1FA2'},
      {type:'spike',    x:640,  y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:720,  y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:800,  y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'platform', x:880,  y:410, w:200, h:40, color:'#7B1FA2'},
      // Triple spikes + gap
      // Gap 1080-1200 (120px)
      {type:'platform', x:1200, y:410, w:360, h:40, color:'#7B1FA2'},
      {type:'spike',    x:1240, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:1320, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:1400, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:1480, y:370, w:40,  h:40, color:'#AA00FF'},
      // Orb
      {type:'orb',      x:1580, y:310, r:16,  color:'#E040FB'},
      {type:'platform', x:1560, y:410, w:200, h:40, color:'#7B1FA2'},
      // Gap 1760-1920 (160px, orb helps)
      {type:'platform', x:1920, y:410, w:280, h:40, color:'#7B1FA2'},
      {type:'spike',    x:1960, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:2040, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:2120, y:370, w:40,  h:40, color:'#AA00FF'},
      // Gravity flip
      {type:'portal_gravity', x:2240, y:300, w:30, h:200},
      {type:'platform', x:2200, y:410, w:80,  h:40, color:'#7B1FA2'},
      // Ceiling platforms (flipped gravity)
      {type:'platform', x:2280, y:0,   w:320, h:40, color:'#4A148C'},
      {type:'spike_down', x:2320, y:40, w:40, h:40, color:'#AA00FF'},
      {type:'spike_down', x:2400, y:40, w:40, h:40, color:'#AA00FF'},
      {type:'spike_down', x:2480, y:40, w:40, h:40, color:'#AA00FF'},
      // Gap in ceiling 2600-2720 (player falls up through it - must avoid)
      {type:'platform', x:2720, y:0,   w:240, h:40, color:'#4A148C'},
      {type:'spike_down', x:2760, y:40, w:40, h:40, color:'#AA00FF'},
      {type:'spike_down', x:2840, y:40, w:40, h:40, color:'#AA00FF'},
      // Flip back
      {type:'portal_gravity', x:2960, y:300, w:30, h:200},
      {type:'platform', x:2960, y:0,   w:80,  h:40, color:'#4A148C'},
      {type:'platform', x:3000, y:410, w:320, h:40, color:'#7B1FA2'},
      {type:'spike',    x:3040, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:3120, y:370, w:40,  h:40, color:'#AA00FF'},
      // === SHIP MODE SECTION ===
      {type:'portal_ship', x:3360, y:250, w:30, h:200},
      {type:'platform', x:3320, y:410, w:80,  h:40, color:'#7B1FA2'},
      // Ship tunnel - ceiling at y=80, floor at y=410
      {type:'platform', x:3400, y:0,   w:1200, h:80, color:'#4A148C'},  // ceiling
      {type:'platform', x:3400, y:410, w:1200, h:40, color:'#7B1FA2'},  // floor
      // Obstacles in ship tunnel
      {type:'spike',    x:3600, y:370, w:40, h:40, color:'#AA00FF'},
      {type:'spike',    x:3680, y:370, w:40, h:40, color:'#AA00FF'},
      {type:'spike_down', x:3800, y:80, w:40, h:40, color:'#AA00FF'},
      {type:'spike_down', x:3880, y:80, w:40, h:40, color:'#AA00FF'},
      {type:'spike',    x:4000, y:370, w:40, h:40, color:'#AA00FF'},
      {type:'spike',    x:4080, y:370, w:40, h:40, color:'#AA00FF'},
      {type:'spike_down', x:4200, y:80, w:40, h:40, color:'#AA00FF'},
      {type:'spike',    x:4360, y:370, w:40, h:40, color:'#AA00FF'},
      {type:'spike_down', x:4440, y:80, w:40, h:40, color:'#AA00FF'},
      {type:'spike_down', x:4480, y:80, w:40, h:40, color:'#AA00FF'},
      // Back to cube
      {type:'portal_cube', x:4600, y:250, w:30, h:200},
      {type:'platform', x:4600, y:0,   w:80,  h:80, color:'#4A148C'},
      {type:'platform', x:4640, y:410, w:360, h:40, color:'#7B1FA2'},
      {type:'spike',    x:4680, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:4760, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:4840, y:370, w:40,  h:40, color:'#AA00FF'},
      // Gap 5000-5120 (120px)
      {type:'platform', x:5120, y:410, w:320, h:40, color:'#7B1FA2'},
      {type:'spike',    x:5160, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:5240, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:5320, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:5400, y:370, w:40,  h:40, color:'#AA00FF'},
      // Orb over gap
      {type:'orb',      x:5480, y:310, r:16,  color:'#E040FB'},
      {type:'platform', x:5440, y:410, w:160, h:40, color:'#7B1FA2'},
      // Gap 5600-5760 (160px, orb assists)
      {type:'platform', x:5760, y:410, w:400, h:40, color:'#7B1FA2'},
      {type:'spike',    x:5800, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:5880, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:5960, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:6040, y:370, w:40,  h:40, color:'#AA00FF'},
      // Jump pad
      {type:'pad',      x:6160, y:394, w:40,  h:16, color:'#E040FB'},
      {type:'platform', x:6160, y:410, w:200, h:40, color:'#7B1FA2'},
      // Gap 6360-6520 (160px, pad helps)
      {type:'platform', x:6520, y:410, w:360, h:40, color:'#7B1FA2'},
      {type:'spike',    x:6560, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:6640, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:6720, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:6800, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:6840, y:370, w:40,  h:40, color:'#AA00FF'},
      // Second gravity flip (short section)
      {type:'platform', x:6880, y:410, w:160, h:40, color:'#7B1FA2'},
      {type:'portal_gravity', x:7080, y:300, w:30, h:200},
      {type:'platform', x:7120, y:0,   w:280, h:40, color:'#4A148C'},
      {type:'spike_down', x:7160, y:40, w:40, h:40, color:'#AA00FF'},
      {type:'spike_down', x:7240, y:40, w:40, h:40, color:'#AA00FF'},
      {type:'portal_gravity', x:7400, y:300, w:30, h:200},
      {type:'platform', x:7400, y:0,   w:80,  h:40, color:'#4A148C'},
      {type:'platform', x:7440, y:410, w:360, h:40, color:'#7B1FA2'},
      {type:'spike',    x:7480, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:7560, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:7640, y:370, w:40,  h:40, color:'#AA00FF'},
      // Gap 7800-7960 (160px)
      {type:'orb',      x:7840, y:310, r:16,  color:'#E040FB'},
      {type:'platform', x:7960, y:410, w:400, h:40, color:'#7B1FA2'},
      {type:'spike',    x:8000, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:8080, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:8160, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:8240, y:370, w:40,  h:40, color:'#AA00FF'},
      // Gap 8360-8480 (120px)
      {type:'platform', x:8480, y:410, w:320, h:40, color:'#7B1FA2'},
      {type:'spike',    x:8520, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:8600, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:8680, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:8760, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'platform', x:8800, y:410, w:280, h:40, color:'#7B1FA2'},
      {type:'spike',    x:8840, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:8920, y:370, w:40,  h:40, color:'#AA00FF'},
      // Gap 9080-9200 (120px)
      {type:'platform', x:9200, y:410, w:480, h:40, color:'#7B1FA2'},
      {type:'spike',    x:9240, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:9320, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:9400, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:9480, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'spike',    x:9560, y:370, w:40,  h:40, color:'#AA00FF'},
      {type:'finish',   x:9800, y:250, w:20,  h:200, color:'#FFD700'},
      // Decorations
      {type:'deco_cloud', x:400,  y:55,  w:140, h:52},
      {type:'deco_cloud', x:1200, y:65,  w:130, h:50},
      {type:'deco_cloud', x:2400, y:50,  w:150, h:55},
      {type:'deco_cloud', x:3800, y:60,  w:120, h:48},
      {type:'deco_cloud', x:5200, y:70,  w:140, h:52},
      {type:'deco_cloud', x:6600, y:55,  w:130, h:50},
      {type:'deco_cloud', x:8000, y:65,  w:145, h:55},
      {type:'deco_mountain', x:100,  y:310, w:280, h:100, color:'#9C27B0'},
      {type:'deco_mountain', x:700,  y:300, w:320, h:110, color:'#AB47BC'},
      {type:'deco_mountain', x:1800, y:315, w:260, h:95,  color:'#9C27B0'},
      {type:'deco_mountain', x:3000, y:305, w:300, h:105, color:'#AB47BC'},
      {type:'deco_mountain', x:5400, y:310, w:280, h:100, color:'#9C27B0'},
      {type:'deco_mountain', x:7200, y:300, w:310, h:110, color:'#AB47BC'},
      {type:'deco_mountain', x:9000, y:315, w:260, h:95,  color:'#9C27B0'},
    ]
  },

  // =====================================================================
  // LEVEL 5: Void Storm (Insane, speed=8, width=11200)
  // =====================================================================
  {
    id: 5,
    name: 'Void Storm',
    difficulty: 'Insane',
    description: 'The void consumes all. Survive.',
    width: 11200,
    speed: 8,
    bgTop: '#546E7A',
    bgBottom: '#78909C',
    groundColor: '#D32F2F',
    groundDark: '#B71C1C',
    accentColor: '#FF5722',
    playerColor: '#FF5722',
    objects: [
      // Cube opening
      {type:'platform', x:0,    y:410, w:480, h:40, color:'#D32F2F'},
      {type:'spike',    x:320,  y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:360,  y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:400,  y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:440,  y:370, w:40,  h:40, color:'#FF1744'},
      // Gap 480-640 (160px, tight at speed 8 but doable)
      {type:'platform', x:640,  y:410, w:320, h:40, color:'#D32F2F'},
      {type:'spike',    x:680,  y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:760,  y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:840,  y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:880,  y:370, w:40,  h:40, color:'#FF1744'},
      // Gap 960-1120 (160px)
      {type:'platform', x:1120, y:410, w:280, h:40, color:'#D32F2F'},
      {type:'spike',    x:1160, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:1240, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:1320, y:370, w:40,  h:40, color:'#FF1744'},
      // Orb assist
      {type:'orb',      x:1440, y:300, r:16,  color:'#FF5722'},
      {type:'platform', x:1400, y:410, w:160, h:40, color:'#D32F2F'},
      // Gap 1560-1720 (160px, orb helps)
      {type:'platform', x:1720, y:410, w:360, h:40, color:'#D32F2F'},
      {type:'spike',    x:1760, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:1840, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:1920, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:2000, y:370, w:40,  h:40, color:'#FF1744'},
      // === BALL MODE SECTION ===
      {type:'portal_ball', x:2120, y:250, w:30, h:200},
      {type:'platform', x:2080, y:410, w:80,  h:40, color:'#D32F2F'},
      {type:'platform', x:2160, y:410, w:600, h:40, color:'#D32F2F'},
      // Ball section obstacles - gravity flips
      {type:'platform', x:2160, y:0,   w:600, h:80, color:'#B71C1C'},  // ceiling
      // Alternating spikes up/down
      {type:'spike',    x:2240, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike_down', x:2320, y:80, w:40, h:40, color:'#FF1744'},
      {type:'spike',    x:2440, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike_down', x:2520, y:80, w:40, h:40, color:'#FF1744'},
      {type:'spike',    x:2640, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike_down', x:2680, y:80, w:40, h:40, color:'#FF1744'},
      {type:'spike',    x:2680, y:370, w:40,  h:40, color:'#FF1744'},
      // Back to cube
      {type:'portal_cube', x:2760, y:250, w:30, h:200},
      {type:'platform', x:2760, y:0,   w:80,  h:80, color:'#B71C1C'},
      {type:'platform', x:2800, y:410, w:360, h:40, color:'#D32F2F'},
      {type:'spike',    x:2840, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:2920, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:3000, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:3080, y:370, w:40,  h:40, color:'#FF1744'},
      // Gap 3160-3320 (160px)
      {type:'orb',      x:3200, y:300, r:16,  color:'#FF5722'},
      {type:'platform', x:3320, y:410, w:320, h:40, color:'#D32F2F'},
      {type:'spike',    x:3360, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:3440, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:3520, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:3600, y:370, w:40,  h:40, color:'#FF1744'},
      // === UFO MODE SECTION ===
      {type:'portal_ufo', x:3680, y:250, w:30, h:200},
      {type:'platform', x:3640, y:410, w:80,  h:40, color:'#D32F2F'},
      {type:'platform', x:3720, y:410, w:640, h:40, color:'#D32F2F'},
      {type:'platform', x:3720, y:0,   w:640, h:80, color:'#B71C1C'},
      // UFO section obstacles
      {type:'spike',    x:3800, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:3880, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike_down', x:3960, y:80, w:40, h:40, color:'#FF1744'},
      {type:'spike_down', x:4040, y:80, w:40, h:40, color:'#FF1744'},
      {type:'spike',    x:4120, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:4200, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike_down', x:4280, y:80, w:40, h:40, color:'#FF1744'},
      {type:'spike',    x:4160, y:370, w:40,  h:40, color:'#FF1744'},
      // Back to cube
      {type:'portal_cube', x:4360, y:250, w:30, h:200},
      {type:'platform', x:4360, y:0,   w:80,  h:80, color:'#B71C1C'},
      {type:'platform', x:4400, y:410, w:360, h:40, color:'#D32F2F'},
      {type:'spike',    x:4440, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:4520, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:4600, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:4680, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:4720, y:370, w:40,  h:40, color:'#FF1744'},
      // Gap 4760-4920 (160px)
      {type:'orb',      x:4800, y:290, r:16,  color:'#FF5722'},
      {type:'platform', x:4920, y:410, w:320, h:40, color:'#D32F2F'},
      {type:'spike',    x:4960, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:5040, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:5120, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:5200, y:370, w:40,  h:40, color:'#FF1744'},
      // === SHIP MODE SECTION ===
      {type:'portal_ship', x:5280, y:250, w:30, h:200},
      {type:'platform', x:5240, y:410, w:80,  h:40, color:'#D32F2F'},
      {type:'platform', x:5320, y:410, w:800, h:40, color:'#D32F2F'},
      {type:'platform', x:5320, y:0,   w:800, h:80, color:'#B71C1C'},
      // Ship section - tight passages
      {type:'spike',    x:5440, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:5520, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike_down', x:5600, y:80, w:40, h:40, color:'#FF1744'},
      {type:'spike_down', x:5680, y:80, w:40, h:40, color:'#FF1744'},
      {type:'spike',    x:5760, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:5840, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike_down', x:5920, y:80, w:40, h:40, color:'#FF1744'},
      {type:'spike',    x:6000, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:6080, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike_down', x:6000, y:80, w:40, h:40, color:'#FF1744'},
      {type:'spike_down', x:6080, y:80, w:40, h:40, color:'#FF1744'},
      // Back to cube
      {type:'portal_cube', x:6120, y:250, w:30, h:200},
      {type:'platform', x:6120, y:0,   w:80,  h:80, color:'#B71C1C'},
      {type:'platform', x:6160, y:410, w:400, h:40, color:'#D32F2F'},
      {type:'spike',    x:6200, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:6280, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:6360, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:6440, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:6520, y:370, w:40,  h:40, color:'#FF1744'},
      // Gap 6560-6720 (160px)
      {type:'orb',      x:6600, y:280, r:16,  color:'#FF5722'},
      {type:'platform', x:6720, y:410, w:360, h:40, color:'#D32F2F'},
      {type:'spike',    x:6760, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:6840, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:6920, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:7000, y:370, w:40,  h:40, color:'#FF1744'},
      // Rapid gravity changes
      {type:'platform', x:7080, y:410, w:160, h:40, color:'#D32F2F'},
      {type:'portal_gravity', x:7280, y:300, w:30, h:200},
      {type:'platform', x:7320, y:0,   w:200, h:40, color:'#B71C1C'},
      {type:'spike_down', x:7360, y:40, w:40, h:40, color:'#FF1744'},
      {type:'spike_down', x:7440, y:40, w:40, h:40, color:'#FF1744'},
      {type:'portal_gravity', x:7520, y:300, w:30, h:200},
      {type:'platform', x:7520, y:0,   w:80,  h:40, color:'#B71C1C'},
      {type:'platform', x:7560, y:410, w:320, h:40, color:'#D32F2F'},
      {type:'spike',    x:7600, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:7680, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:7760, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:7840, y:370, w:40,  h:40, color:'#FF1744'},
      // Gap 7880-8040 (160px)
      {type:'orb',      x:7920, y:290, r:16,  color:'#FF5722'},
      {type:'platform', x:8040, y:410, w:400, h:40, color:'#D32F2F'},
      {type:'spike',    x:8080, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:8160, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:8240, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:8320, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:8400, y:370, w:40,  h:40, color:'#FF1744'},
      // Gap 8440-8600 (160px)
      {type:'platform', x:8600, y:410, w:280, h:40, color:'#D32F2F'},
      {type:'spike',    x:8640, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:8720, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:8800, y:370, w:40,  h:40, color:'#FF1744'},
      // Gap 8880-9040 (160px)
      {type:'orb',      x:8920, y:290, r:16,  color:'#FF5722'},
      {type:'platform', x:9040, y:410, w:360, h:40, color:'#D32F2F'},
      {type:'spike',    x:9080, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:9160, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:9240, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:9320, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:9360, y:370, w:40,  h:40, color:'#FF1744'},
      // Gap 9400-9560 (160px)
      {type:'platform', x:9560, y:410, w:400, h:40, color:'#D32F2F'},
      {type:'spike',    x:9600, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:9680, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:9760, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:9840, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:9920, y:370, w:40,  h:40, color:'#FF1744'},
      // Gap 9960-10120 (160px)
      {type:'orb',      x:10000, y:290, r:16, color:'#FF5722'},
      {type:'platform', x:10120, y:410, w:400, h:40, color:'#D32F2F'},
      {type:'spike',    x:10160, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:10240, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:10320, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'spike',    x:10400, y:370, w:40,  h:40, color:'#FF1744'},
      {type:'finish',   x:10640, y:250, w:20,  h:200, color:'#FFD700'},
      // Decorations
      {type:'deco_cloud', x:500,  y:60,  w:130, h:50},
      {type:'deco_cloud', x:1400, y:50,  w:150, h:55},
      {type:'deco_cloud', x:2600, y:65,  w:120, h:48},
      {type:'deco_cloud', x:3800, y:55,  w:140, h:52},
      {type:'deco_cloud', x:5200, y:60,  w:130, h:50},
      {type:'deco_cloud', x:6600, y:50,  w:145, h:55},
      {type:'deco_cloud', x:8000, y:65,  w:120, h:48},
      {type:'deco_cloud', x:9400, y:55,  w:140, h:52},
      {type:'deco_mountain', x:200,  y:315, w:260, h:95,  color:'#455A64'},
      {type:'deco_mountain', x:1000, y:305, w:300, h:105, color:'#546E7A'},
      {type:'deco_mountain', x:2200, y:310, w:280, h:100, color:'#455A64'},
      {type:'deco_mountain', x:4000, y:320, w:240, h:90,  color:'#546E7A'},
      {type:'deco_mountain', x:6400, y:315, w:270, h:95,  color:'#455A64'},
      {type:'deco_mountain', x:8400, y:305, w:310, h:105, color:'#546E7A'},
      {type:'deco_mountain', x:10000, y:310, w:260, h:100, color:'#455A64'},
    ]
  }
];

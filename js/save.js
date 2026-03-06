const SaveSystem = (() => {
  const SAVE_KEY = 'geoClone_v1';

  function getDefault() {
    return { levels: {}, settings: { musicVol: 0.7, sfxVol: 0.8 } };
  }

  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return getDefault();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return getDefault();
      if (!parsed.levels) parsed.levels = {};
      if (!parsed.settings) parsed.settings = { musicVol: 0.7, sfxVol: 0.8 };
      return parsed;
    } catch (e) {
      return getDefault();
    }
  }

  function save(data) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {
      // Storage unavailable - silently ignore
    }
  }

  function getLevelData(saveData, levelId) {
    if (saveData.levels && saveData.levels[levelId]) {
      return saveData.levels[levelId];
    }
    return { bestProgress: 0, completed: false, attempts: 0 };
  }

  function updateLevelAttempt(saveData, levelId) {
    if (!saveData.levels[levelId]) {
      saveData.levels[levelId] = { bestProgress: 0, completed: false, attempts: 0 };
    }
    saveData.levels[levelId].attempts = (saveData.levels[levelId].attempts || 0) + 1;
    return saveData;
  }

  function updateLevelComplete(saveData, levelId, progress) {
    if (!saveData.levels[levelId]) {
      saveData.levels[levelId] = { bestProgress: 0, completed: false, attempts: 0 };
    }
    const ld = saveData.levels[levelId];
    if (progress > ld.bestProgress) {
      ld.bestProgress = progress;
    }
    if (progress >= 100) {
      ld.completed = true;
    }
    return saveData;
  }

  return { getDefault, load, save, getLevelData, updateLevelAttempt, updateLevelComplete };
})();

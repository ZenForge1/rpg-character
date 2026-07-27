// ==================== БЕЗОПАСНЫЙ LOCALSTORAGE ====================
const STORAGE_KEY = 'rpg_progress_v3';
function loadProgress() {
  try { const data = localStorage.getItem(STORAGE_KEY); return data ? JSON.parse(data) : getDefaultProgress(); }
  catch(e) { return getDefaultProgress(); }
}
function saveProgress(progress) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch(e) {} }
function getDefaultProgress() {
  return {
    rating: 1000,
    wins: 0,
    losses: 0,
    lastWheelTime: 0,
    lastDailyClaim: '',
    characters: []
  };
}

// ==================== ПЕРЕВОДЫ ====================
const translations = {
  ru: {
    menu_create: 'Создать', menu_battle: 'Битва', menu_wheel: 'Колесо', menu_gallery: 'Галерея', menu_settings: 'Настройки',
    daily_bonus: '🎁 Ежедневная награда!', claim_daily: 'Забрать',
    create_title: '🎨 Создай своего персонажа', create_subtitle: 'Введи имя и получи уникального RPG-героя!',
    btn_generate: 'Сгенерировать', btn_save: 'Сохранить', btn_download: 'Скачать',
    label_race: 'Раса', label_class: 'Класс', label_weapon: 'Оружие', label_ability: 'Способность',
    battle_title: '⚔️ Битва персонажей', battle_subtitle: 'Твой герой против случайного врага!',
    start_battle: 'Начать битву!', battle_hint: 'Каждая битва приносит опыт и повышает рейтинг',
    win: 'ПОБЕДА!', lose: 'ПОРАЖЕНИЕ...', battle_log_hit: '{attacker} наносит {damage} урона!', battle_log_dodge: '{attacker} промахивается!',
    wheel_title: '🎡 Колесо удачи', wheel_subtitle: 'Крути и получай награды каждые 30 минут!',
    spin_wheel: 'Крутить колесо!', wheel_reward_stats: '🎉 Все характеристики +1!', wheel_reward_race: '✨ Случайная редкая раса разблокирована!',
    wheel_reward_exp: '⭐ Удвоенный опыт на 1 час!', wheel_reward_coins: '💰 500 монет (скоро можно будет тратить)',
    gallery_title: '🖼️ Галерея персонажей', gallery_subtitle: 'Твои сохранённые герои (до 20)',
    gallery_empty: 'Пока пусто. Сохрани персонажа на вкладке «Создать».',
    settings_title: '⚙️ Настройки', settings_lang: 'Язык / Language', settings_hint: 'Изменения применяются сразу',
    quotes: [
      '"Даже у самого сильного воина есть слабость."','"Путь самурая — это путь смерти."','"Меч без души — просто кусок железа."',
      '"Тот, кто сражается с честью, никогда не проигрывает."','"Судьба благоволит смелым."','"Ветер перемен дует для всех, но не все поднимают паруса."',
      '"Ты не можешь изменить прошлое, но можешь создать будущее."','"Настоящая сила — в спокойном сердце."',
      '"Даже в кромешной тьме горит свеча надежды."','"Кто не рискует, тот не пьёт саке."','"Лучше один раз увидеть, чем сто раз услышать."',
      '"Терпение и труд всё перетрут."','"Не бойся идти медленно, бойся стоять на месте."','"Волка ноги кормят, а самурая — меч."',
      '"Красота — в глазах смотрящего."','"После дождя земля твердеет."','"Даже обезьяна падает с дерева."',
      '"Упорство ломает скалы."','"Мудрый не тот, кто много говорит, а тот, кто много слушает."','"Счастье приходит в дом, где смеются."'
    ]
  },
  en: {
    menu_create: 'Create', menu_battle: 'Battle', menu_wheel: 'Wheel', menu_gallery: 'Gallery', menu_settings: 'Settings',
    daily_bonus: '🎁 Daily Reward!', claim_daily: 'Claim',
    create_title: '🎨 Create Your Character', create_subtitle: 'Enter a name and get a unique RPG hero!',
    btn_generate: 'Generate', btn_save: 'Save', btn_download: 'Download',
    label_race: 'Race', label_class: 'Class', label_weapon: 'Weapon', label_ability: 'Ability',
    battle_title: '⚔️ Character Battle', battle_subtitle: 'Your hero vs random enemy!',
    start_battle: 'Start Battle!', battle_hint: 'Each battle gives experience and raises rating',
    win: 'VICTORY!', lose: 'DEFEAT...', battle_log_hit: '{attacker} deals {damage} damage!', battle_log_dodge: '{attacker} misses!',
    wheel_title: '🎡 Wheel of Fortune', wheel_subtitle: 'Spin and get rewards every 30 minutes!',
    spin_wheel: 'Spin the Wheel!', wheel_reward_stats: '🎉 All stats +1!', wheel_reward_race: '✨ Unlocked rare race!',
    wheel_reward_exp: '⭐ Double XP for 1 hour!', wheel_reward_coins: '💰 500 coins (spend soon)',
    gallery_title: '🖼️ Character Gallery', gallery_subtitle: 'Your saved heroes (up to 20)',
    gallery_empty: 'Empty. Save a character on the «Create» tab.',
    settings_title: '⚙️ Settings', settings_lang: 'Language / Язык', settings_hint: 'Changes apply instantly',
    quotes: [
      '"Even the strongest warrior has a weakness."','"The way of the samurai is the way of death."','"A sword without a soul is just a piece of metal."',
      '"He who fights with honor never loses."','"Fortune favors the bold."','"The winds of change blow for everyone, but not everyone raises their sails."',
      '"You cannot change the past, but you can create the future."','"True strength lies in a calm heart."',
      '"In the deepest darkness, a candle of hope still burns."','"He who does not risk never tastes sake."','"Seeing once is better than hearing a hundred times."',
      '"Patience and hard work will overcome anything."','"Do not fear going slowly, fear standing still."','"The wolf is fed by its feet, the samurai by his sword."',
      '"Beauty is in the eye of the beholder."','"After rain, the earth hardens."','"Even monkeys fall from trees."',
      '"Persistence breaks rocks."','"The wise one is not the one who speaks much, but the one who listens much."','"Happiness enters the home where people laugh."'
    ]
  }
};

let currentLang = 'ru';
function t(key, replacements) {
  let str = (translations[currentLang] && translations[currentLang][key]) ? translations[currentLang][key] : key;
  if (replacements) for (const [k, v] of Object.entries(replacements)) str = str.replace(`{${k}}`, v);
  return str;
}
function applyLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if (translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
  });
  if (document.getElementById('page-create').classList.contains('active')) updateCreate();
  if (document.getElementById('page-battle').classList.contains('active')) renderBattlePage();
  if (document.getElementById('page-wheel').classList.contains('active')) updateWheelCooldown();
  if (document.getElementById('page-gallery').classList.contains('active')) renderGallery();
}

// ==================== ГЛОБАЛЬНЫЙ ПРОГРЕСС ====================
let progress = loadProgress();
let currentCharacter = null;
let battleEnemy = null;
let battleLog = [];

// ==================== ГЕНЕРАТОР ПЕРСОНАЖА ====================
function hash(str, max) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % max;
}
function getCharacterFromName(name, lang = currentLang) {
  const displayName = name.trim() || '???';
  const races = ['Человек','Эльф','Гном','Орк','Тёмный эльф','Киборг','Драконорождённый'];
  const classesByRace = {
    'Человек':['Воин','Паладин','Следопыт'],
    'Эльф':['Маг','Следопыт','Вор'],
    'Гном':['Воин','Инженер','Паладин'],
    'Орк':['Воин','Некромант','Вор'],
    'Тёмный эльф':['Некромант','Маг','Вор'],
    'Киборг':['Инженер','Воин','Следопыт'],
    'Драконорождённый':['Паладин','Маг','Воин']
  };
  const weapons = {'Воин':'Меч','Маг':'Посох','Вор':'Кинжалы','Паладин':'Молот','Следопыт':'Лук','Некромант':'Книга заклинаний','Инженер':'Винтовка'};
  const abilities = {'Воин':'Удар возмездия','Маг':'Фаербол','Вор':'Невидимость','Паладин':'Божественный щит','Следопыт':'Меткий выстрел','Некромант':'Призыв скелетов','Инженер':'ЭМИ-импульс'};

  const race = races[hash(displayName, races.length)];
  const classList = classesByRace[race];
  const cls = classList[hash(displayName + 'class', classList.length)];
  const weapon = weapons[cls];
  const ability = abilities[cls];
  const stats = {
    strength: hash(displayName+'str',10)+1,
    agility: hash(displayName+'agi',10)+1,
    intelligence: hash(displayName+'int',10)+1,
    magic: hash(displayName+'mag',10)+1,
    luck: hash(displayName+'lck',10)+1
  };
  const quotes = translations[lang]?.quotes || translations['ru'].quotes;
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return { name: displayName, race, class: cls, weapon, ability, stats, quote };
}

// ==================== РИСОВАНИЕ ПЕРСОНАЖА (полная версия) ====================
function drawCharacterCard(canvas, char, lang = currentLang, isLegendary = false) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  if (w === 0 || h === 0) return;
  ctx.clearRect(0, 0, w, h);

  const style = char.race === 'Киборг' ? 'cyberpunk' : (['Гном','Орк','Тёмный эльф'].includes(char.race) ? 'dark' : 'fantasy');
  let bgGradient;
  if (style==='fantasy') { bgGradient=ctx.createLinearGradient(0,0,0,h); bgGradient.addColorStop(0,'#3e2a14'); bgGradient.addColorStop(0.7,'#1f1204'); }
  else if (style==='dark') { bgGradient=ctx.createLinearGradient(0,0,0,h); bgGradient.addColorStop(0,'#1c1c1c'); bgGradient.addColorStop(0.7,'#0a0a0a'); }
  else { bgGradient=ctx.createLinearGradient(0,0,0,h); bgGradient.addColorStop(0,'#120a1f'); bgGradient.addColorStop(0.7,'#2d1b4e'); }
  ctx.fillStyle = bgGradient;
  roundRect(ctx,0,0,w,h,30); ctx.fill();

  ctx.strokeStyle = isLegendary ? '#ffd700' : (style==='cyberpunk'?'#00ffff':style==='dark'?'#8b0000':'#e94560');
  ctx.lineWidth=5; roundRect(ctx,2,2,w-4,h-4,28); ctx.stroke();
  if (isLegendary) { ctx.strokeStyle='#ffec8b'; ctx.lineWidth=2; roundRect(ctx,12,12,w-24,h-24,22); ctx.stroke(); }

  const sx = w/400, sy = h/680;
  const bodyTop = 130*sy, centerX = 200*sx;
  const skinColors = {'Человек':'#f1c27d','Эльф':'#fbe0b0','Гном':'#e6b88a','Орк':'#7b9e4d','Тёмный эльф':'#8b6b8a','Киборг':'#b0b0b0','Драконорождённый':'#d98c5f'};
  const skin = skinColors[char.race]||'#f1c27d';

  // голова
  ctx.fillStyle = skin;
  ctx.beginPath(); ctx.arc(centerX, bodyTop, 28*sx, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle='#333'; ctx.lineWidth=2*sx; ctx.stroke();
  // глаза
  ctx.fillStyle = char.race==='Киборг'?'#00ffff':'#fff';
  ctx.beginPath(); ctx.arc(centerX-10*sx, bodyTop-8*sy, 5*sx, 0, Math.PI, false); ctx.fill();
  ctx.beginPath(); ctx.arc(centerX+10*sx, bodyTop-8*sy, 5*sx, 0, Math.PI, false); ctx.fill();
  ctx.fillStyle='#000'; ctx.beginPath(); ctx.arc(centerX-10*sx, bodyTop-8*sy, 2.5*sx,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(centerX+10*sx, bodyTop-8*sy, 2.5*sx,0,Math.PI*2); ctx.fill();
  // рот
  ctx.strokeStyle='#000'; ctx.lineWidth=1.5*sx;
  ctx.beginPath(); ctx.arc(centerX, bodyTop+2*sy, 8*sx, 0.1, Math.PI-0.1); ctx.stroke();
  // волосы
  let hairColor = '#4a3728';
  if (char.race==='Эльф') hairColor='#e6c887'; else if (char.race==='Тёмный эльф') hairColor='#3c1f3c';
  else if (char.race==='Гном') hairColor='#c47e3a'; else if (char.race==='Орк') hairColor='#3a3a3a';
  else if (char.race==='Киборг') hairColor='#555'; else if (char.class==='Маг') hairColor='#4a3f6b';
  ctx.fillStyle=hairColor;
  ctx.beginPath(); ctx.arc(centerX, bodyTop-12*sy, 30*sx, Math.PI, 2*Math.PI); ctx.fill();
  ctx.beginPath(); ctx.moveTo(centerX-18*sx, bodyTop-5*sy);
  ctx.quadraticCurveTo(centerX-28*sx, bodyTop-15*sy, centerX-20*sx, bodyTop-30*sy);
  ctx.quadraticCurveTo(centerX, bodyTop-38*sy, centerX+20*sx, bodyTop-30*sy);
  ctx.quadraticCurveTo(centerX+28*sx, bodyTop-15*sy, centerX+18*sx, bodyTop-5*sy);
  ctx.fill();
  // одежда
  const classColors = {'Воин':'#8b1a1a','Маг':'#2e3b5c','Вор':'#2e2e2e','Паладин':'#c7b48b','Следопыт':'#3a5a3a','Некромант':'#1a1a2e','Инженер':'#6b5b3a'};
  ctx.fillStyle=classColors[char.class]||'#555';
  ctx.fillRect(centerX-25*sx, bodyTop+30*sy, 50*sx, 50*sy);
  ctx.fillRect(centerX-45*sx, bodyTop+35*sy, 20*sx, 12*sy);
  ctx.fillRect(centerX+25*sx, bodyTop+35*sy, 20*sx, 12*sy);
  ctx.fillStyle='#3a3a3a';
  ctx.fillRect(centerX-20*sx, bodyTop+80*sy, 15*sx, 40*sy);
  ctx.fillRect(centerX+5*sx, bodyTop+80*sy, 15*sx, 40*sy);
  ctx.fillStyle='#222';
  ctx.fillRect(centerX-22*sx, bodyTop+120*sy, 18*sx, 10*sy);
  ctx.fillRect(centerX+5*sx, bodyTop+120*sy, 18*sx, 10*sy);
  // броня
  ctx.strokeStyle='#d4af37'; ctx.lineWidth=1.5*sx;
  ctx.strokeRect(centerX-23*sx, bodyTop+70*sy, 46*sx, 6*sy);
  ctx.fillStyle='#555';
  ctx.fillRect(centerX-45*sx, bodyTop+28*sy, 20*sx, 8*sy);
  ctx.fillRect(centerX+25*sx, bodyTop+28*sy, 20*sx, 8*sy);
  // шлем
  if (char.class==='Воин'||char.class==='Паладин') {
    ctx.fillStyle='#777'; ctx.beginPath(); ctx.arc(centerX, bodyTop-18*sy, 22*sx, Math.PI,2*Math.PI); ctx.fill();
    ctx.fillStyle='#d4af37'; ctx.fillRect(centerX-8*sx, bodyTop-30*sy, 16*sx, 8*sy);
  } else if (char.class==='Маг') {
    ctx.fillStyle='#3a2f5c'; ctx.beginPath(); ctx.moveTo(centerX-15*sx, bodyTop-20*sy);
    ctx.lineTo(centerX, bodyTop-38*sy); ctx.lineTo(centerX+15*sx, bodyTop-20*sy); ctx.fill();
  } else if (char.class==='Вор') {
    ctx.fillStyle='#1a1a1a'; ctx.beginPath(); ctx.arc(centerX, bodyTop-18*sy, 24*sx, Math.PI,2*Math.PI); ctx.fill();
    ctx.fillRect(centerX-30*sx, bodyTop-15*sy, 60*sx, 15*sy);
  }
  // оружие
  if (char.class==='Воин'||char.class==='Паладин') {
    ctx.fillStyle='#ccc'; ctx.fillRect(centerX+42*sx, bodyTop+20*sy, 6*sx, 50*sy);
    ctx.fillStyle='#f5a623'; ctx.fillRect(centerX+40*sx, bodyTop+18*sy, 10*sx, 8*sy);
  } else if (char.class==='Маг'||char.class==='Некромант') {
    ctx.fillStyle='#8b4513'; ctx.fillRect(centerX-55*sx, bodyTop+10*sy, 8*sx, 70*sy);
    ctx.fillStyle='#00ffff'; ctx.beginPath(); ctx.arc(centerX-51*sx, bodyTop+8*sy, 10*sx,0,Math.PI*2); ctx.fill();
  } else if (char.class==='Вор') {
    ctx.fillStyle='#ddd'; ctx.fillRect(centerX-48*sx, bodyTop+25*sy, 18*sx, 4*sy);
    ctx.fillRect(centerX+28*sx, bodyTop+25*sy, 18*sx, 4*sy);
  } else if (char.class==='Следопыт') {
    ctx.strokeStyle='#8b4513'; ctx.lineWidth=3*sx; ctx.beginPath(); ctx.arc(centerX-42*sx, bodyTop+25*sy, 22*sx, -0.5,0.5); ctx.stroke();
  } else if (char.class==='Инженер') {
    ctx.fillStyle='#333'; ctx.fillRect(centerX+38*sx, bodyTop+20*sy, 40*sx, 8*sy);
    ctx.fillStyle='#555'; ctx.fillRect(centerX+74*sx, bodyTop+15*sy, 10*sx, 18*sy);
  }
  // эмодзи расы
  const raceEmoji = {'Человек':'🛡️','Эльф':'🏹','Гном':'⛏️','Орк':'👹','Тёмный эльф':'🗡️','Киборг':'🤖','Драконорождённый':'🐉'};
  ctx.font = `${28*sx}px serif`; ctx.fillStyle='white'; ctx.textAlign='center';
  ctx.fillText(raceEmoji[char.race]||'⚔️', centerX, bodyTop+155*sy);
  // имя
  ctx.font = `bold ${26*sx}px "Segoe UI"`; ctx.fillStyle='#fff';
  ctx.fillText(char.name, centerX, bodyTop+190*sy);
  // раса/класс
  ctx.font = `${17*sx}px "Segoe UI"`; ctx.fillStyle='#ddd';
  ctx.fillText(`${char.race} · ${char.class}`, centerX, bodyTop+215*sy);
  // оружие и способность
  ctx.font = `${14*sx}px "Segoe UI"`; ctx.fillStyle='#aaa';
  const wLabel = lang==='ru'?'Оружие':'Weapon', aLabel = lang==='ru'?'Способность':'Ability';
  ctx.fillText(`${wLabel}: ${char.weapon}  |  ${aLabel}: ${char.ability}`, centerX, bodyTop+240*sy);
  // статы (всегда на русском)
  const stats = char.stats;
  const attrs = [
    { name:'💪 Сила', val:stats.strength },
    { name:'🏃 Ловкость', val:stats.agility },
    { name:'🧠 Интеллект', val:stats.intelligence },
    { name:'✨ Магия', val:stats.magic },
    { name:'🍀 Удача', val:stats.luck }
  ];
  const startY = bodyTop+270*sy, lh = 28*sy, barX = 160*sx, barW = 170*sx;
  attrs.forEach((a,i) => {
    const y = startY+i*lh;
    ctx.font=`${15*sx}px "Segoe UI"`; ctx.fillStyle='#ddd'; ctx.textAlign='left'; ctx.fillText(a.name, 40*sx, y);
    ctx.fillStyle='#444'; roundRect(ctx, barX, y-11*sy, barW, 14*sy, 7*sy); ctx.fill();
    const gradient = ctx.createLinearGradient(barX,0,barX+barW,0);
    if (style==='cyberpunk') { gradient.addColorStop(0,'#00ffff'); gradient.addColorStop(1,'#ff00ff'); }
    else { gradient.addColorStop(0,'#e94560'); gradient.addColorStop(1,'#f5a623'); }
    ctx.fillStyle=gradient; roundRect(ctx, barX, y-11*sy, (a.val/10)*barW, 14*sy, 7*sy); ctx.fill();
    ctx.fillStyle='#fff'; ctx.font=`bold ${13*sx}px sans-serif`; ctx.textAlign='center'; ctx.fillText(a.val, barX+barW+20*sx, y);
  });
  // цитата
  const quoteY = startY+attrs.length*lh + 25*sy;
  ctx.font=`italic ${13*sx}px "Segoe UI", serif`; ctx.fillStyle='#f0c27b'; ctx.textAlign='center';
  ctx.fillText(char.quote, centerX, quoteY);
  // рейтинг
  ctx.font=`bold ${14*sx}px "Segoe UI"`; ctx.fillStyle='#f5a623';
  ctx.fillText(`🏆 ${progress.rating}  ⚔️ ${progress.wins}/${progress.losses}`, centerX, 30*sy);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h); ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y); ctx.closePath();
}

// ==================== БИТВА ====================
function generateEnemy() {
  const names = ['Теневой Воин','Ледяной Маг','Кровавый Рыцарь','Призрачный Вор','Огненный Дракон','Стальной Голем','Лунный Эльф'];
  const name = names[Math.floor(Math.random()*names.length)];
  const enemy = getCharacterFromName(name);
  enemy.stats.strength = Math.max(1, enemy.stats.strength + Math.floor(Math.random()*3)-1);
  enemy.stats.agility = Math.max(1, enemy.stats.agility + Math.floor(Math.random()*3)-1);
  enemy.stats.intelligence = Math.max(1, enemy.stats.intelligence + Math.floor(Math.random()*3)-1);
  enemy.stats.magic = Math.max(1, enemy.stats.magic + Math.floor(Math.random()*3)-1);
  enemy.stats.luck = Math.max(1, enemy.stats.luck + Math.floor(Math.random()*3)-1);
  return enemy;
}
function simulateBattle(player, enemy) {
  const log = [];
  let pHP = 100, eHP = 100, round = 1;
  while (pHP > 0 && eHP > 0 && round <= 20) {
    let pDmg = Math.max(5, player.stats.strength * 3 + player.stats.agility - enemy.stats.agility + Math.floor(Math.random()*6));
    if (Math.random() < 0.15) log.push(t('battle_log_dodge', {attacker: player.name}));
    else { eHP -= pDmg; log.push(t('battle_log_hit', {attacker: player.name, damage: pDmg})); }
    if (eHP <= 0) break;
    let eDmg = Math.max(5, enemy.stats.strength * 3 + enemy.stats.agility - player.stats.agility + Math.floor(Math.random()*6));
    if (Math.random() < 0.15) log.push(t('battle_log_dodge', {attacker: enemy.name}));
    else { pHP -= eDmg; log.push(t('battle_log_hit', {attacker: enemy.name, damage: eDmg})); }
    round++;
  }
  return { log, playerWon: eHP <= 0, finalPHP: Math.max(0,pHP), finalEHP: Math.max(0,eHP) };
}
function renderBattlePage() {
  const canvas = document.getElementById('battleCanvas');
  if (!canvas || !currentCharacter || !battleEnemy) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // упрощённое отображение двух персонажей
  ctx.font = 'bold 20px "Segoe UI"';
  ctx.fillStyle = '#fff';
  ctx.fillText(currentCharacter.name, 50, 50);
  ctx.fillText('VS', 180, 150);
  ctx.fillText(battleEnemy.name, 250, 50);
  // отображаем логи
  const logDiv = document.getElementById('battleLog');
  if (logDiv && battleLog.length) {
    logDiv.innerHTML = battleLog.map(l => `<div>${l}</div>`).join('');
    logDiv.scrollTop = logDiv.scrollHeight;
  }
}

// ==================== КОЛЕСО УДАЧИ ====================
function canSpinWheel() { return (Date.now() - progress.lastWheelTime) >= 30 * 60 * 1000; }
function spinWheel() {
  if (!canSpinWheel()) return false;
  const rewards = [
    { type: 'stats', text: 'wheel_reward_stats' },
    { type: 'race', text: 'wheel_reward_race' },
    { type: 'exp', text: 'wheel_reward_exp' },
    { type: 'coins', text: 'wheel_reward_coins' }
  ];
  const reward = rewards[Math.floor(Math.random()*rewards.length)];
  if (reward.type === 'stats' && currentCharacter) {
    for (let key in currentCharacter.stats) currentCharacter.stats[key] = Math.min(10, currentCharacter.stats[key]+1);
    updateCreate();
  }
  progress.lastWheelTime = Date.now();
  saveProgress(progress);
  document.getElementById('wheelReward').style.display = 'block';
  document.getElementById('wheelReward').innerHTML = `<strong>${t(reward.text)}</strong>`;
  updateWheelCooldown();
  return true;
}
function updateWheelCooldown() {
  const cd = document.getElementById('wheelCooldown');
  const btn = document.getElementById('spinWheelBtn');
  if (!cd || !btn) return;
  if (canSpinWheel()) { cd.textContent = ''; btn.disabled = false; }
  else {
    const remaining = 30*60*1000 - (Date.now() - progress.lastWheelTime);
    const mins = Math.ceil(remaining/60000);
    cd.textContent = `${currentLang==='ru'?'Следующая попытка через':'Next spin in'} ${mins} ${currentLang==='ru'?'мин':'min'}`;
    btn.disabled = true;
    setTimeout(updateWheelCooldown, 10000);
  }
}

// ==================== ЕЖЕДНЕВНАЯ НАГРАДА ====================
function getTodayStr() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function canClaimDaily() { return progress.lastDailyClaim !== getTodayStr(); }
function claimDaily() {
  if (!canClaimDaily()) return false;
  progress.lastDailyClaim = getTodayStr();
  const legendary = getCharacterFromName('Легенда');
  legendary.name = '★ ' + legendary.name;
  legendary.isLegendary = true;
  if (progress.characters.length >= 20) progress.characters.shift();
  progress.characters.push(legendary);
  saveProgress(progress);
  alert(`${currentLang==='ru'?'🎁 Вы получили легендарного персонажа:':'🎁 You got a legendary character:'} ${legendary.name}`);
  updateDailyBonusBtn();
  renderGallery();
  return true;
}
function updateDailyBonusBtn() {
  const btn = document.getElementById('claimDailyBtn');
  if (!btn) return;
  btn.style.display = canClaimDaily() ? 'inline-block' : 'none';
}

// ==================== ГАЛЕРЕЯ ====================
function renderCharacterThumbnail(character, size = 140) {
  const fullCanvas = document.createElement('canvas');
  fullCanvas.width = 400; fullCanvas.height = 680;
  drawCharacterCard(fullCanvas, character, currentLang, character.isLegendary);
  const thumb = document.createElement('canvas');
  thumb.width = size; thumb.height = size * (680/400);
  const tCtx = thumb.getContext('2d');
  tCtx.drawImage(fullCanvas, 0, 0, thumb.width, thumb.height);
  return thumb.toDataURL('image/png');
}
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  const empty = document.getElementById('galleryEmpty');
  if (!grid) return;
  grid.innerHTML = '';
  const chars = progress.characters;
  if (!chars.length) { empty.style.display='block'; return; }
  empty.style.display='none';
  chars.forEach((char, index) => {
    const imgSrc = renderCharacterThumbnail(char, 140);
    const div = document.createElement('div'); div.className='gallery-item';
    div.innerHTML = `<img src="${imgSrc}" alt="${char.name}"><div class="name">${char.name}</div><div class="info">${char.race} · ${char.class}</div><button class="delete-btn" data-index="${index}">✕</button>`;
    div.querySelector('img').addEventListener('click', ()=>{
      document.querySelectorAll('.menu-btn').forEach(b=>b.classList.remove('active'));
      document.querySelector('[data-page="create"]').classList.add('active');
      document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
      document.getElementById('page-create').classList.add('active');
      document.getElementById('createNameInput').value = char.name;
      currentCharacter = char;
      updateCreate();
    });
    div.querySelector('.delete-btn').addEventListener('click', (e)=>{
      e.stopPropagation();
      progress.characters.splice(index,1);
      saveProgress(progress);
      renderGallery();
    });
    grid.appendChild(div);
  });
}

// ==================== НАВИГАЦИЯ ====================
function switchPage(pageName) {
  document.querySelectorAll('.menu-btn').forEach(b=>b.classList.remove('active'));
  document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(`page-${pageName}`).classList.add('active');
  if (pageName === 'battle') { battleEnemy = generateEnemy(); renderBattlePage(); }
  if (pageName === 'wheel') updateWheelCooldown();
  if (pageName === 'gallery') renderGallery();
}
document.querySelectorAll('.menu-btn').forEach(btn => btn.addEventListener('click', ()=> switchPage(btn.dataset.page)));

// ==================== ОБРАБОТЧИКИ ====================
function updateCreate() {
  const nameInput = document.getElementById('createNameInput');
  if (!nameInput) return;
  const char = getCharacterFromName(nameInput.value);
  currentCharacter = char;
  drawCharacterCard(document.getElementById('createCanvas'), char);
  document.getElementById('createRace').textContent = char.race;
  document.getElementById('createClass').textContent = char.class;
  document.getElementById('createWeapon').textContent = char.weapon;
  document.getElementById('createAbility').textContent = char.ability;
  document.getElementById('createRating').textContent = progress.rating;
}
document.getElementById('createNameInput').addEventListener('input', updateCreate);
document.getElementById('createGenerateBtn').addEventListener('click', updateCreate);
document.getElementById('createSaveBtn').addEventListener('click', ()=>{
  if (!currentCharacter) return;
  if (progress.characters.length >= 20) { alert(currentLang==='ru'?'Лимит 20':'Limit 20'); return; }
  progress.characters.push({...currentCharacter});
  saveProgress(progress);
  alert(currentLang==='ru'?'Сохранено!':'Saved!');
  renderGallery();
});
document.getElementById('createDownloadBtn').addEventListener('click', ()=>{
  const a = document.createElement('a'); a.download='character.png'; a.href=document.getElementById('createCanvas').toDataURL(); a.click();
});
document.getElementById('startBattleBtn').addEventListener('click', ()=>{
  if (!currentCharacter) { alert(currentLang==='ru'?'Сначала создайте персонажа!':'Create a character first!'); return; }
  if (!battleEnemy) battleEnemy = generateEnemy();
  const result = simulateBattle(currentCharacter, battleEnemy);
  battleLog = result.log;
  if (result.playerWon) { progress.wins++; progress.rating += 25; }
  else { progress.losses++; progress.rating = Math.max(0, progress.rating - 15); }
  saveProgress(progress);
  document.getElementById('battleResult').style.display = 'block';
  document.getElementById('battleResult').textContent = result.playerWon ? t('win') : t('lose');
  document.getElementById('battleResult').style.color = result.playerWon ? '#4caf50' : '#e94560';
  renderBattlePage();
  document.getElementById('createRating').textContent = progress.rating;
  battleEnemy = generateEnemy();
});
document.getElementById('spinWheelBtn').addEventListener('click', spinWheel);
document.getElementById('claimDailyBtn').addEventListener('click', claimDaily);
document.getElementById('langSelect').addEventListener('change', (e)=> applyLanguage(e.target.value));

// ==================== ЗАПУСК ====================
window.addEventListener('DOMContentLoaded', ()=>{
  applyLanguage('ru');
  updateCreate();
  updateDailyBonusBtn();
  if (!progress.lastDailyClaim) claimDaily(); // первый заход — подарок
});
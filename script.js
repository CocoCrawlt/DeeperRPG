//intro stuff, currently unused
let questionNumber = 0;
let pronouns = 0;
let name;

//player stats
let xp = 0;
let level = 1;

let health = 50;
let maxHealth = 50;

let mp = 50;
let maxMp = 50;

let gold = 50;

let ms = 5;
let md = 5;
let atk = 5;
let def = 5;
let spd = 10;
//Stat boosts from potions/boost magic
let atkBoost = 0;
let defBoost = 0;
let msBoost = 0;
let mdBoost = 0;
let spdBoost = 0;
//Player status ailment index
let playerStatus = 0;
let playerStatusTimer = 0;
//Weapon/inventory stuff
let currentWeapon = 0;
let currentArmor = 0;
let inventoryWeapons = ["stick"];
let inventoryArmor = ["vest"];
let inventoryKey = [];
let inventoryOther = ['green potion', 'green potion'];
let inventoryCap = 12;
let itemMenuPage = 0;
let itemOneIndex = 0;
let itemTwoIndex = 1;
let itemThreeIndex = 2;

//Enemy stuff
let fighting;
let monsterHealth;
let monsterMP;
let magicCounter = 0;
let enemyStatus = 0;
let enemyStatusTimer = 0;

//Position in the story
let storyIndex = 0;
let dragonGaurdStatus = 0;

//1 or 2 if you've talked to the Town NPC
let greenStatus = 0;

const bg = document.querySelector('body');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const text = document.querySelector("#text");
const vis = document.querySelector('#visuals');
const char = document.querySelector('#characters');
const lvText = document.querySelector("#lvText");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const maxHpText = document.querySelector("#maxHealthText");
const mpText = document.querySelector("#mpText");
const maxMpText = document.querySelector("#maxMpText");
const goldText = document.querySelector("#goldText");
const atkText = document.querySelector("#atkText");
const defText = document.querySelector("#defText");
const msText = document.querySelector("#msText");
const mdText = document.querySelector("#mdText");
const spdText = document.querySelector("#speedText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//AUDIO WOAH
const sfx_attack = document.getElementById("sfx_attack");
const sfx_fire = document.getElementById("sfx_fire");
const sfx_freeze = document.getElementById("sfx_freeze");
const sfx_heal = document.getElementById("sfx_heal");
const sfx_buy = document.getElementById("sfx_buy");
const sfx_no = document.getElementById("sfx_no");
const sfx_green = document.getElementById("sfx_green");
const sfx_run = document.getElementById("sfx_run");

//MUSICS WOAH
const mus_town = document.getElementById("mus_town");
mus_town.loop = true;
const mus_shop = document.getElementById("mus_shop");
mus_shop.loop = true;
const mus_cave = document.getElementById("mus_cave");
mus_cave.loop = true;
const mus_battleDragon = document.getElementById("mus_battleDragon");
mus_battleDragon.loop = true;
const mus_battleStone = document.getElementById("mus_battleStone");
mus_battleStone.loop = true;
const mus_battleDweller = document.getElementById("mus_battleDweller");
mus_battleDweller.loop = true;
const mus_gameOver = document.getElementById("mus_gameOver");
mus_gameOver.loop = true;
const mus_battleWin = document.getElementById("mus_battleWin");
const mus_xpGame = document.getElementById("mus_xpGame");
mus_xpGame.loop = true;
const battleMusic = [
  mus_battleDragon,
  mus_battleStone,
  mus_battleDweller
]
for (let i = battleMusic.length ; i == 0 ; i--){
  battleMusic[i].loop = true;
}

//Questions for the currently unused intro sequence
const introQuestions = [
  {
    name: "name",
    "button text": ["Answer", "Answer", "Answer", "Answer", "Answer"],
    "button functions": [pickName, pickName, pickName, pickName, pickName],
    text: "Welcome to the world of Dragon Reppeller! In this world, there is magic, and wonders... and you can't leave your town, because there's a dragon gaurding it. You have been chosen to save the town from this dragon, but first, you must answer a few questions.\n\nFirst, what is your name?",
  },
  {
    name: "gender",
    "button text": ["Male (he/him)", "Female (she/her)", "Yes (they/them)", "No (it/its)", "Uhhhh..."],
    "button functions": [pronounHe, pronounShe, pronounThey, pronounIt, noItem],
    text: "Wonderful! " + name + " is a beautiful name.\n\nNext, are you male or female?",
  },
];

//Pronouns, also determined by answers in the intro, also unused
const pronounSet = [
  {
    subject: "he",
    object: "his",
    "dep posessive": "his",
    "indep possessive": "his",
    reflex: "himself",
    is: "is"
  },
  {
    subject: "she",
    object: "her",
    "dep posessive": "her",
    "indep possessive": "hers",
    reflex: "herself",
    is: "is"
  },
  {
    subject: "they",
    object: "them",
    "dep posessive": "their",
    "indep possessive": "theirs",
    reflex: "themself",
    is: "are"
  },
  {
    subject: "it",
    object: "it",
    "dep posessive": "its",
    "indep possessive": "its",
    reflex: "itself",
    is: "is"
  }
]

//Magic/enemy eliments
const elements = [
  {
    name: "normal",
    effect: "none",
    weakness: [],
    strength: []
  },
  {
    name: "fire",
    effect: "burn",
    weakness: ["water", "earth"],
    strength: ["ice", "grass"]
  },
  {
    name: "ice",
    effect: "freeze",
    weakness: ["fire"],
    strength: ["grass"]
  },
  {
    name: "lightning",
    effect: "none",
    weakness: ["earth"],
    strength: ["water"]
  },
  {
    name: "earth",
    effect: "none",
    weakness: ["water"],
    strength: ["lightning", "fire"]
  },
  {
    name: "water",
    effect: "wet",
    weakness: ["lightning", "grass"],
    strength: ["ice", "fire"]
  },
  {
    name: "grass",
    effect: "none",
    weakness: ["fire", "ice"],
    strength: ["water"]
  },
  {
    name: "air",
    effect: "none",
    weakness: [],
    strength: []
  },
  {
    name: "dragon",
    effect: "none",
    weakness: [],
    strength: []
  }
]

//Equipment/items index
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'metal sword', power: 15 }
];
const armor = [
  { name: 'vest', protection: 5 },
  { name: 'metal chestplate', protection: 15 }
];
const items = [
  {
    name: 'green potion',
    cost: 20,
    sellCost: 5,
    type: "heal",
    boost: 25,
    boostStat: health,
    desc: "A small green potion. Heals 25 HP."
  },
  {
    name: 'purple potion',
    cost: 20,
    sellCost: 5,
    type: "mpHeal",
    boost: 25,
    boostStat: mp,
    desc: "A small purple potion. Heals 25 MP."
  },
  {
    name: 'red potion',
    cost: 20,
    sellCost: 5,
    type: "atkBoost",
    boost: 5,
    boostStat: atkBoost,
    desc: "A small red potion. Boosts attack by 5."
  },
  {
    name: 'blue potion',
    cost: 20,
    sellCost: 5,
    type: "defBoost",
    boost: 5,
    boostStat: defBoost,
    desc: "A small blue potion. Boosts defense by 5."
  },
  {
    name: 'gray slime droplet',
    cost: 10,
    sellCost: 2,
    type: "heal",
    boost: 10,
    boostStat: health,
    desc: "A piece of a Gray Slime. It's considered a delicacy in some cultures. Heals 10 HP."
  },
  {
    name: 'debug potion',
    cost: 10,
    sellCost: 2,
    type: "debugPotion",
    boost: 10,
    boostStat: health,
    desc: "I know what you are"
  },
  {
    name: 'bomb',
    cost: 50,
    sellCost: 20,
    type: "bomb",
    power: 70,
    desc: "A standard fuse bomb. Does 50 damage and may burn the enemy."
  }
];
//Enemies!!!!! 
//TO DO: Add a fourth cave enemy, preferrably one that is weak to fire
const monsters = [
  {
    name: "gray slime",
    level: 5,
    health: 30,
    mp: 0,
    atk: 15,
    def: 15,
    spd: 10,
    ms: 0,
    md: 10,
    element: "normal",
    elementIn: 0,
    magic: [],
    desc: "This is a Gray Slime, the weakest member of the slime family. It has low stats and no spells.",
    drops: 'gray slime droplet',
    "drop chance": 3,
    music: 0,
    isBoss: false,
    image: "images/monsters/slimeG.png"
  },
  {
    name: "fanged beast",
    level: 7,
    health: 60,
    mp: 0,
    atk: 15,
    def: 10,
    spd: 20,
    ms: 0,
    md: 15,
    element: "normal",
    elementIn: 0,
    magic: [],
    desc: "This is a fanged beast, a large, bat-like creature. Fast, but has weak defense and no spells.",
    music: 0,
    isBoss: false,
    image: "images/monsters/beast.png"
  },
  {
    name: "dragon",
    level: 70,
    health: 500,
    mp: 100,
    atk: 30,
    def: 35,
    spd: 30,
    ms: 25,
    md: 35,
    element: "dragon",
    elementIn: 8,
    magic: ["fire", "heal"],
    desc: "This is the dragon keeping people from leaving town! It's been keeping the citizens in the town for 100 years, so very few know of what's beyond it. Beware of its powerful fire breath attack.",
    music: 1,
    isBoss: true,
    image: "images/monsters/dweller.png"
  },
  {
    name: "kinetic stone",
    level: 10,
    health: 60,
    mp: 30,
    atk: 20,
    def: 35,
    spd: 10,
    ms: 10,
    md: 30,
    element: "earth",
    elementIn: 4,
    magic: ["heal"],
    desc: "A mysterious, anthropromorphised rock. It's slow, but powerful, and it has healing abilities. It's also rumored to be part of a larger group of species called the \"energy stones\".",
    drops: 'purple potion',
    "drop chance": 10,
    music: 0,
    isBoss: false,
    image: "images/monsters/stoneK.png"
  },
  {
    name: "Cave Dweller",
    level: 45,
    health: 200,
    atk: 30,
    def: 30,
    spd: 20,
    ms: 0,
    md: 30,
    element: "earth",
    elementIn: 4,
    magic: [],
    desc: "A feral beast living in the cave. It was once a cave explorer, but it got lost and now lives isolated from the town he once called home.",
    music: 0,
    isBoss: true,
    image: "images/monsters/dweller.png"
  }
];

const statusList = [
  {
    name: "normal",
    type: "normal",
    element: "normal"
  },
  {
    name: "burning",
    type: "damage",
    element: "fire",
    baseDamage: 5,
    baseCounter: 3
  },
  {
    name: "frozen",
    type: "still",
    element: "ice",
    baseCounter: 3
  }
]

//Room index
const locations = [
  {
    name: "town square",
    "button text": ["Go to shop", "Go to cave", "Go to Dragon Mountain", "Talk to civilian", "Check inventory"],
    "button functions": [goStore, goCave, dragonGaurd, green, itemCheck],
    text: "You are in the town square. You see a sign that says \"Shop\".",
    background: "images/backgrounds/town.png"
  },
  {
    name: "store",
    "button text": ["Buy potions", "Buy equipment", "Sell", "Talk", "Go to town square"],
    "button functions": [buyPotion, buyEquip, sell, talk, goTown],
    text: 'You enter the shop. The shopkeeper says: "Welcome to my shop!"',
    background: "images/backgrounds/shop.png"
  },
  {
    name: "cave",
    "button text": ["Fight gray slime", "Fight fanged beast", "Fight kinetic stone", "Fight Cave Dweller", "Go to town square"],
    "button functions": [fightSlime, fightBeast, fightStone, fightDweller, goTown],
    text: "You enter the cave. You see some monsters.",
    background: "images/backgrounds/cave.png"
  },
  {
    name: "fight",
    "button text": ["Attack", "Check", "Item", "Magic", "Run"],
    "button functions": [attack, enemyCheck, itemMenu, magicMenu, runAway],
    text: "You are fighting a monster.",
    background: "images/backgrounds/cave.png"
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square", "Go to town square", "Go to town square"],
    "button functions": [xpGame, xpGame, xpGame, xpGame, xpGame],
    text: 'You won the battle! You gain experience points and find gold.',
    background: "images/backgrounds/cave.png"
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart, restart, restart],
    text: "You die. &#x2620;",
    background: "images/backgrounds/cave.png"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
    background: "images/backgrounds/cave.png"
  },
  {
    name: "easter egg",
    "button text": ["3", "6", "9", "12", "Go to town square?"],
    "button functions": [pickOne, pickTwo, pickThree, pickFour, goTown],
    text: "You found the hidden xp game! Pick a number above. Ten numbers will be randomly chosen between 0 and 15. If the number you choose matches one of the random numbers, you win!",
    background: "images/backgrounds/cave.png"
  },
  {
    name: "intro",
    "button text": ["Answer", "Answer", "Answer", "Answer", "Answer"],
    "button functions": [pickName, pickName, pickName, pickName, pickName],
    text: "Welcome to the world of Dragon Reppeller! In this world, there is magic, and wonders... and you can't leave your town, because there's a dragon gaurding it. You have been chosen to save the town from this dragon, but first, you must answer a few questions.\n\nFirst, what is your name?",
    background: "images/backgrounds/town.png"
  },
  {
    name: "dragon gaurd waiting",
    "button text": ["Yes", "No", "No", "No", "No"],
    "button functions": [fightDragon, goTown, goTown, goTown, goTown],
    text: `Woah! You actually defeated the Cave Dweller? In that case, are you ready to fight The Dragon?`,
    background: "images/backgrounds/town.png"
  }
];
let currentLocation = locations[0];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = dragonGaurd;
button4.onclick = green;
button5.onclick = itemCheck;

mus_town.play();

function update(location) {
  currentLocation = location;
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button5.innerText = location["button text"][4];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  button5.onclick = location["button functions"][4];
  text.innerHTML = location.text;
  vis.style.backgroundImage = `url(${location.background})`;
  char.style.display = "none";
}

function goTown() {
  update(locations[0]);
  mus_shop.pause()
  mus_shop.currentTime = 0;
  mus_cave.pause()
  mus_cave.currentTime = 0;
  mus_battleStone.pause();
  mus_battleStone.currentTime = 0;
  mus_battleDweller.pause();
  mus_battleDweller.currentTime = 0;
  mus_gameOver.pause();
  mus_gameOver.currentTime = 0;
  mus_xpGame.pause()
  mus_xpGame.currentTime = 0;
  mus_town.play();
  magicCounter = 0;
}

function green(){
  if (greenStatus == 0){
    bg.style.backgroundColor = "#004000";
    text.style.backgroundColor = "#004000";
    greenStatus = 1;
    text.innerHTML = 'The civilian says: "Ha! Get GREENED!"'
    button4.innerText = "What the heck!";
    button4.onclick = noItem;
  } else if (greenStatus == 1) {
    bg.style.backgroundColor = "#0a0a23";
    text.style.backgroundColor = "#0a0a23";
    greenStatus = 2;
    text.innerHTML = '"Sorry for GREENing you earlier."'
  } else {
    bg.style.backgroundColor = "#004000";
    text.style.backgroundColor = "#004000";
    greenStatus = 1;
    text.innerHTML = '"Wait, you want me to GREEN you again? If you say so!"'
  }
  sfx_green.play();
}

//Unused intro stuff
function nextQuestion(){

}
function pickName(){
  name = prompt("What is your name?");
  nextQuestion();
}
function pronounHe(){
  pronouns = 0;
  nextQuestion();
}
function pronounShe(){
  pronouns = 1;
  nextQuestion();
}
function pronounThey(){
  pronouns = 2;
  nextQuestion();
}
function pronounIt(){
  pronouns = 3;
  nextQuestion();
}
function goStore() {
  update(locations[1]);
  mus_shop.play();
  mus_town.pause();
  mus_town.currentTime = 0;
  char.src = monsters[fighting].image;
  char.style.display = "inline";
}
function goCave() {
  update(locations[2]);
  if (storyIndex !== 0){
    button4.innerText = "No enemy here!";
    button4.onclick = noItem;
  }
  mus_cave.play();
  mus_town.pause();
  mus_town.currentTime = 0;
}

function itemCheck() {
  itemMenuPage = 0;
  itemOneIndex = 0;
  itemTwoIndex = 1;
  itemThreeIndex = 2;
  if (inventoryOther.length % 3 == 2 && (itemMenuPage + 1 > inventoryOther.length / 3)) {
    button1.innerHTML = "Use " + inventoryOther[itemOneIndex];
    button2.innerHTML = "Use " + inventoryOther[itemTwoIndex];
    button3.innerHTML = "No item here!";
    button1.onclick = itemOnePeace;
    button2.onclick = itemTwoPeace;
    button3.onclick = noItem;
  } else if (inventoryOther.length % 3 == 1 && (itemMenuPage + 1 > inventoryOther.length / 3)){
    button1.innerHTML = "Use " + inventoryOther[itemOneIndex];
    button2.innerHTML = "No item here!";
    button3.innerHTML = "No item here!";
    button1.onclick = itemOnePeace;
    button2.onclick = noItem;
    button3.onclick = noItem;
  } else {
    button1.innerHTML = "Use " + inventoryOther[itemOneIndex];
    button2.innerHTML = "Use " + inventoryOther[itemTwoIndex];
    button3.innerHTML = "Use " + inventoryOther[itemThreeIndex];
    button1.onclick = itemOnePeace;
    button2.onclick = itemTwoPeace;
    button3.onclick = itemThreePeace;
  }
  button4.innerHTML = "Next page"
  button5.innerHTML = "Back"
  button4.onclick = itemCheckScroll;
  button5.onclick = goTown;
  text.innerText = "Inventory Page 1";
}

function itemCheckScroll(){
  itemMenuPage++;
  text.innerText = "Inventory Page " + (itemMenuPage + 1);
  if (itemMenuPage <= (inventoryOther.length - 1) / 3){
    itemOneIndex += 3;
    itemTwoIndex += 3;
    itemThreeIndex += 3;
    if (inventoryOther.length % 3 == 2 && (itemMenuPage + 1 > inventoryOther.length / 3)) {
      button1.innerHTML = "Use " + inventoryOther[itemOneIndex];
      button2.innerHTML = "Use " + inventoryOther[itemTwoIndex];
      button3.innerHTML = "No item here!";
      button1.onclick = itemOnePeace;
      button2.onclick = itemTwoPeace;
      button3.onclick = noItem;
    } else if (inventoryOther.length % 3 == 1 && (itemMenuPage + 1 > inventoryOther.length / 3)){
      button1.innerHTML = "Use " + inventoryOther[itemOneIndex];
      button2.innerHTML = "No item here!";
      button3.innerHTML = "No item here!";
      button1.onclick = itemOnePeace;
      button2.onclick = noItem;
      button3.onclick = noItem;
    }else {
      button1.innerHTML = "Use " + inventoryOther[itemOneIndex];
      button2.innerHTML = "Use " + inventoryOther[itemTwoIndex];
      button3.innerHTML = "Use " + inventoryOther[itemThreeIndex];
      button1.onclick = itemOnePeace;
      button2.onclick = itemTwoPeace;
      button3.onclick = itemThreePeace;
    }
  } else {
    itemCheck()
  }
  console.log(itemMenuPage);
}

function itemOnePeace(){
  useItemPeace(inventoryOther[itemOneIndex])
}

function itemTwoPeace(){
  useItemPeace(inventoryOther[itemTwoIndex])
}

function itemThreePeace(){
  useItemPeace(inventoryOther[itemThreeIndex])
}

function noItem(){

}

function useItemPeace(itemNum){
  const index = inventoryOther.indexOf(itemNum);
  const x = inventoryOther.splice(index, 1);
  function findItem(thing){
    return thing.name === x[0];
  }
  const usedItem = items.find(findItem);
  const boostNumber = Math.floor(Math.random() * 5) + usedItem.boost;
  goTown();
  if (usedItem.type == "heal"){
    if (health <= maxHealth - boostNumber) {
      text.innerText = "You use the " + usedItem.name + " and recover " + boostNumber + " HP!";
      health += boostNumber
      sfx_heal.play();
    } else if (health < maxHealth) {
      text.innerText = "You use the " + usedItem.name + " and your HP is maxxed out!";
      health = maxHealth;
      sfx_heal.play();
    } else {
      text.innerText = "You try to use the " + usedItem.name + ", but your HP is already maxxed out.";
    }
    healthText.innerText = health
  } else if (usedItem.type == "atkBoost" || usedItem.type == "defBoost" || usedItem.type == "bomb"){
    text.innerText = "The " + usedItem.name + " may only be used in battle.";
    inventoryOther.push(usedItem.name)
  } else if (usedItem.type == "mpHeal"){
    if (mp <= maxMp - boostNumber) {
      text.innerText = "You use the " + usedItem.name + " and recover " + boostNumber + " MP!";
      mp += boostNumber
    } else if (mp < maxHealth) {
      text.innerText = "You use the " + usedItem.name + " and your MP is maxxed out!";
      mp = maxMp;
    } else {
      text.innerText = "You try to use the " + usedItem.name + ", but your MP is already maxxed out.";
    }
    mpText.innerText = mp
  } else if (usedItem.type == "debugPotion"){
    lvUp();
    lvUp();
    lvUp();
    lvUp();
    lvUp();
    lvUp();
    lvUp();
    lvUp();
    lvUp();
    lvUp();
    storyIndex = 1;
  } else {
    text.innerText = "You used the " + usedItem.name + ". It did absolutely nothing, likely because you shouldn't have it.\n\nTo be clear, this is a bug.";
  }

  console.log(usedItem);
}

function talk(){
  text.innerText = '"What would you like to talk about?"'
  button1.innerText = "The Dragon";
  button2.innerText = "Potion types";
  button3.innerText = "The outside world";
  button4.innerText = "Magic";
  button5.innerText = "Nevermind";
  button1.onclick = talkDragon;
  button2.onclick = talkPotions;
  button3.onclick = talkOutside;
  button4.onclick = talkMagic;
  button5.onclick = goStore;
  
}

function talkDragon(){
  text.innerText = '"The Dragon has been keeping people from leaving and entering the town for longer than most of the town\'s residents have been alive. It makes you think; does it have a greater reason for being here? Probably not, but it\'s possible."'
}

function talkPotions(){
  text.innerText = '"There are many different types of potions. Each is a different color, and they all have different effects. For example, green potions heal your HP.\n\nSomewhere, there is a brewer so talented, they can make the rainbow potion. The rainbow potion is the rarest of all, and it can perminantly increase all of your stats."'
}

function talkMagic(){
  text.innerText = '"Magic is a very powerful thing. Almost anyone can do almost anything with magic if they practice enough. Despite that, magic was beginning to be used less and less before the dragon began guarding this town. It\'s very much possible that the outside world has completely forgotten about magic."'
}

function talkOutside(){
  text.innerText = '"The outside world was a wonderful place. That\'s what my grandmother used to tell me, anyway. There were so many beutiful things out there... but as long as that Dragon is there, we can never see any of it again."'
}

function sell(){
  text.innerText = '"Sorry, I don\'t buy items off of customers."'
}

function buyPotion(){
  text.innerText = '"What type of potion would you like?"'
  button1.innerText = "Green potion (Heals HP, 10 gold)";
  button2.innerText = "Purple potion (Heals MP, 10 gold)";
  button3.innerText = "Red potion (Increases Attack, 20 gold)";
  button4.innerText = "Blue potion (Increases Defense, 20 gold)";
  button5.innerText = "Back";
  button1.onclick = buyPotionGreen;
  button2.onclick = buyPotionPurple;
  button3.onclick = buyPotionRed;
  button4.onclick = buyPotionBlue;
  button5.onclick = goStore;
}

function buyEquip(){
  text.innerText = '"What equipment do you need?"'
  button1.innerText = "Metal sword (30 gold)";
  button2.innerText = "Metal chestplate (30 gold)";
  button3.innerText = "Bomb (50 gold)";
  button4.innerText = "Coming soon!";
  button5.innerText = "Back";
  button1.onclick = buyWeapon;
  button2.onclick = buyArmor;
  button3.onclick = buyBomb;
  button4.onclick = noItem;
  button5.onclick = goStore;
}

function buyPotionGreen() {
  buyItem('green potion', 10)
}

function buyPotionPurple() {
  buyItem('purple potion', 10)
}

function buyPotionRed() {
  buyItem('red potion', 20)
}

function buyPotionBlue() {
  buyItem('blue potion', 20)
}

function buyItem(item, price) {
  if (gold >= price) {
    if (inventoryOther.length < inventoryCap - 1) {
      gold -= price;
      inventoryOther.push(item)
      goldText.innerText = gold;
      text.innerText = '"Here\'s your ' + item +'. Have a nice day!"';
      sfx_buy.play();
    } else if (inventoryOther.length < inventoryCap){
      gold -= price;
      inventoryOther.push(item)
      goldText.innerText = gold;
      text.innerText = '"Here\'s your ' + item +'. Have a nice day!"';
      text.innerText += '\n\n"It looks like your bag is full."';
      sfx_buy.play();
    } else {
      text.innerText = '"I don\'t think that tiny bag of yours can fit anything else."';
      sfx_no.play();
    }
  } else {
    text.innerText = '"You can\'t afford that!"';
    sfx_no.play();
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = '"Here\'s your ' + newWeapon + '. Have a nice day!"';
      inventoryWeapons.push(newWeapon);
      sfx_buy.play();
    } else {
      text.innerText = '"You can\'t afford that!"';
      sfx_no.play();
    }
  } else {
    text.innerText = '"You don\'t need another one of those."';
    sfx_no.play();
}
}

function buyArmor() {
  if (currentArmor < armor.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentArmor++;
      goldText.innerText = gold;
      let newArmor = armor[currentArmor].name;
      text.innerText = '"Here\'s your ' + newArmor + '. Have a nice day!"';
      inventoryArmor.push(newArmor);
      sfx_buy.play();
    } else {
      text.innerText = '"You can\'t afford that!"';
      sfx_no.play();
    }
  } else {
    text.innerText = '"You don\'t need another one of those."';
    sfx_no.play();
  }
}

function buyBomb() {
  buyItem('bomb', 50)
}

//Cave encounters!

function fightSlime() {
  fighting = 0;
  goFight();
  mus_battleStone.play();
}

function fightBeast() {
  fighting = 1;
  goFight();
  mus_battleStone.play();
}

function fightStone() {
  fighting = 3;
  goFight();
  mus_battleStone.play();
}

function fightDweller(){
  if (storyIndex == 0){
    fighting = 4;
    goFight();
    mus_battleDweller.play();
  } else {
    text.innerText = "You can't fight the Cave Dweller again!"
  }
}

function dragonGaurd(){
  if (storyIndex === 0){
    if (dragonGaurdStatus === 0){
      text.innerText = `"What are you doing? If you fight The Dragon now, you'll get yourself killed!"`;
      dragonGaurdStatus = 1;
    } else {
      text.innerText = `"You know what? Since you seem to have a deathwish, I'll let you fight the dragon. \n\nBUT! I'll only let you do it if you defeat the Dweller in the cave near town. Nobody knows much about it, but it's very powerful. Defeat it, and I'll let you through."`;
    }
  } else {
    update(locations[9]);
    mus_town.pause();
    mus_town.currentTime = 0;
  }
}

function fightDragon() {
  fighting = 2;
  goFight();
  mus_battleDragon.play();
}

//Battle system!

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterMP = monsters[fighting].mp;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  mus_cave.pause()
  mus_cave.currentTime = 0;
  battleMusic[monsters[fighting].music].play;
  enemyStatusTimer = 0;
  enemyStatus = 0;
  char.src = monsters[fighting].image;
  char.style.display = "inline";
}

function battleMenuExit(){
  button1.innerText = "Attack";
  button2.innerText = "Check";
  button3.innerText = "Item";
  button4.innerText = "Magic";
  button5.innerText = "Run";
  button1.onclick = attack;
  button2.onclick = enemyCheck;
  button3.onclick = itemMenu;
  button4.onclick = magicMenu;
  button5.onclick = runAway;
  text.innerText = "What will you do?";
}

function awaitNextTurn(){
  button1.innerText = "Proceed";
  button2.innerText = "Proceed";
  button3.innerText = "Proceed";
  button4.innerText = "Proceed";
  button5.innerText = "Proceed";
  button1.onclick = monsterTurn;
  button2.onclick = monsterTurn;
  button3.onclick = monsterTurn;
  button4.onclick = monsterTurn;
  button5.onclick = monsterTurn;
  playerStatusTimer--;
  if (playerStatusTimer == 0){
    if (playerStatus == 1){
      playerStatus = 0;
      text.innerText += "\n\nYou are no longer burning!"
    } else if (playerStatus == 2){
      playerStatus = 0;
      text.innerText += "\n\nYou are no longer frozen!"
    }
  }
}

function winCheck(){
  if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else if (fighting === 4){
      defeatDweller(); 
    } else {
      defeatMonster();
    }
    mus_battleStone.pause();
    mus_battleStone.currentTime = 0;
  } else {
    awaitNextTurn();
  }
}

function attackFormula(off, defend){
  const hit = (off + Math.floor(Math.random() * 2)) - (Math.floor(defend / 4 + Math.random()));
  return hit > 0 ? hit : 0;
}

function attack() {
  if (playerStatus == 2){
    text.innerText = "You're frozen and can't move!";
  } else {
    if (isMonsterHit(spd, monsters[fighting].spd)) {
      const attackValue = attackFormula(weapons[currentWeapon].power + atk + atkBoost, (monsters[fighting].def))
      monsterHealth -= attackValue;
      text.innerText = "You attack the " + monsters[fighting].name + " with your " + weapons[currentWeapon].name + " for " + attackValue + " damage.";
    } else {
      text.innerText += "You miss your attack.";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    atkBoost = 0;
    sfx_attack.play();
  }
  winCheck();
}

function monsterAttack(){
  if (isMonsterHit(monsters[fighting].spd, spd)){
    const damage = attackFormula(monsters[fighting].atk, def + defBoost + armor[currentArmor].protection);
    health -= damage;
    text.innerText = "The " + monsters[fighting].name + "'s attack deals " + damage + " damage.";
  } else {
    text.innerText = "The " + monsters[fighting].name + " misses its attack.";
  }
  defBoost = 0;
  sfx_attack.play();
}

function monsterMagicFire(){
  monsterMP -= 20;
  const firePower = attackFormula(monsters[fighting].ms * 2, md);
  text.innerText = "The " + monsters[fighting].name + " used fire magic.";
  const statusChance = Math.floor(Math.random() * 100);
  health -= firePower;
  text.innerText += " It dealt " + firePower + ` damage!`;
  console.log(enemyStatus);
  if (enemyStatus == 0 && statusChance <= 20){
    const statusTimerMod = (((ms + msBoost) - monsters[fighting].md) / 5);
    playerStatus = 1;
    if (statusTimerMod > 0){
      playerStatusTimer = statusTimerMod + statusList[2].baseCounter;
    } else {
      playerStatusTimer = statusList[2].baseCounter
    }
    console.log(playerStatusTimer);
    text.innerText += " You are now burning!";
  }
  sfx_fire.play();
}

function monsterMagicHeal(){
  if (fighting == 2){
    magicCounter += 1;
  }
  monsterMP -= 10;
  const healthIncrease = Math.floor(Math.random() * 10) + (monsters[fighting].ms);
  if (monsterHealth + healthIncrease >= monsters[fighting].health){
    monsterHealth = monsters[fighting].health
    text.innerText = "The " + monsters[fighting].name + " uses a healing spell and heals back to max HP.";
  } else {
    monsterHealth += healthIncrease;
    text.innerText = "The " + monsters[fighting].name + " uses a healing spell and heals back " + healthIncrease + " HP.";
  }
}

function monsterMagicDecider(){
  if (fighting === 2){
    if (monsterHealth <= 30 && monsterMP >= 10 && magicCounter === 0 && enemyStatus != 2){
      monsterMagicHeal();
    } else {
      const doesMonsterUseMagic = Math.floor(Math.random() * 101);
      console.log(doesMonsterUseMagic);
      if (doesMonsterUseMagic <= 15 && monsterMP >= 20){
        monsterMagicFire();
      } else {
        monsterAttack();
      }
    }
  } else {
    if (monsters[fighting].magic.includes("heal") && monsterHealth < monsters[fighting].health){
      if (monsterHealth <= monsters[fighting].health / 2 && monsterMP >= 10){
        monsterMagicHeal();
      } else {
        monsterAttack();
      }
    } else {
      monsterAttack();
    }
  }
  monsterHealthText.innerText = monsterHealth;
  healthText.innerText = health;
}

function monsterTurn(){
  battleMenuExit();
  if (enemyStatus == 0 || enemyStatus == 1){
    monsterMagicDecider()
    if (enemyStatus == 1 && elements[monsters[fighting].elementIn].weakness.includes("fire")){
      const fireDamage = attackFormula(14, 2);
      monsterHealth -= fireDamage;
      text.innerText += ` It took ${fireDamage} damage due to burns!`
      enemyStatusTimer--;
      if (enemyStatusTimer <= 0){
        enemyStatus = 0;
        ` The ${monsters[fighting].name} is no longer burning.`
      }
      if (monsterHealth <= 0) {
        if (fighting === 2) {
          winGame();
        } else {
          defeatMonster();
        }
      }
    } else if (enemyStatus == 1){
      const fireDamage = attackFormula(7, 2);
      monsterHealth -= fireDamage;
      text.innerText += ` It took ${fireDamage} damage due to burns!`
      enemyStatusTimer -= 1;
      if (enemyStatusTimer <= 0){
        enemyStatus = 0;
        text.innerText += ` The ${monsters[fighting].name} is no longer burning.`
      }
      if (monsterHealth <= 0) {
        if (fighting === 2) {
          winGame();
        } else {
          defeatMonster();
        }
      }
      monsterHealthText.innerText = monsterHealth;
    }
  } else if (enemyStatus == 2){
    enemyStatusTimer -= 1;
      if (enemyStatusTimer <= 0){
        enemyStatus = 0;
        text.innerText = `The ${monsters[fighting].name} has thawed out and can move again.`
      } else {
        text.innerText = `The ${monsters[fighting].name} is frozen and cannot move!`
      }
  } else {
    text.innerText = `The ${monsters[fighting].name} is being null! Yes, this is a bug.`
  }
  healthText.innerText = health;
  text.innerText += "\n\nNow, what will you do?";
  if (health <= 0) {
    lose();
  }
  console.log(enemyStatusTimer);
}

function isMonsterHit(attackerSpd, attackeeSpd) {
  return (Math.random() * 10) * attackerSpd > attackeeSpd - (attackerSpd * (Math.random() * 10));
}

function itemMenu(){
  itemMenuPage = 0;
  itemOneIndex = 0;
  itemTwoIndex = 1;
  itemThreeIndex = 2;
  if (inventoryOther.length % 3 == 2 && (itemMenuPage + 1 > inventoryOther.length / 3 )) {
    button1.innerHTML = "Use " + inventoryOther[itemOneIndex];
    button2.innerHTML = "Use " + inventoryOther[itemTwoIndex];
    button3.innerHTML = "No item here!";
    button1.onclick = itemOne;
    button2.onclick = itemTwo;
    button3.onclick = noItem;
  } else if (inventoryOther.length % 3 == 1 && (itemMenuPage + 1 > inventoryOther.length / 3 )){
    button1.innerHTML = "Use " + inventoryOther[itemOneIndex];
    button2.innerHTML = "No item here!";
    button3.innerHTML = "No item here!";
    button1.onclick = itemOne;
    button2.onclick = noItem;
    button3.onclick = noItem;
  }else {
    button1.innerHTML = "Use " + inventoryOther[itemOneIndex];
    button2.innerHTML = "Use " + inventoryOther[itemTwoIndex];
    button3.innerHTML = "Use " + inventoryOther[itemThreeIndex];
    button1.onclick = itemOne;
    button2.onclick = itemTwo;
    button3.onclick = itemThree;
  }
  button4.innerHTML = "Next page"
  button5.innerHTML = "Back"
  button4.onclick = itemMenuScroll;
  button5.onclick = battleMenuExit;
  text.innerText = "Inventory Page " + (itemMenuPage + 1);
}

function itemMenuScroll(){
  itemMenuPage++;
  if (itemMenuPage <= (inventoryOther.length - 1) / 3){
    itemOneIndex += 3;
    itemTwoIndex += 3;
    itemThreeIndex += 3;
    if (inventoryOther.length % 3 == 2 && (itemMenuPage + 1 > inventoryOther.length / 3)) {
      button1.innerHTML = "Use " + inventoryOther[itemOneIndex];
      button2.innerHTML = "Use " + inventoryOther[itemTwoIndex];
      button3.innerHTML = "No item here!";
      button1.onclick = itemOne;
      button2.onclick = itemTwo;
      button3.onclick = noItem;
    } else if (inventoryOther.length % 3 == 1 && (itemMenuPage + 1 > inventoryOther.length / 3 )){
      button1.innerHTML = "Use " + inventoryOther[itemOneIndex];
      button2.innerHTML = "No item here!";
      button3.innerHTML = "No item here!";
      button1.onclick = itemOne;
      button2.onclick = noItem;
      button3.onclick = noItem;
    }else {
      button1.innerHTML = "Use " + inventoryOther[itemOneIndex];
      button2.innerHTML = "Use " + inventoryOther[itemTwoIndex];
      button3.innerHTML = "Use " + inventoryOther[itemThreeIndex];
      button1.onclick = itemOne;
      button2.onclick = itemTwo;
      button3.onclick = itemThree;
    }
  } else {
    itemMenu()
  }
  console.log(itemMenuPage);
  text.innerText = "Inventory Page " + (itemMenuPage + 1);
}

function itemOne(){
  useItem(inventoryOther[itemOneIndex])
}

function itemTwo(){
  useItem(inventoryOther[itemTwoIndex])
}

function itemThree(){
  useItem(inventoryOther[itemThreeIndex])
}

function useItem(itemNum){
  if (playerStatus == 2){
    text.innerText = "You're frozen and can't move!";
  } else {
    const index = inventoryOther.indexOf(itemNum);
    const x = inventoryOther.splice(index, 1);
    function findItem(thing){
      return thing.name === x[0];
    }
    const usedItem = items.find(findItem);
    const boostNumber = Math.floor(Math.random() * 5) + usedItem.boost;
    if (usedItem.type == "heal"){
      if (health <= maxHealth - boostNumber) {
        text.innerText = "You use the " + usedItem.name + " and recover " + boostNumber + " HP!";
        health += boostNumber
        sfx_heal.play();
      } else if (health < maxHealth) {
        text.innerText = "You use the " + usedItem.name + " and your HP is maxxed out!";
        health = maxHealth;
        sfx_heal.play();
      } else {
        text.innerText = "You try to use the " + usedItem.name + ", but your HP is already maxxed out.";
      }
      healthText.innerText = health
    } else if (usedItem.type == "atkBoost"){
      text.innerText = "You used the " + usedItem.name + "! Your next attack will do " + boostNumber + " more damage.";
      atkBoost += boostNumber
    } else if (usedItem.type == "defBoost"){
      text.innerText = "You used the " + usedItem.name + "! You will take " + boostNumber + " less damage next turn.";
      defBoost += boostNumber
    } else if (usedItem.type == "mpHeal"){
      if (mp <= maxMp - boostNumber) {
        text.innerText = "You use the " + usedItem.name + " and recover " + boostNumber + " MP!";
        mp += boostNumber
      } else if (mp < maxHealth) {
        text.innerText = "You use the " + usedItem.name + " and your MP is maxxed out!";
        mp = maxMp;
      } else {
        text.innerText = "You try to use the " + usedItem.name + ", but your MP is already maxxed out.";
      }
      mpText.innerText = mp
    } else if (usedItem.type == "debugPotion"){
      lvUp();
      lvUp();
      lvUp();
      lvUp();
      lvUp();
      lvUp();
      lvUp();
      lvUp();
      lvUp();
      lvUp();
      lvUp();
      lvUp();
      lvUp();
      lvUp();
      lvUp();
    } else if (usedItem.type == "bomb"){
      const firePower = attackFormula(usedItem.power, monsters[fighting].def);
      text.innerText = "You used the " + usedItem.name + ".";
      const statusChance = Math.floor(Math.random() * 100)
      if (elements[monsters[fighting].elementIn].weakness.includes("fire")){
        const trueAttack = firePower * 2;
        monsterHealth -= trueAttack;
        text.innerText += " It dealt " + trueAttack + ` damage due to the ${monsters[fighting].name}'s weakness!`;
        if (enemyStatus == 0 && statusChance <= 40){
          const statusTimerMod = (((ms + msBoost) - monsters[fighting].md) / 3);
          enemyStatus = 1;
          if (statusTimerMod > 0){
            enemyStatusTimer = statusTimerMod + statusList[2].baseCounter;
          } else {
            enemyStatusTimer = statusList[2].baseCounter
          }
          console.log(enemyStatusTimer);
          text.innerText += " The enemy is now burning!";
        }
      } else if (elements[monsters[fighting].elementIn].strength.includes("fire")){
        const trueAttack = Math.floor(firePower * 0.5);
        monsterHealth -= trueAttack;
        text.innerText += " It only dealt " + trueAttack + ` damage due to the ${monsters[fighting].name}'s immunity.`
      } else {
        monsterHealth -= firePower
        text.innerText += " It dealt " + firePower + ` damage to the ${monsters[fighting].name}!`
        console.log(enemyStatus);
        if (enemyStatus == 0 && statusChance <= 20){
          const statusTimerMod = (((ms + msBoost) - monsters[fighting].md) / 5);
          enemyStatus = 1;
          if (statusTimerMod > 0){
            enemyStatusTimer = statusTimerMod + statusList[2].baseCounter;
          } else {
            enemyStatusTimer = statusList[2].baseCounter
          }
          console.log(enemyStatusTimer);
          text.innerText += " The enemy is now burning!";
        }
      }
      monsterHealthText.innerText = monsterHealth;
      msBoost = 0;
      sfx_fire.play();
      winCheck();
    } else {
      text.innerText = "You used the " + usedItem.name + ". It did absolutely nothing, likely because you shouldn't have it.\n\nTo be clear, this is a bug.";
    }
    console.log(usedItem);
  }
  winCheck();
}

function enemyCheck(){
  text.innerText = monsters[fighting].desc + `\n\nMax HP: ${monsters[fighting].health}, Attack: ${monsters[fighting].atk}, Defense: ${monsters[fighting].def}, Speed: ${monsters[fighting].spd}, Magic Defense: ${monsters[fighting].md}, Element: ${monsters[fighting].element}.`;
  winCheck();
}

function magicMenu(){
  if (level >= 10){
    button1.innerHTML = "Heal (10 MP)"
    button2.innerHTML = "Fire Attack (20 MP)"
    button3.innerHTML = "Ice Attack (20 MP)"
    button4.innerHTML = "Boost (30 MP)"
    button5.innerHTML = "Back"
    button1.onclick = magicHeal;
    button2.onclick = magicFire;
    button3.onclick = magicIce;
    button4.onclick = magicBoost;
    button5.onclick = battleMenuExit;
  } else if (level >= 6){
    button1.innerHTML = "Heal (10 MP)"
    button2.innerHTML = "Fire Attack (20 MP)"
    button3.innerHTML = "Ice Attack (20 MP)"
    button4.innerHTML = "No spell here!"
    button5.innerHTML = "Back"
    button1.onclick = magicHeal;
    button2.onclick = magicFire;
    button3.onclick = magicIce;
    button4.onclick = noItem;
    button5.onclick = battleMenuExit;
  } else if (level >= 4){
    button1.innerHTML = "Heal (10 MP)"
    button2.innerHTML = "Fire Attack (20 MP)"
    button3.innerHTML = "No spell here!"
    button4.innerHTML = "No spell here!"
    button5.innerHTML = "Back"
    button1.onclick = magicHeal;
    button2.onclick = magicFire;
    button3.onclick = noItem;
    button4.onclick = noItem;
    button5.onclick = battleMenuExit;
  } else if (level >= 2){
    button1.innerHTML = "Heal (10 MP)"
    button2.innerHTML = "No spell here!"
    button3.innerHTML = "No spell here!"
    button4.innerHTML = "No spell here!"
    button5.innerHTML = "Back"
    button1.onclick = magicHeal;
    button2.onclick = noItem;
    button3.onclick = noItem;
    button4.onclick = noItem;
    button5.onclick = battleMenuExit;
  } else {
    
  }
}

function magicBoost() {
  if (playerStatus == 2){
    text.innerText = "You're frozen and can't move!";
  } else if (mp >= 30){
    const boostNumber = Math.floor(Math.random() * 5) + ((ms + msBoost) / 5);
    const boostStat = Math.floor(Math.random() * 5);
    mp -= 30;
    mpText.innerText = mp;
    msBoost = 0;
    if (boostStat === 0){
      atkBoost += boostNumber
      text.innerText = "You use a magic boost! Your next attack will do " + boostNumber + " more damage!";
    } else if (boostStat === 1){
      defBoost += boostNumber
      text.innerText = "You use a magic boost! You will take " + boostNumber + " less damage from the enemy's next attack!";
    } else if (boostStat === 2){
      msBoost += boostNumber
      text.innerText = "You use a magic boost! The next spell you cast will be " + boostNumber + " points stronger!";
    } else if (boostStat === 3){
      speedBoost += boostNumber
      text.innerText = "Your speed will be boosted by " + boostNumber + " next turn!";
    } else if (boostStat === 4){
      mdBoost += boostNumber
      text.innerText = "You will take " + boostNumber + " less damage from the enemy's next magic attack!";
    } else {
      text.innerText = "If you're seeing this message, you've found a bug in the game! Please report it to the developer as soon as possible.\n\nYour attack was increased by " + boostNumber + " for compensation."
      atkBoost += boostNumber
    }
  } else {
    text.innerText = "You try to boost one of your stats, but you don't have enough MP!";
  }
  winCheck();
}

function magicFire() {
  if (mp >= 20 && playerStatus != 2){
    mp -= 20;
    mpText.innerText = mp;
    const firePower = attackFormula((ms + msBoost) * 2, monsters[fighting].md);
    text.innerText = "You used fire magic.";
    const statusChance = Math.floor(Math.random() * 100)
    if (elements[monsters[fighting].elementIn].weakness.includes("fire")){
      const trueAttack = firePower * 2;
      monsterHealth -= trueAttack;
      text.innerText += " It dealt " + trueAttack + ` damage due to the ${monsters[fighting].name}'s weakness!`;
      if (enemyStatus == 0 && statusChance <= 40){
        const statusTimerMod = (((ms + msBoost) - monsters[fighting].md) / 3);
        enemyStatus = 1;
        if (statusTimerMod > 0){
          enemyStatusTimer = statusTimerMod + statusList[2].baseCounter;
        } else {
          enemyStatusTimer = statusList[2].baseCounter
        }
        console.log(enemyStatusTimer);
        text.innerText += " The enemy is now burning!";
      }
    } else if (elements[monsters[fighting].elementIn].strength.includes("fire")){
      const trueAttack = Math.floor(firePower * 0.5);
      monsterHealth -= trueAttack;
      text.innerText += " It only dealt " + trueAttack + ` damage due to the ${monsters[fighting].name}'s immunity.`
    } else {
      monsterHealth -= firePower
      text.innerText += " It dealt " + firePower + ` damage to the ${monsters[fighting].name}!`
      console.log(enemyStatus);
      if (enemyStatus == 0 && statusChance <= 20){
        const statusTimerMod = (((ms + msBoost) - monsters[fighting].md) / 5);
        enemyStatus = 1;
        if (statusTimerMod > 0){
          enemyStatusTimer = statusTimerMod + statusList[2].baseCounter;
        } else {
          enemyStatusTimer = statusList[2].baseCounter
        }
        console.log(enemyStatusTimer);
        text.innerText += " The enemy is now burning!";
      }
    }
    monsterHealthText.innerText = monsterHealth;
    msBoost = 0;
    sfx_fire.play();
    winCheck();
  } else if (playerStatus == 2){
    text.innerText = "You're frozen and can't move!";
  } else {
    text.innerText = "You try to use fire magic, but you don't have enough MP!";
  }
  winCheck();
}

function magicIce() {
  if (mp >= 20 && playerStatus != 2){
    mp -= 20;
    mpText.innerText = mp;
    const firePower = attackFormula((ms + msBoost) * 2, monsters[fighting].def);
    text.innerText = "You used ice magic.";
    const statusChance = Math.floor(Math.random() * 100)
    if (elements[monsters[fighting].elementIn].weakness.includes("ice")){
      const trueAttack = firePower * 2
      monsterHealth -= trueAttack;
      text.innerText += " It dealt " + trueAttack + ` damage due to the ${monsters[fighting].name}'s weakness!`;
      if (enemyStatus == 0 && statusChance <= 10){
        const statusTimerMod = (((ms + msBoost) - monsters[fighting].md) / 3);
        enemyStatus = 2;
        if (statusTimerMod > 0){
          enemyStatusTimer = statusTimerMod + statusList[2].baseCounter;
        } else {
          enemyStatusTimer = statusList[2].baseCounter
        }
        console.log(enemyStatusTimer);
        text.innerText += " The enemy is now frozen!";
      }
    } else if (elements[monsters[fighting].elementIn].strength.includes("ice")){
      const trueAttack = Math.floor(firePower * 0.5);
      monsterHealth -= trueAttack;
      text.innerText += " It only dealt " + trueAttack + ` damage due to the ${monsters[fighting].name}'s immunity.`
    } else {
      monsterHealth -= firePower
      text.innerText += " It dealt " + firePower + ` damage to the ${monsters[fighting].name}!`
      console.log(enemyStatus);
      if (enemyStatus == 0 && statusChance <= 20){
        const statusTimerMod = (((ms + msBoost) - monsters[fighting].md) / 5);
        enemyStatus = 2;
        if (statusTimerMod > 0){
          enemyStatusTimer = statusTimerMod + statusList[2].baseCounter;
        } else {
          enemyStatusTimer = statusList[2].baseCounter
        }
        console.log(enemyStatusTimer);
        text.innerText += " The enemy is now frozen!";
      }
    }
    sfx_freeze.play();
    monsterHealthText.innerText = monsterHealth;
    winCheck()
    msBoost = 0;
  } else if (playerStatus == 2){
    text.innerText = "You're frozen and can't move!";
  } else {
    text.innerText = "You try to use ice magic, but you don't have enough MP!";
  }
  winCheck();
}

function magicHeal() {
  if (playerStatus == 2){
    text.innerText = "You're frozen and can't move!";
  } else {
    if (health < maxHealth && mp >= 10) {
      const healthIncrease = Math.floor(Math.random() * 10) + (ms + msBoost);
      if (health + healthIncrease < maxHealth) {
        health += healthIncrease;
        mp -= 10;
        mpText.innerText = mp;
        healthText.innerText = health;
        text.innerText = "You use a healing spell and heal back " + healthIncrease + " HP.";
        sfx_heal.play();
      } else {
        health = maxHealth;
        mp -= 10;
        mpText.innerText = mp;
        healthText.innerText = health;
        text.innerText = "You use a healing spell to heal back to max HP.";
        sfx_heal.play();
      }
    } else if (mp < 10) {
      healthText.innerText = health;
      text.innerText = "You try to heal back some HP, but you don't have enough MP!";
    } else {
      healthText.innerText = health;
      text.innerText = "You try to heal back some HP, but it's already maxxed out!";
    }
    msBoost = 0;
  }
  winCheck();
}

function runAway(){
  if (playerStatus == 2){
    text.innerText = "You're frozen and can't move!";
    winCheck();
  } else {
    if (monsters[fighting].isBoss){
      text.innerText = "You can't run from this fight!!"
      winCheck();
    } else {
      const runChance = Math.floor(Math.random() * 7)
      console.log(`Your runChance is: ${runChance}`);
      if(runChance >= 4){
        goTown();
        text.innerText = "You successfully ran away from the battle!";
        sfx_run.play();
      } else {
        text.innerText = "You try to run away, but can't!";
        winCheck();
      }
    }
  }
}

function dropFormula(dropChance){
  const isDrop = Math.floor(Math.random() * dropChance) <= 1;
  return isDrop;
}

function defeatMonster() {
  let goldIncrease = Math.floor((monsters[fighting].level + 1 - (level * 0.75)) * 2.5);
  let xpIncrease = Math.floor(monsters[fighting].level + 1 - (level * 0.75));
  gold += goldIncrease;
  xp += xpIncrease;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  text.innerText = `You win the battle! You gain ${xpIncrease} experience points and find ${goldIncrease} gold.`;
  if (xp >= level * 5){
    lvUp();
  }
  if (dropFormula(monsters[fighting]["drop chance"]) && inventoryOther.length < inventoryCap) {
    inventoryOther.push(monsters[fighting].drops);
    text.innerText += "\n\nYou found a " + monsters[fighting].drops + " after the battle!";
  }
  mus_battleWin.play();
}

function defeatDweller(){
  let goldIncrease = Math.floor((monsters[fighting].level + 1 - (level * 0.75)) * 2.5);
  let xpIncrease = Math.floor(monsters[fighting].level + 1 - (level * 0.75));
  gold += goldIncrease;
  xp += xpIncrease;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  text.innerText = `You won the battle! You gain ${xpIncrease} experience points and find ${goldIncrease} gold.`;
  magicCounter = 0;
  if (xp >= level * 5){
    lvUp();
  }
  if (storyIndex === 0){
    storyIndex = 1;
  }
  mus_battleDweller.pause();
  mus_battleDweller.currentTime = 0;
  mus_battleWin.play();
}

function lvUp(){
  xp = xp - level * 5;
  xpText.innerText = xp
  level++;
  lvText.innerText = level;
  const maxHpIncrease = Math.floor(Math.random() * 6) + 5;
  const maxMpIncrease = Math.floor(Math.random() * 6) + 5;
  const atkIncrease = Math.floor(Math.random() * 6) + 1;
  const defIncrease = Math.floor(Math.random() * 6) + 1;
  const msIncrease = Math.floor(Math.random() * 6) + 1;
  const spdIncrease = Math.floor(Math.random() * 6) + 1;
  const mdIncrease = Math.floor(Math.random() * 6) + 1;
  maxHealth += maxHpIncrease;
  maxHpText.innerText = maxHealth;
  health += maxHpIncrease;
  healthText.innerText = health;
  maxMp += maxMpIncrease;
  maxMpText.innerText = maxMp;
  mp += maxMpIncrease;
  mpText.innerText = mp;
  atk += atkIncrease;
  def += defIncrease;
  atkText.innerText = atk;
  defText.innerText = def;
  ms += msIncrease;
  msText.innerText = ms;
  md += mdIncrease;
  mdText.innerText = md;
  spd += spdIncrease;
  spdText.innerText = spd;
  text.innerText += "\n\nYou are now level " + level + "! Your attack has increased by " + atkIncrease + ", your defense has increased by " + defIncrease + ", your magic strength has increased by " + msIncrease + ", your max HP has increased by " + maxHpIncrease + ", and your max MP has increased by " + maxMpIncrease + ".";
  if (level == 2){
    text.innerText += "\n\nYou learned the Healing spell! Use it to heal some HP during battle.";
  } else if (level == 4){
    text.innerText += "\n\nYou learned the Fire spell! Use it to burn your enemies.";
  } else if (level == 6){
    text.innerText += "\n\nYou learned the Ice spell! Use it to freeze your enemies.";
  } else if (level == 10){
    text.innerText += "\n\nYou learned the Boost spell! Use it to boost one of your stats.";
  }
}

function lose() {
  update(locations[5]);
  battleMusic[monsters[fighting].music].pause();
  battleMusic[monsters[fighting].music].currentTime = 0;
  mus_battleStone.pause();
  mus_battleStone.currentTime = 0;
  mus_battleDragon.pause();
  mus_battleDragon.currentTime = 0;
  mus_battleDweller.pause();
  mus_battleDweller.currentTime = 0;
  mus_gameOver.play();
  magicCounter = 0;
}

function winGame() {
  update(locations[6]);
  if (xp >= Math.pow(level, 3)){
    lvUp();
  }
  mus_battleDragon.pause();
  mus_battleDragon.currentTime = 0;
  mus_battleWin.play();
  magicCounter = 0;
}

function restart() {
  xp = 0;
  health = 50;
  maxHealth = 50;
  mp = 50;
  maxMp = 50;
  mpText.innerText = mp;
  maxMpText.innerText = maxMp;
  gold = 50;
  currentWeapon = 0;
  currentArmor = 0;
  atk = 5;
  def = 5;
  level = 1;
  ms = 5;
  md = 5;
  spd = 10;
  spdText.innerText = spd;
  storyIndex = 0;
  inventoryWeapons = ["stick"];
  inventoryArmor = ["vest"];
  inventoryOther = ['green potion', 'green potion']
  goldText.innerText = gold;
  healthText.innerText = health;
  maxHpText.innerText = maxHealth;
  xpText.innerText = xp;
  atkText.innerText = atk;
  defText.innerText = def;
  lvText.innerText = level;
  msText.innerText = ms;
  mdText.innerText = md;
  goTown();
}

function xpGame() {
  const number = Math.random();
  console.log(number);
  if (number <= 0.1 && gold >= 20){
    update(locations[7]);
    mus_xpGame.play()
  } else {
    goTown();
  }
}

function pickOne() {
  pick(2);
}

function pickTwo() {
  pick(4);
}

function pickThree() {
  pick(6);
}

function pickFour() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 16));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10 ; i++) {
    if (i == 0){
      text.innerText += numbers[i];
    } else {
      text.innerText += ", " + numbers[i];
    }
  }
  text.innerText += "."
  if (numbers.includes(guess)) {
    text.innerText += "\nRight! You win 20 xp!";
    xp += 20;
    xpText.innerText = xp;
    if (xp >= level * 5){
      lvUp();
    }
  } else {
    text.innerText += "\nWrong! You lose 20 gold!";
    gold -= 20;
    goldText.innerText = gold;
  }
  button1.innerText = "Back to town";
  button2.innerText = "Back to town";
  button3.innerText = "Back to town";
  button4.innerText = "Back to town";
  button5.innerText = "Back to town";
  button1.onclick = goTown;
  button2.onclick = goTown;
  button3.onclick = goTown;
  button4.onclick = goTown;
  button5.onclick = goTown;
}

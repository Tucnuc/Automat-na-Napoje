class Napoj {
    constructor(jmeno, index, rarity, image = "") {
        this.jmeno = jmeno;
        this.index = index;
        this.rarity = rarity;
        this.image = image;
        this.unlocked = false;
    }

    unlock() {
        this.unlocked = true;
    }
}

const napoje = {
    common: [
        new Napoj("Mineral Water", 0, "common", "url(./images/drinks/common/water.png)"),
        new Napoj("Fruit Tea", 1, "common", "url(./images/drinks/common/tea.png)"),
        new Napoj("Cappuccino", 2, "common", "url(./images/drinks/common/cappucino.png)"),
        new Napoj("Apple Juice", 3, "common", "url(./images/drinks/common/apple.png)"),
        new Napoj("Semi-Skimmed Milk", 4, "common", "url(./images/drinks/common/milk.png)"),
        new Napoj("Lemon Limonade", 5, "common", "url(./images/drinks/common/lemon.png)")
    ],
    uncommon: [
        new Napoj("Hot Chocolate", 6, "uncommon", "url(./images/drinks/uncommon/chocolate.png)"),
        new Napoj("Coconut Water", 7, "uncommon", "url(./images/drinks/uncommon/coconut.png)"),
        new Napoj("Hibiscus Cooler", 8, "uncommon", "url(./images/drinks/uncommon/hibiscus.png)"),
        new Napoj("Matcha Latte", 9, "uncommon", "url(./images/drinks/uncommon/macho.png)"),
        new Napoj("Kombucha", 10, "uncommon", "url(./images/drinks/uncommon/kombucha.png)"),
        new Napoj("Spiced Cider", 11, "uncommon", "url(./images/drinks/uncommon/cider.png)")
    ],
    rare: [
        new Napoj("Healing Potion", 12, "rare", "url(./images/drinks/rare/heal.png)"),
        new Napoj("Mana Draught", 13, "rare", "url(./images/drinks/rare/mana.png)"),
        new Napoj("Stamina Tonic", 14, "rare", "url(./images/drinks/rare/stamina.png)"),
        new Napoj("Antidote Potion", 15, "rare", "url(./images/drinks/rare/antidote.png)"),
        new Napoj("Obsidian Brew", 16, "rare", "url(./images/drinks/rare/obsidian.png)")
    ],
    epic: [
        new Napoj("Moon Elixir", 17, "epic", "url(./images/drinks/epic/moon.png)"),
        new Napoj("Phoenix Flame", 18, "epic", "url(./images/drinks/epic/phoenix.png)"),
        new Napoj("Emerald Cascade", 19, "epic", "url(./images/drinks/epic/emerald.png)"),
        new Napoj("Frostbite Storm", 20, "epic", "url(./images/drinks/epic/frostbite.png)")
    ],
    legendary: [
        new Napoj("Dragon's Breath", 21, "legendary", "url(./images/drinks/legendary/dragon.png)"),
        new Napoj("Elixir of Life", 22, "legendary", "url(./images/drinks/legendary/life.png)"),
        new Napoj("Ambrosial Nectar", 23, "legendary", "url(./images/drinks/legendary/ambrosia.png)"),
        new Napoj("Stellar Radiance", 24, "legendary", "url(./images/drinks/legendary/stellar.png)")
    ]
};

class AutomatNaNapoje {
    constructor(napoje, money=0, chances) {
        this.napoje = napoje;
        this.money = money;
        this.chances = chances

        this.dialog = document.getElementById('index');
        this.openBtn = document.getElementById('indexOpenBtn');
        this.openBtn2 = document.getElementById('indexBtn2');
        this.closeBtn = document.getElementById('indexCloseBtn');

        this.firstOpen = true;
        this.unlockedDrinks = [];
        this.indexCompletionRate = document.getElementById('indexCompletionRate');

        this.sfx = new Audio(document.getElementById('sfx'));
        this.rollSfx = new Audio(document.getElementById('rollSfx'));
    }

    initialize() {
        this.openBtn.addEventListener('click', () => this.openDrinkIndex());
        this.openBtn2.addEventListener('click', () => this.openDrinkIndex());
        this.closeBtn.addEventListener('click', () => this.closeDrinkIndex());
        document.getElementById('buyBtn').addEventListener('click', () => this.buyDrink(this.money));
        this.updateGoldCounter();
    }

    generateDrinks() {
        const commonDrinks = document.querySelector('.commonDrinks');
        const uncommonDrinks = document.querySelector('.uncommonDrinks');
        const rareDrinks = document.querySelector('.rareDrinks');
        const epicDrinks = document.querySelector('.epicDrinks');
        const legendaryDrinks = document.querySelector('.legendaryDrinks');
        const lockedImg = "url(./images/drinks/locked.png)"
        let index = 0;

        const generateElements = (tier, con) => {
            this.napoje[tier].forEach(drink => {
                const indexDrinkCon = document.createElement('div');
                indexDrinkCon.classList.add('indexDrinkCon');
                indexDrinkCon.setAttribute('data-drink-id', index);
                index++;

                const indexImg = document.createElement('div');
                indexImg.classList.add('indexImg');
                indexImg.classList.add(tier + 'Border');
                indexImg.style.backgroundImage = drink.unlocked ? drink.image : lockedImg;

                const drinkName = document.createElement('p');
                drinkName.classList.add('drinkName');
                drinkName.classList.add(tier + 'Text');
                drinkName.textContent = drink.unlocked ? drink.jmeno : '???';

                if (drink.unlocked) { this.unlockedDrinks.push(drink) };
                indexDrinkCon.appendChild(indexImg);
                indexDrinkCon.appendChild(drinkName);
                con.appendChild(indexDrinkCon);
            });
            this.indexCompletionRate.textContent = `${this.unlockedDrinks.length}/25`;
        };

        generateElements('common', commonDrinks);
        generateElements('uncommon', uncommonDrinks);
        generateElements('rare', rareDrinks);
        generateElements('epic', epicDrinks);
        generateElements('legendary', legendaryDrinks);
    }

    updateDrinks() {
        const updateElements = (tier) => {
            this.napoje[tier].forEach((drink) => {
                if (drink.unlocked) {
                    if (!this.unlockedDrinks.includes(drink)) {
                        this.unlockedDrinks.push(drink);
                    }
                    const drinkElement = document.querySelector(`[data-drink-id="${drink.index}"] .indexImg`);
                    if (drinkElement) {
                        drinkElement.style.backgroundImage = drink.image;
                        const drinkNameElement = drinkElement.nextElementSibling;
                        if (drinkNameElement && drinkNameElement.classList.contains('drinkName')) {
                            drinkNameElement.textContent = drink.jmeno;
                        }
                    }
                }
            });
            this.indexCompletionRate.textContent = `${this.unlockedDrinks.length}/25`;
        };

        updateElements('common');
        updateElements('uncommon');
        updateElements('rare');
        updateElements('epic');
        updateElements('legendary');
    }

    openDrinkIndex() {
        if (this.firstOpen) {
            this.generateDrinks();
            this.firstOpen = false;
            this.dialog.showModal();
        } else {
            this.updateDrinks();
            this.dialog.showModal();
        }
    }
    closeDrinkIndex() {
        this.dialog.setAttribute('closing', "");
        this.dialog.addEventListener('animationend', () => {
            this.dialog.close();
            this.dialog.removeAttribute('closing');
        }, { once: true });
    }

    updateGoldCounter() {
        const goldCounters = document.querySelectorAll('.goldCounter');
        goldCounters.forEach(counter => {
            counter.textContent = `GOLD: ${this.money}`;
        });
    }

    buyDrink(money) {
        if (money < 10) {
            console.log('Not enough money');
            this.sfx.changeSong('./music/sfx/denied.mp3');
            const goldCounters = document.querySelectorAll('.goldCounter');

            goldCounters.forEach(counter => {
                counter.setAttribute('red', '');
                setTimeout(() => {
                    counter.removeAttribute('red');
                }, 125);
            });

            const interval = setInterval(() => {
                goldCounters.forEach(counter => {
                    counter.setAttribute('red', '');
                    setTimeout(() => {
                        counter.removeAttribute('red');
                    }, 125);
                });
            }, 250);

            setTimeout(() => {
                clearInterval(interval);
            }, 400);

            return;
        }

        const blur = document.getElementById('moveBlur');
        const rollImgCon = document.getElementById('rollImgCon');
        const rollImg = document.getElementById('rollImg');
        const rollGlow = document.getElementById('rollGlow');
        const rollHeading = document.getElementById('rollHeading');
        const rollName = document.getElementById('rollName');

        blur.style.display = 'block';
        blur.setAttribute('appear', '');
        blur.addEventListener('animationend', () => {

            let selectedDrink = this.chooseDrink();
            if (!selectedDrink.unlocked) {
                selectedDrink.unlock();
            }
            rollImgCon.style.display = 'flex';
            rollGlow.style.display = 'block';
            rollImg.style.display = 'block';
            rollHeading.style.display = 'block';
            rollName.style.display = 'block';

            rollImg.style.backgroundImage = selectedDrink.image;
            rollImg.classList.add(selectedDrink.rarity + 'Border');

            rollGlow.src = `./images/glows/glow${selectedDrink.rarity}.png`;
            rollHeading.textContent = selectedDrink.rarity;
            rollName.textContent = selectedDrink.jmeno;
            rollHeading.classList.add(selectedDrink.rarity + 'Text');
            rollName.classList.add(selectedDrink.rarity + 'Text');


            this.money -= 10;
            this.updateGoldCounter();

            this.sfx.changeVolume(0.1);
            this.sfx.changeSong('./music/sfx/roll.mp3');
            
            setTimeout(() => {
                rollGlow.setAttribute('rolling', '');
            }, 500);
            setTimeout(() => {
                rollHeading.setAttribute('appear', '');
                rollImg.setAttribute('appear', '');
                rollName.setAttribute('appear', '');
            }, 2400);

            let delay = 0;
            if (selectedDrink.rarity === 'common') {
                delay = 5000;
            } else if (selectedDrink.rarity === 'uncommon') {
                delay = 6500;
            } else if (selectedDrink.rarity === 'rare') {
                delay = 6500;
            } else if (selectedDrink.rarity === 'epic') {
                delay = 8000;
            } else if (selectedDrink.rarity === 'legendary') {
                delay = 8000;
            }

            setTimeout(() => {
                if (selectedDrink.rarity === 'common') {
                    this.rollSfx.changeSong('./music/sfx/tier1.mp3');
                    delay = 5000;
                } else if (selectedDrink.rarity === 'uncommon') {
                    this.rollSfx.changeSong('./music/sfx/tier2.mp3');
                    delay = 7000;
                } else if (selectedDrink.rarity === 'rare') {
                    this.rollSfx.changeSong('./music/sfx/tier3.mp3');
                    delay = 7000;
                } else if (selectedDrink.rarity === 'epic') {
                    this.rollSfx.changeSong('./music/sfx/tier4.mp3');
                    delay = 8000;
                } else if (selectedDrink.rarity === 'legendary') {
                    this.rollSfx.changeSong('./music/sfx/tier5.mp3');
                    delay = 8000;
                }
            }, 2500);





            setTimeout(() => {
                blur.setAttribute('disappear', '');
                rollGlow.setAttribute('unrolling', '');
                rollHeading.setAttribute('disappear', '');
                rollImg.setAttribute('disappear', '');
                rollName.setAttribute('disappear', '');

                blur.addEventListener('animationend', () => {
                    blur.removeAttribute('appear');
                    blur.removeAttribute('disappear');
                    rollGlow.removeAttribute('rolling', '');
                    rollGlow.removeAttribute('unrolling', '');
                    rollHeading.removeAttribute('appear');
                    rollHeading.removeAttribute('disappear');
                    rollImg.removeAttribute('appear');
                    rollImg.removeAttribute('disappear');
                    rollName.removeAttribute('appear');
                    rollName.removeAttribute('disappear');


                    rollImg.classList.remove(selectedDrink.rarity + 'Border');
                    rollHeading.classList.remove(selectedDrink.rarity + 'Text');
                    rollName.classList.remove(selectedDrink.rarity + 'Text');

                    blur.style.display = 'none';
                    rollImgCon.style.display = 'none';
                    rollGlow.style.display = 'none';
                    rollImg.style.display = 'none';
                    rollHeading.style.display = 'none';
                    rollName.style.display = 'none';

                    this.sfx.changeVolume(0.015);
                }, { once: true });
            }, delay);
        }, { once: true });

    }

    chooseDrink() {        
        const rarities = [
            this.napoje.common,
            this.napoje.uncommon,
            this.napoje.rare,
            this.napoje.epic,
            this.napoje.legendary
        ];
        const randomIndex = this.getRandomWithWeights(this.chances);
        return rarities[randomIndex][Math.floor(Math.random() * rarities[randomIndex].length)];
    }

    getRandomWithWeights(weights) {
        const sum = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * sum;
        for (let i = 0; i < weights.length; i++) {
            if (random < weights[i]) {
                return i;
            }
            random -= weights[i];
        }
        return weights.length - 1;
    }
}

class Lokace {
    constructor(moveBtn, actionBtn=null, backgroundImage=null, id=null) {
        this.moveBtn = moveBtn;
        this.actionBtn = actionBtn;
        this.background = document.getElementById('background');
        this.backgroundImage = backgroundImage;
        this.id = id;
    }
}

const locationList = {
    menu: new Lokace(document.getElementById('playBtn')),
    automat: new Lokace(document.getElementById('streetBtn'), document.getElementById('buyDrinkBtn'), 'url(./images/automat.png)'),
    commonStreet: new Lokace(document.getElementById('automatBtn'), document.querySelectorAll('.lootBtn'), 'url(./images/street1.png', "commonStreet"),
    uncommonStreet: new Lokace(document.getElementById('automatBtn'), document.querySelectorAll('.lootBtn'), 'url(./images/street2.png', "uncommonStreet"),
    rareStreet: new Lokace(document.getElementById('automatBtn'), document.querySelectorAll('.lootBtn'), 'url(./images/street3.png', "rareStreet"),
}

class Audio {
    constructor(element=document.getElementById('music'), volume=0.015) {
        this.audio = element;
        this.audio.volume = volume;
    }

    initialize() {
        window.addEventListener('click', () => {
            this.audio.play();
        }, { once: true });
    }

    play() {
        this.audio.play();
    }

    changeVolume(number) {
        this.audio.volume = number;
    }

    changeSong(song) {
        this.audio.src = song;
        this.audio.play();
    }
}

class Hra {
    constructor(automat, locationList, audio) {
        this.pozice = "start";
        this.automat = automat;
        this.locationList = locationList;
        this.audio = audio;

        this.curLocName = '';
        this.curLocMoveBtn = '';
        this.curLocActionBtn = '';

        this.buyBtn = document.getElementById('buyBtn');
    }

    initialize() {
        this.updateCurrentLocationData('menu');
    }

    resetData() {}

    changeLocation() {
        const blur = document.getElementById('moveBlur');
        const background = document.getElementById('background');

        const streetBtn = document.getElementById('streetBtn');
        const automatBtn = document.getElementById('automatBtn');

        blur.style.display = 'block';
        blur.setAttribute('appear', '');
        blur.addEventListener('animationend', () => {
            if (this.curLocName === 'menu') {
                document.getElementById('menu').style.display = 'none';
                document.getElementById('status').style.display = 'flex';
                this.buyBtn.style.display = 'block';
                streetBtn.style.display = 'block';
                this.audio.changeSong("./music/main.mp3");
                this.updateCurrentLocationData('automat');
            } else if (this.curLocName === 'automat') {
                this.buyBtn.style.display = 'none';
                streetBtn.style.display = 'none';
                automatBtn.style.display = 'block';

                const chances = [0.55, 0.3, 0.15];
                let randomIndex = this.automat.getRandomWithWeights(chances) + 2;
                const keys = Object.keys(locationList);
                const chosenStreet = this.locationList[keys[randomIndex]];
                this.updateCurrentLocationData(chosenStreet.id);
            } else {
                this.buyBtn.style.display = 'block';
                streetBtn.style.display = 'block';
                automatBtn.style.display = 'none';
                this.updateCurrentLocationData('automat');
            }
            background.style.backgroundImage = this.locationList[this.curLocName].backgroundImage;

            setTimeout(() => {
                blur.setAttribute('disappear', '');
                blur.addEventListener('animationend', () => {
                    blur.removeAttribute('appear');
                    blur.removeAttribute('disappear');
                    blur.style.display = 'none';
                }, { once: true });
            }, 100);
        }, { once: true });
    }

    updateCurrentLocationData(location) {
        this.curLocName = location;
        this.curLocMoveBtn = this.locationList[location].moveBtn;
        this.curLocActionBtn = this.locationList[location].actionBtn;

        this.curLocMoveBtn.addEventListener('click', () => { this.changeLocation() }, { once: true });
    }
}

const chances = [0.5, 0.3, 0.15, 0.04, 0.01];
// const chances = [0, 0, 0, 0.5, 0.5];
const automatNaNapoje = new AutomatNaNapoje(napoje, 9999, chances);
automatNaNapoje.initialize();

const audio = new Audio();
audio.initialize();

const hra = new Hra(automatNaNapoje, locationList, audio);
hra.initialize();
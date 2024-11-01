//#region STATE (ALL DATA AND VARIABLES)
let btc = 0
let totalEarning = 1
let totalAutoEarning = 0

const upgrades = [
    {
        name: 'Pickaxe',
        cost: 10,
        level: 0,
        miningRate: 1,
        maxLevel: 25,
        upgradeCostMultiplier: 1.2,
        auto: false
    },
    {
        name: 'Drill',
        cost: 50,
        level: 0,
        miningRate: 15,
        maxLevel: 25,
        upgradeCostMultiplier: 1.5,
        auto: false
    },
    {
        name: 'Gpu',
        cost: 1000,
        level: 0,
        miningRate: 10,
        maxLevel: 25,
        upgradeCostMultiplier: 1.5,
        auto: true
    },
    {
        name: 'Nasa Pc',
        cost: 10000,
        level: 0,
        miningRate: 100,
        maxLevel: 25,
        upgradeCostMultiplier: 2,
        auto: true
    }
]

//#endregion

//#region FUNCTIONS AND LOGIC

function totalMine() {
    for (let i = 0; i < upgrades.length; i++) {
        const upgrade = upgrades[i];

        if (upgrade.previousLevel === undefined) {
            upgrade.previousLevel = 0;
        }

        if (upgrade.level > upgrade.previousLevel) {
            if (upgrade.auto == false && upgrade.level >= 1) {
                totalEarning += (upgrade.level - upgrade.previousLevel) * upgrade.miningRate;
                console.log(totalEarning)
            }
            if (upgrade.auto == true && upgrade.level >= 1) {
                totalAutoEarning += (upgrade.level - upgrade.previousLevel) * upgrade.miningRate;
                console.log(totalAutoEarning)
            }
            upgrade.previousLevel = upgrade.level;
        }
    }
}

function upgradeItem(itemName) {
    for (let i = 0; i < upgrades.length; i++) {
        const upgrade = upgrades[i];
        if (itemName == upgrade.name) {
            if (btc >= upgrade.cost) {
                btc -= upgrade.cost
                upgrade.level++
                console.log('successful purchase', upgrade.level)
            } else {
                console.log('cannot afford this item')
            }

        } else {
            console.log('item not found')
        }

    }
}


function mineBtc() {
    totalMine()
    btc += totalEarning
}

function autoMineBtc() {
    totalMine()
    btc += totalAutoEarning
}



//#endregion


//#region DRAWING ITEMS TO PAGE


//#endregion


setInterval(autoMineBtc, 3000)
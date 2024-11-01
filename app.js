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
    totalEarning = 1;
    totalAutoEarning = 0;

    for (let i = 0; i < upgrades.length; i++) {
        const upgrade = upgrades[i];
        if (upgrade.auto == false && upgrade.level >= 1) {
            totalEarning += upgrade.level * upgrade.miningRate;
        }
        if (upgrade.auto == true && upgrade.level >= 1) {
            totalAutoEarning += upgrade.level * upgrade.miningRate;
        }
    }
}

function upgradeItem(itemName) {

    for (let i = 0; i < upgrades.length; i++) {
        const upgrade = upgrades[i];
        if (itemName == upgrade.name) {
            if (btc >= upgrade.cost) {
                upgrade.level++;
                btc -= upgrade.cost;
                drawBtc();

                let upgradeTotal = upgrade.cost * upgrade.upgradeCostMultiplier;
                upgrade.cost = Math.round(upgradeTotal);

                drawStats()
                totalMine();
                drawTotalEarning();
                drawIntervalEarnings()


            }
        }
    }
}


function mineBtc() {
    totalMine()
    btc += totalEarning
    drawBtc()
}

function autoMineBtc() {
    totalMine()
    btc += totalAutoEarning
    drawBtc()
}



//#endregion


//#region DRAWING ITEMS TO PAGE

const btcBalance = document.getElementById('btcAmount')
const clickAmount = document.getElementById('clickAmount')
const intervalAmount = document.getElementById('intervalAmount')
const Gpu = document.getElementById('Gpu')
const nasaPc = document.getElementById('NasaPc')
const Drill = document.getElementById('Drill')
const Pickaxe = document.getElementById('Pickaxe')

function drawBtc() {
    btcBalance.innerText = ''
    btcBalance.innerText += btc
}

function drawTotalEarning() {
    clickAmount.innerText = ''
    clickAmount.innerText += totalEarning
}

function drawIntervalEarnings() {
    intervalAmount.innerText = ''
    intervalAmount.innerText += totalAutoEarning
}

function drawStats() {
    for (let i = 0; i < upgrades.length; i++) {
        const upgrade = upgrades[i];
        if (upgrade.name == 'Gpu') {
            Gpu.innerText = ''
            Gpu.innerText = upgrade.cost;
        }
        if (upgrade.name == 'Nasa Pc') {
            nasaPc.innerText = ''
            nasaPc.innerText = upgrade.cost;
        }
        if (upgrade.name == 'Drill') {
            Drill.innerText = ''
            Drill.innerText = upgrade.cost;
        }
        if (upgrade.name == 'Pickaxe') {
            Pickaxe.innerText = ''
            Pickaxe.innerText = upgrade.cost;
        }
    }
}
//#endregion


setInterval(autoMineBtc, 2000)
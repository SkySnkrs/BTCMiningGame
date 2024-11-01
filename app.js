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

const pickaxeLevel = document.getElementById('pickaxeLevel')
const drillLevel = document.getElementById('drillLevel')
const gpuLevel = document.getElementById('gpuLevel')
const nasaPcLevel = document.getElementById('nasaPcLevel')

const pickaxeMiningRate = document.getElementById('pickaxeMiningRate')
const drillMiningRate = document.getElementById('drillMiningRate')
const gpuMiningRate = document.getElementById('gpuMiningRate')
const nasaPcMiningRate = document.getElementById('nasaPcMiningRate')

const miningRate = document.getElementById('miningPerSecond')

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
            let gpuMiningLevel = 0
            gpuMiningLevel = upgrade.level * upgrade.miningRate

            Gpu.innerText = ''
            gpuLevel.innerText = ''
            gpuMiningRate.innerText = ''

            Gpu.innerText = upgrade.cost;
            gpuLevel.innerText = upgrade.level;
            gpuMiningRate.innerText += gpuMiningLevel

        }
        if (upgrade.name == 'Nasa Pc') {
            let nasaPcMiningLevel = 0
            nasaPcMiningLevel = upgrade.level * upgrade.miningRate

            nasaPc.innerText = ''
            nasaPcLevel.innerText = ''
            nasaPcMiningRate.innerText = ''

            nasaPc.innerText = upgrade.cost;
            nasaPcLevel.innerText = upgrade.level;
            nasaPcMiningRate.innerText += nasaPcMiningLevel
        }
        if (upgrade.name == 'Drill') {
            let drillMiningLevel = 0
            drillMiningLevel = upgrade.level * upgrade.miningRate

            Drill.innerText = ''
            drillLevel.innerText = ''
            drillMiningRate.innerText = ''

            Drill.innerText = upgrade.cost;
            drillLevel.innerText = upgrade.level;
            drillMiningRate.innerText += drillMiningLevel
        }
        if (upgrade.name == 'Pickaxe') {
            let pickAxeMining = 0
            pickAxeMining = upgrade.level * upgrade.miningRate

            Pickaxe.innerText = ''
            pickaxeMiningRate.innerText = ''
            pickaxeLevel.innerText = ''

            Pickaxe.innerText = upgrade.cost;
            pickaxeLevel.innerText = upgrade.level;
            pickaxeMiningRate.innerText += pickAxeMining
        }
    }
}
//#endregion


setInterval(autoMineBtc, 2000)
setInterval(MiningPerSecond, 1000)
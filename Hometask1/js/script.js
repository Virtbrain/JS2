function CoffeeMachine(power, maxWaterAmount, maxCoffieAmount) {
    let waterAmount = 0;
    // Добавить переменную Кофе(зерна)
    let coffeeGrain = 0;
    let waterHeatCapacity = 4200;
    let maxTemp = 90;
    let coffeePortion = 10;
    let waterPortion = 190;
    let timer;

    const getBoilTime = function(portion) {
        return (portion * waterHeatCapacity * maxTemp) / power; // готовим не со всего что есть а лишь 1 порцию
    }

    const checkWater = function () {
        return waterAmount > waterPortion;
    }
    // Ввести проверку на пустую кофеварку(зерна)
    const checkCoffee = function () {
        return coffeeGrain > coffeePortion;
    }
    // Реализовать метод стоп.
    this.stopBoiling = function(e) {
        if (e.keyCode==32){
            clearTimeout(timer);
            console.log('Приготовление кофе остановлено!');
        }
    }
    this.fill = function (newWaterAmount, newCoffeeGrain) { //проверять нужно не на минимум а на максимум, т.к. если недолить то ничего криминального не случиться, а вот если перелить будет не хорошо.
        if ((waterAmount+newWaterAmount) <= maxWaterAmount) {
            waterAmount +=newWaterAmount;
            console.log(`Вода успешно добавлена. Текущее состояние воды: ${waterAmount} из ${maxWaterAmount}`);
        } else {
            console.error(`Заданное количество воды превышает допустимый предел.\n Вы можете добавить ${maxWaterAmount - waterAmount}`);
        }
        if ((coffeeGrain+newCoffeeGrain)<=maxCoffieAmount) {
            coffeeGrain += newCoffeeGrain;
            console.log(`Кофе успешно добавлен. Текущее состояние кофе: ${coffeeGrain} из ${maxCoffieAmount}`);
        } else {
            console.error("Заданное количество кофе превышает допустимый предел, попробуйте добавить меньше кофе.")
        }
    }

    this.launch = function () {
        if (!checkWater()) {
            console.error("Налейте воды!");
            return
        // Реализовать зависимость от количества кофе
        } else if (!checkCoffee()) {
            console.error("Засыпьте кофе!");
            return
        } else {
            console.info(`Все параметры в порядке: \n1) Вода: ${waterAmount}\n2) Кофе: ${coffeeGrain}`);
            waterAmount -=waterPortion;
            coffeeGrain -=coffeePortion;
            const boilTime = getBoilTime(waterPortion)
            console.info(`Время приготовления: ${Math.trunc(boilTime/1000)} сек.\n Для остновки приготовления нажмите Space на клавиатуре.`);
            timer = setTimeout(function () {
                console.log("Ваш кофе готов!");
                console.info(`Текущее состояние воды: ${waterAmount} из ${maxWaterAmount}`);
                console.info(`Текущее состояние кофе: ${coffeeGrain} из ${maxCoffieAmount}`);
            }, boilTime);
            addEventListener("keydown",this.stopBoiling, false);
        }  
    }
}

const vitek = new CoffeeMachine(2500,2000,200);
vitek.fill(1000,50);
vitek.launch();
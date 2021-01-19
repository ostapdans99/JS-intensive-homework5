let resultOfMultiply = {};

function multiply(a, b) {
	if (Number.isNaN(a * b)) {
		return null;
	}
	this.result = a * b;
	return this.result;
}


let multiplyBy10 = function (...args) {
	if (Number.isNaN(args.reduce((acc, curVal) => acc * curVal))) {
		return null;
	}
	return multiply.apply(resultOfMultiply, args) * 10;
};



class Car {
	_currentFuelVolume = 0;
	_isStarted = false;
	_mileage = 0;
	constructor(
		brand,
		model,
		yearOfManufacturing,
		maxSpeed,
		maxFuelVolume,
		fuelConsumption,
	) {
		if (brand.length < 1 || brand.length > 50)
			throw new Error("Некорректное название бренда");
		if (model.length < 1 || model.length > 50)
			throw new Error("Некорректное название модели");
		if (+yearOfManufacturing < 1900 || +yearOfManufacturing > 2021)
			throw new Error("Некорректный год производства");
		if (+maxSpeed < 100 || +maxSpeed > 300)
			throw new Error("Некорректная скорость автомобиля");
		if (+maxFuelVolume < 10 || +maxFuelVolume > 50)
			throw new Error("Некорректный объем бака");
		this._brand = brand;
		this._model = model;
		this._yearOfManufacturing = +yearOfManufacturing;
		this._maxSpeed = +maxSpeed;
		this._maxFuelVolume = maxFuelVolume;
		this._fuelConsumption = fuelConsumption;
	}
	get brand() {
		return this._brand;
	}

	set brand(value) {
		if (value.length < 1 || value.length > 50)
			throw new Error("Некорректное название бренда");
		this._brand = value;
	}

	get model() {
		return this._model;
	}

	set model(value) {
		if (value.length < 1 || value.length > 50)
			throw new Error("Некорректное название модели");
		this._model = value;
	}

	get yearOfManufacturing() {
		return this._yearOfManufacturing;
	}

	set yearOfManufacturing(value) {
		if (+value < 1900 || +value > 2021)
			throw new Error("Некорректный год производства");
		this._yearOfManufacturing = value;
	}

	get maxSpeed() {
		return this._maxSpeed;
	}

	set maxSpeed(value) {
		if (+value < 100 || +value > 300)
			throw new Error("Некорректная скорость автомобиля");
		this._maxSpeed = value;
	}

	get maxFuelVolume() {
		return this._maxFuelVolume;
	}

	set maxFuelVolume(value) {
		if (+value < 10 || +value > 50)
			throw new Error("Некорректный объем бака");
		this._maxFuelVolume = value;
	}

	get currentFuelVolume() {
		return this._currentFuelVolume;
	}

	get isStarted() {
		return this._isStarted;
	}

	get mileage() {
		return this._mileage;
	}

	start() {
		if (this._isStarted === true) throw new Error("Машина уже заведена");
		this._isStarted = true;
		return this;
	}

	shutDownEngine() {
		if (this._isStarted === false) throw new Error("Машина ещё не заведена");
		this._isStarted = false;
		return this;
	}

	fillUpGasTank(amountOfFuel) {
		if (
			typeof amountOfFuel !== "number" ||
			Number.isNaN(amountOfFuel) ||
			amountOfFuel < 0
		) {
			throw new Error("Неверное количество топлива для заправки");
		} else if (
			amountOfFuel > this._maxFuelVolume ||
			this._currentFuelVolume + amountOfFuel > this._maxFuelVolume
		) {
			throw new Error("Топливный бак переполнен");
		} else {
			this._currentFuelVolume += amountOfFuel;
		}
		return this;
	}

	drive(speed, amountOfHours) {
		if (typeof speed !== "number" || Number.isNaN(speed) || speed <= 0)
			throw new Error("Неверная скорость");
		if (speed > this._maxSpeed)
			throw new Error("Машина не может ехать так быстро");
		if (
			typeof amountOfHours !== "number" ||
			Number.isNaN(amountOfHours) ||
			amountOfHours <= 0
		)
			throw new Error("Неверное количество часов");
		if (!this._isStarted)
			throw new Error("Машина должна быть заведена, чтобы ехать");
		if (
			+(((speed * amountOfHours) / 100) * this._fuelConsumption).toFixed(1) >
			this._currentFuelVolume
		)
			throw new Error("Недостаточно топлива");
		this._currentFuelVolume -= (
			((speed * amountOfHours) / 100) *
			this._fuelConsumption
		).toFixed(1);
		this._mileage = speed * amountOfHours;
		return this;
	}
}



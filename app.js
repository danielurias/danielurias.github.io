var fighters = null;
var fighter_id = null;

var BASEURL = "https://smashbrosfighters.herokuapp.com";

function deleteFighterOnServer(FighterId) {
	fetch(BASEURL + "/fighters/" + FighterId, {
		method: "DELETE"
	}).then(function (response) {
		loadFighters();
	});
}


var updateButton = document.querySelector("#update-button");
console.log("the update button", updateButton);

updateButton.onclick = function () {
		var fighterNameInput = document.querySelector("#fighter-name");
		var fighterName = fighterNameInput.value;
		var fighterColorInput = document.querySelector("#fighter-color");
		var fighterColor = fighterColorInput.value;
		var fighterStyleInput = document.querySelector("#fighter-style");
		var fighterStyle = fighterStyleInput.value;
		var fighterStockInput = document.querySelector("#fighter-stock");
		var fighterStock = fighterStockInput.value;
		var fighterHpInput = document.querySelector("#fighter-hp");
		var fighterHp = fighterHpInput.value;
		console.log("You entered:", fighterName);

		var data = "name=" + encodeURIComponent(fighterName);
		data += "&color=" + encodeURIComponent(fighterColor);
		data += "&style=" + encodeURIComponent(fighterStyle);
		data += "&stock=" + encodeURIComponent(fighterStock);
		data += "&hp=" + encodeURIComponent(fighterHp);

		fetch(BASEURL + "/fighters/" + fighter_id, {
			method: "PUT", 
			body: data,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}).then(function (response) {
			loadFighters();
		});
};


var addButton = document.querySelector("#add-button");
console.log("the button", addButton);

addButton.onclick = function () {
		var fighterNameInput = document.querySelector("#fighter-name");
		var fighterName = fighterNameInput.value;
		var fighterColorInput = document.querySelector("#fighter-color");
		var fighterColor = fighterColorInput.value;
		var fighterStyleInput = document.querySelector("#fighter-style");
		var fighterStyle = fighterStyleInput.value;
		var fighterStockInput = document.querySelector("#fighter-stock");
		var fighterStock = fighterStockInput.value;
		var fighterHpInput = document.querySelector("#fighter-hp");
		var fighterHp = fighterHpInput.value;
		console.log("You entered:", fighterName);

		var data = "name=" + encodeURIComponent(fighterName);
		data += "&color=" + encodeURIComponent(fighterColor);
		data += "&style=" + encodeURIComponent(fighterStyle);
		data += "&stock=" + encodeURIComponent(fighterStock);
		data += "&hp=" + encodeURIComponent(fighterHp);

		fetch(BASEURL + "/fighters", {
			method: "POST", 
			body: data,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}).then(function (response) {
			loadFighters();
		});
};



function loadFighters () {
	fetch(BASEURL + "/fighters").then(function (response) {
		response.json().then(function (fightersFromServer) {
			fighters = fightersFromServer;

			var fightersList = document.querySelector("#fighters-list");
			fightersList.innerHTML = "";
			fighters.forEach(function (fighter) {
				console.log("one fighter:", fighter);
				var listItem = document.createElement("li");

				var nameEl = document.createElement("div");
				nameEl.innerHTML = fighter.name;
				nameEl.classList.add("name");
				listItem.appendChild(nameEl);

				var colorEl = document.createElement("div");
				colorEl.innerHTML = fighter.color;
				colorEl.classList.add("color");
				listItem.appendChild(colorEl);

				var styleEl = document.createElement("div");
				styleEl.innerHTML = fighter.style;
				styleEl.classList.add("style");
				listItem.appendChild(styleEl);

				var stockEl = document.createElement("div");
				stockEl.innerHTML = fighter.stock;
				stockEl.classList.add("stock");
				listItem.appendChild(stockEl);

				var hpEl = document.createElement("div");
				hpEl.innerHTML = fighter.hp;
				hpEl.classList.add("hp");
				listItem.appendChild(hpEl);

				var editButton = document.createElement("button");
				editButton.innerHTML = "Edit";
				editButton.onclick = function() {
					fighter_id = fighter.id;

					var fighterNameInput = document.querySelector("#fighter-name");
					var fighterColorInput = document.querySelector("#fighter-color");
					var fighterStyleInput = document.querySelector("#fighter-style");
					var fighterStockInput = document.querySelector("#fighter-stock");
					var fighterHpInput = document.querySelector("#fighter-hp");

					fighterNameInput.value = fighter.name
					fighterColorInput.value = fighter.color
					fighterStyleInput.value = fighter.style
					fighterStockInput.value = fighter.stock
					fighterHpInput.value = fighter.hp
				}
				listItem.appendChild(editButton);



				var deleteButton = document.createElement("button");
				deleteButton.innerHTML = "Delete";
				deleteButton.onclick = function () {
					console.log("you clicked me.", fighter);
					if (confirm("Are you sure your want to delete" + fighter.name + "?")) {
					deleteFighterOnServer(fighter.id)
					}
				};
				listItem.appendChild(deleteButton);

				fightersList.appendChild(listItem);

			});
		});
	});
}

loadFighters()
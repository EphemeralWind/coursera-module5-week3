(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemDirective)
;

function FoundItemDirective() {
	var ddo = {
		templateUrl: 'list.html',
		scope: {
			items: '<',
			onRemove: '&'
		},
		controller: FoundItemDirectiveController,
		controllerAs: 'found',
		bindToController: true
	};

	return ddo;
}

function FoundItemDirectiveController() {
	var con = this;

	con.remove = function(index) {

	};
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var con = this;

	con.crap = "CRAP" + MenuSearchService.doShit();

	var promise = MenuSearchService.getMatchedMenuItems("eggplant");

	promise.then(function(result) {
		console.log("Ret ", result);
		con.found = result;
	});
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
	var service = this;
	
	service.doShit = function() {
		return "SHIT";
	};

	service.getMatchedMenuItems = function(searchTerm) {
		return $http({
			url: "https://davids-restaurant.herokuapp.com/menu_items.json"
		}).then(function (result) {
			var array = result.data.menu_items;

			var found = [];
			for(var i = 0; i < array.length; i++) {
				var object = array[i];

				if(object.description.indexOf(searchTerm) != -1) {
					found.push(object);
				}
			}
			
			return found;
		});
	};
}
})();
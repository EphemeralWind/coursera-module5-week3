(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemDirective)
;

function FoundItemDirective() {
	var ddo = {
		restrict: 'E',
		templateUrl: 'list.html',
		scope: {
			foundItems: '<',
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

	con.meh = "MEH";

	con.isListEmpty = function() {
		console.log("Check list empty", con.foundItems);
		return con.foundItems != null && con.foundItems.length == 0;
	}
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var con = this;

	con.crap = "CRAP" + MenuSearchService.doShit();
	con.found = null;
	con.input = "";


	con.remove = function(index) {
		console.log("Remove 2", index);
		con.found.splice(index, 1);
	};

	con.search = function() {
		console.log("Keyword = ~" + con.input + "~");
		var promise = MenuSearchService.getMatchedMenuItems(con.input);

		promise.then(function(result) {
			console.log("Ret ", result);
			con.found = result;
		});
	}
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

			if(searchTerm.length > 0) {
				for(var i = 0; i < array.length; i++) {
					var object = array[i];

					if(object.description.indexOf(searchTerm) != -1) {
						found.push(object);
					}
				}
			}
			return found;
		});
	};
}
})();
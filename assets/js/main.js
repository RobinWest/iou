(function(){
	var app = angular.module('iou', []);

	app.controller('FormController', function($storage){
		this.debt = {};
		this.addDebt = function(){
			console.log($storage.get());
			console.log('###');
			$storage.set(this.debt);
			console.log($storage.get());
		}
	});

	app.controller('DebtsController', function($storage){
		this.debts = $storage.get();
	});

	// Break into data/common module
	app.service('$storage', function(){
		var localStorage = window.localStorage;
		var debts = [{
			id: 1,
			name: 'Sapphire',
			amount: 2.95,
			desc: 'bunch of blue',
			paid: false
		},
		{
			id: 2,
			name: 'Edgar',
			amount: 10.50,
			desc: 'bunch of blue',
			paid: true
		}];

		this.get = function(id){
			return debts;
		}
		this.set = function(debt){
			debt.id = debts.length + 1;

			debts.push(debt);
			return debt.id;
		}
	});
	
})();
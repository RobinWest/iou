iouUsers = new Meteor.Collection('iouUsers');
iouDebts = new Meteor.Collection('iourDebts');

var Validator = {
	nonEmptyString: function(val){
		console.log(val);
		if(val.length && val !== '')
			return true;
		console.log('name');
		return false;
	},
	email: function(val){
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (filter.test(val))
			return true;
		console.log('email');
		return false;
	},
	password: function(val){
		if (val.length >= 6)
			return true;
		console.log('pass');
		return false;
	}
}

if (Meteor.isClient) {
	Meteor.startup(function(){
		console.log('Startup');

	});
	Template.iouAddDebt.thing = function (){
		return 'variable';
	};
	Template.iouAddUser.events({
		'mouseover .icon.add': function(e){

		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function () {

	});
}

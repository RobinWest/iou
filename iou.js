iouUsers = new Meteor.Collection('iouUsers');
iouDebts = new Meteor.Collection('iouDebts');

var Validator = {
	nonEmptyString: function(val){
		console.log(val);
		if(val.length && val !== '')
			return true;
		return false;
	},
	email: function(val){
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (filter.test(val))
			return true;
		return false;
	},
	password: function(val){
		if (val.length >= 6)
			return true;
		return false;
	}
}

if (Meteor.isClient) {

	Template.signOut.name = function(){
		return Meteor.user().profile.name;
	}
	Template.addUser.users = function(){
		return iouUsers.find({}, {sort: {username: 1}});
	}
	Template.deleteUser.username = function(){
		return this.username;
	}
	Template.iouForm.users = function(){
		return iouUsers.find({}, {sort: {username: 1}});
	}
	Template.iouTables.users = function(){
		return iouUsers.find({}, {sort: {username: 1}});
	}
	Template.iouTable.user = function(){
		return this;
	}
	Template.iouTable.debts = function(){
		var debts = iouDebts.find({user_id: this._id}, {sort: {paid: 1}}).fetch();

		_.each(debts, function(debt){
			debt.username = getUsername(debt.user_id);
			debt.iouname = getUsername(debt.iou_id);
		});

		return debts;
	}

	var getUsername = function(id){
		var oUser = iouUsers.findOne({_id: id});

		return oUser.username;
	}


	Template.signOut.events({
		'click #signOut-logout': function(e){
			Meteor.logout(function(){
				console.log('Logged out');
			});
		}
	});

	Template.signInForm.events({
		'click #signInForm-submit': function(e){
			var email 		= $('#signInForm-email').val(),
				password 	= $('#signInForm-password').val();

			if(Validator.email(email) && Validator.password(password)){
				Meteor.loginWithPassword(email, password, function(error){
					if(error){
						console.log(error.message);
					} else {
						console.log('logged in!');
					}
				});
			}
		}
	});

	Template.signUpForm.events({
		'click #signUpForm-submit': function(e){
			var name			= $('#signUpForm-name').val(),
				email 			= $('#signUpForm-email').val(),
				password 		= $('#signUpForm-password').val(),
				confirmPassword	= $('#signUpForm-password-confirm').val();

			if(Validator.nonEmptyString(name) && Validator.email(email) && Validator.password(password) && password === confirmPassword){
				Accounts.createUser({email: email, password: password, profile: {name: name} }, function(error){
					if(error){
						console.log(error);
						if(error.message === "Email already exists. [403]"){
							// set error
							console.log(error.message);
						} else {
							// set error
							console.log(error.message);
						}
					} else {
						// all good!
						console.log('created user!');
					}
				});
			} else {
				// not valid form
				console.log('invalid form data');
			}		
		}
	});

	Template.addUser.events({
		'click #addUser-submit' : function(){
			if($('#addUser-input').val()){
				var uid = iouUsers.insert({username:$('#addUser-input').val()});
			}
		}
	});
	Template.deleteUser.events({
		'click p span' : function(){
			iouUsers.remove(this._id);
		}
	});

	Template.iouForm.events({
		'click #iouForm-submit': function(){
			var method = $('#iouForm-select-method').val(),
				debt = {
					amount: $('#iouForm-amount').val(),
					paid: false,
					desc: $('#iouForm-description').val()
				};

			// TODO remove this unneeded feature
			switch(method){
				case 'owes':
					debt.user_id = $('#iouForm-user-select-primary').val();
					debt.iou_id = $('#iouForm-user-select-secondary').val();
				break;
				case 'owedby':
					debt.user_id = $('#iouForm-user-select-secondary').val();
					debt.iou_id = $('#iouForm-user-select-primary').val();
				break;
			}

			// TODO if both user and iou id's are "all" or the same id then error, because dumb
			if(debt.user_id == debt.iou_id){
				return;
			}

			if(debt.user_id == 'all'){
				iouUsers.find().forEach(function(user){
					if(user._id !== debt.iou_id){
						debt.user_id = user._id;
						iouDebts.insert(debt);
					}
				});
			}else if(debt.iou_id == 'all'){
				iouUsers.find().forEach(function(user){
					if(user._id !== debt.user_id){
						debt.iou_id = user._id;
						iouDebts.insert(debt);
					}
				});
			}else{
				iouDebts.insert(debt);
			}
		}
	});

	Template.iouDebt.events({
		'click span.iouDebt-clear': function(){
			if(this.paid === false){
				this.paid = true;
				iouDebts.update(this._id, this);
			}else if(this.paid === true){
				iouDebts.remove(this._id)
			}
		}
	});

	// Template.iouUser.events({
	// 	'click #iouUser-delete': function(){
	// 		console.log('delete');
	// 		iouUsers.remove(this._id);
	// 	}
	// });

}

if (Meteor.isServer) {
	Meteor.startup(function () {
		// if (iouDebts.find().count() === 0) {
		// 	var debts = [];

		// 	iouUsers.find().forEach(function(user){
		// 		if(user._id !== '9tTg8kkDKafKTTs8E'){
		// 			iouDebts.insert({
		// 				user_id: user._id,
		// 				amount: 10,
		// 				iou_id: '9tTg8kkDKafKTTs8E' //jiminy
		// 			});
		// 		}
		// 	});

		// }
	});
}

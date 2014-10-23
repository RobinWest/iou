<!DOCTYPE html>
<html lang="en" ng-app="iou">
<head>
	<meta charset="UTF-8">
	<title>Angular Gemstore</title>
	<link rel="stylesheet" href="assets/css/pure-all.css">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
	<script src="assets/js/main.js"></script>
</head>
<body>
	<div class="pure-g">
		<div class="pure-u-1">

			<form name="debtForm" ng-controller="FormController as formCtrl" ng-submit="formCtrl.addDebt()">
				<input type="text" ng-model="formCtrl.debt.name" placeholder="name">
				<p>owes</p>
				<input type="text" ng-model="formCtrl.debt.amount" placeholder="amount">
				<input type="text" ng-model="formCtrl.debt.desc" placeholder="description">
				<input type="submit" value="Add">
			</form>

		</div>
	</div>
	<div class="pure-g">
		<div class="pure-u-1">
			
			<div ng-controller="DebtsController as debtsCtrl">
				<h1>Debts</h1>
				<ul>
					<li ng-repeat="debt in debtsCtrl.debts">
						<h2>{{ debt.name }} <span>{{ debt.amount | currency:'£' }}</span></h2>
						<p>{{ debt.desc }} <input type="checkbox" ng-model="debt.paid"></p>
					</li>
				</ul>
			</div>

		</div>
	</div>

</body>
</html>
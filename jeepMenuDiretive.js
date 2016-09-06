angular.module('gaps.menu.directive', [])
    /* TODO: direttiva che gestisce il menu principale in base al codice che viene passato */
	.directive('jeepMenu',[ 'Restangular', function(Restangular){
		// Runs during compile
        return {
			restrict : 'E',
			link : function (scope, element, attrs) {
                var _urlTemplate = '',_codApp = attrs.application;

                if(angular.equals(_codApp,'gaps') || angular.equals(_codApp,'lirico') || angular.equals(_codApp,'topolino')){
                    var utente = scope.userLogged;
                    Restangular.one('users', utente.codUtente).one('readers', 'menu').one("commands", "menu")
                        .get()
                        .then(function (data) {
                            scope.loadingPercentage += 20;
                            scope.staticMenuTest = data.bodyResponse.dataWorkFlow.innerMenu;
                            _urlTemplate = 'components/commons/menu/menuDynamicView.html';
                        },function(err){
                            scope.loadingError = true;
                        });
                    scope.staticMenuTest = [];
                }
                else{
                    scope.loadingPercentage += 20;
                    scope.staticMenuTest = '';
                }

                scope.getContentUrl = function(){
                    return _urlTemplate;
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
		};
	}])

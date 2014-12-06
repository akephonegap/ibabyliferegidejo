// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])


.run(function($ionicPlatform, $rootScope, $state, userService) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});

})


.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'temps/home.html',
      controller: 'homeCtrl'
    })
	.state('filter', {
      url: '/filter',
      templateUrl: 'temps/filter.html',
      controller: 'filterCtrl'
    })
	.state('upload', {
      url: '/upload',
      templateUrl: 'temps/upload.html',
      controller: 'uploadCtrl'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'temps/signin.html',
      controller: 'signinCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'temps/signup.html',
      controller: 'signupCtrl'
    })
    .state('timeline', {
      url: '/timeline',
      templateUrl: 'temps/timeline.html',
      controller: 'timelineCtrl'
    })
     .state('newAlbum', {
      url: '/newAlbum',
      templateUrl: 'temps/newAlbum.html',
      controller: 'newAlbumCtrl'
    })
    .state('albumline', {
      url: '/albumline',
      templateUrl: 'temps/albumline.html',
      controller: 'albumlineCtrl'
    })
    .state('fotoalbum', {
      url: '/fotoalbum',
      templateUrl: 'temps/fotoalbum.html',
      controller: 'fotoalbumCtrl'
    })
	.state('login', {
		url : '/login',
		templateUrl : 'temps/login.html',
		controller : 'loginCtrl',
		data : {
			authenticate : false
		}
	}); 

    
  // Send to login if the URL was not found
  $urlRouterProvider.otherwise('/login');
})

.factory('userService', ['$rootScope','$ionicPopup', '$state', function($rootScope,$ionicPopup, $state) {
			



  // Hello.js Functions
    hello.init({
                google : '128251550279-homlrbethbbcm1bpjjvnmei96mrsr2bc.apps.googleusercontent.com',
                facebook : '761716387233976',
                twitter : 'S0Q3RMX6jXu674kpyKg2dtk48'
            }, {
                //
                // Define the OAuth2 return URL
                // This can be anything you like, providing its the callback which you have registered with the providers for OAuth2
                // It could even be localhost, e.g. http://localhost/somepath as phonegap is not run from a domain so SameOrigin breaks, instead we take advantage of being able to read the popups URL in PhoneGap
                scope: "email,publish",
                redirect_uri : 'http://adodson.com/hello.js/redirect.html'
            });

  var service = {
    isLoggedIn: function() {
      return $rootScope.userStatus;
    },
    loginFacebook: function() {
      if(checkConnection()){
      	hello('facebook').login(function() {
	        hello( 'facebook' ).api( '/me' ).success(function(json) {
	          console.log(json);
	          $rootScope.user = json;
	          $rootScope.$apply($rootScope.user);
	          $rootScope.userStatus = true;
	          $rootScope.network = 'facebook';
	          window.localStorage.setItem("username", $rootScope.user.name );
			  window.localStorage.setItem("email", $rootScope.user.email);	    	
	          $state.go('home');
	        });
	      });     
      }else{
      	  var myPopup = $ionicPopup.show({
			    template: 'Ellenőrizze az internetkapcsolatot, és próbáljon meg újra bejelentkezni',
			    title: 'Nincs internetkapcsolatod !',
			    buttons: [
			      {
			        text: '<b>Rendben</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			        }
			      },
			    ]
			  });
      }
      
      
    },
    logoutFacebook: function() {
      hello('facebook').logout( function() {
        $rootScope.userStatus = false;
        $rootScope.user = null;
        $rootScope.network = false;

         $state.go('login');
      });
    },
    loginGoogle: function() {
      if(checkConnection()){
	      hello('google').login( function() {
	        hello( 'google' ).api( '/me' ).success(function(json) {
	          console.log(json);
	          $rootScope.user = json;
	          $rootScope.$apply($rootScope.user);
	          $rootScope.userStatus = true;
	          $rootScope.network = 'google';
	          window.localStorage.setItem("username", $rootScope.user.name );
			  window.localStorage.setItem("email",  $rootScope.user.email);	    
	          $state.go('home');
	        });
	      });
      }else{
      	  var myPopup = $ionicPopup.show({
			    template: 'Ellenőrizze az internetkapcsolatot, és próbáljon meg újra bejelentkezni',
			    title: 'Nincs internetkapcsolatod !',
			    buttons: [
			      {
			        text: '<b>Rendben</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			        }
			      },
			    ]
			  });
      }     
    },
    logoutGoogle: function() {
      hello('google').logout( function() {
        $rootScope.userStatus = false;
        $rootScope.user = null;
        $rootScope.network = false;
        
         $state.go('login');
      });
    },
    loginTwitter: function() {
      if(checkConnection()){
	      hello('twitter').login(function() {
	        hello( 'twitter' ).api( '/me' ).success(function(json) {
	          console.log(json);
	          $rootScope.user = json;
	          $rootScope.user.email = $rootScope.user.screen_name+'@ibabylife.com';
	          $rootScope.$apply($rootScope.user);
	          $rootScope.userStatus = true;
	          $rootScope.network = 'twitter';
			  window.localStorage.setItem("username", $rootScope.user.name );
			  window.localStorage.setItem("email", $rootScope.user.email);	    
	          $state.go('home');
	        });
	      });
      }else{
      	  var myPopup = $ionicPopup.show({
			    template: 'Ellenőrizze az internetkapcsolatot, és próbáljon meg újra bejelentkezni',
			    title: 'Nincs internetkapcsolatod !',
			    buttons: [
			      {
			        text: '<b>Rendben</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			        }
			      },
			    ]
			  });
      }     
    },
    logoutTwitter: function() {
      hello('twitter').logout( function() {
        $rootScope.userStatus = false;
        $rootScope.user = null;
        $rootScope.network = false;
        $state.go('login');
      });
    }
  };

  return service;
}])

.controller('homeCtrl', ['$scope','$rootScope','$state','$ionicPopup','$ionicPlatform','$ionicSideMenuDelegate','$ionicLoading','$http','userService',function($scope, $rootScope, $state,$ionicPopup,$ionicPlatform,$ionicSideMenuDelegate,$ionicLoading,$http, userService) {
    $scope.data = {};  
    
   	$ionicPlatform.registerBackButtonAction(function () {
   		var myPopup = $ionicPopup.show({		   
		    title: 'Kilépés',
		    subTitle: 'Biztos ki akarsz lépni ?',
		    scope: $scope,
		    buttons: [
		      { text: 'Nem' },
		      {
		        text: '<b>Igen</b>',
		        type: 'button-pink',
		        onTap: function(e) {
		          navigator.app.exitApp();		          
		        }
		      },
		    ]
		  });	 
	}, 100);
   
   
   
	/*
	cordova.plugins.notification.badge.configure({ title: '%d feltöltetlen esemény' });
	cordova.plugins.notification.badge.configure({ smallIcon: 'icon' });	
	*/
	
	dao.getOfflineEvent(function(events) {
		$scope.offlineEvents = events;
		/*
		 if ($scope.offlineEvents.length == 0) {
		 cordova.plugins.notification.badge.clear();
		 } else {
		 cordova.plugins.notification.badge.set($scope.offlineEvents.length);
		 }
		 */

	});	

	//dao.dropTables();
	// albumszinkronizálás

	dao.findAllAlbum(function(y) {
		$scope.familyalbums = [];
		$scope.minealbums = [];
		
		
		
		$scope.albums = y;
		$scope.albums.forEach(function(album) {			
			if(album.albumOwner!=$rootScope.user.email){				
				$scope.familyalbums.push(album);						
			}else{				
				$scope.minealbums.push(album);
			}
		}); 		
		
		
		$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/myAlbums.php', {
			albumowner : $rootScope.user.email
		}).success(function(data, status, headers, config) {	
			
			
			var myalbums = data;
			
						
			if (( typeof myalbums === 'object')) {
				console.log(myalbums);
			
				for (myalbum in myalbums) {					
					var e = myalbums[myalbum];
					var result = $.grep($scope.albums, function(e) {
						return e.albumName == myalbums[myalbum].albumName;
					});
				
					if (result.length == 0) {
						dao.newAlbum(myalbums[myalbum], function() {
						});
						$scope.albums.push(myalbums[myalbum]);						
					} else if (result.length == 1) {
					}

				}
			}else{
				alert(myalbums);
			};
	
	
			
			dao.findAllAlbum(function(y) {
				$scope.familyalbums = [];
				$scope.minealbums = [];
				$scope.albums = y;
				$scope.albums.forEach(function(album) {
					if (album.albumOwner != $rootScope.user.email) {
						$scope.familyalbums.push(album);
					} else {
						$scope.minealbums.push(album);
					}
				});
			}); 



			
		}).error(function(data, status, headers, config) {			
			dao.findAllAlbum(function(albums) {
				$scope.albums = albums;
				$scope.$apply();
				
			});
		});
	}); 





	$scope.feedback = function(){
		if(checkConnection()){
			 var myPopup = $ionicPopup.show({
			    template: '<input type="text" ng-model="data.feedback">',
			    title: 'Segítsd munkánkat',
			    subTitle: 'Kérlek, írj pár mondatot arról, hogy milyennek találod az alkalmazást. Ha van valami, amit hiányolsz, azt is nyugodtan írd ide. Köszönjük !',
			    scope: $scope,
			    buttons: [
			      { text: 'Mégsem' },
			      {
			        text: '<b>Küldés</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			          if (!$scope.data.feedback) {
			            //don't allow the user to close unless he enters wifi password
			            e.preventDefault();
			          } else {
			          	  $scope.feedbackData = {};
			          	  $scope.feedbackData.message = $scope.data.feedback;
			          	  $scope.feedbackData.deviceModel = device.model;
			          	  $scope.feedbackData.devicePlatform = device.platform;
			          	  $scope.feedbackData.deviceVersion = device.version;
			          	  
			          	  
			          	  
				          $http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/feedback.php', $scope.feedbackData).success(function(data, status, headers, config) {			
									
								var myPopup = $ionicPopup.show({
									template : 'Köszönjük, hogy üzenetével támogatja a munkánk!',
									title : 'Segíts !',
									buttons : [{
										text : '<b>Rendben</b>',
										type : 'button-pink'
									}]
								});
					
							}).error(function(data, status, headers, config) {							
								
							});
	
			               
			          }
			        }
			      },
			    ]
			  });
	
		}else {
			var myPopup = $ionicPopup.show({
				template : 'Csatlakozz internethez, hogy ezt a funkciót használni tudd.',
				title : 'Nincs internetkapcsolatod !',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-light'
				}]
			});
		}

	};
	
	$scope.albumline = function(albumid,albumname,albumowner){
		
		if (checkConnection()) {
		
			$rootScope.albumid = albumid;
			$rootScope.albumname = albumname;
			$rootScope.albumowner = albumowner;
			$state.go('albumline');
			
		} else {
			var myPopup = $ionicPopup.show({
				template : 'Csatlakozz internethez, hogy ezt a funkciót használni tudd.',
				title : 'Nincs internetkapcsolatod !',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-light'
				}]
			});
		}
		

	};
	
	$scope.newalbum = function() {		 
		$state.go('newAlbum');
	};
	
	
	
	$scope.fotoalbum = function() {
		if ($scope.albums.length == 0) {
			var myPopup = $ionicPopup.show({
				title : 'Új album',
				template : 'Még nem csináltál albumot a gyermekednek, ezt a funkciót a beállitások menüpont alatt éred el',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-pink',
					onTap : function(e) {
						$ionicSideMenuDelegate.toggleRight();
					}
				}]
			});

		} else {
			 var myPopup = $ionicPopup.show({
			    template: '<label class="item item-input item-select"><div class="input-label">	Melyik album </div> <select ng-model="data.fotoalbum" ng-options="album.albumName for album in albums"></select></label>',
			    title: 'Fotóalbum készítés',
			    subTitle: 'Kérlek válaszd ki, melyik albumból szeretnél fotóalbumot készíteni.',
			    scope: $scope,
			    buttons: [
			      { text: 'Mégsem' },
			      {
			        text: '<b>Tovább</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			          if (!$scope.data.fotoalbum) {
			            //don't allow the user to close unless he enters wifi password
			            e.preventDefault();
			          } else {
			        	$rootScope.fotoalbum = $scope.data.fotoalbum;
			          	$state.go('fotoalbum');
			          }
			        }
			      },
			    ]
			  });
			
		}
	}; 

	

	$scope.timeline = function() {
		if ($scope.albums.length == 0) {
			var myPopup = $ionicPopup.show({
				title : 'Új album',
				template : 'Még nem csináltál albumot a gyermekednek, ezt a funkciót a beállitások menüpont alatt éred el',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-pink',
					onTap : function(e) {
						$ionicSideMenuDelegate.toggleRight();
					}
				}]
			});

		} else {
			$state.go('timeline');
		}
	}; 

	
	$scope.logoutGuest=function(){
		$state.go('login');
	};	 

	

    $scope.takePic = function() {	
		if ($scope.albums.length == 0) {
			var myPopup = $ionicPopup.show({
				title : 'Új album',
				template : 'Még nem csináltál albumot a gyermekednek, ezt a funkciót a beállitások menüpont alatt éred el',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-pink',
					onTap : function(e) {
						$ionicSideMenuDelegate.toggleRight();
					}
				}]
			});

		} else {
			var options = {
				quality : 50,
				destinationType : Camera.DestinationType.FILE_URI,
				saveToPhotoAlbum: true,
				sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
				encodingType : 0,
				correctOrientation : true
			};
			// Take picture using device camera and retrieve image as base64-encoded string
			navigator.camera.getPicture(onSuccess, onFail, options);
		}

     
       
    };
    


	function convertImgToBase64(url, callback, outputFormat) {
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var img = new Image;
		img.crossOrigin = '*';
		img.onload = function() {
			canvas.height = img.height;
			canvas.width = img.width;
			ctx.drawImage(img, 0, 0);
			var dataURL = canvas.toDataURL(outputFormat || 'image/png');
			callback.call(this, dataURL);
			// Clean up
			canvas = null;
		};
		img.src = url;
	}


    var onSuccess = function(imageData) {
    
		alert('mehet ?');
		
		

		window.plugins.Base64.encodeFile('cdvfile://localhost/persistent/DCIM/Camera/1417891950187.jpg', function(base64) {
			alert('evlileg ok');
			
			$rootScope.images = [];
			$rootScope.images.push(base64);
			$state.go('upload');
		});

		


		
		// cdvfile://localhost/persistent/DCIM/Camera/1417883943936.jpg
		/*
		
		*/	
    };
    
    
    function onFail(message) {
      console.log('Nem sikerült képet csinálni, mert kiléptél a kamerából');
    }   
    
    
    function currentDate() {
		var currentDate = new Date;
		var Day = currentDate.getDate();
		if (Day < 10) {
			Day = '0' + Day;
		}//end if
		var Month = currentDate.getMonth() + 1;
		if (Month < 10) {
			Month = '0' + Month;
		}//end if
		var Year = currentDate.getFullYear();
		var fullDate = Year + '-' + Month + '-' + Day;
		return fullDate;
	}//end current date function
    
	
	
	$scope.menuRight = function() {
		$ionicSideMenuDelegate.toggleRight();		
	}; 

	
	
		
	

   
	$scope.uploadEvent = function(eventID, tombID) {		
		if (checkConnection()) {
			$ionicLoading.show({
				template : '<i class="icon ion-looping"></i> Feltöltés a szerverre...'
			});

			dao.eventById(eventID, function(event) {
				$scope.eventData = event[0];

				console.log($scope.eventData);

				dao.findAlbumByID($scope.eventData.albumId, function(album) {
					$scope.album = album;

					if ($scope.album[0].albumOwner == $rootScope.user.email) {
						$scope.eventData.albumOwner = $rootScope.user.email;
					} else {
						$scope.eventData.albumOwner = $scope.album[0].albumOwner;
					}

					$scope.eventData.albumName = $scope.album[0].albumName;
					$scope.eventData.albumDate = $scope.album[0].albumDate;
					$scope.eventData.albumSex = $scope.album[0].albumSex;

					$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/newEsemeny.php', $scope.eventData).success(function(data, status, headers, config) {

						$ionicLoading.hide();

						dao.eventFeltolt(eventID); 
						$scope.offlineEvents.splice(tombID, 1);
/*
						if ($scope.offlineEvents.length == 0) {
							cordova.plugins.notification.badge.clear();
						} else {
							cordova.plugins.notification.badge.set($scope.offlineEvents.length);
						}
*/
					}).error(function(data, status, headers, config) {
						$ionicLoading.hide();	
						alert('Nincs kapcsolat a szerverrel');
					});

				});

			});
		} else {
			var myPopup = $ionicPopup.show({
				template : 'Csatlakozz internethez, hogy ezt a funkciót használni tudd.',
				title : 'Nincs internetkapcsolatod !',
				buttons : [{
					text : '<b>Rendben</b>',
					type : 'button-light'
				}]
			});
		}


	}; 


}])

.controller('albumlineCtrl', ['$scope', '$rootScope', '$ionicPopup','$ionicPlatform','$ionicScrollDelegate', '$state', '$http', '$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope, $ionicPopup,$ionicPlatform,$ionicScrollDelegate, $state, $http, $ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.data = {};  
	$scope.home = function() {
		$state.go('home');
	}; 
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('home');
	}, 100);



	$scope.newEvent = function() {		
		var options = {
				quality : 50,
				destinationType : Camera.DestinationType.DATA_URL,
				saveToPhotoAlbum: true,							
       			targetWidth: 1024,
        		targetHeight: 1024,
				sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
				encodingType : 0,
				correctOrientation : true
			};
			// Take picture using device camera and retrieve image as base64-encoded string
		navigator.camera.getPicture(onSuccess, onFail, options);
		

     
     
	}; 
	

	$scope.share = function() {
			 var myPopup = $ionicPopup.show({
		    template: '<input type="text" ng-model="data.shareemail">',
		    title: 'Oszd meg az albumot',
		    subTitle: 'Kérlek add meg ismerősöd email címét, akivel megszeretnéd osztani ezt az albumot, hogy ő is tudjon hozzáadni eseményeket',
		    scope: $scope,
		    buttons: [
		      { text: 'Mégsem' },
		      {
		        text: '<b>Megosztás</b>',
		        type: 'button-pink',
		        onTap: function(e) {
		          if (!$scope.data.shareemail) {
		            //don't allow the user to close unless he enters wifi password
		            e.preventDefault();
		          } else {     	
		          	  $scope.shareData = {};
		          	  $scope.shareData.shareemail = $scope.data.shareemail;
		          	  $scope.shareData.meghivo = $rootScope.user.name;	   
				      $scope.shareData.albumOwner = $scope.album[0].albumOwner;
				      $scope.shareData.albumName = $scope.album[0].albumName;
				      $scope.shareData.albumDate = $scope.album[0].albumDate;
				      $scope.shareData.albumSex = $scope.album[0].albumSex;
				      
					  
		          	  	          	  
			          $http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/share.php', $scope.shareData).success(function(data, status, headers, config) {			
		
							var myPopup = $ionicPopup.show({
								title : 'Megosztva',
								template : 'Ezt az albumot sikeresen megosztottad ismerősöddel. Az album időfolyamát most már mindeketten szerkeszthetitek !',
								buttons : [{
									text : '<b>Rendben</b>',
									type : 'button-pink'									
								}]
							});
							
						}).error(function(data, status, headers, config) {
							alert('Nincs kapcsolat a szerverrel');	
						});
		               
		          }
		        }
		      },
		    ]
		  });

	};

	
	
 	var onSuccess = function(imageData) {
		$scope.picData = "data:image/jpeg;base64,"+imageData; 
		$rootScope.albumID = $scope.albumData.albumid;		
		$rootScope.images = [];				
		$rootScope.images.push($scope.picData );	 		
		$state.go('upload');			
    };
    
    
    function onFail(message) {
      console.log('Nem sikerült képet csinálni, mert kiléptél a kamerából');
    }   

	$scope.mikorTortent = function(eventDate) {
		var date1 = new Date($scope.album[0].albumDate);
		var date2 = new Date(eventDate);
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		if (diffDays >= 365) {
			return parseInt(diffDays / 365) + ' éves korban ';

		} else if (diffDays < 365 && diffDays > 30) {
			return parseInt(diffDays / 30) + ' hónapos korba ';
		} else {
			return diffDays + ' napos korban';
		}
	};




	$scope.albumData = {};
	$scope.albumData.albumowner = $rootScope.albumowner;
	$scope.albumData.albumid = $rootScope.albumid;
	$scope.albumData.albumname = $rootScope.albumname;

	$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/albumEvents.php', $scope.albumData).success(function(data, status, headers, config) {	
		
		if (data.length >=1) {
			dao.findAlbumByID($rootScope.albumid, function(album) {
				$scope.album = album;
				$scope.events = data;

				$.each($scope.events, function(key, value) {
					$scope.events[key].kepek = [];
					if ($scope.events[key].eventImg1 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg1);
					if ($scope.events[key].eventImg2 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg2);
					if ($scope.events[key].eventImg3 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg3);
					if ($scope.events[key].eventImg4 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg4);
					if ($scope.events[key].eventImg5 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg5);
					if ($scope.events[key].eventImg6 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg6);
					if ($scope.events[key].eventImg7 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg7);
					if ($scope.events[key].eventImg8 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg8);
					if ($scope.events[key].eventImg9 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg9);
					if ($scope.events[key].eventImg10 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg10);

					

				});
			
				
				
				var date1 = new Date($scope.album[0].albumDate);
				var date2 = new Date();
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

				if (diffDays >= 365) {
					$scope.kor = parseInt(diffDays / 365) + ' éves ';
				} else if (diffDays < 365 && diffDays > 30) {
					$scope.kor = parseInt(diffDays / 30) + ' hónapos ';
				} else {
					$scope.kor = diffDays + ' napos';
				}
				$scope.$apply();
				
			});
		} else {
			
			dao.findAlbumByID($rootScope.albumid, function(album) {
				$scope.album = album;
				var date1 = new Date($scope.album[0].albumDate);
				var date2 = new Date();
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

				if (diffDays >= 365) {
					$scope.kor = parseInt(diffDays / 365) + ' éves ';
				} else if (diffDays < 365 && diffDays > 30) {
					$scope.kor = parseInt(diffDays / 30) + ' hónapos ';
				} else {
					$scope.kor = diffDays + ' napos';
				}
				$scope.$apply();

			});
		}

	
		

	}).error(function(data, status, headers, config) {
		alert('Nincs kapcsolat a szerverrel');
	});

	
	


}])


.controller('newAlbumCtrl', ['$scope', '$rootScope', '$ionicPopup','$ionicPlatform', '$state', '$http', '$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope, $ionicPopup,$ionicPlatform, $state, $http, $ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.home = function() {
		$state.go('home');
	};
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('home');
	}, 100);
	$scope.data= {};
	
	
	 $('#albumDate').mobiscroll().datetime({
        display : 'bottom',
        mode: 'scroller',
        dateOrder: 'yy mm dd',
        dateFormat : "yy-mm-dd",
        timeFormat: 'HH:ii:ss',
        timeWheels: 'HHii',
        hourText: 'Óra',
        minuteText: 'Perc',
		minDate : new Date(1990, 01, 01),
		maxDate : new Date(),
		
    });  
	
	
	 $scope.newalbum =  function(){
		
		
    	console.log($scope.data);
    	 if (!$scope.data.albumName || !$scope.data.albumSex || $('#albumDate').val()=='' ) {	            
		            var myPopup = $ionicPopup.show({
					    title: 'Valamelyik adat hiányzik',
					    buttons: [
					      {
					        text: '<b>újra</b>',
					        type: 'button-pink',
					        onTap: function(e) {
					         
					        }
					      },
					    ]
					  });		          				          
		          } else {
		            album = {
			    		albumName : $scope.data.albumName,
			    		albumDate : $('#albumDate').val(),
			    		albumSex  : $scope.data.albumSex,
			    		albumOwner : $rootScope.user.email
			    	};
			    	dao.newAlbum(album,function(){});
			    	var myPopup = $ionicPopup.show({
					    title: 'Az albumot elmentettük',
					    buttons: [
					      {
					        text: '<b>Rendben</b>',
					        type: 'button-pink',
					        onTap: function(e) {
					           $state.go('home');
					           return;
					        }
					      },
					    ]
					  });			    	
			    	return;
		          }
    
    	
    };
	

}])
.controller('fotoalbumCtrl', ['$scope', '$rootScope', '$ionicPopup','$ionicPlatform', '$state', '$http', '$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope, $ionicPopup,$ionicPlatform, $state, $http, $ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.home = function() {
		$state.go('home');
	};
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('home');
	}, 100);
	
	$scope.fotoalbum= $rootScope.fotoalbum;
	console.log($scope.fotoalbum);	

	$('.date').mobiscroll().date({
        display : 'bottom',
        mode: 'scroller',
        dateOrder: 'yy mm dd',
        dateFormat : "yy-mm-dd",
		minDate : new Date(1990, 01, 01),
		maxDate : new Date(),
		
    });   
   
    
	

}])
.controller('timelineCtrl', ['$scope', '$rootScope', '$ionicPopup','$ionicPlatform', '$state', '$http','$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope, $ionicPopup,$ionicPlatform, $state, $http,$ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.home = function() {
		$state.go('home');
	};
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('home');
	}, 100);
	
	dao.getAllEvent(function(events) {
	
		dao.findAllAlbum(function(albums) {
			$scope.albums = albums;
			$scope.events = events;
			console.log($scope.events);
			$scope.$apply();
		});
	}); 

	$ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    $scope.showImage = function(imageurl) {      
      $scope.imageSrc = imageurl;      
      $scope.openModal();
    };




}])


.controller('signinCtrl', ['$scope', '$rootScope','$ionicPopup','$ionicPlatform', '$state','$http','userService',function($scope, $rootScope,$ionicPopup,$ionicPlatform, $state,$http, userService) {

	$scope.back=function(){
		$state.go('login');
	};
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('login');	  
	}, 100);
	
	$scope.logAjax = function() {
		$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/login.php?' + jQuery("#form-login").serialize()).success(function(data) {
			console.log(data);

			if (!data.success) {
				// if not successful, bind errors to error variables
				$scope.errorLogin = data.errors.login;

			} else {
				var myPopup = $ionicPopup.show({
				    title: 'Sikeres bejelentkezés',
				    template: 'Sikeresen bejelentkeztél. Az alkalmazás a továbbiakban ezt a felhasználót fogja használni !',
				    buttons: [
				      { text: '<b>Rendben</b>',	      
				        type: 'button-pink',
				        onTap: function(e) {
				          window.localStorage.setItem("ibabylifeusername", data.vezeteknev+' '+data.keresztnev);
				          window.localStorage.setItem("ibabylifeemail", data.email);	          
				          
				          
							console.log(data);
							$rootScope.user =  {
								name : data.vezeteknev+' '+data.keresztnev,
								email : data.email
							};
							$rootScope.$apply($rootScope.user);
							
							$state.go('home');

		  				  
				        }
				      }
				    ]
				  });

			}
		});

	};



}])


.controller('signupCtrl', ['$scope', '$rootScope','$ionicPopup','$ionicPlatform', '$state','$http','userService',function($scope, $rootScope,$ionicPopup,$ionicPlatform,$state,$http, userService) {
		
	$scope.back=function(){
		$state.go('login');
	};
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('login');	  
	}, 100);
	
	$scope.regAjax = function() {
		$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/signup.php?' + jQuery("#form-signup").serialize()).success(function(data) {
			console.log(data);

			if (!data.success) {
				// if not successful, bind errors to error variables
				$scope.errorVezeteknev = data.errors.vezeteknev;
				$scope.errorKeresztnev= data.errors.keresztnev;
				$scope.errorEmail = data.errors.email;
				$scope.errorJelszo = data.errors.jelszo;

			} else {
				var myPopup = $ionicPopup.show({
				    title: 'Sikeres regisztráció',
				    template: 'Sikeresen regisztráltál egy IBabyLife felhasználót. A következő oldalon ezt használva be tudsz lépni, és az alkalmazás a jövőben ezt fogja használni !',
				    buttons: [
				      { text: '<b>Bejelentkezés</b>',	      
				        type: 'button-pink',
				        onTap: function(e) {
		  				  $state.go('signin'); 
				        }
				      }
				    ]
				  });
			}
		});

	};



}])


.controller('uploadCtrl', ['$scope', '$rootScope', '$state','$stateParams', '$ionicPopup','$http','$ionicSlideBoxDelegate','$ionicLoading','$ionicPlatform','$ionicActionSheet', 'userService',
function($scope, $rootScope, $state,$stateParams, $ionicPopup,$http,$ionicSlideBoxDelegate,$ionicLoading,$ionicPlatform,$ionicActionSheet, userService) {
	$ionicPlatform.registerBackButtonAction(function () {	 
	    var myPopup = $ionicPopup.show({		   
		    title: 'Kilépés',
		    subTitle: 'Biztos visszalépsz a főmenübe ?',
		    scope: $scope,
		    buttons: [
		      { text: 'Nem' },
		      {
		        text: '<b>Igen</b>',
		        type: 'button-pink',
		       	onTap: function(e) {
					$rootScope.images = [];
					$rootScope.albumID = false;
					$state.go('home');
				}

		      },
		    ]
		  });	 	  
	}, 100);

	$scope.home = function() {
		$rootScope.images = [];
		$rootScope.albumID = false;
		$state.go('home');
	}; 


	$scope.data = [];

	if (!$rootScope.albumID) {
		dao.findAllAlbum(function(albums) {
			$scope.albums = albums;
			$scope.data.album = $scope.albums[0];
			$scope.$apply();
		});
	} else {
		dao.findAlbumByID($rootScope.albumID,function(albums){
			$scope.albums = albums;
			$scope.data.album = $scope.albums[0];
			$scope.$apply();
		});
		
		
	}
	



	$scope.images=$rootScope.images;	
	$scope.$apply();

	

	$scope.mentve = false;

	$scope.saveEvent = function() {
		$ionicLoading.show({
			template : '<i class="icon ion-looping"></i> Feltöltés a szerverre...'
		}); 
				
		if (checkConnection()) {
		
			$scope.eventData = {};
		
			
			
			if ($scope.data.message)
				$scope.eventData.eventMessage = $scope.data.message;
			else
				$scope.eventData.eventMessage = 'undefined';

			if ($scope.data.milestone)
				$scope.eventData.eventMilestone = $scope.data.milestone;
			else
				$scope.eventData.eventMilestone = 'undefined';

			if ($scope.images[0])
				$scope.eventData.eventImg1 = $scope.images[0];
			else
				$scope.eventData.eventImg2 = 'undefined';

			if ($scope.images[1])
				$scope.eventData.eventImg2 = $scope.images[1];
			else
				$scope.eventData.eventImg2 = 'undefined';
			
			if ($scope.images[2])
				$scope.eventData.eventImg3 = $scope.images[2];
			else
				$scope.eventData.eventImg3 = 'undefined';
				
			if ($scope.images[3])
				$scope.eventData.eventImg4 = $scope.images[3];
			else
				$scope.eventData.eventImg4 = 'undefined';
				
			if ($scope.images[4])
				$scope.eventData.eventImg5 = $scope.images[4];
			else
				$scope.eventData.eventImg5 = 'undefined';
				
			if ($scope.images[5])
				$scope.eventData.eventImg6 = $scope.images[5];
			else
				$scope.eventData.eventImg6 = 'undefined';
				
			if ($scope.images[6])
				$scope.eventData.eventImg7 = $scope.images[6];
			else
				$scope.eventData.eventImg7 = 'undefined';
				
			if ($scope.images[7])
				$scope.eventData.eventImg8 = $scope.images[7];
			else
				$scope.eventData.eventImg8 = 'undefined';
				
			if ($scope.images[8])
				$scope.eventData.eventImg9 = $scope.images[8];
			else
				$scope.eventData.eventImg9 = 'undefined';
				
			if ($scope.images[9])
				$scope.eventData.eventImg10 = $scope.images[9];
			else
				$scope.eventData.eventImg10 = 'undefined';

			
			
			$scope.eventData.eventDate = currentDate() + " " + currentTime();
			
		
			dao.findAlbumByID($scope.data.album.id, function(album) {
				$scope.album = album;
				
				
				
				if( $scope.album[0].albumOwner == $rootScope.user.email){
					$scope.eventData.albumOwner = $rootScope.user.email;
				}else{
					$scope.eventData.albumOwner =  $scope.album[0].albumOwner;
				}				
				$scope.eventData.albumId = $scope.data.album.id;
				$scope.eventData.albumName = $scope.album[0].albumName;
				$scope.eventData.albumDate = $scope.album[0].albumDate;
				$scope.eventData.albumSex = $scope.album[0].albumSex;
				
			
				$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/newEsemeny.php', $scope.eventData).success(function(data, status, headers, config) {			
					$ionicLoading.hide();								
					var myPopup = $ionicPopup.show({
						template : 'Ezt az eseményt sikeresen feltöltöttük !',
						title : 'Esemény feltöltve !',
						buttons : [{
							text : '<b>Rendben</b>',
							type : 'button-pink',
							onTap : function(e) {
								$scope.mentve = true;
							}
						}]
					});				
					
					
				}).error(function(data, status, headers, config) {
					$ionicLoading.hide();	
					alert('Nincs kapcsolat a szerverrel');	
				});
				

			});
			
		} else {
		
			$scope.data.albumid = $scope.data.album.id;
			$scope.data.eventMessage = $scope.data.message;
			$scope.data.eventMilestone = $scope.data.milestone;
			$scope.data.eventImg1 = $scope.images[0];
			$scope.data.eventImg2 = $scope.images[1];
			$scope.data.eventImg3 = $scope.images[2];
			$scope.data.eventImg4 = $scope.images[3];
			$scope.data.eventImg5 = $scope.images[4];
			$scope.data.eventImg6 = $scope.images[5];
			$scope.data.eventImg7 = $scope.images[6];
			$scope.data.eventImg8 = $scope.images[7];
			$scope.data.eventImg9 = $scope.images[8];
			$scope.data.eventImg10 = $scope.images[9];
			$scope.data.eventDate = currentDate() + " " + currentTime();

			
			dao.newEVent($scope.data, function() {
				$ionicLoading.hide();
				var myPopup = $ionicPopup.show({
					template : 'Ezt az eseményt elmentettük a telefonra, ha internet közelben leszel, töltsd fel a szerverre.',
					title : 'Esemény mentve !',
					buttons : [{
						text : '<b>Rendben</b>',
						type : 'button-pink',
						onTap : function(e) {
							$scope.mentve = true;
						}
					}]
				});

			}); 

		}

		

	};

	
	function currentDate() {
		var currentDate = new Date;
		var Day = currentDate.getDate();
		if (Day < 10) {
			Day = '0' + Day;
		}//end if
		var Month = currentDate.getMonth() + 1;
		if (Month < 10) {
			Month = '0' + Month;
		}//end if
		var Year = currentDate.getFullYear();
		var fullDate = Year + '-' + Month + '-' + Day;
		return fullDate;
	}//end current date function

	function currentTime() {
		var currentTime = new Date;
		var Minutes = currentTime.getMinutes();
		if (Minutes < 10) {
			Minutes = '0' + Minutes;
		}
		var Hour = currentTime.getHours();
		if (Hour < 10) {
			Hour = '0' + Hour;
		}
		var second = currentTime.getSeconds();
		if (second < 10) {
			second = '0' + second;
		}

		var Time = Hour + ':' + Minutes + ':' + second;
		return Time;
	}// end current time function


	$scope.plusz1Image = function() {
		var options = {
			quality : 50,
			destinationType : Camera.DestinationType.DATA_URL,
			saveToPhotoAlbum: true, 			
       		targetWidth: 1024,
        	targetHeight: 1024,
			sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
			encodingType : 0,
			correctOrientation : true
		};
		// Take picture using device camera and retrieve image as base64-encoded string
		navigator.camera.getPicture(onSuccess, onFail, options);
	};
	var onSuccess = function(imageData) {
	
	
		$scope.picData = "data:image/jpeg;base64," + imageData;
		$rootScope.kepAdat = imageData;			
		$rootScope.images.push($scope.picData);	 
	
		$state.transitionTo($state.current, $stateParams, {
			reload : true,
			inherit : false,
			notify : true
		});

		

	};

	function onFail(message) {
		alert('Nem sikerült képet csinálni, mert: ' + message);
	}

	
    
  
	$scope.checkImagesSize = function() {
		if ($rootScope.images.length > 1 ) {
			return true;
		}else{
			return false;
		}
	};
  
	$scope.show = function(index) {
		
		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({			
			destructiveText : 'Törlés',
			titleText : 'Kép szerkesztése',
			cancelText : 'Mégse',
			cancel : function() {
				// add cancel code..
			},
			buttonClicked : function(index) {
				return true;
			},
			destructiveButtonClicked : function() {	
			
				$rootScope.images.splice(index,1);				

				$state.transitionTo($state.current, $stateParams, {
					reload : true,
					inherit : false,
					notify : true
				}); 


			}
		});
	};


    
}])


.controller('loginCtrl', ['$scope','$rootScope','$ionicPopup','$ionicPlatform','$state','$ionicLoading', 'userService', function($scope, $rootScope, $ionicPopup,$ionicPlatform, $state,$ionicLoading, userService) {
	  	 
	  	 
	
	$ionicLoading.show({
		template : 'Bejelentkezés..'
	});	 
	 
	$ionicPlatform.registerBackButtonAction(function () {	 
	    var myPopup = $ionicPopup.show({		   
		    title: 'Kilépés',
		    subTitle: 'Biztos ki akarsz lépni ?',
		    scope: $scope,
		    buttons: [
		      { text: 'Nem' },
		      {
		        text: '<b>Igen</b>',
		        type: 'button-pink',
		        onTap: function(e) {
		          navigator.app.exitApp();		          
		        }
		      },
		    ]
		  });	 	  
	}, 100);

	
	var online = function(session) {
		var current_time = (new Date()).getTime() / 1000;
		return session && session.access_token && session.expires > current_time;
	};

	
	var loginIBabyLife = function(){
		if(localStorage.getItem('ibabylifeemail') != null){
			return true;
		}else{
			return false;
		}
	};


	var facebookonline = hello("facebook").getAuthResponse();
	var googleonline = hello("google").getAuthResponse();
	var twitteronline = hello("twitter").getAuthResponse();
	
	
	
	
 
	
	document.addEventListener("deviceready", onDeviceReady, false);
	// device APIs are available
	function onDeviceReady() {
	
		
		
		var networkState = navigator.network.connection.type;

		var states = {};
		states[Connection.UNKNOWN] = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI] = 'WiFi connection';
		states[Connection.CELL_2G] = 'Cell 2G connection';
		states[Connection.CELL_3G] = 'Cell 3G connection';
		states[Connection.CELL_4G] = 'Cell 4G connection';
		states[Connection.NONE] = 'No network connection';
		
		if ((online(facebookonline) || online(googleonline) || online(twitteronline) || loginIBabyLife())) {
	
			if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
				$ionicLoading.hide();
				var myPopup = $ionicPopup.show({					
				    template: 'Mivel nincs internetkapcsolatod, csak offline módban tudsz tovább lépni. Lesznek olyan funkciók, amik ilyenkor nem használhatóak.',
				    title: 'Nincs internetkapcsolatod !',
				    buttons: [
				      { text: '<b>Rendben</b>',	      
				        type: 'button-light',				       
						onTap: function(e) {
							if (online(facebookonline) || online(googleonline) || online(twitteronline)) {

								$rootScope.user = {
									name : localStorage.getItem('username'),
									email : localStorage.getItem('email')
								};
								$ionicLoading.hide();
								$state.go('home');

							} else if (loginIBabyLife()) {
								$rootScope.user = {
									name : localStorage.getItem('ibabylifeusername'),
									email : localStorage.getItem('ibabylifeemail')
								};
								$rootScope.$apply($rootScope.user);
								$ionicLoading.hide();
								$state.go('home');
							}

						}


				      }
				    ]
				  });
				
			} else {
				
				if (online(facebookonline) || online(googleonline) || online(twitteronline)) {

					$rootScope.user = {
						name : localStorage.getItem('username'),
						email : localStorage.getItem('email')
					};
					$ionicLoading.hide();
					$state.go('home');

				} else if (loginIBabyLife()) {
					$rootScope.user = {
						name : localStorage.getItem('ibabylifeusername'),
						email : localStorage.getItem('ibabylifeemail')
					};
					$rootScope.$apply($rootScope.user);
					$ionicLoading.hide();
					$state.go('home');
				}
		
			}
	
		} else {
			$ionicLoading.hide();
		}
	}

  $scope.loginFacebook = userService.loginFacebook;
  $scope.loginGoogle = userService.loginGoogle;
  $scope.loginTwitter = userService.loginTwitter;
  
  $scope.loginIbabyLife = function() {
	 if(checkConnection()){	 
		  var myPopup = $ionicPopup.show({
		    template: 'Rendelkezik már IBabyLife felhasználóval ?',
		    title: 'IBabyLife belépés',
		    buttons: [
		      { text: '<b>Még nem</b>',	      
		        type: 'button-light',
		        onTap: function(e) {
		          $state.go('signup');
		        }
		      },
		      {
		        text: '<b>Igen</b>',
		        type: 'button-pink',
		        onTap: function(e) {
		          $state.go('signin');
		        }
		      },
		    ]
		  });
	  }else{
      	  var myPopup = $ionicPopup.show({
			    template: 'Ellenőrizze az internetkapcsolatot, és próbáljon meg újra bejelentkezni',
			    title: 'Nincs internetkapcsolatod !',
			    buttons: [
			      {
			        text: '<b>Rendben</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			        }
			      },
			    ]
			  });
      }
	
	  
  };
}]);
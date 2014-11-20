// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $rootScope, $state, userService) {
  $ionicPlatform.ready(function() {
    
  });
    /*
  // UI Router Authentication Check
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.data.authenticate && !userService.isLoggedIn()){
      // User isn’t authenticated
      $state.transitionTo("login");
      event.preventDefault(); 
    }
  });
  */
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

.controller('homeCtrl', ['$scope','$rootScope','$state','$ionicPopup','$ionicSideMenuDelegate','$ionicLoading','$http','userService',function($scope, $rootScope, $state,$ionicPopup,$ionicSideMenuDelegate,$ionicLoading,$http, userService) {
    $scope.data = {};  

	dao.getOfflineEvent(function(events) {
		$scope.offlineEvents = events;
	}); 

	
	
	$scope.albumline = function(albumid){
		$rootScope.albumid = albumid;
		$state.go('albumline');
	};
	$scope.filter = function() {		 
		$state.go('filter');
	};
	$scope.newalbum = function() {		 
		$state.go('newAlbum');
	};
	
	$scope.timeline = function(){
		$state.go('timeline');
	};
	
	$scope.logoutGuest=function(){
		$state.go('login');
	};
	 
	dao.findAllAlbum(function(albums) {
		$scope.albums = albums;
		$scope.$apply();
		console.log($scope.albums);
	});
	

    $scope.takePic = function() {
     	
		if ($scope.albums.length==0) {
			 var myPopup = $ionicPopup.show({
					    title: 'Új album',
					    template :'Még nem csináltál albumot a gyermekednek, ezt a funkciót a beállitások menüpont alatt éred el',
					    buttons: [
					      {
					        text: '<b>Rendben</b>',
					        type: 'button-pink'
					      },
					    ]
					  });		
    	
		} else {
			var options = {
				quality : 50,
				targetWidth : 1024,
				targetHeight : 768,
				destinationType : Camera.DestinationType.DATA_URL,
				sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
				encodingType : 0,
				correctOrientation : true
			};
			// Take picture using device camera and retrieve image as base64-encoded string
			navigator.camera.getPicture(onSuccess, onFail, options);
		}
     
       
    };
    var onSuccess = function(imageData) {
		$scope.picData = "data:image/jpeg;base64,"+imageData; 
		$rootScope.kepAdat = imageData;
		$rootScope.images = [];
		$state.go('filter');
		
			
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


    $scope.uploadEvent = function(eventID,tombID){
   	
		dao.eventById(eventID, function(event) {
			$scope.eventData = event[0];
			$scope.eventData.albumOwner = $rootScope.user.email;		
			
			$http.post('http://192.168.1.184/ibabylifeserver/newEsemeny.php', $scope.eventData).success(function(data, status, headers, config) {
			    dao.eventFeltolt(eventID);
				$scope.offlineEvents.splice(tombID, 1);		    
			}).error(function(data, status, headers, config) {

			});
		}); 
     
    };

}])



.controller('albumlineCtrl', ['$scope', '$rootScope', '$ionicPopup', '$state', '$http', '$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope, $ionicPopup, $state, $http, $ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.home = function() {
		$state.go('home');
	};
	
	
	$scope.mikorTortent = function(eventDate) {
		var date1 = new Date($scope.album[0].albumDate+' 23:59:59');
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
	

	
	
	dao.getAllEventById($rootScope.albumid, function(events) {
	
		dao.findAlbumByID($rootScope.albumid, function(album) {
			$scope.album = album;
			$scope.events = events;
	
			var date1 = new Date($scope.album[0].albumDate);
			var date2 = new Date(currentDate());
			var timeDiff = Math.abs(date2.getTime() - date1.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	
			if (diffDays >= 365) {
				$scope.kor = parseInt(diffDays / 365) + ' éves ';
	
			} else if (diffDays < 365 && diffDays > 30) {
				$scope.kor = parseInt(diffDays / 30) + ' hónapos ';
			} else {
				$scope.kor = diffDays + ' napos';
			}
	
			console.log($scope.events);
			console.log($scope.album);
			$scope.$apply();
		});
	}); 

	
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

.controller('newAlbumCtrl', ['$scope', '$rootScope', '$ionicPopup', '$state', '$http', '$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope, $ionicPopup, $state, $http, $ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.home = function() {
		$state.go('home');
	};
	$scope.data= {};
	
	
	 $('#albumDate').mobiscroll().date({
        display : 'bottom',
        mode: 'scroller',
        dateOrder: 'yy mm dd',
        dateFormat : "yy-mm-dd",
		minDate : new Date(1990, 01, 01),
		maxDate : new Date(currentDate())
    });  
	
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
	}

	
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
			    		albumSex  : $scope.data.albumSex
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

.controller('timelineCtrl', ['$scope', '$rootScope', '$ionicPopup', '$state', '$http','$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope, $ionicPopup, $state, $http,$ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.home = function() {
		$state.go('home');
	};

	
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


.controller('signinCtrl', ['$scope', '$rootScope','$ionicPopup', '$state','$http','userService',function($scope, $rootScope,$ionicPopup, $state,$http, userService) {

	$scope.back=function(){
		$state.go('login');
	};
	
	$scope.logAjax = function() {
		$http.post('http://192.168.1.184/ibabylifeserver/login.php?' + jQuery("#form-login").serialize()).success(function(data) {
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


.controller('signupCtrl', ['$scope', '$rootScope','$ionicPopup', '$state','$http','userService',function($scope, $rootScope,$ionicPopup, $state,$http, userService) {
		
	$scope.back=function(){
		$state.go('login');
	};
	
	$scope.regAjax = function() {
		$http.post('http://192.168.1.184/ibabylifeserver/signup.php?' + jQuery("#form-signup").serialize()).success(function(data) {
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



.controller('uploadCtrl', ['$scope', '$rootScope', '$state', '$ionicPopup','$ionicActionSheet', 'userService',
function($scope, $rootScope, $state, $ionicPopup,$ionicActionSheet, userService) {

	$scope.data = [];

	dao.findAllAlbum(function(albums) {
		$scope.albums = albums;
		$scope.data.album = $scope.albums[0];
		$scope.$apply();
	});

	
	
	$scope.images=$rootScope.images;	
	$scope.$apply();



	$scope.home = function() {
		$state.go('home');
	};

	$scope.mentve = false;

	$scope.saveEvent = function() {

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

	};

	$scope.back = function() {
		$state.go('filter');
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
			targetWidth : 1024,
			targetHeight : 768,
			destinationType : Camera.DestinationType.DATA_URL,
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
		$state.go('filter');		

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
				$rootScope.images.splice(index, 1);
				$scope.images=$rootScope.images;	
				$scope.$apply();
				return true;
			}
		});
	};


    
}])

.controller('filterCtrl', ['$scope','$rootScope','$timeout', '$state','$ionicLoading', 'userService',function($scope, $rootScope,$timeout, $state,$ionicLoading, userService) {
	
	
	document.getElementById('originalPhoto').src = "data:image/jpeg;base64,"+$rootScope.kepAdat;
	
	var originalPhoto = document.getElementById('originalPhoto');

	document.getElementById('filterButtons').addEventListener('click', prepFilterEffect, false);

	function prepFilterEffect(e) {
		
		var filterButton = getFilterButton(e.target);
		if (!filterButton)
			return;

		ApplyEffects[filterButton.id](originalPhoto, 'jpeg');
		

	}

	function getFilterButton(target) {
		var button;
		if (target.classList.contains('filter')) {
			button = target;
		} else if (target.parentNode.classList.contains('filter')) {
			button = target.parentNode;
		}
		
		return button;
	}

	
	
	


	
	$scope.back = function(){
		$state.go('home');
	};
	$scope.cont = function(){
		if(document.getElementById('filteredPhoto') !== null){
			$rootScope.finalKep = document.getElementById('filteredPhoto').src;	
		}else{
			$rootScope.finalKep = document.getElementById('originalPhoto').src;		
		}
		$rootScope.images.push($rootScope.finalKep);	 		
		$state.go('upload');
	};
	
	
	
	
	
	
	
	
	
	
	
    
}])

.controller('loginCtrl', ['$scope','$rootScope','$ionicPopup','$state','$ionicLoading', 'userService', function($scope, $rootScope, $ionicPopup, $state,$ionicLoading, userService) {
	  	 
	  	 
	
	$ionicLoading.show({
		template : 'Bejelentkezés..'
	});	  
	  
	
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
				    template: 'Mivel nincs internetkapcsolatod, csak offline módban tudsz tovább lépni. Lesznek olyan funkciók amikor ilyenkor nem használhatóak.',
				    title: 'Nincs internetkapcsolatod !',
				    buttons: [
				      { text: '<b>Rendben</b>',	      
				        type: 'button-light',				       
						onTap: function(e) {
							$rootScope.guest = true;
							$state.go('home');
							
						}

				      }
				    ]
				  });
				
			} else {
				if (online(facebookonline) || online(googleonline) || online(twitteronline)) {
					
					if(online(facebookonline)){
						hello('facebook').api('me', function(json) {
							
							$rootScope.user = {
								name : localStorage.getItem('username'),
								email : localStorage.getItem('email')
							};
							$rootScope.userStatus = true;
							$rootScope.network = 'facebook';
							$ionicLoading.hide();
							$state.go('home');
						});				                 
					}
					if(online(googleonline)){
						hello('google').api('me', function(json) {
							
							$rootScope.user = {
								name : localStorage.getItem('username'),
								email : localStorage.getItem('email')
							};
							$rootScope.network = 'google';
							$ionicLoading.hide();
							$state.go('home');
						});				                 
					}
					if(online(twitteronline)){
						hello('twitter').api('me', function(json) {
							
							$rootScope.user = {
								name : localStorage.getItem('username'),
								email : localStorage.getItem('email')
							};
							$ionicLoading.hide();
							$state.go('home');
						});				                 
					}
						   
	
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
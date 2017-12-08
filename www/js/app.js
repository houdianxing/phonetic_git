
var audioRecord = "audio.wav";
var iosFileURL = "";
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform, $http, $state, $rootScope, $ionicModal, $ionicPopup, $ionicLoading, $ionicActionSheet, $ionicHistory) {

	$rootScope.siteUrl = "http://xx.kaouyu.com";
	$rootScope.rootUrl = "http://xx.kaouyu.com/index.php/api";	
    $rootScope.wx_book_id = 76;
	$ionicPlatform.ready(function() {
		initCordova();
		cordova.getAppVersion.getVersionNumber(function (version) {			
            $rootScope.currentVersion = version;
		});
		if ($rootScope.isIOS)
		{
		    document.addEventListener('deviceready', function () {
		        iniFileSystem();
		    }, false);
		}
	});
	InitIonic($rootScope, $ionicModal, $ionicPopup, $ionicLoading, $http, $state);
	
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$ionicConfigProvider.tabs.position('bottom'); //bottom
	$ionicConfigProvider.tabs.style('standard');
	$stateProvider
	// setup an abstract state for the tabs directive

	.state('my', {
		url: '/my',
		templateUrl: 'templates/my.html',
		controller: 'MyCtrl'
	})
	
	.state('login', {
		url: '/login',
		templateUrl: 'templates/login.html',
		controller: 'LoginCtrl',
		cache: false
	})

	.state('word_detail', {
		url: '/word_detail',
		templateUrl: 'templates/word_detail.html',
		controller: 'WordDetailCtrl',
		cache: false
	})

	.state('word_test', {
		url: '/word_test/:index',
		templateUrl: 'templates/word_test.html',
		controller: 'WordTestCtrl',
		cache: false
	})
	
	.state('phonetic_words', {
		cache: false,
		url: '/phonetic_words',
		templateUrl: 'templates/phonetic_words.html',
		controller: 'phonetic_wordsCtrl'
	})
	
	.state('phonetic_read', {
		cache: false,
		url: '/phonetic_read',
		templateUrl: 'templates/phonetic_read.html',
		controller: 'phonetic_readCtrl'
	})
	
	//#region
	.state('word_read', {
		url: '/word_read/:_index',
		templateUrl: 'templates/word_read.html',
		controller: 'word_readCtrl',
		cache: false
	})
	//#endregion

	//#region
	.state('me_aboutus', {
		url: '/me_aboutus',
		templateUrl: 'templates/me_about_us.html',
		controller: 'me_aboutusCtrl'
	})
	//#endregion
	
	
	//#egion
	.state('my_order', {
		url: '/my_order',
		templateUrl: 'templates/my_order.html',
		controller: 'my_orderCtrl',
		cache: false
	})
    //#endregion	
		   
    //#region
	.state('my_vcode', {
		url: '/my_vcode',
		templateUrl: 'templates/my_vcode.html',
		controller: 'my_vcodeCtrl',
		cache: false

	})
   //#endregion	
   
   
	//#endregion
	.state('yx_main', {
		url: '/yx_main',
		templateUrl: 'templates/yx_main.html',
		controller: 'yx_mainCtrl',
		cache: false
	})
	//#endregion

	//#region
	.state('me_appvcode', {
		url: '/me_appvcode',
		templateUrl: 'templates/me_app_vcode.html',
		controller: 'me_appvcodeCtrl',
		cache: false
	})
	//#endregion
	//#region
	.state('home', {
		url: '/home',
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl',
		cache: false
	})
	//#endregion	
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

});

//#region Init Cordova 
function initCordova() {
	if(window.cordova && window.cordova.plugins.Keyboard) {
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
		cordova.plugins.Keyboard.disableScroll(true);
	};
	if(window.StatusBar) {
		StatusBar.styleDefault();
	};

	if(window.cordova && window.cordova.InAppBrowser) {
		window.open = window.cordova.InAppBrowser.open;
	}
};
//#endregion

//#region Init Ionic
function InitIonic($rootScope, $ionicModal, $ionicPopup, $ionicLoading, $http, $state) {
	$rootScope.LoadingShow = function() {
		$ionicLoading.show({
			template: '<ion-spinner icon="spiral"></ion-spinner>'
		});
	};

	$rootScope.LoadingHide = function() {
		$ionicLoading.hide();
	};

	$rootScope.Alert = function(msg, okFunc) {
		var alertPopup = $ionicPopup.alert({
			template: msg,
			okText: '确定',
			okType: 'button-clear button-calm',
			cssClass: 'dc-popup'
		});

		if(okFunc) {
			alertPopup.then(function(res) {
				okFunc();
			});
		}
	};
	
	
	$rootScope.goBack = function() {
		history.go(-1);
	}
	
	$rootScope.Confirm = function(msg, okText, cancelText, okFunc, cancelFunc) {
		var confirmPopup = $ionicPopup.confirm({
			template: msg,
			okText: (okText ? okText : '确定'),
			okType: 'button-clear button-assertive',
			cancelText: (cancelText ? cancelText : '取消'),
			cancelType: 'button-clear button-calm',
			cssClass: 'dc-popup'
		});
		confirmPopup.then(function(res) {
			if(res) {
				okFunc();
			} else {
				cancelFunc();
			}
		});
	};


	$rootScope.favorite = function(word_id, book_id, callback) {
		$rootScope.LoadingShow();
		var url = $rootScope.rootUrl + "/word_operate";
		var data = {
			"action": "favorite",
			"user_id": $rootScope.userinfo.id,
			"word_id": word_id,
			"book_id": book_id,
		}
		$.post(url, data, function(response) {
			$rootScope.LoadingHide();
			callback(response);
			Toast("已加入单词本!",1500);
		}, "json")
	}

	$rootScope.remove_favorite = function(word_id, book_id, callback) {
		$rootScope.LoadingShow();
		var url = $rootScope.rootUrl + "/word_operate";
		var data = {
			"action": "remove_favorite",
			"user_id": $rootScope.userinfo.id,
			"word_id": word_id,
			"book_id": book_id,
		}
		$.post(url, data, function(response) {
			$rootScope.LoadingHide();
			callback(response);
		}, "json")
	}


	/**
	 * 更新用户学习
	 * @param {Object} user_id
	 * @param {Object} book_id
	 * @param {Object} unit_id
	 * @param {Object} word_id
	 * @param {Object} task1  "1,2,3"
	 * @param {Object} task2  "1,2,3"
	 * @param {Object} task3  "1,2,3"
	 */

	$rootScope.userCompletedTask = function(user_id, book_id, unit_id, word_id, task1, task2, task3) {
		
		$rootScope.LoadingShow();
		var url = $rootScope.rootUrl + "/user_completed_task";
		var data = {
			"user_id": user_id,
			"book_id": book_id,
			"unit_id": unit_id,
			"word_id": word_id,
			"task1": task1,
			"task2": task2,
			"task3": task3,
		};
		
		$http.post(url, data).success(function(response) {
			$rootScope.LoadingHide();
			if(response.error) {
				$rootScope.Alert(response.msg);
			} else {
				
			}
		}).error(function(response, status) {
			$rootScope.LoadingHide();
			$rootScope.Alert('连接失败！[' + response + status + ']');
			return;
		});
	}

	/**
	 * 更新用户练习
	 * @param {Object} user_id
	 * @param {Object} book_id
	 * @param {Object} unit_id
	 * @param {Object} word_id
	 * @param {Object} exercise_id  "11"
	 * @param {Object} point  "1,2,3"
	 */
	$rootScope.userCompletedExercise = function(user_id, book_id, unit_id, word_id, exercise_id, point) {
		$rootScope.LoadingShow();
		var url = $rootScope.rootUrl + "/user_completed_exercise";
		var data = {
			"user_id": user_id,
			"book_id": book_id,
			"unit_id": unit_id,
			"word_id": word_id,
			"exercise_id": exercise_id,
			"point": point
		};

		$http.post(url, data).success(function(response) {
			$rootScope.LoadingHide();
			if(response.error) {
				$rootScope.Alert(response.msg);
			} else {}
		}).error(function(response, status) {
			$rootScope.LoadingHide();
			$rootScope.Alert('连接失败！[' + response + status + ']');
			return;
		});
	}
	


	$rootScope.goBack = function() {
		history.go(-1);
	}

	var ua = navigator.userAgent;
		$rootScope.isIOS = ua.match(/(iPhone|iPod|iPad)/);
		$rootScope.isAndroid = ua.match(/Android/);

	    //#region 创建临时文件
		function iniFileSystem() {
		    window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, gotFS, fail);
		}

		function gotFS(fileSystem) {
		    fileSystem.root.getFile(audioRecord, {
		        create: true,
		        exclusive: false
		    }, gotFileEntry, fail);
		}

		function gotFileEntry(fileEntry) {
		    iosFileURL = fileEntry.toURL();

		    console.log(iosFileURL);
		}

		function fail() {
		    console.log("------error-------");
		}
	    //#endregion

   $rootScope.wordPlay = function(audio) {
		var v = document.getElementById("audio");
		v.src = $rootScope.siteUrl + "/upload/word/mp3/" + audio;
		v.loop = false;
		v.addEventListener('ended', function() {
//			obj.attr("src", "img/play.png");
		}, false);
		v.addEventListener('error', function(e) {
		}, false)
		v.play();
//		obj.attr("src", "img/play_gif.gif");
	}


 
    $rootScope.playWord = function(audio, obj) {
		var v = document.getElementById("audio");
		v.src = $rootScope.siteUrl + "/upload/word/mp3/" + audio;
		v.loop = false;
		v.addEventListener('ended', function() {
			obj.attr("src", "img/play.png");
		}, false);
		v.addEventListener('error', function(e) {
		}, false)
		v.play();
		obj.attr("src", "img/play_gif.gif");
	}


    $rootScope.playWord0 = function(audio, obj) {
		var v = document.getElementById("audio0");
		v.src = $rootScope.siteUrl + "/upload/word/mp3/" + audio;
		v.loop = false;
		v.addEventListener('ended', function() {
			obj.attr("src", "img/nan.png");
		}, false);
		v.addEventListener('error', function(e) {
		}, false)
		v.play();
		obj.attr("src", "img/svg-audio-icon-dribbble1.gif");
	}

    $rootScope.playWord1 = function(audio, obj) {
		var v = document.getElementById("audio1");
		v.src = $rootScope.siteUrl + "/upload/word/mp3/" + audio;
		v.loop = false;
		v.addEventListener('ended', function() {
			obj.attr("src", "img/nv.png");
		}, false);
		v.addEventListener('error', function(e) {
		}, false)
		v.play();
		obj.attr("src", "img/svg-audio-icon-dribbble.gif");
	}


	$rootScope.playExercise = function(audio, obj) {
		var v = document.getElementById("audio");
		v.src =  $rootScope.siteUrl +"/upload/exercise/mp3/" + audio;
		v.loop = false;
		v.addEventListener('ended', function() {
			obj.attr("src", "img/play.png");
		}, false);
		v.addEventListener('error', function(e) {
		}, false)
		v.play();
		obj.attr("src", "img/play_gif.gif");
	}

    $rootScope.showWordImgAnimate = function() {
		setTimeout(function() {
			var word_img = $(".word_img");

			word_img.animate({
				width: '80%',
				opacity: '0.8'
			}, "fast");

	        word_img.animate({
				width: '40%',
				opacity: '0.2'
			}, "fast");
			word_img.animate({
				width: '0',
				opacity: '0.2'
			}, "fast");
	
		}, 10);
    }
    
    
    $rootScope.playUrlAudio=function(obj,url){
    	    	
        obj.attr("src", "img/play_gif.gif");
        var v = document.getElementById("audio");
        v.src = url;
        v.loop = false;
        v.addEventListener('ended', function() {
          obj.attr("src", "img/play.png");
        }, false);
        v.addEventListener('error', function(e) {
          obj.attr("src", "img/play.png");
        }, false)
        v.play();
    }
    
  
        
    $rootScope.playUrlAudio2=function(url){
    	    	
        var v = document.getElementById("audio");
        v.src = url;
        v.loop = false;
        v.addEventListener('ended', function() {
        }, false);
        v.addEventListener('error', function(e) {
        }, false)
        v.play();
    }
    
     
    $rootScope.getBdyyhcToken = function(){
    	$rootScope.bdtoken="";
    	var url =$rootScope.siteUrl+"/api/get_baidu_access_token"
		$http.get(url).success(function(response) {
			if(response.error) {
				$rootScope.Alert(response.msg);
			} else {
				$rootScope.bdtoken = response.access_token;
			}
		}).error(function(response, status) {
			$rootScope.Alert('连接失败！[' + response + status + ']');
			return;
		});
    }
    
 
		/**
		 * 打开练习//  http://kuyczword.ourapp.site:666/index.php/api/exercise?user_id=1&book_id=1&unit_id=1
		 */
		$rootScope.doTest = function(unit_id) {

			$rootScope.LoadingShow();
			var url = $rootScope.rootUrl + "/exercise";
			var data = {
				"user_id": $rootScope.userinfo.id,
				"book_id": $rootScope.mybook.id,
				"unit_id": unit_id
			};

			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();
				if(response.error) {
					$rootScope.Alert(response.msg);
				} else {
					if(response && response.length > 0) {
						$rootScope.rootwordsexercise = response;
						$rootScope.rootListenwriteList = [];
						
						var arr=[];
						var num=0;
						if($rootScope.words.length<15 && $rootScope.words.length>10){
							num = 10;
						}else if($rootScope.words.length>15 && $rootScope.words.length<20){
							num = 13;
						}else if($rootScope.words.length>20 && $rootScope.words.length<25){
							num = 18;
						}else if($rootScope.words.length>25 && $rootScope.words.length<30){
							num = 20;
						}else if($rootScope.words.length>30 && $rootScope.words.length<35){
							num = 25;
						}else if($rootScope.words.length>35){
							num = 28;
						}else{
							num = $rootScope.words.length;
						}
						
						var arr = make_num_max_random(num,$rootScope.words.length);
						
						var newwordsarr = [];
						
						for(var k=0;k<$rootScope.words.length;k++){
							if(arr.contains(k)){
								$rootScope.words[k].zh_arr = $rootScope.words[k].zh.split("<br>");
								$rootScope.words[k].defs=[];
								for(var n=0;n<$rootScope.words[k].zh_arr.length;n++){
									var def={};
									def.cx = $rootScope.words[k].zh_arr[n].split('#')[0];
									def.zh = $rootScope.words[k].zh_arr[n].split('#')[1];
									$rootScope.words[k].defs.push(def);
								}
								
								newwordsarr.push($rootScope.words[k]);
							}
						}
						
						for(var j=0;j<newwordsarr.length;j++){
							if(newwordsarr[j].en.length>3 &&newwordsarr[j].zhs.indexOf("男名")<0 && newwordsarr[j].zhs.indexOf("女名")<0 && newwordsarr[j].en.indexOf(" ")<0){
								$rootScope.rootListenwriteList.push(newwordsarr[j]);
							}
						}
						
						$rootScope.rootwritetongji = [];  
						for(var k=0;k<$rootScope.rootListenwriteList.length;k++){
						    var writetongji ={};
					        writetongji.word = $rootScope.rootListenwriteList[k].en;
						    writetongji.showanswers = 0;
						    writetongji.wrongtimes = 0;
						    writetongji.righttimes = 0;
						    $rootScope.rootwritetongji.push(writetongji);
						}
						
						$state.go("listen_write", {
							"unit_id": unit_id,
							"_index": 0
						});
						
					} else {
						
						$rootScope.rootwordsexercise=[];
						$rootScope.rootListenwriteList = [];
						
						
						var arr=[];
						var num=0;
						if($rootScope.words.length<15 && $rootScope.words.length>10){
							num = 10;
						}else if($rootScope.words.length>15 && $rootScope.words.length<20){
							num = 13;
						}else if($rootScope.words.length>20 && $rootScope.words.length<25){
							num = 18;
						}else if($rootScope.words.length>25 && $rootScope.words.length<30){
							num = 20;
						}else if($rootScope.words.length>30 && $rootScope.words.length<35){
							num = 25;
						}else if($rootScope.words.length>35){
							num = 28;
						}else{
							num = $rootScope.words.length;
						}
						
						var arr = make_num_max_random(num,$rootScope.words.length);
						
						var newwordsarr = [];
						
						for(var k=0;k<$rootScope.words.length;k++){
							if(arr.contains(k)){
								newwordsarr.push($rootScope.words[k]);
							}
						}
						
						for(var j=0;j<newwordsarr.length;j++){
							if(newwordsarr[j].en.length>3 &&newwordsarr[j].zhs.indexOf("男名")<0 && newwordsarr[j].zhs.indexOf("女名")<0 && newwordsarr[j].en.indexOf(" ")<0){
								$rootScope.rootListenwriteList.push(newwordsarr[j]);
							}
						}
						
//						
//						for(var j=0;j<$rootScope.words.length;j++){
//							if($rootScope.words[j].zhs.indexOf("男名")<0 && $rootScope.words[j].zhs.indexOf("女名")<0 && $rootScope.words[j].en.indexOf(" ")<0){
//								$rootScope.rootListenwriteList.push($rootScope.words[j]);
//							}
//						}
						
						$rootScope.rootwritetongji = [];  
						for(var k=0;k<$rootScope.rootListenwriteList.length;k++){
						    var writetongji ={};
					        writetongji.word = $rootScope.rootListenwriteList[k].en;
						    writetongji.showanswers = 0;
						    writetongji.wrongtimes = 0;
						    writetongji.righttimes = 0;
						    $rootScope.rootwritetongji.push(writetongji);
						}
						
						$state.go("listen_write", {
							"unit_id": unit_id,
							"_index": 0
						});
					}
				}

			})
		}
		

		$rootScope.startGame = function() {
			//$state.go("qpgame_main");
			$state.go("tab.game");
		}

//  var wmedia;
//  $rootScope.playWord = function (audio,obj) {
//      // Play the audio file at url
//		obj.attr("src", "img/play_gif.gif");
//      var url =  $rootScope.siteUrl+"/upload/word/mp3/" + audio;
//      if(wmedia){
//          wmedia.setSrc(url);
//          wmedia.setOnErrFunc(
////             function(){
////                 wmedia.setSrc($rootScope.siteUrl+"/upload/word/mp3/" + audio);
////                 wmedia.play();
////             }
//          )
//      }
//      else{
//      wmedia = new Media(url,
//
//          // success callback
//          function () {
////                console.log("playAudio():Audio Success");
//          },
//          // error callback
//          function (err) {
////              console.log("playAudio():Audio Error: " + err);
////              wmedia.setSrc($rootScope.siteUrl+"/upload/word/mp3/" + audio);
////              wmedia.play();
//          }
//      );
//      }
//      // Play audio
//      wmedia.play();
//
//      setTimeout(function(){
//         obj.attr("src", "img/play.png");
//      },3000)
//
//  }
//
//  var emedia;
//	$rootScope.playExercise = function(audio, obj) {
//      obj.attr("src", "img/play_gif.gif");
//      var url =  "file:///android_asset/www/upload/exercise/mp3/" + audio;
//
//      if(emedia){
//         emedia.setSrc(url);
//         emedia.setOnErrFunc(
//             function(){
//                 emedia.setSrc($rootScope.siteUrl+"/upload/exercise/mp3/" + audio);
//                 emedia.play();
//             }
//         )
//      }else{
//           emedia = new Media(url,
//              // success callback
//              function () {
//  //                console.log("playAudio():Audio Success");
//              },
//              // error callback
//              function (err) {
//                  console.log("playAudio():Audio Error: " + err);
//                  emedia.setSrc($rootScope.siteUrl+"/upload/exercise/mp3/" + audio);
//                  emedia.play();
//              }
//          );
//
//      }
//      // Play audio
//      emedia.play();
//
//      setTimeout(function(){
//         obj.attr("src", "img/play.png");
//      },3000)
//
//	}
//
//


};
//#endregion

//#region localStorage
function setStorage(key, value, isString) {
	if(isString) {
		window.localStorage[key] = value;
	} else {
		window.localStorage[key] = JSON.stringify(value);
	}
};

function getStorage(key, isString) {
	if(isString) {
		return window.localStorage[key] || '';
	} else {
		return JSON.parse(window.localStorage[key] || '{}');
	}
};
//#endregion

//#region img => base64
function convertImgToBase64(url, callback, outputFormat) {
	var canvas = document.createElement('CANVAS'),
		ctx = canvas.getContext('2d'),
		img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0);
		var dataURL = canvas.toDataURL(outputFormat || 'image/png');
		callback.call(this, dataURL);
		canvas = null;
	};
	img.src = url;
};
//#endregion

//#region Common
function isFloat(s) {
	return !isNaN(s);
}

function isEmail(s) {
	if(s.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
		return true;
	else
		return false;
}

function sortNameASC(x, y) {
	return(parseFloat(x.name) > parseFloat(y.name)) ? 1 : -1;
}

function sortTimeDESC(x, y) {
	return(Date.parse(x.time) > Date.parse(y.time)) ? -1 : 1;
}

function getNextId(a) {
	var m = 0;

	for(i = 0; i < a.length; i++) {
		if(a[i].id > m) {
			m = a[i].id;
		}
	}

	return(m + 1);
}

function getItemById(a, id) {
	var m = {};
	for(i = 0; i < a.length; i++) {
		if(a[i].id == id) {
			m = a[i];

			break;
		}
	}
	return m;
}

function DateAdd(d, day) {
	return new Date(Date.parse(d) + (86400000 * day));
}

function DateDiff(s, e) {
	//return new Date( + (86400000 * day));

	return(Date.parse(s) - Date.parse(e)) / 86400000;
}

function DateDiff2(s, e) {

	var s0 = new Date(Date.parse(s));
	var s1 = new Date();;
	s1.setFullYear(s0.getFullYear());
	s1.setMonth(s0.getMonth());
	s1.setDate(s0.getDate());

	var e0 = new Date(Date.parse(e));
	var e1 = new Date();;
	e1.setFullYear(e0.getFullYear());
	e1.setMonth(e0.getMonth());
	e1.setDate(e0.getDate());

	return(s1 - e1) / 86400000;
}

function DateFormat(d) {
	return d.getFullYear() + "年" + PadLeft((d.getMonth() + 1), 2) + "月" + PadLeft(d.getDate(), 2) + "日" + "  星期" + "日一二三四五六".charAt(d.getDay());
}

function PadLeft(v, length) {
	var s = "000000000" + v;
	return s.substr(s.length - length);
}

function versionId(v) {
	if(!v) {
		return 0;
	} else {
		v = v.replace(/\./g, '');
		return parseFloat(v);
	}
}

function CurentTime() {
	var now = new Date();

	var year = now.getFullYear(); //年  
	var month = now.getMonth() + 1; //月  
	var day = now.getDate(); //日  

	var hh = now.getHours(); //时  
	var mm = now.getMinutes(); //分  
	var ss = now.getSeconds(); //秒  

	var clock = year + "-";

	if(month < 10) clock += "0";
	clock += month + "-";

	if(day < 10) clock += "0";
	clock += day + " ";

	if(hh < 10) clock += "0";
	clock += hh + ":";

	if(mm < 10) clock += '0';
	clock += mm + ":";

	if(ss < 10) clock += '0';
	clock += ss;

	return(clock);
}
//#endregion

function playAudio(f) {
	var v = document.getElementById("audio");
	v.src = (f ? "audio/GameSoundCorrect.mp3" : "audio/GameSoundWrong.mp3");
	v.play();
}

function playGameAudio(f) {
	var v = document.getElementById("audio");
	v.src = (f ? "audio/well-done.mp3" : "audio/laodajiayou.mp3");
	v.play();
}

function playWordAudio(audio) {
	var v = document.getElementById("audio");
	v.src = "http://xx.kaouyu.com/upload/word/mp3/" + audio;
	v.play();
}


function showStarImgAnimate() {
	setTimeout(function() {
		var star_img = $(".star_img");
		star_img.animate({
			width: '25px',
			opacity: '0.4'
		}, "slow");
		star_img.animate({
			width: '20px',
			opacity: '0.8'
		}, "slow");
		star_img.animate({
			width: '25px',
			opacity: '0.4'
		}, "slow");
		star_img.animate({
			width: '20px',
			opacity: '0.8'
		}, "slow");

	}, 200);
}

function showWordImgAnimate() {
	
	alert("1");
//	setTimeout(function() {
//		var word_img = $(".word_img");
//		word_img.animate({
//			width: '60%',
//			opacity: '0.8'
//		}, "slow");
//		word_img.animate({
//			width: '40%',
//			opacity: '0.6'
//		}, "slow");
//		word_img.animate({
//			width: '20%',
//			opacity: '0.4'
//		}, "slow");
//		word_img.animate({
//			width: '0',
//			opacity: '0.2'
//		}, "slow");
//
//	}, 2000);
}


//JS判断数组中是否包含某一项
Array.prototype.contains = function(obj) {
	var i = this.length;
	while(i--) {
		if(this[i] === obj) {
			return true;
		}
	}
	return false;
}


String.prototype.replaceAll  = function(s1,s2){  
      return this.replace(new RegExp(s1,"gm"),s2);   //这里的gm是固定的，g可能表示global，m可能表示multiple。 
}


//去左空格;
function ltrim(s){
    return s.replace(/(^\s*)/g, "");
}
//去右空格;
function rtrim(s){
    return s.replace(/(\s*$)/g, "");
}
//去左右空格;
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}


function  make_num_max_random(num,max){
	
	// 定义存放生成随机数的数组 
	var array=new Array(); 
	// 循环N次生成随机数 
	for(var i = 0 ; ; i++){ 
	    // 只生成10个随机数 
	    if(array.length<num){ 
	          generateRandom(max); 
	    }else{ 
	      break; 
	   } 
	} 
	
	// 生成随机数的方法 
	function generateRandom(count){ 
	     var rand = parseInt(Math.random()*count); 
	     for(var i = 0 ; i < array.length; i++){ 
	          if(array[i] == rand){ 
	               return false; 
	          }      
	     } 
	     array.push(rand); 
	} 
	return array;
	
}




//自定义弹框
function Toast(msg,duration){
    duration=isNaN(duration)?3000:duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="width: 60%;min-width: 150px;opacity: 0.5;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 5px;position: fixed;top: 40%;left: 20%;z-index: 999999;background: rgb(0, 0, 0);font-size: 14px;";
    document.body.appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function() { document.body.removeChild(m) }, d * 1000);
    }, duration);
}
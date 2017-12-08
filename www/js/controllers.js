angular.module('starter.controllers', [])

	
	.controller('HomeCtrl', function($rootScope, $scope, $state, $http) {
		
		
	    $scope.phonetics0 = [
	        {
	        "name":"单元音",
	        "datas":[
				{"id":"18911","en":"i:","pid":8},
				{"id":"18912","en":"I","pid":8},
				{"id":"18913","en":"e","pid":8},
				{"id":"18914","en":"æ","pid":8},
				{"id":"18915","en":"ə:","pid":8},
				{"id":"18916","en":"ə","pid":8},
				{"id":"18917","en":"ʌ","pid":8},
				{"id":"18918","en":"u:","pid":8},
				{"id":"18919","en":"ʊ","pid":8},
				{"id":"18920","en":"ɒ","pid":8},
				{"id":"18921","en":"ɔ:","pid":8},
				{"id":"18922","en":"ɑː","pid":8}
	          ]
	        },
	        {
	          "name":"双元音",
	          "datas":[
					{"id":"32584","en":"eɪ","pid":7},
					{"id":"32585","en":"aɪ","pid":7},
					{"id":"32586","en":"ɔɪ","pid":7},
					{"id":"32587","en":"əʊ","pid":7},
					{"id":"32588","en":"ɪə","pid":7},
					{"id":"32589","en":"eə","pid":7},
					{"id":"32590","en":"ʊə","pid":7},
					{"id":"32591","en":"aʊ","pid":7}
	            ]
	        }
	    ];
	    
	    
	     $scope.phonetics1 = [
	        {
	        	"name":"爆破音",
	            "datas":[
					{"id":"32555","en":"p","pid":0},
					{"id":"32559","en":"t","pid":0},
					{"id":"32561","en":"k","pid":0},
					{"id":"32556","en":"b","pid":0},
					{"id":"32562","en":"g","pid":0},
					{"id":"32560","en":"d","pid":0}
	            ]
	        },
	        {
	        	"name":"摩擦音",
	            "datas":[
					{"id":"32557","en":"f","pid":1},
					{"id":"32563","en":"s","pid":1},
					{"id":"32565","en":"∫","pid":1},
					{"id":"32566","en":"ʒ","pid":1},
					{"id":"32567","en":"θ","pid":1},
					{"id":"32568","en":"h","pid":1},
					{"id":"32558","en":"v","pid":1},
					{"id":"32564","en":"z","pid":1},
					{"id":"32569","en":"ð","pid":1},
					{"id":"32570","en":"r","pid":1}
	            ]
	        },
	        {
	        	"name":"破擦音",
	            "datas":[
					{"id":"32571","en":"tʃ","pid":2},
					{"id":"32573","en":"tr","pid":2},
					{"id":"32575","en":"ts","pid":2},
					{"id":"32572","en":"dʒ","pid":2},
					{"id":"32574","en":"dr","pid":2},
					{"id":"32576","en":"dz","pid":2}				
	            ]
	        },
	         {
	        	"name":"鼻音",
	            "datas":[
					{"id":"32577","en":"m","pid":3},
					{"id":"32578","en":"n","pid":3},
					{"id":"32579","en":"ŋ","pid":3}			
	            ]
	        },
	         {
	        	"name":"舌侧音",
	            "datas":[
					{"id":"32580","en":"l","pid":4}
	            ]
	        },
	         {
	        	"name":"半元音",
	            "datas":[
					{"id":"32582","en":"w","pid":5},
					{"id":"32581","en":"j","pid":5}
	            ]
	        }
	    ];
	    
	    
	    $scope.all=[];
	    $scope.all.push($scope.phonetics0);
	    $scope.all.push($scope.phonetics1);
        $scope.phonetics =  $scope.all[0];
        $scope.select = 0;
        $scope.show= function(index){
        	$scope.select = index;
        	if($scope.select==0||$scope.select==1){
        	    $scope.phonetics = $scope.all[index];
        	}else if(index==2){
        	 	$state.go("yx_main");
        	}else if(index==3){
        	 	$scope.goMy();
        	}
        }
        
    	$scope.getword = function(_index,wid, book_id) {               
            if(_index>0 && !$rootScope.userinfo.active){
            	$state.go("me_appvcode");
            }else{
            	$rootScope.LoadingShow();
				var url = $rootScope.rootUrl + "/word";
				var data = {
					"user_id": 1,
					"word_id": wid,
					"book_id": book_id
				};
				$http.post(url, data).success(function(response) {
					$rootScope.LoadingHide();
					if(response) {
						$rootScope.rootword = response;
						$state.go("word_detail")	
					} else {
						$rootScope.Alert(response.msg);
					}
				})
            }
		}
    	
    	$scope.goMy= function(){
    		$state.go("my");
    	}
        
		/**
		 * 教材激活状态
		 * @param {Object} user_id
		 * @param {Object} book_id
		 * @param {Object} code
		 */
		$scope.bookStatus = function(user_id, book_id) {
			$rootScope.LoadingShow();
			var url = $rootScope.rootUrl + "/book_status";
			var data = {
				"user_id": user_id,
				"book_id": book_id,
			};
			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();
				if(response.error) {
					//				$rootScope.Alert(response.msg);
					$rootScope.userinfo.active = false;
				} else {
					$rootScope.userinfo.active = true;
				}
//				$scope.getUnits(book_id);
			}).error(function(response, status) {
				$rootScope.LoadingHide();
				$rootScope.Alert('连接失败！[' + response + status + ']');
				return;
			});
		}


		$scope.bookStatus($rootScope.userinfo.id, 76);

	
		/**
		 * 获取app信息
		 * @param {Object} platform
		 * @param {Object} book_id
		 */
		$scope.version = function(platform, book_id) {
			$rootScope.LoadingShow();
			var url = $rootScope.xxrootUrl + "/version";
			var data = {
				"platform": platform,
				"book_id": book_id
			};
			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();
				if(response.error) {
					//$rootScope.Alert(response.msg);
				} else {
					$rootScope.app = response;
					$scope.checkUpdate();
				}
			}).error(function(response, status) {
				$rootScope.LoadingHide();
				$rootScope.Alert('连接失败！[' + response + status + ']');
				return;
			});
		}

		$scope.checkUpdate = function() {

			if(device.platform === 'Android') {
				// Android升级
				var type = $cordovaNetwork.getNetwork();
				// 1.0.0 => 10000
				//			var AppVersionCode = '10001'; // 获取的服务器版本
				//获取本地APP版本
				$cordovaAppVersion.getVersionNumber().then(function(version) {
					// 0.0.1 => 00001 => 1
					var nowVersionNum = parseInt(version.toString().replace(new RegExp(/(\.)/g), '0'));
					// 10000
					var newVersionNum = parseInt($rootScope.app.version.replace(new RegExp(/(\.)/g), '0'));

					if(newVersionNum > nowVersionNum && $rootScope.app.status === '1') {
						if(type === 'wifi') {
							$ionicPopup.confirm({
								title: '版本升级',
								template: $rootScope.app.info + "<br>大小:" + $rootScope.app.size,
								cancelText: '取消',
								okText: '升级'
							}).then(function(res) {
								if(res) {
									var success = function(message) {
										alert("success = " + message);
									};
									var fail = function(message) {
										alert("fail = " + message);
									};
									cordova.exec(success, fail, "OpenLink", "url", [$rootScope.app.url]);
								}
							});
						} else {
							$ionicPopup.confirm({
								title: '建议您在WIFI条件下进行升级，是否确认升级？',
								template: $rootScope.app.info + "<br>大小:" + $rootScope.app.size,
								cancelText: '取消',
								okText: '升级'
							}).then(function(res) {
								if(res) {
									//									$scope.UpdateForAndroid();
									var success = function(message) {
										alert("success = " + message);
									};
									var fail = function(message) {
										alert("fail = " + message);
									};
									cordova.exec(success, fail, "OpenLink", "url", [$rootScope.app.url]);
								}
							});
						}
					}
				});

				// 无网络时
				$rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
					$ionicLoading.show({
						template: '网络异常，不能连接到服务器！'
					});
					setTimeout(function() {
						$ionicLoading.hide()
					}, 2000);
				})
			} else {

			}
		}
		
	})

	.controller('LoginCtrl', function($rootScope, $scope, $state, $http, $ionicActionSheet) {

		var info = {
			"id": 1,
			"subscribe": null,
			"openid": "o_Nk11dfZ2mmDXKEyKzC9Ug6K1XQ",
			"nickname": "\u6d77\u9614\u5929\u7a7a",
			"sex": "1",
			"language": "zh_CN",
			"city": "",
			"province": "",
			"country": "",
			"headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/Q3auHgzwzM4I8ibXxonibqKs6AJmcToqka34cUoDiaClPbmN8Jh6ic3pIvt72F2oxrib0EficcT2o2VdOrS7KGYZ1F7Q\/0",
			"subscribe_time": null,
			"unionid": "oq1LE0svpo7Y7nSCsXSBNDSf1cS4",
			"remark": null,
			"groupid": null,
			"book_id": 76
		}

		$scope.iflogin = false;
		$scope.ifbook = false;
		var userinfo = info;
//	    var userinfo = getStorage("userinfo");

		$scope.getBook = function(bookId) {
			$rootScope.LoadingShow();
			//获取所有book/unit
			var url = $rootScope.rootUrl + "/books";
			var data = {
				"book_id": bookId //没有登录时没有userId的暂拿着我的id21来获取book
			};

			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();
				if(response.error) {
					$rootScope.Alert(response.msg);
				} else {
					if(response) {
						$rootScope.mybook = response;
						$scope.ifbook = true;
						$scope.showad = false;
						$rootScope.LoadingShow();
						var url = $rootScope.rootUrl + "/ads?appid="+$rootScope.wx_book_id;
						$http.get(url).success(function(response) {
							$rootScope.LoadingHide();
							if(response.error) {
								$rootScope.Alert(response2.msg);
							} else {
								if(response&&response.length>0){
									$scope.ad = response[0];
									$scope.showad = true;
								}
								setTimeout(function() {
									$state.go("home")
								}, 4000)
							}
						}).error(function(response, status) {
							setTimeout(function() {
								$state.go("home")
							}, 4000)
							$rootScope.LoadingHide();
							$rootScope.Alert('连接失败！[' + response + status + ']');
							return;
						});
						
					}
				}
			}).error(function(response, status) {
				$rootScope.LoadingHide();
				$rootScope.Alert('连接失败！[' + response + status + ']');
				return;
			});
		}

		//#region 苹果审核人员用 勿删
		if($rootScope.isIOS) {
			var url = $rootScope.xxrootUrl + "/version";
			var data = {
				"platform": "ios",
				"book_id": $rootScope.version_book_id
			};
			$http.post(url, data).success(function(response) {
				if(response.error) {} else {
					setTimeout(function() {

						if(response.status == 0 && response.version == $rootScope.currentVersion) {
							setStorage("userinfo", {
								"id": "24",
								"subscribe": null,
								"openid": "oVl0IwD3qn9_3GHx2qOGXBJlxRUc",
								"nickname": "\u9a6c\u6d2a\u6d9b",
								"sex": "1",
								"language": "zh_CN",
								"city": "Mentougou",
								"province": "Beijing",
								"country": "CN",
								"headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/XiaYa0IAAlP8OZom5WMCCVl1icLibz9F6yE85NXOpZZ1NNsJ5G65nnkzgoN8fA07WibKM0hmpI56FviaafZk6MWbbPlDFfpFjTXxN\/0",
								"subscribe_time": null,
								"unionid": "ocffVt08HworeoxlzULVlOFdkYY4",
								"remark": null,
								"groupid": null,
								"register_time": "2017-02-22 21:43:59",
								"status": "0",
								"book_id": "76"
							});
							userinfo = getStorage("userinfo");
						}

						if(userinfo && userinfo.id) {
							$rootScope.userinfo = userinfo;
							$scope.iflogin = true;
							$scope.getBook(76);
						}

					}, 1000);
				}
			}).error(function(response, status) {
				//#region 勿删 ios第一次启动需要用户同意允许联网
				$rootScope.Alert('您的设备没有联网(或者设置中没有打开允许使用数据网络)，请联网后再试，谢谢！', function() {
					location.reload();
					return;
				});
				//#endregion
				return;
			});
		} else {
			if(userinfo && userinfo.id) {
				$rootScope.userinfo = userinfo;
				$scope.iflogin = true;
				$scope.getBook(76);
			}
			//            else {
			//				$scope.register_user();
			//			}
		}


        //获取百度文字识别接口
//      $rootScope.getBdyyhcToken(); 

		
		$scope.wxLogin = function() {

			$rootScope.LoadingShow();
			//获取所有book/unit
			var url = $rootScope.rootUrl + "/books";
			var data = {
				"book_id": $rootScope.wx_book_id
			};

			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();
				if(response.error) {
					$rootScope.Alert(response.msg);
				} else {
					if(response) {
						$rootScope.app_wx = response[0];
						$rootScope.LoadingShow();
						Wechat.isInstalled(function(installed) {
							if(installed) {
								Wechat.auth("snsapi_userinfo", function(response) {
									//#region 通过code获取access_token..     
									var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + $rootScope.app_wx.wx_appid + "&secret=" + $rootScope.app_wx.wx_appsecret + "&code=" + response.code + "&grant_type=authorization_code";

									$http.get(url).success(function(response) {
										//#region 获取用户个人信息（UnionID机制）
										var url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + response.access_token + "&openid=" + response.openid;
										$http.get(url).success(function(wx_response) {
											$rootScope.LoadingHide();
											var unionid = wx_response.unionid;
											var url = $rootScope.rootUrl + "/user/";
											var data = {
												"unionid": unionid,
											};
											$.post(url, data, function(response) {
												if(response.error) {
													$rootScope.LoadingShow();
													var url = $rootScope.rootUrl + "/user_register/";
													$.post(url, wx_response, function(response) {
														$rootScope.LoadingHide();
														if(response.error) {
															$rootScope.Alert(response.msg);
														} else {
															$scope.iflogin = true;
															$rootScope.userinfo = response;
															setStorage("userinfo", $rootScope.userinfo);
															$scope.getBook(76);
														}
													}, "json")
												} else {
													$scope.iflogin = true;
													$rootScope.userinfo = response;
													setStorage("userinfo", $rootScope.userinfo);
													$scope.getBook(76);
												}
											}, "json")
										}).error(function(response, status) {
											$rootScope.LoadingHide();
											return;
										});
										//#endregion
									}).error(function(response, status) {
										$rootScope.LoadingHide();
										return;
									});
									//#endregion
								}, function(reason) {
									$rootScope.LoadingHide();
									$rootScope.Alert("Failed: " + reason);
								});

							} else {
								$rootScope.LoadingHide();
								$rootScope.Confirm("微信没有安装，请先安装微信.", "去安装微信?", "", function() {
									window.open('https://itunes.apple.com/cn/app/wechat/id414478124', '_system', 'location=yes');
								}, function() {});
							}

						}, function(reason) {
							$rootScope.Alert("Failed: " + reason);
						});
					}
				}
			}).error(function(response, status) {
				$rootScope.LoadingHide();
				$rootScope.Alert('连接失败！[' + response + status + ']');
				return;
			});

		}


        		
		$scope.openAdLink = function() {
			
			if($scope.ad.link){
				if(device.platform === 'iOS') {
				    window.open($scope.ad.link, '_blank');
				} else if(device.platform === 'Android') {
					var success = function(message) {
						alert("success = " + message);
					};
					var fail = function(message) {
						alert("fail = " + message);
					};
					cordova.exec(success, fail, "OpenLink", "url", [$scope.ad.link]);
				}
			}
		}

	})

	

	.controller('MyCtrl', function($rootScope, $scope, $state, $http) {
		$scope.point = 0;
		$scope.active_info = "";
//		if($rootScope.userinfo.active) {
//			$scope.active_info = "已激活";
//		}
		$scope.user_point = function() {
			var url = $rootScope.rootUrl + "/user_point";
			var data = {
				"user_id": $rootScope.userinfo.id,
			};
			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();

				if(response.error) {
					$rootScope.Alert(response.msg);
				} else {
					//{
					//  "task1_completed_total": "54",
					//  "task2_completed_total": "16",
					//  "task3_completed_total": "23",
					//  "game_completed_total": "23",
					//  "point": 116
					//}
					$scope.point = response.point;
				}

			}).error(function(response, status) {
				$rootScope.LoadingHide();
				$rootScope.Alert('连接失败！[' + response + status + ']');
				return;
			});
		}

//		$scope.user_point();
		
		
		$scope.openFeilong = function() {
			var url = "https://feilong.tmall.com";
			if(device.platform === 'iOS') {
				window.open(url, '_blank');
			} else if(device.platform === 'Android') {
				var success = function(message) {
					alert("success = " + message);
				};
				var fail = function(message) {
					alert("fail = " + message);
				};
				cordova.exec(success, fail, "OpenLink", "url", [url]);
			}
		}

	
        $scope.getAppTuijian=function(){
            var url = $rootScope.rootUrl + "/app";
            var data = {
                "appid": $rootScope.wx_book_id,
            };
            $http.post(url, data).success(function(response) {
                $rootScope.LoadingHide();
                $("#append_html").html(response.content);
            }).error(function(response, status) {
                $rootScope.LoadingHide();
                $rootScope.Alert('连接失败！[' + response + status + ']');
                return;
            });
        }

        $scope.getAppTuijian();
	})

	.controller('my_vcodeCtrl', function($rootScope, $ionicModal, $scope, $state, $http, $ionicActionSheet) {
		$scope.book_status = function() {
			var url = $rootScope.rootUrl + "/book_status";
			var data = {
				"user_id": $rootScope.userinfo.id,
				"book_id":$rootScope.mybook.id
			};
			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();
				if(response.error) {
					$rootScope.Alert(response.msg);
				} else {
					$scope.book = response;
				}
			}).error(function(response, status) {
				$rootScope.LoadingHide();
				$rootScope.Alert('连接失败！[' + response + status + ']');
				return;
			});
		}

		$scope.book_status();

		$scope.wechatShareCode = function(code, name) {

			Wechat.isInstalled(function(installed) {
				if(installed) {
					Wechat.share({
						text: "验证码(" + code + ")只适用于" + name + "APP     打开APP下载列表http://xx.kaouyu.com/www/#/more_apps",
						scene: Wechat.Scene.SESSION // share to Timeline
					}, function() {
						$rootScope.Alert("已分享");
					}, function(reason) {
						$rootScope.Alert("失败: " + reason);
					})
				} else {
					$rootScope.Alert("请安装微信客户端！")
				}
			}, function(reason) {
				$rootScope.Alert("Failed: " + reason);
			});
		}

	})
	.controller('my_orderCtrl', function($rootScope, $ionicModal, $scope, $state, $http, $ionicActionSheet) {
		$scope.myorder = function() {
			var url = $rootScope.rootUrl + "/myorder";
			var data = {
				"user_id": $rootScope.userinfo.id,
			};
			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();
				if(response.error) {
					$rootScope.Alert(response.msg);
				} else {
					$scope.dataList = response;
				}
			}).error(function(response, status) {
				$rootScope.LoadingHide();
				$rootScope.Alert('连接失败！[' + response + status + ']');
				return;
			});
		}
		$scope.myorder();
	})
	.controller('me_appvcodeCtrl', function($rootScope, $ionicModal, $scope, $state, $http, $ionicActionSheet) {

		var price = parseInt($rootScope.mybook.price);
		var sale_price = parseInt($rootScope.mybook.sale_price);
		$scope.change_price = price / 100;
		$scope.change_sale_price = sale_price / 100;

//		$scope.vcode = function() {
//			cordova.plugins.barcodeScanner.scan(
//				function(result) {
//					if(result.text) {
//						if(result.text.split('?code=').length == 2) {
//							$scope.bookActive($rootScope.userinfo.id, $rootScope.mybook.id,result.text.split('?code=')[1]);
//						}
//					} else {
//						$rootScope.Alert("扫描出错!");
//					}
//				},
//				function(error) {
//					$rootScope.Alert("Scanning failed: " + error);
//				}, {
//					"preferFrontCamera": false, // iOS and Android
//					"showFlipCameraButton": false, // iOS and Android
//					"showTorchButton": true, // iOS and Android
//					"prompt": "扫描烤鱿鱼单词激活二维码", // supported on Android only
//					"formats": "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
//					"orientation": "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
//				}
//			);
//		}

		$scope.vcodeByText = function() {
			if($('#vcode_text').val().length > 0) {
				$scope.bookActive($rootScope.userinfo.id, $rootScope.mybook.id, $.trim($('#vcode_text').val()));
			}
		}

		/**
		 * 激活教材使用权
		 * @param {Object} user_id
		 * @param {Object} book_id
		 * @param {Object} code
		 */
		$scope.bookActive = function(user_id, book_id, code) {
			$rootScope.LoadingShow();
			var url = $rootScope.rootUrl + "/book_active";
			var data = {
				"user_id": user_id,
				"book_id": book_id,
				"code": code
			};
			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();
				if(response.error) {
					$rootScope.Alert(response.msg);
					$rootScope.userinfo.active = false;
				} else {
					$rootScope.userinfo.active = true;
					$rootScope.Alert("已成功激活，感谢您的使用！");
					$rootScope.goBack();
				}
			}).error(function(response, status) {
				$rootScope.LoadingHide();
				$rootScope.Alert('连接失败！[' + response + status + ']');
				return;
			});
		}

		$scope.openTaobao = function(url) {

			if(device.platform === 'iOS') {
				window.open(url, '_blank');
			} else if(device.platform === 'Android') {
				var success = function(message) {
					alert("success = " + message);
				};
				var fail = function(message) {
					alert("fail = " + message);
				};
				cordova.exec(success, fail, "OpenTaobaoLink", "taobaolink", [url]);
			}
		}

		$scope.unifiedorder = function(userId, bookId) {
			$rootScope.LoadingShow();
			var url = $rootScope.rootUrl + "/unifiedorder";
			var data = {
				"user_id": userId,
				"book_id": bookId,
				"wxpay_book_id":$rootScope.wx_book_id
			};
			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();
				if(response.error) {
					$rootScope.Alert(response.msg);
				} else {

					setStorage("out_trade_no", response.out_trade_no, true);

					//{"appid":"wx83797cbb8b3ed830","partnerid":"1445757902","prepayid":"wx201703271007183fe1a941870532825354","package":"Sign=WXPay","noncestr":"7fcf20f3baee206808e7076f9df63e55","timestamp":1490580438,"sign":"10492DE2690F195B3E2588D06E11BD97","out_trade_no":"170327100718b14u1"}
					var params = {
						mch_id: response.partnerid, // merchant id
						prepay_id: response.prepayid, // prepay id returned from server
						nonce: response.noncestr, // nonce string returned from server
						timestamp: response.timestamp, // timestamp
						sign: response.sign, // signed string
					};
					Wechat.sendPaymentRequest(params, function() {

						$scope.queryorder($rootScope.userinfo.id, $rootScope.mybook.id, response.out_trade_no);
					}, function(reason) {
						$rootScope.Alert("支付失败: " + reason);
					});
				}
			}).error(function(response, status) {
				$rootScope.LoadingHide();
				$rootScope.Alert('连接失败！[' + response + status + ']');
				return;
			});
		}

		$scope.queryorder = function(userId, bookId, out_trade_no) {
			$rootScope.LoadingShow();
			var url = $rootScope.rootUrl + "/queryorder";
			var data = {
				"user_id": userId,
				"book_id": bookId,
				"out_trade_no": out_trade_no,
				"wxpay_book_id":$rootScope.wx_book_id

			};
			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();
				if(response.return_code == 'SUCCESS') {
					$rootScope.userinfo.active = true;
					$rootScope.Alert("支付成功并激活成功");
					//					setTimeout(function(){
					//			            $state.go("my_order")
					//					},2000)
				} else {
					$rootScope.Alert(response.return_msg);
				}
			}).error(function(response, status) {
				$rootScope.LoadingHide();
				$rootScope.Alert('连接失败！[' + response + status + ']');
				return;
			});
		}

		$scope.orderPayedValidate = function() {
			$rootScope.LoadingShow();
			var url = $rootScope.rootUrl + "/queryorder";
			var data = {
				"user_id": $rootScope.userinfo.id,
				"book_id": $rootScope.mybook.id,
				"out_trade_no": getStorage("out_trade_no", true),
				"wxpay_book_id":$rootScope.wx_book_id
			};
			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();
				if(response.return_code == 'SUCCESS') {
					$rootScope.userinfo.active = true;
					$rootScope.Alert("支付成功并激活成功");
					//					setTimeout(function(){
					//			            $state.go("my_order")
					//					},2000)
				} else {
					$rootScope.Alert(response.msg);
				}
			}).error(function(response, status) {
				$rootScope.LoadingHide();
				$rootScope.Alert('连接失败！[' + response + status + ']');
				return;
			});
		}

		if(!$rootScope.userinfo.active) {
			if(getStorage("out_trade_no", true).length > 0) {
				$scope.orderPayedValidate();
			}
		}

		$scope.showLeft = true;
		$scope.showRight = false;
		$scope.show1 = function() {
			$scope.showLeft = true;
			$scope.showRight = false;
			setTimeout(function() {
				$('#appvcode_detail').html($rootScope.mybook.detail);
			}, 1500);
		}
		$scope.show2 = function() {
			$scope.showLeft = false;
			$scope.showRight = true;

		}
		setTimeout(function() {
			$('#appvcode_detail').html($rootScope.mybook.detail);
		}, 1500);
	})

	
	.controller('WordDetailCtrl', function($rootScope, $scope, $state, $http, $stateParams, $ionicModal) {
		
		setTimeout(function(){
			$("#s1_"+$rootScope.rootword.word_id).html($rootScope.rootword.phonetic.split("#")[0].replace("@","<span style='color:#ff7800'>").replace("$","</span>").replace("@","<span style='color:#ff7800'>").replace("$","</span>"));
			$("#s2_"+$rootScope.rootword.word_id).html("<span style='color:#80808099'>[</span>"+$rootScope.rootword.phonetic.split("#")[1].replaceAll("/","").replace("@","<span style='color:#ff7800'>").replace("$","</span>").replace("@","<span style='color:#ff7800'>").replace("$","</span>")+"<span style='color:#80808099'>]</span>");
		    $("#qiao_men_"+$rootScope.rootword.word_id).append("● "+$rootScope.rootword.zh.replaceAll("#","<br/>● "));
		    $scope.showVideo();
		    $scope.playPhonetic();
		    
		},500);
		
		$scope.showVideo = function(index){
			$(".video-box video").attr("src", "http://xx.kaouyu.com/upload/word/mp4/" + $rootScope.rootword.video);
		}

		$scope.playPhonetic = function(){
			$rootScope.playUrlAudio2($rootScope.siteUrl+"/upload/word/mp3/"+$rootScope.rootword.audio_0);
		}
		
		$scope.playDemoWord = function(){
			$rootScope.playUrlAudio($("#phoneticdemo"),$rootScope.siteUrl+"/upload/word/google/"+$rootScope.rootword.audio_2);
		}
		
		$scope.goNext = function(){
			$state.go("phonetic_words");
		}
		
	})


	.controller('phonetic_wordsCtrl', function($rootScope, $scope, $state, $http, $stateParams, $ionicModal) {
				
		if($rootScope.rootword.examples){
			var examples = $rootScope.rootword.examples;
			for(var i=0;i<examples.length;i++){
				var content1 = examples[i].en.replace("@","<span style='color:#ff7800'>").replace("$","</span>").replace("@","<span style='color:#ff7800'>").replace("$","</span>");
				
				var content2="" ;
				if(examples[i].zh){
					var zhs = examples[i].zh.split("^");
			        for(var j=0;j<zhs.length;j++){
			        	content2 = content2+zhs[j].replace("/","[").replace("/","]").replace("@","<span style='color:rgb(255,121,2)'>").replace("$","</span>").replace("@","<span style='color:rgb(255,121,2)'>").replace("$","</span>").replaceAll("#","&nbsp;")+"<br>";
			        }
				}
				$("#phonetic_words_div").append("<div class='row' style='background-color:white;padding:0px;margin-top:5px' id='phoneticwordsdemo"+i+"'><div class='col col-20 col-center text-center'  style='font-size:20px' >"+content1+"</div><div class='col col-70 col-center'>"+content2+"</div><div class='col col-10 col-center text-center'><img style='width:20px;hight:20px;margin-top:8px' id='phoneticwordsimg"+i+"' src='img/play.png'></div></div>" );
//			    $("#phonetic_words_div").append("<hr style='height:1px;border:none;border-top:1px dotted lightgrey;'/>");
				$('#phoneticwordsdemo'+i).click(function() {
			    	var _index = this.id.toString().substring(this.id.toString().length - 1, this.id.toString().length);
			    	$rootScope.playUrlAudio($('#phoneticwordsimg'+_index),$rootScope.siteUrl+"/upload/word/example/"+examples[_index].audio);
				});
			}
		}
			
		$(".video-box video").attr("src","http://xx.kaouyu.com/upload/word/mp4/"+$rootScope.rootword.video_brush);
		
		
		$scope.goNext = function(){
		
			$state.go("phonetic_read");
		}
		
		
	})

	.controller('phonetic_readCtrl', function($rootScope, $scope, $state, $http, $stateParams, $ionicModal, $interval) {
					// Record audio
					
		$scope.recorded = false;
		$scope.playing = false;
		$scope.score = 0;
		$scope.seconds = 0;
		$scope.time_long = 5;
		$scope.nowindex =-1;
		
		//mp3不支持
		var mediaRec;
		var src = "audio.amr";
		$rootScope.rootwordsexercise = [];
		
	    $scope.readlists = []; 
		if($rootScope.rootword.exercises){
			var exercises = $rootScope.rootword.exercises;
			for(var i=0;i<exercises.length;i++){
				if(exercises[i]&&exercises[i].items.length<1){
					 exercises[i].score=0;
				     $scope.readlists.push(exercises[i]);
				}else{
				     $rootScope.rootwordsexercise.push(exercises[i]);
				}
			}
		}
		
        $scope.phoneticreadsdemoClick=function(_index){
        	$rootScope.playUrlAudio($('#phoneticreadsimg'+_index),$rootScope.siteUrl+"/upload/exercise/mp3/"+$scope.readlists[_index].media);
        }

        $scope.phoneticreadrecordClick=function(_index){
            $scope.recordAudio(_index,$('#phoneticreadreadimg'+_index),$scope.readlists[_index].question);
        }

        $scope.phoneticreadplayClick=function(_index){
            $scope.playRecordAudio();
        }


		$scope.clicked = false;

		$scope.recordAudio = function(index,obj,record_text) {

            $scope.nowindex = index;
			if(!$scope.clicked) {
				$scope.recorded = false;
				$scope.clicked = true;
				$scope.seconds = 0;
				$scope.count = 0;
				mediaRec = new Media(src,
					// success callback
					function() {},
					// error callback
					function(err) {
						$scope.clicked = false;
					}
				);
				// Record audio
				mediaRec.startRecord();				
				$rootScope.Confirm("请大声发音，录音中....",
				"停止", 
				"",
				function() {
					mediaRec.stopRecord();
				    $scope.recorded = true;
				    $scope.clicked = false;
					$scope.uploadAudio(index,record_text);
				},
				function() {
					mediaRec.stopRecord();
				    $scope.recorded = true;
				    $scope.clicked = false;
				});

			}
		}
		// Play audio
		//

		$scope.playRecordAudio = function() {
			if(!$scope.playing) {
				$scope.seconds = 0;
				$scope.count = 0;
				$scope.playing = true;
				mediaRec.play();
				var timer2 = $interval(function() {
					$scope.count++;
					if($scope.count == 1) {} else if($scope.count > $scope.time_long) {
						$scope.seconds = $scope.time_long;
					} else {
						$scope.seconds = $scope.count - 1;
					}
//					$('.progress_bar').width(($scope.per_progress * $scope.seconds) + '%').css("backgroundColor", "#0c7cd6");
					if($scope.seconds == $scope.time_long) {
						$scope.playing = false;
						mediaRec.stop();
					}
					if($scope.count > $scope.time_long) {
						$interval.cancel(timer2); //停止并清除
					}
				}, 1000, 10);
			}
		}


		$scope.uploadAudio = function(index,word) {
			$rootScope.LoadingShow();
			var fileURL = cordova.file.externalRootDirectory + "audio.amr";   
			var options = new FileUploadOptions();  
			options.fileKey = "audio";  
			options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);  
			options.mimeType = "audio/x-amr";    //上传参数
			var params = {};
			params.text = word;
			options.params = params;   
			var ft = new FileTransfer();   //上传地址	
			var SERVER = $rootScope.rootUrl + "/stt";  
			ft.upload(fileURL, encodeURI(SERVER), function(r) {     
				$rootScope.LoadingHide();
				var response = JSON.parse(r.response)
				if(response.rate) {
					$scope.score = parseInt(response.rate);
				} else {
					$scope.score = 0;
				}
				$scope.readlists[index].score = $scope.score;
                $scope.playRecordAudio();
			}, function(error) {     
				$rootScope.LoadingHide();
				alert("上传失败! Code = " + error.code);  
			}, options);   
		}
	
        $scope.goNext = function(){
        	if($rootScope.rootwordsexercise.length>0){
				$state.go("word_test",{"index":0})
			}else{
				$state.go("home");
			}
        }

	})

	.controller('WordTestCtrl', function($rootScope, $scope, $state, $http, $stateParams, $ionicModal) {
	
		$scope.index = parseInt($stateParams.index);
	
		var has_submited = 0;
		//		$scope.wrong_times = 0;

		if($scope.index < $rootScope.rootwordsexercise.length - 1) {
			$scope.button_name = "继续";
		} else {
			$scope.button_name = "音标列表";
		}

		$scope.playTestExercise = function(audio) {
			$rootScope.playExercise(audio, $("#exercise_play"));
		}
        $scope.playTestExercise4 = function(audio) {
			$rootScope.playExercise(audio, $("#exercise_play_4"));
		}

		$scope.exercise = $rootScope.rootwordsexercise[$scope.index];

		$scope.exercise.myanswer = -1;
		//#region 习题处理

		//#region 1. 看图选择题 听力选择
		if($scope.exercise.type == 1||$scope.exercise.type==4) {
			var s = $scope.exercise.question.split('^');
			$scope.exercise.question_en = s[0];
			$scope.exercise.question_en = $scope.exercise.question_en.replace('___', '______')
			if(s.length >= 2)
				$scope.exercise.question_zh = s[1];
		} else if($scope.exercise.type == 2) {
			//#region 2. 选图填空
			var s = $scope.exercise.question.split('^');
			$scope.exercise.question_en = s[0];
			$scope.exercise.question_en = $scope.exercise.question_en.replace('___', '______')
			if(s.length >= 2)
				$scope.exercise.question_zh = s[1];

			s = $scope.exercise.answer.split('^');
			$scope.exercise.answer_index = s[0];
			if(s.length >= 2)
				$scope.exercise.answer_word = s[1];
		} else if($scope.exercise.type == 3) {
			//#region 3 句子排序
			$scope.exercise.keys = $scope.exercise.answer.split('^');
			$scope.exercise.options = $scope.exercise.answer.split('^');

			function sortNumber(a, b) {
				return a < b
			}
			$scope.exercise.options.sort(sortNumber);

		} else if($scope.exercise.type == 5) {
			$scope.exercise.question = $scope.exercise.answer.split("^").sort(function() {
				return Math.random() - 0.5
			});
			var items_formats = [];
			angular.forEach($scope.exercise.items.split('\n'), function(data, index) {
				var s = data.split('^');
				var zh = [];
				var zh0 = '';
				var zh1 = '';
				var en = '';

				zh = s[0].split('____');
				if(s.length >= 2) {
					en = s[1];
				}

				zh0 = zh[0];
				if(zh.length >= 2) {
					zh1 = zh[1];
				}

				items_formats.push({
					zh0: zh0,
					zh1: zh1,
					en: en
				});
			});
			$scope.exercise.items_formats = items_formats;
		} else if($scope.exercise.type == 6) {
			$scope.exercise.question = $scope.exercise.answer.split("^").sort(function() {
				return Math.random() - 0.5
			});
		}

	
		$scope.init = function() {
			if($scope.exercise.type == 2) {
				setTimeout(function() {
					$scope.playTestExercise($scope.exercise.media);
				}, 800)
			}else 
			//#听力选择
	        if($scope.exercise.type == 4) {
				setTimeout(function() {
					$scope.playTestExercise4($scope.exercise.media);
					var answers = $scope.exercise.items.split('\n');
					for(var i=0;i<answers.length;i++){
						$("#type4_answer_item_"+$scope.exercise.id+i).html(answers[i].replace("@","<span style='color:rgb(255,121,2)'>").replace("$","</span>"));
					}
				}, 300)
			}else 

			if($scope.exercise.type == 5) {
				
				setTimeout(function() {
					$(".question_type_" + $scope.exercise.id + " .draggable label").draggable({
						revert: true,
						scroll: false,
						drag: function(event, ui) {
							//                                  $ionicSlideBoxDelegate.$getByHandle('slide_exercise').enableSlide(false);
						}
					});
					$(".question_type_" + $scope.exercise.id + " .droppable .item").droppable({
						hoverClass: "hover",
						accept: ".draggable label",
						drop: function(event, ui) {
							//                                  $ionicSlideBoxDelegate.$getByHandle('slide_exercise').enableSlide(true);

							if($(this).find(".answer_box").text() != "") {
								return;
							}

							$(this).find(".answer_box").text(ui.draggable.text()).parent().one("click", function() {
								if($scope.exercise.myanswer == -1) {
									var txt = $(this).find(".answer_box").text()

									$(".question_type_" + $scope.exercise.id + " .draggable label").each(function() {
										if($(this).text() == txt) {
											$(this).css("visibility", "visible");
											return false;
										}
									});

									$(this).find(".answer_box").text("");
								}

							});

							ui.draggable.css("visibility", "hidden");
						}
					});
				}, 666);

			}else 
			//#region 6. 图片匹配
			if($scope.exercise.type == 6) {
				setTimeout(function() {
					$(".question_type_" + $scope.exercise.id + " .draggable label").draggable({
						revert: true,
						scroll: false,
						drag: function(event, ui) {
							//						$ionicSlideBoxDelegate.$getByHandle('slide_exercise').enableSlide(false);
						}
					});
					$(".question_type_" + $scope.exercise.id + " .droppable .col").droppable({
						hoverClass: "hover",
						accept: ".draggable label",
						drop: function(event, ui) {
							//						$ionicSlideBoxDelegate.$getByHandle('slide_exercise').enableSlide(true);
							if($(this).find(".answer_box").text() != "") {
								return;
							}
							$(this).find(".answer_box").text(ui.draggable.text()).parent().one("click", function() {
								if($scope.exercise.myanswer == -1) {
									var txt = $(this).find(".answer_box").text()
									$(".question_type_" + $scope.exercise.id + " .draggable label").each(function() {
										if($(this).text() == txt) {
											$(this).css("visibility", "visible");
											return false;
										}
									});
									$(this).find(".answer_box").text("");
								}
							});
							ui.draggable.css("visibility", "hidden");
						}
					});
				}, 666);

				//			$scope.tip();
			}
			//#endregion

		}
		$scope.init();

		
		//#region 看图选择
		$scope.choose_1 = function(i, exerciseIndex, item) {

			$(".type_1_html").html(item.question_en.replace('______', '<span class="green">' + item.items.split('\n')[i] + '</span>').replace(/[\r\n]/g, ""));

			item.myanswer = i;
			item.answered = true;
			if(item.myanswer == item.answer) {
				//正确
				playAudio(true);

				//				if(exerciseIndex < $scope.word.exercises.length - 1) {
				//					setTimeout(function() {
				//
				//					}, 1000);
				//				}
				//				$scope.complateGrade();

			} else {
				//错误
				$scope.wrong_times = $scope.wrong_times + 1;
				playAudio(false);
			}

		}

		//听录音选图片
		$scope.choose_2 = function(i, exerciseIndex, item) {

			$(".type_2_html").html(item.question_en.replace('______', '<span class="green">' + item.answer_word + '</span>').replace(/[\r\n]/g, ""));
			item.myanswer = i;
			item.answered = true;
			if(item.myanswer == item.answer_index) {
				//正确
				playAudio(true);
				//				if(exerciseIndex < $scope.word.exercises.length - 1) {
				//					setTimeout(function() {}, 1000);
				//				}
				//				$scope.complateGrade();

			} else {
				//错误
				playAudio(false);
				$scope.wrong_times = $scope.wrong_times + 1;

			}
		}

		//句子排序
		$scope.choose_3 = function(index) {

			if(has_submited < $scope.exercise.keys.length) {
				if($scope.exercise.options[index] == $scope.exercise.keys[has_submited]) {
					$('#key_' + has_submited).html($scope.exercise.keys[has_submited]);
					has_submited = has_submited + 1;
					playAudio(true);
					if(has_submited == $scope.exercise.keys.length) {
						//						$scope.complateGrade();
					}
				} else {
					playAudio(false);
					$scope.wrong_times = $scope.wrong_times + 1;
				}
			}
		}


	   //#region 听力选择
		$scope.choose_4 = function(i, exerciseIndex, item) {
			item.myanswer = i;
			item.answered = true;
			if(item.myanswer == item.answer) {
				//正确
				playAudio(true);
				if($scope.exercise.question_zh && !$scope.exercise.show_answer){
					var qestion_zh_zrr = $scope.exercise.question_zh.split("#");
					for(var i=0;i<qestion_zh_zrr.length;i++){
			    	    $("#type4_answer_item_"+$scope.exercise.id+i).append("<br>");
			    	    $("#type4_answer_item_"+$scope.exercise.id+i).append("<span style='font-size:14px'>"+  qestion_zh_zrr[i].replace("@","<span style='color:rgb(255,121,2)'>").replace("$","</span>")+"</span>"); 
			        }
					$scope.exercise.show_answer =true;
				}
			} else {
				//错误
				$scope.wrong_times = $scope.wrong_times + 1;
				playAudio(false);
				
			}
		}


		//拖拽单词
		$scope.choose_5 = function(exerciseIndex, item) {
			item.myanswer = $(".question_type_" + item.id + " .answer_box").map(function() {
				return $(this).text()
			}).get().join("^");

			if(item.myanswer.length != item.answer.length) {
				$rootScope.Alert("请完成所有单词和选项的匹配。");
				item.myanswer = -1;
			} else {
				var myanswers = item.myanswer.split('^');
				var answers = item.answer.split('^');

				item.result = [];

				for(i = 0; i < myanswers.length; i++) {
					if(myanswers[i] != answers[i]) {
						$scope.wrong_times = $scope.wrong_times + 1;
					}
					item.result[i] = (myanswers[i] == answers[i]);
				}

				$scope.answered++;

				$(".draggable").hide();
				if($scope.wrong_times > 0) {
					playAudio(false);
				} else {
					playAudio(true);
				}
				//				$scope.complateGrade();
			}
		}

		//拖拽单词到图
		$scope.choose_6 = function(exerciseIndex, item) {
			item.myanswer = $(".question_type_" + item.id + " .answer_box").map(function() {
				return $(this).text()
			}).get().join("^");

			if(item.myanswer.length != item.answer.length) {
				$rootScope.Alert("请匹配完所有的单词和图片。");
				item.myanswer = -1;
			} else {
				var myanswers = item.myanswer.split('^');
				var answers = item.answer.split('^');
				item.result = [];
				for(i = 0; i < myanswers.length; i++) {
					if(myanswers[i] != answers[i]) {
						$scope.wrong_times = $scope.wrong_times + 1;
					}
					item.result[i] = (myanswers[i] == answers[i]);
					$(".question_type_" + item.id + " .droppable .col").eq(i).addClass((myanswers[i] == answers[i] ? 'correct' : 'error'));
				}
				$scope.answered++;
				if($scope.wrong_times > 0) {
					playAudio(false);
				} else {
					playAudio(true);
				}
				//				$scope.complateGrade();
			}
		}

		$scope.goUnit = function() {
			$state.go("word_list", {
				"unit_id": $stateParams.unit_id
			});
		}

		$scope.nextTest = function() {
			
			if($scope.index < $rootScope.rootwordsexercise.length - 1) {
				$state.go("word_test", {
					"index": $scope.index + 1,
					"unit_id": $stateParams.unit_id
				});
			} else {
				$state.go("home");
			}	
		
		}

		$scope.clear = function() {
			sketcher.clear();
		}

	})

	
	.controller('word_readCtrl', function($rootScope, $scope, $state, $stateParams, $http, $ionicActionSheet, $interval) {

		$scope.recorded = false;
		$scope.playing = false;
		$scope.score = 0;
		$scope.seconds = 0;
		$('#progress_bar').css("backgroundColor", "#ffffff")
		$scope.index = parseInt($stateParams._index);
		$scope.word = $rootScope.words[$scope.index];
		$scope.time_long = 3;
		$scope.per_progress = 23;

		if($scope.word.en.length > 8) {
			$scope.time_long = 5;
			$scope.per_progress = 14;
		}

		$scope.isFinished = false;
		//	if($rootScope.words[$scope.index].task2 == "1") {
		//		$scope.isFinished = true;
		//	}

		$scope.initGrade = function() {
			if($scope.word.task2 != null && $scope.word.task2 != undefined) {
				$scope.word.task2 = parseInt($scope.word.task2);
			} else {
				$scope.word.task2 = 0;
			}

			$scope.scoreObjArr = [];
			for(var j = 0; j < 3; j++) {
				if(j < $scope.word.task2) {
					$scope.scoreObjArr.push({
						"ifget": true
					})
				} else {
					$scope.scoreObjArr.push({
						"ifget": false
					})
				}
			}
		}

		$scope.initGrade();

		$scope.goNext = function(str) {
			$state.go("word_spell", {
				'_index': $scope.index
			})
		}
		// Record audio
		//mp3不支持
		var mediaRec;
		var src = "audio.amr";
		$scope.clicked = false;
		$scope.recordAudio = function() {

			if(!$scope.clicked) {
				$scope.recorded = false;
				$scope.clicked = true;
				$scope.seconds = 0;
				$scope.count = 0;
				mediaRec = new Media(src,
					// success callback
					function() {},
					// error callback
					function(err) {
						$scope.clicked = false;
					}
				);
				// Record audio
				mediaRec.startRecord();
				$("#read_record").attr("src", "img/record_gif.gif")
				var timer = $interval(function() {
					$scope.count++;
					if($scope.count == 1) {} else if($scope.count > $scope.time_long) {
						$scope.seconds = $scope.time_long;
					} else {
						$scope.seconds = $scope.count - 1;
					}

					$('.progress_bar').width(($scope.per_progress * $scope.seconds) + '%').css("backgroundColor", "#0c7cd6");
					if($scope.count == $scope.time_long + 1) {
						mediaRec.stopRecord();
						$("#read_record").attr("src", "img/xiaoxue_cut_09.png")
						$scope.recorded = true;
						$scope.clicked = false;

						$scope.uploadAudio($scope.word.en);
					}

					if($scope.count > $scope.time_long) {
						$interval.cancel(timer); //停止并清除
					}

				}, 1000, 10);

			}
		}
		// Play audio
		//

		$scope.playRecordAudio = function() {

			if(!$scope.playing) {
				$scope.seconds = 0;
				$scope.count = 0;
				$scope.playing = true;
				mediaRec.play();
				$("#read_play").attr("src", "img/play_gif.gif")
				var timer2 = $interval(function() {
					$scope.count++;
					if($scope.count == 1) {} else if($scope.count > $scope.time_long) {
						$scope.seconds = $scope.time_long;
					} else {
						$scope.seconds = $scope.count - 1;
					}
					$('.progress_bar').width(($scope.per_progress * $scope.seconds) + '%').css("backgroundColor", "#0c7cd6");
					if($scope.seconds == $scope.time_long) {
						$scope.playing = false;
						mediaRec.stop();
						$("#read_play").attr("src", "img/xiaoxue_cut_07.png")
					}
					if($scope.count > $scope.time_long) {
						$interval.cancel(timer2); //停止并清除
					}
				}, 1000, 10);
			}
		}



		$scope.uploadAudio = function(word) {
			$rootScope.LoadingShow();
			var fileURL = cordova.file.externalRootDirectory + "audio.amr";   
			var options = new FileUploadOptions();  
			options.fileKey = "audio";  
			options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);  
			options.mimeType = "audio/x-amr";    //上传参数
			var params = {};
			params.text = word;
			options.params = params;   
			var ft = new FileTransfer();   //上传地址	
			var SERVER = $rootScope.xxrootUrl + "/stt";  
			ft.upload(fileURL, encodeURI(SERVER), function(r) {     
				$rootScope.LoadingHide();
				var response = JSON.parse(r.response)
				if(response.rate) {
					$scope.score = parseInt(response.rate);
				} else {
					$scope.score = 0;
				}
              
                $scope.playRecordAudio();

			}, function(error) {     
				$rootScope.LoadingHide();
				alert("上传失败! Code = " + error.code);  
			}, options);   

		}


		$scope.playDetailWord0 = function(audio) {
			$rootScope.playWord0(audio, $("#detail_paly_0"));
		}
		$scope.playDetailWord1 = function(audio) {
			$rootScope.playWord1(audio, $("#detail_paly_1"));
		}
		$scope.goUnit = function() {
			$state.go("word_list", {
				"unit_id": $scope.word.unit_id
			});
		}

		//#region收藏/取消收藏
		$scope.fav = function() {
			if($scope.word.is_favorite == "0") {
				$rootScope.favorite($scope.word.word_id, $scope.word.book_id, function(response) {
					if(response.error == 0) {
						$scope.word.is_favorite = "1";
					}
				})
			} else if($scope.word.is_favorite == "1") {
				$rootScope.remove_favorite($scope.word.word_id, $scope.word.book_id, function(response) {
					if(response.error == 0) {
						$scope.word.is_favorite = "0";
					}
				})
			}
		}
		//#endregion

	})

	.controller('me_aboutusCtrl', function($rootScope, $ionicModal, $scope, $state, $http, $ionicActionSheet) {
		var now = new Date();
		$scope.year = now.getFullYear(); //年  

		$scope.wechatShare = function() {

			Wechat.isInstalled(function(installed) {
				if(installed) {
					Wechat.share({
						message: {
							title: "新课标同步背单词",
							description: "新课标同步背单词",
							mediaTagName: "新课标同步背单词",
							messageExt: "新课标同步背单词",
							messageAction: "<action>dotalist</action>",
							media: {
								type: Wechat.Type.IMAGE,
								image: "www/img/gongzhonghao.jpg"
							}
						},
						scene: Wechat.Scene.SESSION // share to Timeline
					}, function() {
						$rootScope.Alert("已分享");
					}, function(reason) {
						$rootScope.Alert("失败: " + reason);
					})
				} else {
					$rootScope.Alert("请安装微信客户端！")
				}
			}, function(reason) {
				$rootScope.Alert("Failed: " + reason);
			});
		}

		//下载图片
		$scope.saveVcode = function() {

			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
				var url = "file:///android_asset/www/img/gongzhonghao.jpg";
				fs.root.getFile('xkbtbbdc.jpg', {
						create: true,
						exclusive: false
					},
					function(fileEntry) {
						download(fileEntry, url);
					}, onErrorCreateFile);

			}, onErrorLoadFs);
		}

		//下载文件
		function download(fileEntry, uri) {
			var fileTransfer = new FileTransfer();
			var fileURL = fileEntry.toURL();
			fileTransfer.download(
				uri,
				fileURL,
				function(entry) {
					$rootScope.Alert("已保存到sd卡根目录xkbtbbdc.jpg");
					console.log("下载成功！");
					console.log("文件保存位置: " + entry.toURL());
				},
				function(error) {
					console.log("下载失败！");
					console.log("error source " + error.source);
					console.log("error target " + error.target);
					console.log("error code" + error.code);
				},
				true, {
					//				headers: {
					//				    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
					//				}
				}
			);
		}

		//文件创建失败回调
		function onErrorCreateFile(error) {
			console.log("文件创建失败！")
		}
		//FileSystem加载失败回调
		function onErrorLoadFs(error) {
			console.log("文件系统加载失败！")
		}
	})

	.controller('yx_mainCtrl', function($rootScope, $scope, $state, $stateParams, $http, $ionicActionSheet, $ionicPopup, $ionicPopover) {

	
//		//  alert（警告） 对话框
//		$scope.showAlert = function() {
//			var alertPopup = $ionicPopup.alert({
//				title: '恭喜您完成了本单元的游戏',
//				template: '<img src="img.">'
//			});
//			alertPopup.then(function(res) {
//				history.go(-1);
//			});
//		};
//		
		
		$scope.showAlert = function() {
		
	        $rootScope.Confirm("恭喜您完成了本组音标的学习",
				"返回", 
				"学习下一组",
				function() {
				    history.go(-1);
				},
				function() {
					$scope.goRandWords();
			    }
			);

        }

		var unit_id = $stateParams.unit_id;
		var _index = parseInt($stateParams.index);
		
		
		$scope.game = function(){
		
		    $rootScope.LoadingShow();
			var url = $rootScope.rootUrl + "/words_random";
			var data = {
				"user_id": $rootScope.userinfo.id,
				"book_id": 76,
				"total": 8
			};
			$http.post(url, data).success(function(response) {
				$rootScope.LoadingHide();
				if(response.error) {
					$rootScope.Alert(response.msg);
				} else {
					$scope.words = response;
	//				if($rootScope.times >= 0) {
	//					$rootScope.times = $rootScope.times + 1;
	//				} else {
	//					$rootScope.times = 0;
	//				}
					
					bdc.startgame($scope.words, $scope, 6);
				}
	
			}).error(function(response, status) {
				$rootScope.LoadingHide();
				$rootScope.Alert('连接失败！[' + response + status + ']');
				return;
			});
			
		}	
		
		$scope.goRandWords = function(){
		  
		   if($rootScope.userinfo.active){
           		 $scope.game();
           }else{
			   	 if(getStorage("yxclicktime",false)>=0 && getStorage("yxclicktime",false)<4){
		    	    setStorage("yxclicktime",getStorage("yxclicktime",false)+1,false);
					$scope.game();
				}else if(getStorage("yxclicktime",false)==4){
					
					$rootScope.Confirm("抱歉试用结束请购买验证码",
						"返回", 
						"购买验证码",
						function() {
						    $state.go("home");
						},
						function() {
							$state.go("me_appvcode");
					    }
					);
			
				}else{
					setStorage("yxclicktime",0,false);
				    $scope.game();
				}
		   }
		  
		}
		

		$scope.goRandWords();

	})
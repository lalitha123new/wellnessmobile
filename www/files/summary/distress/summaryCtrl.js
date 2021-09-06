angular.module('wellness',['ngCookies'])

.controller("summaryController", function($scope,$http,globalServerName,$cookies,$filter){

$scope.distress = "";
$scope.age = "";
$scope.token = localStorage.getItem("token");


$scope.user_id = localStorage.getItem("userid");
console.log($scope.user_id);

if($scope.user_id == null){
	alert("Please login");
	window.location.href="../../../index.html";
}

$scope.homeclick = function(){
	
	window.location.href="../../../index.html";
}
 
$scope.logout = function() {
	
	 $scope.startdate = window.localStorage.getItem("date");
		$scope.enddate = $filter('date')(new Date(),"dd-MM-yyyy hh:mm:ss");
		
		$scope.dates = {
				
				"start": $scope.startdate,
				"end" :  $scope.enddate
		}
		$http({
			
			url : globalServerName.getUrlName() + "user/logout/"+$scope.user_id,
			method : "POST",
			data: $scope.dates,
			headers : {
				'Content-Type' : 'application/json',
				'Authorization' : $scope.token
			}
		})
		.success(function(res){
			
			localStorage.removeItem("userid");
			window.location.href="../../../index.html";
			
		})
		.error(function(res){
			
		})

	
}
 $scope.mypage = function(){
		
		window.location.href="../../../files/sections/sections.html";
	}
$scope.nextbutton = function(){
		
		window.location.href="../activity/summary.html";
	}
	
$scope.backbutton = function(){
		
		window.location.href="../social/summary.html";
	}


$http({
	
	url : globalServerName.getUrlName() + "Section/sectionresponce/S4/"+$scope.user_id,
	method : "GET",
	headers : {
		'Content-Type' : 'application/json',
		'Authorization' : $scope.token
	}
	
})
.success(function(res){
	
	console.log(res);
	
	if(res.length == 1){
		
		
		$scope.overallsum = JSON.parse("[" + res[0].totalsum + "]");
	    $scope.timedate1 =  res[0].time;
	    $scope.date1 = $filter('date')(new Date($scope.timedate1),"dd-MM-yyyy");			 
		$scope.distressscore1 = $scope.overallsum[0][0];
		
		$scope.distressbar = [{
            name: 'Possible Range',
            color: 'rgb(43, 144, 143)',
            y: 50,
            drilldown: 'Possible Range'
        }, {
            name: 'Average',
            color:'rgb(247, 163, 92)',
            y: 21.86,
            drilldown: 'Average'
        },  
          {
          	name: 'My score\n('+$scope.date1+')',
          	color:'rgb(144, 237, 125)',
              y: $scope.distressscore1,
              drilldown: 'Myscore'
          }];
		
	}
	else{
		
		$scope.overallsum1 = JSON.parse("[" + res[0].totalsum + "]");
	    $scope.overallsum2 = JSON.parse("[" + res[1].totalsum + "]");
		$scope.timedate1 =  res[0].time;
		$scope.timedate2 =  res[1].time;
		$scope.date1 = $filter('date')(new Date($scope.timedate1),"dd-MM-yyyy");
		$scope.date2 = $filter('date')(new Date($scope.timedate2),"dd-MM-yyyy");		 
		$scope.distressscore1 = $scope.overallsum1[0][0];
		$scope.distressscore2 = $scope.overallsum2[0][0];
		
		$scope.distressbar = [{
            name: 'Possible Range',
            color: 'rgb(43, 144, 143)',
            y: 50,
            drilldown: 'Possible Range'
        }, {
            name: 'Average',
            color:'rgb(247, 163, 92)',
            y: 21.86,
            drilldown: 'Average'
        },  {
			color:'rgb(144, 237, 125)',
			name: 'My score ('+$scope.date2+')',
            y: $scope.distressscore2,
            drilldown: 'My score'
        }, 
          {
          	name: 'My score\n('+$scope.date1+')',
          	color:'rgb(144, 237, 125)',
              y: $scope.distressscore1,
              drilldown: 'Myscore'
          }];
	}
})
.error(function(res){
	
})

$http({

	url : globalServerName.getUrlName() + "Section/sectionScore/"+$scope.user_id+"/S4",
	method : "GET",
	headers : {
		'Content-Type' : 'application/json',
		'Authorization' : $scope.token
	}

}).success(function(res) {

	console.log(res);
	$scope.distress = parseInt(res[0][0]);
	$scope.percentile = res[2][0];
	$scope.percentilevalue = parseInt(res[3][0]);
	
	   if(res[1][0].trim() == "High"){
			
			$scope.dhigh = true;
			
		}else if(res[1][0].trim() == "Average"){
			
			$scope.daverage = true;
			
		}else if(res[1][0].trim() == "Low"){
			
			$scope.dlow = true;
		}
	
	console.log($scope.age);
	
	$http({
		
		url : globalServerName.getUrlName() + "user/getAge/" + $scope.user_id,
		method : "GET",
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : $scope.token
		}
	}).success(function(res){
		
		console.log(res);
		$scope.age = res;
		
		if($scope.age <= 35){
			
			angular.element(document).ready(function (event) {

		 

		        var anchorGradient = {
		            type: 'radialGradient',
		            x0: 0.35,
		            y0: 0.35,
		            r0: 0.0,
		            x1: 0.35,
		            y1: 0.35,
		            r1: 1,
		            colorStops: [{ offset: 0, color: 'blue' },
		            { offset: 1, color: '#252E32'}]
		        };

		        $('#distress').jqRadialGauge({
		            background: '#F7F7F7',
		            border: {
		                lineWidth: 10,
		                strokeStyle: 'green',
		                padding: 16
		            },
		            shadows: {
		                enabled: true
		            },
		            anchor: {
		                visible: true,
		                fillStyle: anchorGradient,
		                radius: 0.10
		            },
		            tooltips: {
		                disabled: false,
		                highlighting: true
		            },
		            animation: {
		                duration: 1
		            },
		            scales: [
		            {
		               minimum: 0,
		               maximum: 100,
		               startAngle: 180,
		               endAngle: 360,
		               majorTickMarks: {
		                   length: 12,
		                   lineWidth: 2,
		                   interval: 10,
		                   offset: 0.84
		               },
		               minorTickMarks: {
		                   visible: true,
		                   length: 8,
		                   lineWidth: 2,
		                   interval: 2,
		                   offset: 0.84
		               },
		               labels: {
		                   orientation: 'horizontal',
		                   interval: 10,
		                   offset: 1.00
		               },
		               needles: [
		               {
		                value: $scope.percentilevalue,
		                type: 'pointer',
		                outerOffset: 0.8,
		                mediumOffet: 0.7,
		                width: 10,
		                fillStyle: '#252E32'
		            }
		            ]
		        }
		        ]
		    });

			   
			  });
			
			 $(function () { 
			      var myChart = Highcharts.chart('container', {
			          chart: {
				    	  backgroundColor: "#3C3C3C",
				          type: 'column'
				      },
				      title: {
				    	  style: {
				                color: 'white',
				             },
				          text: 'Distress'
				      },
				      xAxis: {
				          type: 'category'
				      },
				      yAxis: {
				      	min: 10,
				          max: 50,
				          endOnTick:false,
				          tickInterval:10,
				          title: {
			                	style: {
				                    color: 'white'
				                },
				              text: ' '
				          },
				      labels: {
			                style: {
			                    color: 'white'
			                }
			            },

				      },
				      legend: {
				          enabled: false
				      },
				      plotOptions: {
				          series: {
				              borderWidth: 0,
				              dataLabels: {
				                  enabled: true,
				                  format: '{point.y:.1f}'
				              }
				          }
				      },

				      tooltip: {
				          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				          pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
				      },

				      series: [{
				          name: 'Hedonic',
				          colorByPoint: true,
				          data:$scope.distressbar 
				      }]
			  });
			  });
			}
			else if($scope.age >= 36){		
			angular.element(document).ready(function (event) {
		        var anchorGradient = {
		            type: 'radialGradient',
		            x0: 0.35,
		            y0: 0.35,
		            r0: 0.0,
		            x1: 0.35,
		            y1: 0.35,
		            r1: 1,
		            colorStops: [{ offset: 0, color: 'blue' },
		            { offset: 1, color: '#252E32'}]
		        };

		        $('#distress').jqRadialGauge({
		            background: '#F7F7F7',
		            border: {
		                lineWidth: 10,
		                strokeStyle: 'green',
		                padding: 16
		            },
		            shadows: {
		                enabled: true
		            },
		            anchor: {
		                visible: true,
		                fillStyle: anchorGradient,
		                radius: 0.10
		            },
		            tooltips: {
		                disabled: false,
		                highlighting: true
		            },
		            animation: {
		                duration: 1
		            },
		            scales: [
		            {
		               minimum: 0,
		               maximum: 100,
		               startAngle: 180,
		               endAngle: 360,
		               majorTickMarks: {
		                   length: 12,
		                   lineWidth: 2,
		                   interval: 10,
		                   offset: 0.84
		               },
		               minorTickMarks: {
		                   visible: true,
		                   length: 8,
		                   lineWidth: 2,
		                   interval: 2,
		                   offset: 0.84
		               },
		               labels: {
		                   orientation: 'horizontal',
		                   interval: 10,
		                   offset: 1.00
		               },
		               needles: [
		               {
		                value: $scope.percentilevalue,
		                type: 'pointer',
		                outerOffset: 0.8,
		                mediumOffet: 0.7,
		                width: 10,
		                fillStyle: '#252E32'
		            }
		            ]
		        }
		        ]
		    });			   
			  });			
				 $(function () { 
				      var myChart = Highcharts.chart('container', {
				      chart: {
				    	  backgroundColor: "#3C3C3C",
				          type: 'column'
				      },
				      title: {
			        	  style: {
			                    color: 'white'
			                },
				          text: 'Distress'
				      },
				      xAxis: {
				          type: 'category'
				      },
				      yAxis: {
				      	min: 10,
				          max: 50,
				          endOnTick:false,
				          tickInterval:10,
				          title: {
				              text: ' '
				          },labels: {
				                style: {
				                    color: 'white'
				                }
				            },

				      },
				      legend: {
				          enabled: false
				      },
				      plotOptions: {
				          series: {
				              borderWidth: 0,
				              dataLabels: {
				                  enabled: true,
				                  format: '{point.y:.1f}'
				              }
				          }
				      },

				      tooltip: {
				          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				          pointFormat: '<span style="color:black">{point.name}</span>: <b>{point.y:.2f}'
				      },

				      series: [{
				          name: 'Distress',
				          colorByPoint: true,
				          data: $scope.distressbar
				      }]
				  });
				  });
				
			}
	}).error(function(res){
		
		console.log(res);
	}) 
	  
}).error(function(res) {

	console.log(res);
})




})
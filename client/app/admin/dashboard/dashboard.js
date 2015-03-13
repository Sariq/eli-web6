(function () {
    /** Task Controller
     *
     * @param $location:
     * @param TaskAdmin: Service
     * @constructor
     */
    function DashboardCtrl($location, $scope, TaskAdmin, $stateParams, AuthService, $http) {
  
        var self = this;
        self.userInfo = AuthService.getUserInfo();
        self.meetingsCount = self.userInfo
        $http.post('/UserService.svc/GetAssignmentsCountsOfUser', self.userInfo._id).
            success(function (data, status, headers, config) {
                $scope.countTask = data[0];
                $scope.doneTask = data[1];
                self.setDataLine();
            }).error(function (data, status, headers, config) { alert("Project Add") });

        self.data = [
    {
        value: 300,
        color: "#5cb85c",
        highlight: "#FF5A5E",
        label: "Green"
    },
    {
        value: 50,
        color: "#337ab7",
        highlight: "#5AD3D1",
        label: "Blue"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
        ]

        self.options = {

            // Sets the chart to be responsive
            responsive: true,

            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke: true,

            //String - The colour of each segment stroke
            segmentStrokeColor: '#fff',

            //Number - The width of each segment stroke
            segmentStrokeWidth: 2,

            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout: 50, // This is 0 for Pie charts

            //Number - Amount of animation steps
            animationSteps: 100,

            //String - Animation easing effect
            animationEasing: 'easeOutBounce',

            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate: true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale: false,

            //String - A legend template
            legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

        };
        self.setDataLine = function () {
        self.lineData = {
            labels: ['יחס משימות'],
            datasets: [
              {
                  label: 'My First dataset',
                  fillColor: 'rgba(220,220,220,0.5)',
                  strokeColor: 'rgba(220,220,220,0.8)',
                  highlightFill: 'rgba(220,220,220,0.75)',
                  highlightStroke: 'rgba(220,220,220,1)',
                  data: [6]
              },
              {
                  label: 'My Second dataset',
                  fillColor: 'rgba(151,187,205,0.5)',
                  strokeColor: 'rgba(151,187,205,0.8)',
                  highlightFill: 'rgba(151,187,205,0.75)',
                  highlightStroke: 'rgba(151,187,205,1)',
                  data: [10]
              }
            ]
        };
        }
        // Chart.js Options
        self.lineOptions = {

            // Sets the chart to be responsive
            responsive: true,

            //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero: true,

            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: true,

            //String - Colour of the grid lines
            scaleGridLineColor: "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth: 1,

            //Boolean - If there is a stroke on each bar
            barShowStroke: true,

            //Number - Pixel width of the bar stroke
            barStrokeWidth: 2,

            //Number - Spacing between each of the X value sets
            barValueSpacing: 20,

            //Number - Spacing between data sets within X values
            barDatasetSpacing: 1,

            //String - A legend template
            legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
        };



    }

    angular.module('eli.admin')
        .controller('DashboardCtrl', ['$location', '$scope', 'TaskAdmin', '$stateParams','AuthService', '$http', DashboardCtrl]);
}());











$(function () {
    function updateCurves () {
        $.getJSON('/sensors/get-sensors-data', function (d) {
            Morris.Line({
                element: 'morris-area-chart',
                data: d,
                xkey: 'date',
                ykeys: ['t', 'h', 'lumi'],
                labels: ['t', 'h', 'lumi'],
                pointSize: 2,
                hideHover: 'auto',
                resize: true
            });
        });
    }
    setInterval(updateCurves, 60000);
});

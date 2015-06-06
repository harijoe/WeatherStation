$(function () {
    var morris =
        Morris.Line({
        element: 'morris-area-chart',
        data: null,
        xkey: 'date',
        ykeys: ['t', 'h', 'lumi'],
        labels: ['t', 'h', 'lumi'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

    function updateCurves () {
        $.getJSON('/sensors/get-sensors-data', function (d) {
            morris.setData(d);
        });
    }
    setInterval(updateCurves, 60000);
});

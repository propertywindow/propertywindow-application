const Dashboard = function() {

    const initTimer = function () {
        $.sessionTimeout({
            title: 'Session Timeout',
            message: 'Your session is about to expire.',
            keepAliveUrl: 'http://keenthemes.com/metronic/preview/inc/api/session-timeout/keepalive.php',
            redirUrl: '/logout',
            logoutUrl: '/logout',
            warnAfter: 600000,
            redirAfter: 660000,
            ignoreUserActivity: true,
            countdownMessage: 'Lock session in {timer} seconds.',
            countdownBar: true
        });
    };

    const daterangepickerInit = function() {
        if ($('#m_dashboard_daterangepicker').length === 0) {
            return;
        }

        let picker = $('#m_dashboard_daterangepicker');
        let start = moment();
        let end = moment();

        function cb(start, end, label) {
            let title = '';
            let range = '';

            if ((end - start) < 100) {
                title = 'Today:';
                range = start.format('MMM D');
            } else if (label === 'Yesterday') {
                title = 'Yesterday:';
                range = start.format('MMM D');
            } else {
                range = start.format('MMM D') + ' - ' + end.format('MMM D');
            }

            picker.find('.m-subheader__daterange-date').html(range);
            picker.find('.m-subheader__daterange-title').html(title);
        }

        picker.daterangepicker({
            startDate: start,
            endDate: end,
            opens: 'left',
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end, '');
    };

    const latestTrendsMap = function() {
        if ($('#m_chart_latest_trends_map').length === 0) {
            return;
        }

        try {
            let map = new GMaps({
                div: '#m_chart_latest_trends_map',
                lat: 55.953252,
                lng: -3.188267
            });
        } catch (e) {
            console.log(e);
        }
    };

    return {
        init: function() {
            daterangepickerInit();
            latestTrendsMap();
            // initTimer();
        }
    };
}();

jQuery(document).ready(function() {
    Dashboard.init();
});
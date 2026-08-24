( function( $ ) {
    /**
     * @param $scope The Widget wrapper element as a jQuery element
     * @param $ The jQuery alias
     */
    var WidgetCTCounterHandler = function( $scope, $ ) {
        elementorFrontend.waypoint($scope.find('.ct-counter-number-value'), function () {
            var $number = $(this),
                data = $number.data();

            var decimalDigits = data.toValue.toString().match(/\.(.*)/);

            if (decimalDigits) {
                data.rounding = decimalDigits[1].length;
            }

            if ($.fn.numerator) {
                $number.numerator(data);
                return;
            }

            var fromValue = parseFloat($number.text()) || 0,
                toValue = parseFloat(data.toValue) || 0,
                duration = parseInt(data.duration, 10) || 1000,
                rounding = data.rounding || 0;

            $({ value: fromValue }).animate({ value: toValue }, {
                duration: duration,
                easing: data.easing || 'swing',
                step: function (value) {
                    $number.text(Number(value).toFixed(rounding));
                },
                complete: function () {
                    $number.text(toValue.toFixed(rounding));
                }
            });
        }, {
            offset: '95%',
            triggerOnce: true
        });
    };

    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ct_counter.default', WidgetCTCounterHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ct_banner.default', WidgetCTCounterHandler );
    } );
} )( jQuery );
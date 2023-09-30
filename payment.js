var ListofItem = '{ "item" : [ '                 +
    '{ "name": "SeaVax", "price": "500000" },'   +
    '] }';

$(document).ready(function() {
    // retrieve value from sessionStorage
    var paymentAmt = sessionStorage.getItem("totalCost");

    // set value in html element
    $("#amt-value").html(paymentAmt);
    paypal.Buttons(
        {
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                        value: paymentAmt,
                        }
                    }]
                });
            },

            onApprove: function(data, actions){
                return actions.order.capture().then(function(details) {
                    alert('Transaction completed by '
                        + details.payer.name.given_name);
                    window.location.replace("comm.html");
                });
            }
        }
    ).render('#paypal-btn');
});
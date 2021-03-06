(function() {
    'use strict';

    angular
        .module('myCCApp')
        .service('CreditCardService', creditCardService)

    function creditCardService() {
        var ccService = this;
        ccService.checkCard = function(cardinfo) {

            var number = cardinfo.number;
            cardinfo.error = false;
            cardinfo.message = ""
                if (isNaN(number)) {
                cardinfo.number = cardinfo.number.replace(/\D/g, '');
                number = cardinfo.number;
                cardinfo.error = true;
                cardinfo.message = "Please Enter Number without any characters/special chracters. Characters other then number are trimmed"
            }

            if (number.length > 19) {
                cardinfo.error = true;
                cardinfo.number = cardinfo.number.slice(0, 19);
                number = cardinfo.number;
                console.log(cardinfo.number.length)
                cardinfo.message = "Card Number length exceeds maximum specified length"
            }

            //Visa
            var re = new RegExp("^4");
            if (number.match(re) != null) {
                cardinfo.type = (number.length == 13 || number.length == 16 || number.length == 19) ? "visa" : "visad"
                return cardinfo;
            }

            // Maestro
            re = new RegExp("^(50|5[6-9])");
            if (number.match(re) != null) {
                cardinfo.type = (number.length >= 12) ? "maestro" : "maestrod"
                return cardinfo;
            }

            // Mastercard

            re = new RegExp("^5");
            if (number.match(re) != null && number.length <= 16) {
                cardinfo.type = (number.length == 16) ? "master" : "masterd"
                return cardinfo;
            }

            // AMEX
            re = new RegExp("^3[47]");
            if (number.match(re) != null && number.length <= 15) {
                cardinfo.type = (number.length == 15) ? "amex":"amexd"
                return cardinfo;
            }

            // Discover
            re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5])|64[4-9]|65)");
            if (number.match(re) != null) {
                cardinfo.type = (number.length == 16 || number.length == 19) ? "discover" : "discoverd"
                return cardinfo;
            }

            cardinfo.type = (number.length >= 16) ? "default":"defaultd"
            return cardinfo;
        }

    }

})();

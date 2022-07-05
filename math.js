var oneToTen = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
    elevenToNineteen = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    multipleOfTen = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
    placeValue = ["", " thousand", " million", " billion", " trillion", " quadrillion", " quintillion", " sextillion", " septillion", " octillion", " nonillion", " decillion", " undecillion", " duodecillion", " tredecillion", " quattuordecillion", " quindecillion", " sexdecillion", " septendecillion", " octodecillion", " novemdecillion ", " vigintillion", " unvigintillion", " duovigintillion", " trevigintillion", " quattuorvigintillion", " quinvigintillion", " sexvigintillion", " septenvigintillion", " octovigintillion", " novemvigintillion", " trigintillion", " untrigintillion", " duotrigintillion", " tretrigintillion", " quattuortrigintillion", " quintrigintillion", " sextrigintillion", " septentrigintillion", " octotrigintillion", " novemtrigintillion", " quadragintillion", " unquadragintillion", " duoquadragintillion", " trequadragintillion", " quattuorquadragintillion", " quinquadragintillion", " sexquadragintillion", " septenquadragintillion", " octoquadragintillion", " novemquadragintillion", " quinquagintillion", " unquinquagintillion", " duoquinquagintillion", " trequinquagintillion", " quattuorquinquagintillion", " quinquinquagintillion", " sexquinquagintillion", " septenquinquagintillion", " octoquinquagintillion", " novemquinquagintillion", " sexagintillion", " unsexagintillion", " duosexagintillion", " tresexagintillion", " quattuorsexagintillion", " quinsexagintillion", " sexsexagintillion", " septsexagintillion", " octosexagintillion", " octosexagintillion", " septuagintillion", " unseptuagintillion", " duoseptuagintillion", " treseptuagintillion", " quinseptuagintillion", " sexseptuagintillion", " septseptuagintillion", " octoseptuagintillion", " novemseptuagintillion", " octogintillion", " unoctogintillion", " duooctogintillion", " treoctogintillion", " quattuoroctogintillion", " quinoctogintillion", " sexoctogintillion", " septoctogintillion", " octooctogintillion", " novemoctogintillion", " nonagintillion", " unnonagintillion", " duononagintillion", " trenonagintillion", " quattuornonagintillion", " quinnonagintillion", " sexnonagintillion", " septnonagintillion", " octononagintillion", " novemnonagintillion", " centillion"];

function getRandomNumber(min, max) { // min and max included 
    return ((Math.random() * (max - min)) + min)
}

function formatWithCommas(num, decimal) {
    var hasDot = false;
    var base = num.toString();
    if (base.indexOf("e+") !== -1) {
        var splittedExponentNum = base.split("e+"),
            exponent = splittedExponentNum[1],
            str = '';
        if (base.indexOf(".") !== -1) {
            base = splittedExponentNum[0].split(".");
            exponent -= base[1].length;
            base = base.join("");
        }
        while (exponent--) {
            str = str + '0';
        }
        base = base + str;
    }
    if (base.indexOf(".") !== -1) {
        hasDot = true;
    }
    if (decimal === 0) {
        if (base.length <= 3 && !hasDot) return base;
    }
    if (typeof (decimal) === "undefined") {
        decimal = 0;
    }
    var leftNum = hasDot ? base.substr(0, base.indexOf(".")) : base;
    if (decimal === 0) {
        if (num <= 999) return leftNum;
        else return leftNum.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    var dec = hasDot ? base.substr(base.indexOf("."), decimal + 1) : ".";
    while (dec.length < decimal + 1) {
        dec += "0";
    }
    if (num <= 999) return leftNum + dec;
    else return leftNum.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + dec;
}


function spellf(userInput) {
    var numToWorkOn;

    //        if (userInput === availableMatter)
    //        {
    //         console.log("_______");
    //         console.log(userInput);
    //        }
    //create map for all unique names in numbering system


    //To check if spell has been called as a function call :   spell(123)   window.spell(123)

    if (userInput < 0) {
        console.log("Error, value less than 0");
        return userInput.toString();
    }

    if (typeof (userInput) == "number" || typeof (userInput) == "string") {
        numToWorkOn = "" + userInput;
    }


    //To check if spell has been called using a Number/String Object:   "123".spell()   123..spell() 
    else if (typeof (this) == "object") {
        numToWorkOn = this.toString();
    }

    else {
        throw new Error("Invalid Input");
        return;
    }

    if (numToWorkOn.indexOf("e+") !== -1) {
        var splittedExponentNum = numToWorkOn.split("e+"),
            exponent = splittedExponentNum[1],
            str = '';
        if (numToWorkOn.indexOf(".") !== -1) {
            numToWorkOn = splittedExponentNum[0].split(".");
            exponent -= numToWorkOn[1].length;
            numToWorkOn = numToWorkOn.join("");
        }
        else {
            numToWorkOn = splittedExponentNum[0];
        }
        while (exponent--) {
            str = str + '0';
        }
        numToWorkOn = numToWorkOn + str;
    }
    else if (numToWorkOn.indexOf(".") !== -1) {
        var splittedDecimal = numToWorkOn.split(".");
        var leftNum = splittedDecimal[0];
        var rightNum = splittedDecimal[1];
        numToWorkOn = leftNum;
    }

    //Put limit check on the program, placevalue map should be increased to increase capacity
    if (numToWorkOn.length >= 303) {
        throw new Error("Number out of bonds!");
        return;
    } else {
        return convertToString(numToWorkOn);
    }

    //Recursie logic to break number into strings of length 3 each and recursively pronounce each
    function convertToString(stringEquivalent) {
        if (stringEquivalent == 0) {
            return '0'
        }

        var result = '',
            unitLookup = 0,
            strLength = stringEquivalent.length;
        for (var k = strLength; k > 0; k = k - 3) {

            if (k - 3 <= 0) {
                var subStr = stringEquivalent.substring(k, k - 3);
                pronounce = pronounceNum(subStr);

                if (pronounce.toUpperCase() != 'zero') {
                    var num = Number(subStr + "." + stringEquivalent.substring(subStr.length, subStr.length + 2));
                    result = formatWithCommas(num, 1) + placeValue[unitLookup] + ' , ' + result;
                }
            }
            unitLookup++;
        }
        //to trim of the extra ", " from last
        return result.substring(0, result.length - 3)
    }

    //Determines the range of input and calls respective function
    function pronounceNum(val) {
        val = parseInt(val);
        if (parseInt(val / 10) == 0) {
            return numLessThan10(val);
        } else if (parseInt(val / 100) == 0) {
            return numLessThan99(val)
        } else
            return numLessThan1000(val);
    }

    //Pronounces any number less than 1000
    function numLessThan1000(val) {
        val = Number(val);
        var hundredPlace = parseInt(val / 100),
            result;
        if (val % 100 == 0) {
            result = oneToTen[hundredPlace] + " hundred ";
        } else {
            result = oneToTen[hundredPlace] + " hundred " + numLessThan99(val % 100);
        }
        return result;
    }

    //Pronounces any number less than 99
    function numLessThan99(val) {
        val = Number(val);
        var tenthPlace = parseInt(val / 10),
            result;
        if (tenthPlace !== 1) {
            val % 10 ? (result = multipleOfTen[tenthPlace] + " " + numLessThan10(val % 10)) : (result = multipleOfTen[tenthPlace]);
            return result;
        } else {
            result = elevenToNineteen[val % 10];
            return result;
        }
    }

    //Pronounces any number less than 10
    function numLessThan10(val) {
        val = Number(val);
        return oneToTen[val];
    };

}
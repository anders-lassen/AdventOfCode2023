// var input = require('./day1_input');
process.stdin.on('data', function (data) { 
    var input = data.toString().split('\r\n'); 
    console.time('day1');
    ready(input);
})

async function ready(input) {
    var extracted_numbers = 0
//     var extracted_numbers = []

    function convToNum(num) {
        return num.replace('one', '1')
                  .replace('two', '2')
                  .replace('three', '3')
                  .replace('four', '4')
                  .replace('five', '5')
                  .replace('six', '6')
                  .replace('seven', '7')
                  .replace('eight', '8')
                  .replace('nine', '9');
    }

    var anums = "one|two|three|four|five|six|seven|eight|nine"
    var regex = new RegExp("(\\d|" + anums + ")", "g");
    var reversed_regex = new RegExp("(" + anums.split('').reverse().join('') + "|\\d)", "g");

    for (var i = 0; i < input.length; i++) {
        // var regex = /(\d)/g;
        var matches = input[i].match(regex);
        var input_reversed = input[i].split('').reverse().join('');
        var reversed_matches = input_reversed.match(reversed_regex);

        extracted_numbers += parseInt(convToNum(matches[0]) + "" + convToNum(reversed_matches[0].split('').reverse().join('')));
        // extracted_numbers.push(convToNum(matches[0]) + "" + convToNum(reversed_matches[0].split('').reverse().join('')));
    }

//     console.log(input[0], extracted_numbers[0]);
//     console.log(input[1], extracted_numbers[1]);
//     console.log(input[2], extracted_numbers[2]);
//     console.log(input[34], extracted_numbers[34]);
//     console.log(input[35], extracted_numbers[35]);
//     console.log(input[36], extracted_numbers[36]);
    console.log(extracted_numbers);
//     console.log(extracted_numbers.reduce((a, b) => parseInt(a) + parseInt(b), 0));

    console.timeEnd('day1');
}
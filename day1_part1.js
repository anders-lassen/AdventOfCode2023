// var input = require('./day1_input');
process.stdin.on('data', function (data) { 
    var input = data.toString().split('\r\n'); 
    console.time('day1');
    ready(input);
})

async function ready(input) {
    var extracted_numbers = 0

    for (var i = 0; i < input.length; i++) {
        var regex = /(\d)/g;
        var matches = input[i].match(regex);

        extracted_numbers += parseInt(matches[0] + "" + matches[matches.length - 1]);
    }

    console.log(extracted_numbers);
//     console.log(extracted_numbers.reduce((a, b) => parseInt(a) + parseInt(b), 0));

    console.timeEnd('day1');
}
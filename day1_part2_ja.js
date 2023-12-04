// Jacob's solution to Advent of Code 2023, day 1, part 2
process.stdin.on('data', function (data) {
    var input = data.toString().split('\r\n');
    console.time('day1');
    ready(input);
})

function ready(input_array) {

    let regexp = /(?=(one))|(?=(two))|(?=(three))|(?=(four))|(?=(five))|(?=(six))|(?=(seven))|(?=(eight))|(?=(nine))|(?=(\d))/g
    // let regexp = /\d/g
    function convertToNumber(s) {
        switch (s) {
            case "one": return 1;
            case "two": return 2;
            case "three": return 3;
            case "four": return 4;
            case "five": return 5;
            case "six": return 6;
            case "seven": return 7;
            case "eight": return 8;
            case "nine": return 9;
            default: return s;
        }
    }
    let sum = 0;

    input_array.forEach(inp => {
        console.log(`Input: ${inp}`);
        let matches = Array.from(inp.matchAll(regexp), (m) => {
            return m.find(Boolean);
        });
        console.table(matches)
        if (matches) {
            console.log(`First match: ${matches[0]}. Last match: ${matches[matches.length - 1]}`)
            console.log(`First match: ${convertToNumber(matches[0])}. Last match: ${convertToNumber(matches[matches.length - 1])}`)
            console.log(`${convertToNumber(matches[0]) + "" + convertToNumber(matches[matches.length - 1])}`)
            sum += parseInt(convertToNumber(matches[0]) + "" + convertToNumber(matches[matches.length - 1]))
        }
        console.log("------------------------------------------------------")
    });

    console.log(sum)
    console.timeEnd('day1');
}

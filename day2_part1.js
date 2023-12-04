process.stdin.on('data', function (data) { 
    var input = data.toString().split('\r\n').map((x) => {
        // extract sets of numbers
        // Game 1: 8 green; 5 green, 6 blue, 1 red; 2 green, 1 blue, 4 red; 10 green, 1 red, 2 blue; 2 blue, 3 red

        return x.split(': ')[1].match(/(\d+)\s(?=green)/g)
    }); 
    console.time('day2');
    ready(input);
})

async function ready(input) {
    console.log(input[0]);
}
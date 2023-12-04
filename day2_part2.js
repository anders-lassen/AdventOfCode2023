var conditions = {
    red: 12,
    green: 13,
    blue: 14
}

process.stdin.on('data', function (data) { 
    var input = data.toString().split('\r\n').map((x) => {
        // extract sets of numbers
        // Game 1: 8 green; 5 green, 6 blue, 1 red; 2 green, 1 blue, 4 red; 10 green, 1 red, 2 blue; 2 blue, 3 red
        let set_data = x.split(': ')[1]
        let set = {
            green: set_data.match(/(\d+)(?=\sgreen)/g).sort((a, b) => parseInt(b) - parseInt(a)),
            blue: set_data.match(/(\d+)(?=\sblue)/g).sort((a, b) => parseInt(b) - parseInt(a)),
            red: set_data.match(/(\d+)(?=\sred)/g).sort((a, b) => parseInt(b) - parseInt(a))
        }
        
        return set
    }); 
    console.time('day2');
    ready(input);
})

async function ready(input) {
    var extracted_numbers = 0

    for (let i = 0; i < input.length; i++) {
        extracted_number = 1
        for (const color in conditions) {
            if (conditions.hasOwnProperty(color)) {
                // console.log(color, parseFloat(input[i][color][0]))
                extracted_number = extracted_number * parseFloat(input[i][color][0])
            }
        }
        // console.log(extracted_number)
        extracted_numbers += extracted_number
    }
    
    console.log(extracted_numbers);
        console.timeEnd('day2');
}

async function sortFunc(a, b) {
        return parseInt(a) - parseInt(b)
} 

// correct answer: 71274
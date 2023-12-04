process.stdin.on('data', function (data) {
    var input = data.toString().split('\r\n')

    ready(input)
})

async function ready(input) {
    var extracted_number = 0
    //     loop each line 
    for (let i = 0; i < input.length; i++) {
        // look at prev, current and next line
        const prev_line = i == 0 ? false : input[i - 1];
        const current_line = input[i];
        const next_line = i == input.length ? false : input[i + 1];

        var prev_symbols = []
        var current_symbols = []
        var next_symbols = []

        // get indexes of symbol
        current_symbols = current_line.split('').map((x, i) => {
            if (x != "*") return -1
            else return i
        }).filter((x) => x != -1)
        console.log("current_symbols", current_symbols)

        const c_regex = new RegExp("(\\d+)", "g")

        // get ranges of numbers, including -1 and +1
        // var current_ranges = []
        var current_numbers = {}

        console.log(i + 1)
        let j = 0
        for (const symbol of current_symbols) {
            console.log("symbol", symbol)
            current_numbers[j] = []
            for (const line of [prev_line, current_line, next_line]) {
                // console.log("line", line)

                while ((a = c_regex.exec(line)) !== null) {
                    a_start = a.index - 1
                    a_end = c_regex.lastIndex /* + 1 ??? */

                    if (symbol >= a_start && symbol <= a_end) {
                        current_numbers[j].push(a[0])
                    }
                }
            }
            if (current_numbers[j].length > 1) {
                console.log("current_numbers[j]", current_numbers[j])
                extracted_number += (current_numbers[j][0] * current_numbers[j][1])
            }
            j++
        }
        // console.log(i + 1, "current_numbers", current_numbers)
        //         // check if matched range fits within prev and next
    }

    console.log(extracted_number)
}
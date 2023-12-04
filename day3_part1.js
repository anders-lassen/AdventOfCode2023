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
        if (prev_line)
            prev_symbols = prev_line.split('').map((x, i) => {
                if (x == "." || !isNaN(x)) return -1
                else return i
            }).filter((x) => x != -1)
        console.log("prev_symbols", prev_symbols)

        current_symbols = current_line.split('').map((x, i) => {
            if (x == "." || !isNaN(x)) return -1
            else return i
        }).filter((x) => x != -1)
        console.log("current_symbols", current_symbols)

        if (next_line)
            next_symbols = next_line.split('').map((x, i) => {
                if (x == "." || !isNaN(x)) return -1
                else return i
            }).filter((x) => x != -1)
        console.log("next_symbols", next_symbols)

        const c_regex = new RegExp("(\\d+)", "g")

        // get ranges of numbers, including -1 and +1
        // var current_ranges = []
        var current_numbers = []
        while ((a = c_regex.exec(current_line)) !== null) {
            // check if matched range fits within prev and next
            a_start = a.index - 1
            a_end = c_regex.lastIndex /* + 1 ??? */
            if (prev_line) {
                var prev_match = prev_symbols.filter((x) => x >= a_start && x <= a_end)
                if (prev_match.length > 0) {
                    extracted_number += parseFloat(a[0])
                    current_numbers.push(a[0])
                }
            }

            var current_match = current_symbols.filter((x) => x >= a_start && x <= a_end)
            if (current_match.length > 0) {
                extracted_number += parseFloat(a[0])
                current_numbers.push(a[0])
            }

            if (next_line) {
                var next_match = next_symbols.filter((x) => x >= a_start && x <= a_end)
                if (next_match.length > 0) {
                    extracted_number += parseFloat(a[0])
                    current_numbers.push(a[0])
                }
            }
            //     current_numbers.push(a[0])
            //     current_ranges.push([a.index-1, c_regex.lastIndex+1])
        }
        console.log(i + 1, "current_numbers", current_numbers)
        // console.log("current_ranges", current_ranges)




    }

    console.log(extracted_number)
}
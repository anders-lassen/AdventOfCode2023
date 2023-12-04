process.stdin.on('data', function (data) {
    var input = data.toString().split('\r\n').map((x) => {
        x = x.split(':')[1].split('|')

        return {
            winning: x[0].split(' ').filter((x) => x != ''),
            numbers: x[1].split(' ').filter((x) => x != '')
        }
    })

    console.time('day4');
    ready(input)
})

async function ready(input) {
    console.log(input)

    var extracted_number = 0

    for (let i = 0; i < 6/* input.length */; i++) {
        const card = input[i];
        
        console.log("i", i + 1/* , card */)
        var j = 0
        for (const number of card.numbers) {
            for (const winning of card.winning) {
                if (number == winning) {
                    j++
                }
            }
        }

        console.log("j", j)
        for (let k = 1; k <= j; k++) {

            console.log("k", k, j, i + k + 1)
            input.splice(i + k + 1, 0, input[i + k + 1])
        }

        // extracted_number += j
    }

    console.log(input.length)
    console.timeEnd('day4');
}

// correct answer: 
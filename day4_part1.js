process.stdin.on('data', function (data) {
    var input = data.toString().split('\r\n').map((x) => {
        x = x.split(':')[1].split('|')

        return {
            winning: x[0].split(' ').filter((x) => x != ''),
            numbers: x[1].split(' ').filter((x) => x != '')
        }
    })

    ready(input)
})

async function ready(input) {
    console.log(input)

    var extracted_number = 0

    for (let i = 0; i < input.length; i++) {
        const card = input[i];
        
        console.log(i + 1, card)
        var j = 0
        let score = 0
        for (const number of card.numbers) {
            for (const winning of card.winning) {
                if (number == winning) {
                        console.log("j", j, (score * 2 || 1))
                    score = (score * 2 || 1)
                    j++
                }
            }
        }
        extracted_number += score
    }

    console.log(extracted_number)
}

// correct answer: 25651
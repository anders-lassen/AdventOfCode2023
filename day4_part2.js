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

async function ready(cards) {
//     console.log(input)

    var copies = []

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        
        // console.log("i", i/* , card */)
        
        if (!copies[i]) {
            copies[i] = 1
        }

        var j = 0
        for (const number of card.numbers) {
            for (const winning of card.winning) {
                if (number == winning) {
                        j++
                        
                    copies[i+j] = copies[i] + (copies[i+j] || 1)
                }
            }
        }
    }

//     console.log(cards.length)
//     console.log(copies)
    console.log(copies.filter(Boolean).reduce((a, b) => a + b, 0))
    console.timeEnd('day4');
}


// tries: 17185992 (too low)
// tries: 19499881
// tries: 14910101902 (nope)
// tries: 44751276498 (too high)
// correct answer: 19499881
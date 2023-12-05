process.stdin.on('data', function (data) {
    var input = data.toString()

    var data = {
        seeds: input.match(/seeds:\s(\d*\s)+/g)[0].replace("seeds:", "").split(' ').filter(Boolean).map((x) => parseFloat(x)),
        maps: [...input.matchAll(/(\w+)+\-to\-(\w+)+\smap:\s+(\d+\s)*/gm)] // .map(x => [x[1], x[2]]) //[0].replace("seeds:", "").split(' ').filter(Boolean).map((x) => parseFloat(x)),

    }

    ready(data)
})


async function ready(data) {
    console.log(data)
}
process.stdin.on('data', function (data) {
    var input = data.toString()

    var data = {
        seeds: input.match(/seeds:\s(\d*\s)+/g)[0].replace("seeds:", "").split(' ').filter(Boolean).map((x) => parseFloat(x)),
        maps: [...input.matchAll(/(\w+)+\-to\-(\w+)+\smap:\s+((\d+\s*)*)*/gm)].map(x => {
            return {
                source: x[1],
                destination: x[2],
                ranges: x[3].split("\r\n").filter(Boolean).map(y => {
                    let x = y.split(" ")

                    return {
                        destination_range: x[0],
                        source_range: x[1],
                        range_length: x[2]
                    }
                })
            }
        })
    }

    ready(data)
})


async function ready(data) {
    //     console.log(JSON.stringify(data, 2, 2))
    var maps = data.maps
    var locations = []
//     let seed = 79
    data.seeds.forEach(seed => {
        console.log("-----------\nseed", seed)

        function findSeed(source_seed, source_map) {
        //     console.log("findSeed", source_seed, source_map)
            let dest_seed = false
            let map = maps.find(x => x.source == source_map);

            if (!map) return false

            map.ranges.forEach(x => {
                x.source_range = parseFloat(x.source_range)
                x.range_length = parseFloat(x.range_length)
                x.destination_range = parseFloat(x.destination_range)

                if (source_seed >= x.source_range && source_seed <= x.source_range + x.range_length && !dest_seed) {
                //     if (dest_seed) console.log("ERROR: multiple ranges found", dest_seed, "\n", 
                //         "destination_range",x.destination_range, 
                //         "source_range",x.source_range, 
                //         "range_length",x.range_length)
                //     console.log("ranges", x.destination_range, x.source_range, x.range_length)
                //     console.log("found", x.destination_range + (source_seed + x.range_length) - (x.source_range + x.range_length))
                    dest_seed = x.destination_range + (source_seed + x.range_length) - (x.source_range + x.range_length)
                }
            })

        //     console.log(seed, dest_seed)

            if (dest_seed == false)
                dest_seed = source_seed

            console.log(map.destination, dest_seed)

            return findSeed(dest_seed, map.destination) || dest_seed
        }

        ret_seed = findSeed(seed, "seed")
        console.log("ret_seed", ret_seed)

        locations.push(ret_seed)
    });

    console.log("locations\n", locations.sort((a, b) => a - b))
}

// correct answer: 993500720
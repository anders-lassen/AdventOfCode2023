var movements_pattern = "LLRRRLLRLRRRLLRLRLRLRLRRRLRRLRRLRLLLRRLLRRLRRLRRLRRRLLLRRLRLRRRLRRRLRLRRLRRRLRLRRRLRLRLLLRLRRLRLRRLRRRLRLRRRLRRRLRRRLRRRLRLRRRLRRRLRLLRRLRLRLRRRLRRLRRRLRRRLRRRLRRRLLLLRRLLRLRRLRRLRRRLRRRLLLRRLRRLRLRRLRRRLRRLRLRRRLRLRRLLRLLRRLRLRRRLRRLRRLRLRRLLLRRRLRLRRRLRLRLLRLRLRRRLRLRLRRRLRRLRRLRRRLRRLLRRRR"

// example
// var movements_pattern = "LR"

process.stdin.on('data', function (data) {
    var input = data.toString().replace(/\r\n/g, ",'").replace(/\(/g, "['").replace(/\)/g, "']").replace(/\,\s/g, "','").replace(/\s\=/g, "':")

    ready(input)
})

async function ready(data) {
    eval("var path = {'" + data.toString() + "}")
    console.log(path)

    let movements_pattern_binary = movements_pattern.replace(/L/g, "0").replace(/R/g, "1")
    var steps = 0

    var saved_steps = []

    console.log(movements_pattern_binary)

    //     find all paths that ends with A
    var start_paths = []
    for (const key in path) {
        if (key.endsWith("A")) {
            start_paths.push(key)
        }
    }

    console.log(start_paths)

    keys = start_paths
    /*
    //     find steps to reach the ZZZ
//     function findZZZ(keys) {
    while (!keys.every(x => x.endsWith("Z"))) {
        console.log("steps", steps)
        let keys_cp = JSON.parse(JSON.stringify(keys))

        for (let i = 0; i < start_paths.length; i++) {
            for (const movement of movements_pattern_binary) {
                if (keys_cp[i].endsWith("Z")) {
                //     save steps and skip this iteration
                        saved_steps.push(steps)
                        continue
                }
                // console.log("i", i, "movement", movement)
                
                key = keys_cp[i]
                // console.log(key, path[key][movement])
                
                keys_cp[i] = path[key][movement]
            }
            steps++

        }

        console.log(keys, keys_cp)

        keys = keys_cp
    
        // if all keys end with Z, return
        // if (keys_cp.every(x => x.endsWith("Z"))) 
        //     return

        // findZZZ(keys_cp)
    }

//     findZZZ(start_paths)
*/


    function findZZZ(key) {
        let end = false

        for (const movement of movements_pattern_binary) {
            end = path[key][movement]
            //     console.log(end)
            steps++
        }

        if (end.endsWith("Z")) {
            console.log("end", end)
            console.log("end", steps)
            saved_steps = steps
            steps = 0
            return saved_steps
        }

        return findZZZ(end)
    }

    //     for (const key of start_paths) {
    //         console.log(key)
    //         findZZZ(key)
    //     }
    var map = [findZZZ(keys[0])
    , findZZZ(keys[1])
    , findZZZ(keys[2])
    , findZZZ(keys[3])
    , findZZZ(keys[4])
    , findZZZ(keys[5])]

    console.log(map, lcmOfArray(map))
}

function gcd(a, b) {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
function lcmOfArray(numbers) {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = lcm(result, numbers[i]);
    }
    return result;
}
var movements_pattern = "LLRRRLLRLRRRLLRLRLRLRLRRRLRRLRRLRLLLRRLLRRLRRLRRLRRRLLLRRLRLRRRLRRRLRLRRLRRRLRLRRRLRLRLLLRLRRLRLRRLRRRLRLRRRLRRRLRRRLRRRLRLRRRLRRRLRLLRRLRLRLRRRLRRLRRRLRRRLRRRLRRRLLLLRRLLRLRRLRRLRRRLRRRLLLRRLRRLRLRRLRRRLRRLRLRRRLRLRRLLRLLRRLRLRRRLRRLRRLRLRRLLLRRRLRLRRRLRLRLLRLRLRRRLRLRLRRRLRRLRRLRRRLRRLLRRRR"

// example
// var movements_pattern = "LLR"

process.stdin.on('data', function (data) {
    var input = data.toString().replace(/\r\n/g, ",'").replace(/\(/g, "['").replace(/\)/g, "']").replace(/\,\s/g, "','").replace(/\s\=/g, "':")

    ready(input)
})

async function ready(data) {
    eval("var path = {'" + data.toString() + "}")

    console.log(path)
    let movements_pattern_binary = movements_pattern.replace(/L/g, "0").replace(/R/g, "1")

    console.log(movements_pattern_binary)

    var steps = 0
//     find steps to reach the ZZZ
    function findZZZ(key) {
        let end = false
        
        for (const movement of movements_pattern_binary) {
            end = path[key][movement]
            console.log(end)
            steps++
        }

        if (end == "ZZZ") 
            return 

        findZZZ(end)
    }

    findZZZ("AAA")

    console.log(steps)
}
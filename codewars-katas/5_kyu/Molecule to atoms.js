// https://www.codewars.com/kata/molecule-to-atoms/javascript

function parseMolecule(formula) {
    var chemicalElement = /(A[cglmrstu]|B[aehikr]?|C[adeflmnorsu]?|D[bsy]|E[rsu]|F[elmr]?|G[ade]|H[efgos]?|I[nr]?|Kr?|L[airuv]|M[dgnot]|N[abdeiop]?|Os?|P[abdmortu]?|R[abefghnu]|S[bcegimnr]?|T[abcehilm]|U(u[opst])?|V|W|Xe|Yb?|Z[nr])/g
    const parents = [
        {
            el: "{",
            matching: "}",
            regex: /\{(.*?)\}[^\d]/g,
            regexNum: /\{(.*?)\}\d+/g
        }, 
        {
            el: "[",
            matching: "]",
            regex: /\[(.*?)\][^\d]/g,
            regexNum: /\[(.*?)\]\d+/g,
        }, 
        {
            el: "(",
            matching: ")",
            regex: /\(([^()]+)\)[^\d]/g,
            regexNum: /\(([^()]+)\)\d+/g,
        }
    ]

    return process(formula)

    function process(formula) {
        let rezultat = {}
        // if formula has any kind of parentheses, e.g. { [ (, use recursion:
        for (let parent of parents) {
            if (formula.includes(parent.el)) {
                var captured = getCaptured(formula, parent)
                captured.forEach( function (cut) {
                    formula = formula.replace(cut.replace, '')
                    rezultat = addObjects( rezultat, 
                        times(cut.count, process(cut.form)) )
                })
            }
        }
        // no parentheses, just take chemical elements
        let chemical = formula.split(chemicalElement)
                              .filter(el => Boolean(el) == true)
        while (chemical.length > 0) {
            let el1 = chemical[chemical.length - 2]
            let el2 = chemical[chemical.length - 1]

            if (isNaN(+el2)) {
                safeAdd(rezultat, el2, 1)
            } else if (el1 == null) {
                safeAdd(rezultat, el1, 1)
            } else if (typeof +el2 === 'number') {
                safeAdd(rezultat, el1, +el2)
                chemical.pop()
            }
            chemical.pop()
        }
        return rezultat
    }
    function times(count, obj) {
        for (let i in obj) {
            obj[i] = obj[i] * count
        }
        return obj
    }
    function addObjects(o1, o2) {
        // add values from o2 to o1, create keys
        for (let key in o2) {
            if (key in o1) {
                o1[key] += o2[key]
            } else {
                o1[key] = o2[key]
            }
        }
        return o1
    }
    function safeAdd (tree, newBranch, value) {
        if (!tree.hasOwnProperty(newBranch)) {
            tree[newBranch] = value
        } else {
            tree[newBranch] += value
        }
    }
    function getCaptured(formula, parent) {
        let res = []
        let withNumbers    = formula.match(parent.regexNum)
        let withoutNumbers = formula.match(parent.regex)

        if ( withNumbers && withNumbers.length > 0) {
            withNumbers.forEach(el => {
                res.push({
                    form: el.substring(1, el.indexOf(parent.matching)),
                    replace: el,
                    count: +el.substring(el.indexOf(parent.matching) + 1)
                })
            })
        }
        if ( withoutNumbers && withoutNumbers.length > 0) {
            withoutNumbers.forEach(el => {
                res.push({
                    form: el.substring(1, el.indexOf(parent.matching)),
                    replace: el.substring(0, el.length - 1),
                    count: 1
                })
            })
        }
        return res
    }
}

console.log(parseMolecule('{[Co(NH3)4(OH)2]3Co}(SO4)3'))

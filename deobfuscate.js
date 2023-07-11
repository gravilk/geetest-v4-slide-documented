const generate = require("@babel/generator").default
const babel = require("@babel/core")
const traverse = require("@babel/traverse").default
const fs = require("fs")
const t = require("@babel/types")

function containsNonLatinCodepoints(s) {
    return /[^\p{L}\p{N}\p{Pc}\p{Pd}\p{Po}\p{Sc}|]/u.test(s);
}

data = fs.readFileSync("obfuscated.js", 'utf-8')

function getShuffleFunction(shuffleSeed, uri) {
    var step = 2;
    for (; step !== 14; ) {
        switch (step) {
        case 5:
            step = $_IAGIJ < long_list.length ? 4 : 7;
            break;
        case 2:
            var $_IAHAf = ''
              , long_list = decodeURI(uri)
            step = 1;
            break;
        case 1:
            var $_IAGIJ = 0
              , $_IAHBX = 0;
            step = 5;
            break;
        case 4:
            step = $_IAHBX === shuffleSeed.length ? 3 : 9;
            break;
        case 8:
            $_IAGIJ++,
            $_IAHBX++;
            step = 5;
            break;
        case 3:
            $_IAHBX = 0;
            step = 9;
            break;
        case 9:
            $_IAHAf += String.fromCharCode(long_list.charCodeAt($_IAGIJ) ^ shuffleSeed.charCodeAt($_IAHBX));
            step = 8;
            break;
        case 7:
            $_IAHAf = $_IAHAf.split('^');
            return function($_IAHCV) {
                var $_IAHDv = 2;
                for (; $_IAHDv !== 1; ) {
                    switch ($_IAHDv) {
                    case 2:
                        return $_IAHAf[$_IAHCV];
                        break;
                    }
                }
            }
            ;
            break;
        }
    }
}

const ast = babel.parseSync(data)
traverse(ast, {
  StringLiteral(path) {
      if (path.node.extra?.raw?.includes("\\u")) {
        let raw = path.node.extra.rawValue
        if (!containsNonLatinCodepoints(raw)) {
            path.node.extra.raw = "\"" + path.node.value.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"") + "\""
        }
      }
  }
})

let uri_to_decode;
let control_value;

traverse(ast, {
    CallExpression(path) {
        if (path.node.callee.name === "decodeURI") {
            uri_to_decode = path.node.arguments[0].value
            control_value = path.getFunctionParent().parent.arguments[0].value
        }
    }
})

let getter_function = getShuffleFunction(control_value, uri_to_decode)
traverse(ast, {
    CallExpression(path) {
        if (path.node.callee.name?.startsWith("$_")) {
            if (path.node.arguments[0]?.type === "NumericLiteral") {
                let value_to_get = path.node.arguments[0].value
                path.replaceWith(t.stringLiteral(getter_function(value_to_get)))
                // path.addComment("leading", value_to_get.toString())
            }
        }
    }
})

fs.writeFileSync("deobfuscated.js", generate(ast).code)

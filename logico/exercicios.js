/*
1) Implemente um método que crie um novo array baseado nos valores passados.
Entradas do método (3,a), Resultado do método: ['a', 'a', 'a']
*/
function ex1(quant, valor) {
    var array = new Array(quant);
    for (var i = 0; i < array.length; i++) {
        array[i] = valor;
    }
    return array;
}

/*
2) Implemente um método que inverta um array, não utilize métodos nativos do array.
Entrada do método ([1,2,3,4]), Resultado do método: [4,3,2,1]
*/
function ex2(array) {
    for (var i = 0; i < array.length / 2; i++) {
        var temp = array[i];
        array[i] = array[array.length - i - 1];
        array[array.length - i - 1] = temp;
    }
    return array;
}

/*
3) Implemente um método que limpe os itens desnecessários de um array (false, undefined, strings vazias, zero, null).
Entrada do método ([1,2,'', undefined]), Resultado do método: [1,2]
*/
function ex3(array) {
    var newarray = new Array();
    for (var i = 0; i < array.length; i++) {
        switch (array[i]) {
            case "":
            case null:
            case undefined:
            case false:
            case 0:
                break;
            default:
                newarray.push(array[i]);
                break;
        }
    }
    return newarray;
}

/*
4) Implemente um método que a partir de um array de arrays, converta em um objeto com chave e valor.
Entrada do método ([["c",2],["d",4]]), Resultado do métdodo: {c:2, d:4}
*/
function ex4(array) {
    var chaveValor = new Object();
    for (var i = 0; i < array.length; i++) {
        chaveValor[array[i][0]] = array[i][1];
    }
    return chaveValor;
}

/*
5) Implemente um método que retorne um array, sem os itens passados por parâmetro depois do array de entrada. Entrada do método ([5,4,3,2,5], 5,3), Resultado do método: [4,2]
*/
function ex5(array, ...array2) {
    var newarray = new Array();
    for (var i = 0; i < array.length; i++) {
        if (array2.find((value, index, obj) => value === array[i]) == undefined) {
            newarray.push(array[i])
        }
    }
    return newarray;
}

/*
6) Implemente um método que retorne um array, sem valores duplicados.
Entrada do método ([1,2,3,3,2,4,5,4,7,3]), Resultado do método: [1,2,3,4,5,7]
*/
function ex6(array) {
    var set = new Set(array)
    return Array.from(set);
}

/*
7) Implemente um método que compare a igualdade de dois arrays e retorne um valor booleano.
Entrada do método ([1,2,3,4],[1,2,3,4]), Resultado do método: true
*/
function ex7(array, array2) {
    if (array2 == array) {
        return true;
    }
    if (array2.length != array.length) {
        return false;
    }
    for (var i = 0; i < array.length; i++) {
        if (array[i] != array2[i]) {
            return false;
        }
    }
    return true;
}

/*
8) Implemente um método que remova os aninhamentos de um array de arrays para um array unico.
Entrada do método ([1, 2, [3], [4, 5]]), Resultado do método: [1, 2, 3, 4, 5]
*/
function ex8(array) {
    var newarray = new Array();
    var lerarray = function (ar) {
        for (var i = 0; i < ar.length; i++) {
            if (typeof ar[i] == "object") {
                lerarray(ar[i]);
            } else {
                newarray.push(ar[i]);
            }
        }
    }
    lerarray(array);
    return newarray;
}

/*
9) Implemente um método divida um array por uma quantidade passada por parâmetro.
Entrada do método ([1, 2, 3, 4, 5], 2), Resultado do método: [[1, 2], [3, 4], [5]]
*/
function ex9(array, quoc) {
    var newarray = new Array();
    for (var i = 0; i < array.length; i++) {
        if (i % quoc == 0) {
            var ar = new Array();
        }
        ar.push(array[i])
        if (i % quoc == quoc - 1 || i == array.length - 1) {
            newarray.push(ar)
        }
    }
    return newarray;
}

/*
10) Implemente um método que encontre os valores comuns entre dois arrays.
Entrada do método ([6, 8], [8, 9]), Resultado do método: [8]
*/
function ex10(array, array2) {
    var set = new Set();
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array2.length; j++) {
            if (array2[j] == array[i]) {
                set.add(array[i]);
            }
        }
    }
    return Array.from(set);
}

console.log("resultado 1", JSON.stringify(ex1(3, 'a')));
console.log("resultado 2", JSON.stringify(ex2([1, 2, 3, 4])));
console.log("resultado 3", JSON.stringify(ex3([1, 2, '', undefined])));
console.log("resultado 4", JSON.stringify(ex4([["c", 2], ["d", 4]])));
console.log("resultado 5", JSON.stringify(ex5([5, 4, 3, 2, 5], 5, 3)));
console.log("resultado 6", JSON.stringify(ex6([1, 2, 3, 3, 2, 4, 5, 4, 7, 3])));
console.log("resultado 7", JSON.stringify(ex7([1, 2, 3, 4], [1, 2, 3, 4])));
console.log("resultado 8", JSON.stringify(ex8([1, 2, [3], [4, 5]])));
console.log("resultado 9", JSON.stringify(ex9([1, 2, 3, 4, 5], 2)));
console.log("resultado 10", JSON.stringify(ex10([6, 8], [8, 9])));
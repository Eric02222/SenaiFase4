
function criarconjuntoPersonagens(personagens) {
    let conjunto = personagens.map(personagens => personagens.toLowerCase())
    console.log('Conjunto inicial: ', conjunto)

    return conjunto;
}

function adicionarPersonagemPatolino(personagens) {
    if (personagens.length < 3 && !personagens.includes('patolino')) {
        personagens.push('patolino')
        console.log("Patolino foi adicionado: ", personagens)
    } else {
        console.log("Patolino não foi adicionado: ", personagens)
    }

}



function organizarOrdemAlfabetica(personagens) {
    personagens.sort();
    console.log('Lista Ordenada: ', personagens)
    return personagens
}


function liderPrimeiraPosição(personagens, lider) {
    if (lider) {
        lider = lider.toLowerCase()
    } else {
        lider = 'lanterna-verde'
    }

    for (let i = 0; i < personagens.length; i++) {
        personagens[i] = personagens[i]
    }

    if (personagens.includes(lider)) {
        personagens = personagens.filter(personagem => personagem !== lider)
    }
    personagens.unshift(lider)
    console.log('Lider definido: ', lider)
    console.log('Lista atualizada: ', personagens)
    return personagens
}


function adicionarFrajola(personagens) {
    const existeComF = personagens.some(nome => nome.toLowerCase().startsWith('f'))

    if (!existeComF) {
        personagens.push('frajola')
        console.log("Frajola adicionado: ", personagens)
    } else {
        console.log("ja existe personagem com a letra F: ", personagens)
    }
}



function montarEquipe(personagens) {
    // 1. criar uma variavel de personagens
    let conjunto = criarconjuntoPersonagens(personagens)

    // 2. Adiciona 0 "Patolino"
    adicionarPersonagemPatolino(conjunto)

    // 3. organizar em ordem alfabetica
    organizarOrdemAlfabetica(conjunto)

    // 4.
    conjunto = liderPrimeiraPosição(conjunto, 'joão')

    // 5. Adiciona o Frajola
    adicionarFrajola(conjunto)

}


montarEquipe(['João', 'Carlos', 'Fabio'])


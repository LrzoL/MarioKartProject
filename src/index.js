const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};
const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};
const player3 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
};
const player4 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};
const player5 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
};
const player6 = {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    if (random < 0.33) return "RETA";
    else if (random < 0.66) return "CURVA";
    else return "CONFRONTO";
}

async function logRollResult(characterName, atributo, diceResult, attributeValue) {
    console.log(` ${characterName} rolou um dado 🎲 de ${atributo}: ${diceResult} + ${attributeValue} = ${diceResult + attributeValue}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`\n🏁 Rodada ${round}`);

        const block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        const diceResult1 = await rollDice();
        const diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = character1.VELOCIDADE + diceResult1;
            totalTestSkill2 = character2.VELOCIDADE + diceResult2;

            await logRollResult(character1.NOME, "VELOCIDADE", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "VELOCIDADE", diceResult2, character2.VELOCIDADE);
        }

        else if (block === "CURVA") {
            totalTestSkill1 = character1.MANOBRABILIDADE + diceResult1;
            totalTestSkill2 = character2.MANOBRABILIDADE + diceResult2;

            await logRollResult(character1.NOME, "MANOBRABILIDADE", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "MANOBRABILIDADE", diceResult2, character2.MANOBRABILIDADE);
        }

        else if (block === "CONFRONTO") {
            const powerResult1 = character1.PODER + diceResult1;
            const powerResult2 = character2.PODER + diceResult2;

            await logRollResult(character1.NOME, "PODER", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "PODER", diceResult2, character2.PODER);

            console.log(`${character1.NOME} confrontou ${character2.NOME} com um poder de ${powerResult1} contra ${powerResult2}`);

            if (powerResult1 > powerResult2) {
                if (character2.PONTOS > 0) {
                    character2.PONTOS--;
                    console.log(`${character2.NOME} perdeu um ponto!`);
                } else {
                    console.log(`${character2.NOME} não tem pontos para perder.`);
                }
            } else if (powerResult2 > powerResult1) {
                if (character1.PONTOS > 0) {
                    character1.PONTOS--;
                    console.log(`${character1.NOME} perdeu um ponto!🐢 `);
                } else {
                    console.log(`${character1.NOME} não tem pontos para perder.`);
                }
            } else {
                console.log("Empate no confronto! Ninguém perdeu ponto.\n");
            }

            console.log("-----------------------------------------------------------------------");
            continue; // não há pontuação positiva em confrontos, então pula para próxima rodada
        }

        // Verificação do vencedor da rodada (somente RETA ou CURVA)
        console.log(`\n🏁 Resultado da rodada:`);
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} fez um ponto!`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} fez um ponto!`);
            character2.PONTOS++;
        } else {
            console.log("Empate! Ninguém fez ponto.\n");
        }

        console.log("-----------------------------------------------------------------------");
    }

    // Resultado final
    console.log(`\n🏆 Pontuação Final:`);
    console.log(`${character1.NOME}: ${character1.PONTOS} pontos`);
    console.log(`${character2.NOME}: ${character2.PONTOS} pontos`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n🥇 ${character1.NOME} venceu a corrida!`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n🥇 ${character2.NOME} venceu a corrida!`);
    } else {
        console.log(`\n🤝 A corrida terminou empatada!`);
    }
}

// função principal e autoexecutável
(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`
    );
    await playRaceEngine(player1, player2);
})();

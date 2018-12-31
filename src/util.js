import config from '../config.js';

const sumArray = (array) => array.reduce((a, b) => a + b, 0);

function parsePlayers(data = []) {
    return data.map(player => ({
        id: String(player.id),
        name: String(player.name),
        score: Number(player.total),
        cls: String(player.class)
    }));
}

export function calculateScores (players = []) {
    const scores = players.map(player => player.score);
    const scoreSum = sumArray(scores);
    const max = Math.max(...scores);
    return players
        .sort((a, b) => b.score - a.score)
        .map((player, index) => ({
            ...player,
            rank: index + 1,
            width: player.score / max * 100,
            pct: player.score / scoreSum * 100
        }));
};

export async function fetchPlayers() {
    try {
        const url = config.url;
        const opts = {
            method: 'GET',
            headers: {
                'authorization': config.authorization,
                'steroidsapikey': config.steroidsapikey,
                'steroidsappid': config.steroidsappid,
            }
        };

        const res = await fetch(url, opts);
        const data = await res.json();
        const players = calculateScores(parsePlayers(data.objects));
        return players;
    } catch (e) {
        console.error(e);
        return [];
    }
}

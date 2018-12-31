import { calculateScores } from './util.js';

const classes = [
    'deathknight',
    'demonhunter',
    'druid',
    'hunter',
    'mage',
    'monk',
    'paladin',
    'priest',
    'rogue',
    'shaman',
    'warlock',
    'warrior'
];

const generateMockPlayer = (_, i) => ({
    id: String(i + 1),
    name: String(i + 1),
    score: Math.floor(Math.random() * 30) + 1,
    cls: classes[Math.floor(Math.random() * classes.length)]
});

export const generateMockPlayers = (n) => calculateScores(Array(n).fill().map(generateMockPlayer));

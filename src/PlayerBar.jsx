import React from 'react';

export default function PlayerBar({ name, cls, rank, width, score, pct }) {
    const _width = `calc(${width}% - 20px)`;
    const _pct = `${Math.round(pct * 10) / 10}%`;

    return (
        <div
            className={`bar ${cls}`}
            style={{ width: _width }}
        >
            <div className="name">
                {rank}. {name}
            </div>
            <div className="score">
                {score} ({_pct})
            </div>
        </div>
    );
}
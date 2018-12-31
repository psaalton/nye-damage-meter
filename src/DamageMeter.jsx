import React from 'react';
import PlayerBar from './PlayerBar';
import { fetchPlayers } from './util.js';

export default class DamageMeterContainer extends React.Component {
    constructor() {
        super();
        this.state = { players: [] };
        this.updateData = this.updateData.bind(this);
    }

    componentDidMount() {
        const interval = 5000;
        this.poller = setInterval(this.updateData, interval);
        console.log(`Initialized poller to ${interval} ms`);
        this.updateData();
    }

    componentWillUnmount() {
        clearInterval(this.poller);
        console.log('Cleared poller');
    }

    async updateData() {
        const newState = {
            players: await fetchPlayers()
        };
        this.setState(() => newState);
        console.log('Data updated', new Date().toISOString());
    }

    render() {
        return (
            <DamageMeter players={this.state.players} />
        )
    }
}

function DamageMeter({ players }) {
    return (
        <div className="damage-meter">
            <p className="title">Damage: current night</p>
            <div className="graph-container">
                {players && players.map((player) => (
                    <PlayerBar
                        {...player}
                        key={player.id}
                    />
                ))}
            </div>
        </div>
    );
}

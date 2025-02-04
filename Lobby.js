import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Lobby() {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [players, setPlayers] = useState([]);
  
  const games = ["Zoomed-in Picture", "Trivia", "Puzzle Race"];

  const handleJoin = () => {
    if (name.trim()) {
      setPlayers([...players, name]);
      setJoined(true);
    }
  };

  const divideTeams = (playersList, teamSize = 4) => {
    let shuffled = [...playersList].sort(() => Math.random() - 0.5);
    let teams = [];
    while (shuffled.length) {
      teams.push(shuffled.splice(0, teamSize));
    }
    return teams;
  };

  return (
    <div className="relative flex flex-col items-center p-4 bg-cover bg-center min-h-screen text-white" style={{ backgroundImage: "url('/fun-friday-turner.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <h1 className="relative text-4xl font-bold mb-6 text-center drop-shadow-lg">Fun Friday Turner</h1>
      {!joined ? (
        <Card className="relative p-6 w-80 text-center bg-opacity-90 bg-white">
          <CardContent>
            <h2 className="text-xl font-bold mb-4 text-black">Enter Your Name</h2>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="mb-4"
            />
            <Button onClick={handleJoin} disabled={!name.trim()}>
              Join Lobby
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="relative w-full max-w-md bg-opacity-90 bg-white p-4 rounded-lg text-black">
          <h2 className="text-2xl font-bold mb-4">Welcome, {name}!</h2>
          <h3 className="text-lg font-semibold mb-2">Players in Lobby:</h3>
          <ul className="mb-4">
            {players.map((player, index) => (
              <li key={index} className="text-lg">{player}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-2">Choose a Game:</h3>
          <div className="grid gap-2">
            {games.map((game) => (
              <Button key={game} className="w-full">
                {game}
              </Button>
            ))}
          </div>
          <h3 className="text-lg font-semibold mt-4">Teams:</h3>
          {divideTeams(players).map((team, idx) => (
            <div key={idx} className="mb-2">
              <h4 className="font-bold">Team {idx + 1}:</h4>
              <ul>
                {team.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

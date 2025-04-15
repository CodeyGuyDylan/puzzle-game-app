import Game from "./components/game";

export default function Home() {

  return (
    <div className="size-full">
      <h1 className="text-5xl font-bold text-center p-4">Puzzle Game</h1>
      <Game />
    </div>
  );
}

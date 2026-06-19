type FinaleProps = {
  dadName: string;
  message: string;
  onMemories: () => void;
  onReplay: () => void;
};

export function Finale({ dadName, message, onMemories, onReplay }: FinaleProps) {
  return (
    <main className="finale">
      <div className="finale__stars" aria-hidden="true">✦ · ✧ · ✦</div>
      <p className="finale__kicker">For all the moments behind the numbers</p>
      <h1>Happy Father’s Day,<br /><em>{dadName}.</em></h1>
      <p className="finale__message">{message}</p>
      <div className="finale__actions">
        <button onClick={onMemories}>See the memories again</button>
        <button className="button-quiet" onClick={onReplay}>Replay Dad Wrapped</button>
      </div>
    </main>
  );
}

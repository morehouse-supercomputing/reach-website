type Props = { className?: string };

/** In-progress notice. Explains the placeholders to anyone we share the site with. */
export default function StatusNote({ className }: Props) {
  return (
    <aside className={`statnote${className ? " " + className : ""}`}>
      <span className="statnote-mk" />
      <p>
        <strong>Where we are.</strong> This site is in progress. We are waiting on
        photographs from the workshops, outcome data, and model card information to fill
        the gaps you will notice here, including the gallery and the leaderboard.
      </p>
    </aside>
  );
}

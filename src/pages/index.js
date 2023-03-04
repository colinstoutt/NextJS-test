import Link from "next/link";
import fetch from "isomorphic-unfetch";

const Index = ({ notes }) => {
  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className="grid wrapper">
        {notes.map((note) => {
          return (
            <div key={note._id}>
              <h1>
                <Link href={`/${note._id}`}>{note.title}</Link>
              </h1>
              <Link href={`/${note._id}`}>
                <button primary>View</button>
              </Link>
              <Link href={`/${note._id}/edit`}>
                <button primary>Edit</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// next specific function. runs server side, allows us to run some code
// before the actual component gets rendered out to the page.
Index.getInitialProps = async () => {
  const res = await fetch(
    "https://next-js-test-seven-beta.vercel.app/api/notes"
  );
  const { data } = await res.json();

  return { notes: data };
};

export default Index;

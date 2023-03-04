import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader } from "semantic-ui-react";

const Note = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteNote = async () => {
    const noteId = router.query.id;
    try {
      const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  return (
    <div className="note-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <button onClick={open}>Delete</button>
        </>
      )}
      <Confirm
        className="sure"
        open={confirm}
        onCancel={close}
        onConfirm={handleDelete}
      />
    </div>
  );
};

Note.getInitialProps = async ({ query: { id } }) => {
  let res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();

  return { note: data };
};

export default Note;

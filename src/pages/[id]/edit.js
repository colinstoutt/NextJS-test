import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

const EditNote = ({ note }) => {
  const [form, setForm] = useState({
    title: note.title,
    description: note.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        UpdateNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const UpdateNote = async () => {
    try {
      const res = await fetch(
        `https://next-js-test-seven-beta.vercel.app/api/notes/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }

    return err;
  };

  return (
    <div className="form-container">
      <h1>Create Note</h1>
      <div>
        {isSubmitting ? (
          <h1>Loading...</h1>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" }
                  : null
              }
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={form.title}
            />
            <textarea
              placeholder="Description"
              name="description"
              error={
                errors.description
                  ? { content: "Please enter a description", pointing: "below" }
                  : null
              }
              onChange={handleChange}
              value={form.description}
            />
            <button type="submit">Update</button>
          </form>
        )}
      </div>
    </div>
  );
};

EditNote.getInitialProps = async ({ query: { id } }) => {
  let res = await fetch(
    `https://next-js-test-seven-beta.vercel.app/api/notes/${id}`
  );
  const { data } = await res.json();
  return { note: data };
};

export default EditNote;

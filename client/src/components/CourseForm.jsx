import { useState, useEffect } from "react";
import { isSafeUrl } from "./../utilis";

export default function CourseForm({ initialValues, onSubmit, submitText }) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [imagelink, setImagelink] = useState(initialValues?.imagelink || "");
  const [published, setPublished] = useState(initialValues?.published || false);
  const [link, setLink] = useState(initialValues?.link || "");

  useEffect(() => {
    setTitle(initialValues?.title || "");
    setDescription(initialValues?.description || "");
    setImagelink(initialValues?.imagelink || "");
    setPublished(initialValues?.published || false);
    setLink(initialValues?.link || "");
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imagelink && !isSafeUrl(imagelink)) {
      alert("Invalid image URL!");
      return;
    }
    if (link && !isSafeUrl(link)) {
      alert("Invalid course link!");
      return;
    }

    onSubmit({
      title,
      description,
      imagelink,
      published,
      link
    });
  };

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <label>Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Course Title"
        required
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows={4}
        required
      ></textarea>

      <label>Image URL</label>
      <input
        value={imagelink}
        onChange={(e) => setImagelink(e.target.value)}
        placeholder="https://..."
      />

      <label>Course Link</label>
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://..."
      />

      <label>
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Published
      </label>

      <button type="submit">{submitText}</button>
    </form>
  );
}

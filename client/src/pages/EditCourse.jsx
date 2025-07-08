import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CourseForm from "../components/CourseForm";

export default function EditCourse() {
  const { title } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const [originalTitle, setOriginalTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/admin/courses", { withCredentials: true }).then((res) => {
      const course = res.data.find((c) => c.title === title);
      setInitialValues(course || {});
      setOriginalTitle(course?.title || "");
    });
  }, [title]);

  const handleUpdate = async (data) => {
    const res = await axios.put(
      `/admin/courses/${originalTitle}`,
      {
        new_title: data.title,
        new_d: data.description,
        new_img: data.imagelink,
        new_published: data.published,
        new_link: data.link,
      },
      { withCredentials: true }
    );

    // ✅ Update original title for future edits
    setOriginalTitle(res.data.title);

    navigate("/admin/courses");
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Course</h2>
      <CourseForm
        initialValues={initialValues}
        onSubmit={handleUpdate}
        submitText="Update Course"
      />
    </div>
  );
}

import CourseForm from "../components/CourseForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await axios.post(
      "/admin/courses",
      {
        title: data.title,
        description: data.description,
        imagelink: data.imagelink,
        published: data.published,
        link: data.link,
      },
      { withCredentials: true }
    );
    navigate("/admin/courses");
  };

  return (
    <div>
      <h2>Create Course</h2>
      <CourseForm
        initialValues={{}}
        onSubmit={handleCreate}
        submitText="Create Course"
      />
    </div>
  );
}

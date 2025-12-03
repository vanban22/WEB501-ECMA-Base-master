import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.includes("@")) {
      alert("Email không hợp lệ");
      return;
    }
    if (form.password.length < 6) {
      alert("Mật khẩu tối thiểu 6 ký tự");
      return;
    }

    try {
      await axios.post("http://localhost:3000/users", form);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow border rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="w-full border px-3 py-2 rounded"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;

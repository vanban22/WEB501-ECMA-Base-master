import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
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

    try {
      const { data } = await axios.get(
        `http://localhost:3000/users?email=${form.email}&password=${form.password}`
      );

      if (data.length === 0) {
        alert("Sai tài khoản hoặc mật khẩu!");
        return;
      }

      // Lưu token giả
      localStorage.setItem("token", "login_success_token");

      alert("Đăng nhập thành công!");
      navigate("/list");
    } catch (error) {
      console.log(error);
      alert("Đăng nhập thất bại!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow border rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>

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
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;

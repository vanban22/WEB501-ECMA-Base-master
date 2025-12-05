import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    destination: "",
    duration: "",
    description: "",
    available: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:3000/tours/${id}`);
      setFormData(data);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/tours/${id}`, {
        ...formData,
        price: Number(formData.price),
        available: Number(formData.available),
      });

      
      navigate("/list");
    } catch (error) {
      alert("Cập nhật thất bại!");
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Cập nhật Tour
      </h2>

      <form onSubmit={handleSubmit}>
        
        {/* Tên Tour */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Tên Tour</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Điểm đến */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Điểm đến</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Thời gian */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Thời gian</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Giá */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Giá (VNĐ)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Ảnh */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Link ảnh</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Chỗ trống */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Số chỗ còn lại</label>
          <input
            type="number"
            name="available"
            value={formData.available}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Mô tả */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Cập nhật Tour
        </button>
      </form>
    </div>
  );
};

export default Edit;

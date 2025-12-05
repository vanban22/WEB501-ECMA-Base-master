import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const TourAdd = () => {
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
      await axios.post("http://localhost:3000/tours", {
        ...formData,
        price: Number(formData.price) || 0,
        available: Number(formData.available) || 0,
      });
      toast.success('thành cong')
      // toast.error('lhsdhhd')
      navigate("/list");
    } catch (error) {
      toast.error("Lỗi:", error);
    }
  };


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Thêm Tour Mới
      </h2>

      <form onSubmit={handleSubmit}>

        {/* Tên Tour */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tên Tour</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Ví dụ: Hà Nội - Sapa 3N2D"
            required
          />
        </div>

        {/* Điểm đến */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Điểm đến</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Ví dụ: Sapa"
            required
          />
        </div>

        {/* Thời gian */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Thời gian</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Ví dụ: 3 ngày 2 đêm"
            required
          />
        </div>

        {/* Giá */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Giá</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Ví dụ: 2500000"
            required
          />
        </div>

        {/* Ảnh */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Link Ảnh</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="https://picsum.photos/400/300?random=1"
          />
        </div>

        {/* Số chỗ trống */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Số chỗ còn lại
          </label>
          <input
            type="number"
            name="available"
            value={formData.available}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Ví dụ: 15"
            required
          />
        </div>

        {/* Mô tả */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Khám phá Sapa với ruộng bậc thang tuyệt đẹp..."
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Thêm Tour
        </button>
      </form>
    </div>
  );
};

export default TourAdd;

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function ListPage() {
  const [tours, setTours] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getTours = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/tours')
        setTours(data)
      } catch (error) {
        toast.error(error.message)
      }
    }
    getTours()
  }, [])

  const handleDelete = async id => {
    try {
      if (confirm('Bạn chắc chắn muốn xóa tour này?')) {
        await axios.delete(`http://localhost:3000/tours/${id}`)
        setTours(prev => prev.filter(tour => tour.id !== id))
        toast.success('Đã xóa thành công')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const filteredTours = tours.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Danh sách</h1>

      {/*tìm kiếm */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Nhập tên tour..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border px-4 py-2 rounded w-80"
        />

        <button
          onClick={() => setSearch(searchInput)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tìm kiếm
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Điểm đến</th>
              <th className="px-4 py-2 border">Thời gian</th>
              <th className="px-4 py-2 border">Giá</th>
              <th className="px-4 py-2 border">Ảnh</th>
              <th className="px-4 py-2 border">Chỗ</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredTours.map(tour => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{tour.id}</td>
                <td className="px-4 py-2 border font-medium">{tour.name}</td>
                <td className="px-4 py-2 border">{tour.destination}</td>
                <td className="px-4 py-2 border">{tour.duration}</td>
                <td className="px-4 py-2 border">{tour.price.toLocaleString()}đ</td>
                <td className="px-4 py-2 border">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border">{tour.available}</td>
                <td className="px-4 py-2 border">
                  <a
                    href={`/edit/${tour.id}`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ListPage;

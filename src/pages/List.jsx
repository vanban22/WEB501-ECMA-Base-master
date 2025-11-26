import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

function ListPage() {
  const [tours, setTours] = useState([])

  useEffect(() => {
    const getTours = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/tours')
        setTours(data)
      } catch (error) {
        toast.error(error.message)   // ⬅ SỬA LỖI
      }
    }
    getTours()
  }, [])

  const handleDelete = async id => {
    try {
      if (confirm('Tao muon xoa tour nay')) {
        await axios.delete(`http://localhost:3000/tours/${id}`)
        setTours(prev => prev.filter(tour => tour.id !== id))
        toast.success('Ok tao da xoa duoc roi')
      }
    } catch (error) {
      toast.error(error.message)   // ⬅ SỬA LỖI
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Destination</th>
              <th className="px-4 py-2 border">Duration</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Available</th>
              <th className="px-4 py-2 border">Handle</th>
            </tr>
          </thead>


          <tbody>
            {tours.map(tour => (
              <tr key={tour.id} className="hover:bg-gray-50">

                <td className="px-4 py-2 border border-gray-300">{tour.id}</td>

                <td className="px-4 py-2 border border-gray-300 font-medium">
                  {tour.name}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {tour.destination}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {tour.duration}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {tour.price.toLocaleString()}đ
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {tour.available}
                </td>

                <td className="px-4 py-2 border border-gray-300">
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
  )
}

export default ListPage

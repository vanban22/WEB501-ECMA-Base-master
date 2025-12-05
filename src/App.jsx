import { Toaster } from 'react-hot-toast'
import { Routes, Route, Link } from 'react-router-dom'
import ListPage from './pages/List'
import AddTour from './pages/Add'
import Edit from "./pages/Edit"
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from './layouts/Adminlayout'
function App() {
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

          <Link to="/" className="text-xl font-semibold">
            <strong>WEB501 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">Trang chủ</Link>
            <Link to="/list" className="hover:text-gray-200">Danh sách</Link>
            <Link to="/add" className="hover:text-gray-200">Thêm mới</Link>
          </div>

          {/* NÚT ĐĂNG XUẤT / LOGIN */}
          <div className="hidden md:flex items-center space-x-6">
            {localStorage.getItem("token") ? (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="hover:text-gray-200"
              >
                Đăng xuất
              </button>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200">Đăng nhập</Link>
                <Link to="/register" className="hover:text-gray-200">Đăng ký</Link>
              </>
            )}
          </div>


        </div>
      </nav>


      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB501</h1>
        <p className="text-lg text-gray-600">Ứng dụng quản lý dữ liệu</p>

        <Routes>
          {/* <Route element={<Adminlayout />}>
            <Route path="/list" element={<ListPage />} />
            <Route path="/add" element={<AddTour />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route> */}
          <Route element={<AdminLayout />} >
            <Route path="/list" element={<ListPage />} />
            <Route path="/add" element={<AddTour />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <Toaster />
    </>
  )
}

export default App

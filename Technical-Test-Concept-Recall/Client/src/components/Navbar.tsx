import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate()
  const logout_Handle = () => {
    // localStorage.setItem('isLoggedIn', 'false');
    navigate('/Login')
  }
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">

              <span className="text-xl font-semibold">Tasks</span>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={logout_Handle} className="bg-slate-500 text-white px-3 py-2 rounded-md text-sm font-medium border-2 border-slate-500  hover:bg-transparent hover:text-slate-500" >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login =({ setToken }: { setToken: (token: string) => void }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login_Submit_Handle = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<{ token: string, error?: string }> = await axios.post('http://localhost:8000/login', {
        email,
        password
      });
      const { data } = response;
      setToken(data.token);
      if (data.error) {
        toast.error(data.error);
      } else {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);

        setEmail('');
        setPassword('');
        navigate('/');

        toast.success('Logged in successfully!');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-500">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="text-center text-3xl font-semiboldbold">
          <i className="fa-solid fa-user mx-2"></i>Login
        </h1>
        <hr className="mt-3" />
        <form onSubmit={Login_Submit_Handle}>
          <div className="mt-3">
            <label className="block text-base mb-2">Email</label>
            <input
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block text-base mb-2">Password</label>
            <input
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <button
              className="border-2 border-slate-500 bg-slate-500 py-1 px-5 w-full font-semibold rounded-md hover:bg-transparent hover:text-slate-500"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-5">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="text-slate-500">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-yellow-100 text-gray-800 p-6">
      <img
        src="https://i.ibb.co/b514VQrb/png-clipart-computer-icons-error-information-error-angle-triangle-thumbnail-removebg-preview.png"
        alt="404 Not Found"
        className="w-80 md:w-[400px] mb-6"
      />

      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Oops! Page not found
      </h2>
      <p className="text-lg text-center max-w-xl mb-6">
        The page you're looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
      >
        <FaArrowLeft />
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;

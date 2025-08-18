import React from "react";

const Newsletter = () => {
  return (
    <section className=" py-16 px-6 ">
      <div className="max-w-11/12 mx-auto text-center text-black">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 ">
          Subscribe to our Newsletter
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Get the latest updates, stories, and opportunities delivered to your
          inbox.
        </p>

        {/* Form */}
        <form className="flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-300 "
            required
          />
          <button
            type="submit"
            className="  rounded-xl shadow-md  bg-primary text-white px-6 py-3  font-semibold hover:bg-secondary hover:text-black transition"
          >
            Subscribe
          </button>
        </form>

        {/* Privacy Note */}
        <p className="mt-4 text-sm opacity-80">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;

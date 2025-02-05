// for form https://ant.design/components/form

const LoginForm = () => {
  return (
    <div className="w-full">
      {/* <div className="w-full max-w-sm min-w-[200px]">
        <label htmlFor="Name">Name</label>
        <input
          className="w-full bg-transparent placeholder:text-red-400 text-red-700 text-sm border border-red-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-red-500 hover:border-red-300 shadow-sm focus:shadow"
          placeholder="Name"
        />
      </div> */}
      <div className="flex flex-col flex-1 gap-4 w-full items-center mt-12">
        <h2 className="text-xl font-medium">Login form</h2>
        <div className="w-full max-w-xs min-w-[200px] flex flex-col gap-2">
          <label htmlFor="Name">Name</label>
          <input
            className="w-full bg-transparent text-sm border border-gray-700 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-black hover:border-gray-950 shadow-sm focus:shadow"
            placeholder="Name"
            id="Name"
            name="Name"
          />
        </div>
        <div className="w-full max-w-xs min-w-[200px] flex flex-col gap-2">
          <label htmlFor="Password">Password</label>
          <input
            className="w-full bg-transparent text-sm border border-gray-700 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-black hover:border-gray-950 shadow-sm focus:shadow"
            placeholder="Password"
            id="Password"
            name="Password"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

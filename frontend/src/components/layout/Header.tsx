const Header = () => (
    <header className="bg-gray-800 p-4 shadow-md">
      <div className="relative flex items-center justify-center w-full">
        {/* Logo on the left */}
        <img
          src="src/assets/library.png"
          alt="Logo"
          className="w-10 h-10 absolute left-4 top-1/2 transform -translate-y-1/2"
        />
  
        {/* Centered text */}
        <h1 className="text-center text-white font-semibold text-base sm:text-lg md:text-xl px-4">
          Welcome to librarian dashboard, a platform to manage a library
        </h1>
      </div>
    </header>
  );
  
  export default Header;
  












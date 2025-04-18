const Header = () => (
    <header className="bg-gray-800 p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3 w-full justify-center relative">
        <img
          src="src/assets/library.png"
          alt="Logo"
          className="w-10 h-10 absolute left-0"
        />
        <h1 className="text-lg font-semibold text-white">
          Welcome to librarian dashboard, a platform to manage a library
        </h1>
      </div>
    </header>
  );
  
  export default Header;






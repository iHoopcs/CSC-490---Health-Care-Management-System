import { Link } from 'react-router-dom';

/**
  * The primary page of the application allowing the user to navigate
  * to all features of the web application
*/
function Home() {
  return (
    <div>
      <h1 className="text-center">Welcome to the Health Care Management Web App!</h1>
      <Link to="/testpage">
        <button>Go to Test Page</button>
      </Link>
    </div>
  );
}

export default Home;

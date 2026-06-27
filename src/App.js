// import logo from './logo.svg';
import './App.css';
import './input.css';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import Main from './Main/Main';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from './routes';
import DeleteModal from './Element/DeleteModal';
import "./cms.css";
import Register from './Register';

// import "@mui/icons-material";
// import "tailwindcss";

function App() {
 const router=useRoutes(routes)
   const location = useLocation(); // گرفتن مسیر فعلی

  const isRegisterPage = location.pathname === "/";
const hiddenLayoutRoutes = ["/", "/login"];
const isHiddenLayout = hiddenLayoutRoutes.includes(location.pathname);

   return (
    <>
      {/* فقط وقتی صفحه register نیست، Header و Navbar و Main را نشان بده */}
      {! isHiddenLayout && <Header />}
      
      <div>
        {! isHiddenLayout && <Navbar />}
        {! isHiddenLayout && <Main />}

        {router}
      </div>
    </>
  );
}



export default App;

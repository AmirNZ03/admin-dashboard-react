import Pishkhan from "./Pishkhan/Pishkhan";
import Form from "./Form/Form";
import Element from "./Element/Element";
import Table from "./Table/Table";
import Chart from "./Chart/Chart";
import Page from "./Page/Page";
import Takhfif from "./Takhfif/Takhfif";
import Register from "./Register";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute.";


const routes=[


    // {path:"/",element:<Register/>},
    {path:"/",element:<Login/>},
    {path:"/login",element:<Login/>},

  { path: "/main", element: <PrivateRoute><Pishkhan /></PrivateRoute> },
    { path: "/edit-password", element: <PrivateRoute><Form /></PrivateRoute> },

      { path: "/products", element: <PrivateRoute><Element /></PrivateRoute> },
      { path: "/chat", element: <PrivateRoute><Table /></PrivateRoute> },
      { path: "/edit-profile", element: <PrivateRoute><Chart /></PrivateRoute> },
      { path: "/users", element: <PrivateRoute><Page /></PrivateRoute> },
      { path: "/takhfif", element: <PrivateRoute><Takhfif /></PrivateRoute> },

    // {path:"/edit-password",element:<Form/>},
    // {path:"/products",element:<Element/>},
    // {path:"/chat",element:<Table/>},
    // {path:"/edit-profile",element:<Chart/>},
    // {path:"/users",element:<Page/>},
    // {path:"/takhfif",element:<Takhfif/>},
    // {path:"/login",element:<Login/>},
    
];
export default routes;
import './App.css'
import Main from './components/Main';
import Login from "./components/TenantManagement";
import LoginVerification from "./components/CompanyManagement";

function App() {

      const path = window.location.pathname.replace(/\/+$/, "");
    if (path === "/tenants") return <Login />;
    if (path === "/company") return <LoginVerification />
    return <Main />;
  
}

export default App

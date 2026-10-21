import './App.css'
import Main from './components/Main';
import TenantsPage from "./components/tenantssection";
import LoginVerification from "./components/CompanyManagement";

function App() {

      const path = window.location.pathname.replace(/\/+$/, "");
    if (path === "/tenants") return <TenantsPage />;
    if (path === "/company") return <LoginVerification />
    return <Main />;
  
}

export default App

import './App.css'
import Main from './components/Main';
import TenantsPage from "./components/tenantssection";

function App() {

      const path = window.location.pathname.replace(/\/+$/, "");
    if (path === "/tenants") return <TenantsPage />;
    return <Main />;
  
}

export default App

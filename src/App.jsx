import './App.css'
import Main from './components/Main';
import Login from "./components/TenantManagement";
import LoginVerification from "./components/CompanyManagement";
import ProductPage from "./components/ProductPage";

function App() {
  const path = window.location.pathname.replace(/\/+$/, "");

  if (path === "/tenants") return <Login />;
  if (path === "/company") return <LoginVerification />;
  if (path.startsWith("/product/")) return <ProductPage slug={path.split("/")[2]} />;

  return <Main />;
}

export default App
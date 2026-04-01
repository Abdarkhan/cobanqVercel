import { Outlet } from "react-router-dom";
import { CustomThemeProvider } from "@/theme/ThemeContext";
import Layout from "@/components/layout/Layout";
import AppLoader from "@/components/common/AppLoader";

function App() {
  return (
    <CustomThemeProvider>
      {/* Optional loader on initial app load */}
      {/* <AppLoader> */}
      {/* Layout wraps all pages with header/footer */}
      <Layout>
        {/* Nested routes will render here */}
        <Outlet />
      </Layout>
      {/* </AppLoader> */}
    </CustomThemeProvider>
  );
}

export default App;
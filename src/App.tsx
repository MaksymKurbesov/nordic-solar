import Menu from "@SharedUI/Menu/Menu.tsx";
import { Outlet } from "react-router-dom";
import Footer from "@SharedUI/Footer/Footer.tsx";
import "react-tabs/style/react-tabs.css";
import MobileMenu from "@SharedUI/Menu/MobileMenu.tsx";
import { Toaster } from "react-hot-toast";
import useHandleDynamicImportError from "@/hooks/useHandleDynamicImportError.ts";

function App() {
  useHandleDynamicImportError();

  return (
    <>
      <Menu />
      <Outlet />
      <Footer isFullFooter />
      <MobileMenu />
      <Toaster />
    </>
  );
}

export default App;

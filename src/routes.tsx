import { createBrowserRouter } from "react-router-dom";
import Products from "./pages/Products/Products.tsx";
import App from "@/App.tsx";
import { IndexPage } from "@/pages/IndexPage/IndexPage.tsx";
import SolarEnergy from "@/pages/SolarEnergy/SolarEnergy.tsx";
import AboutUs from "@/pages/AboutUs/AboutUs.tsx";
import Investments from "@/pages/Investments/Investments.tsx";
import FAQ from "@/pages/FAQ/FAQ.tsx";
import Contacts from "@/pages/Contacts/Contacts.tsx";
import SignIn from "@/pages/SignIn/SignIn.tsx";
import SignUp from "@/pages/SignUp/SignUp.tsx";
import Individual from "@/pages/Investments/Individual/Individual.tsx";
import Cabinet from "@/pages/Cabinet/Cabinet.tsx";
import MainCabinet from "@/pages/Cabinet/MainCabinet/MainCabinet.tsx";
import MakeDeposit from "@/pages/Cabinet/MakeDeposit/MakeDeposit.tsx";
import Transactions from "@/pages/Cabinet/Transactions/Transactions.tsx";
import Referrals from "@/pages/Cabinet/Referrals/Referrals.tsx";
import Withdrawn from "@/pages/Cabinet/Withdrawn/Withdrawn.tsx";
import Settings from "@/pages/Cabinet/Settings/Settings.tsx";
import ConfirmTransaction from "@/pages/ConfirmTransaction/ConfirmTransaction.tsx";
import AdminPanel from "@/pages/AdminPanel/AdminPanel.tsx";
import OpenPlan from "@/pages/Cabinet/OpenPlan/OpenPlan.tsx";
import Variants from "@/pages/Cabinet/OpenPlan/Variants.tsx";
import Plans from "@/pages/Cabinet/OpenPlan/Plans/Plans.tsx";
import OpenPlanConfirm from "@/pages/Cabinet/OpenPlan/OpenPlanConfirm.tsx";
import WalletAmount from "@/pages/Cabinet/OpenPlan/WalletAmount/WalletAmount.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/solar-energy",
        element: <SolarEnergy />,
      },
      {
        path: "/investments",
        element: <Investments />,
      },
      {
        path: "/investments/individual-investment-plans",
        element: <Individual />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/cabinet",
    element: <Cabinet />,
    children: [
      {
        path: "admin-panel",
        element: <AdminPanel />,
      },
      {
        path: "main",
        element: <MainCabinet />,
      },
      {
        path: "open-plan",
        element: <OpenPlan />,
        children: [
          {
            path: "plans",
            element: <Plans />,
          },
          {
            path: "wallet-amount",
            element: <WalletAmount />,
          },
          {
            path: "variants",
            element: <Variants />,
          },
          {
            path: "confirmation",
            element: <OpenPlanConfirm />,
          },
        ],
      },
      {
        path: "make-deposit",
        element: <MakeDeposit />,
      },
      {
        path: "make-deposit/confirm-transaction",
        element: <ConfirmTransaction />,
      },
      {
        path: "withdrawn",
        element: <Withdrawn />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "referrals",
        element: <Referrals />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default routes;

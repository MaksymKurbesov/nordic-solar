import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.tsx'
import CabinetLayout from '@/pages/Cabinet/CabinetLayout.tsx'
import {
  AboutUsPage,
  AdminPanelPage,
  ConfirmTransactionPage,
  ContactsPage,
  DocumentsPage,
  FAQPage,
  IndexPage,
  InvestmentPage,
  InvestmentsPage,
  MainCabinetPage,
  MakeDepositPage,
  OpenPlanPage,
  ProductPage,
  ProductsPage,
  ReferralsPage,
  SettingsPage,
  SignInPage,
  SignUpPage,
  TransactionsPage,
  WithdrawnPage,
} from '@/lazyPages.ts'
import { Suspense } from 'react'
import Partners from '@/pages/Partners/Partners.tsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <IndexPage />
          </Suspense>
        ),
      },
      {
        path: '/products',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: '/products/:product',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: '/investments',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <InvestmentsPage />
          </Suspense>
        ),
      },
      {
        path: '/investments/:investment',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <InvestmentPage />
          </Suspense>
        ),
      },
      {
        path: '/partner-program',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Partners />
          </Suspense>
        ),
      },
      {
        path: '/about-us',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutUsPage />
          </Suspense>
        ),
      },
      {
        path: '/faq',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FAQPage />
          </Suspense>
        ),
      },
      {
        path: '/contacts',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ContactsPage />
          </Suspense>
        ),
      },
      {
        path: '/sign-in',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignInPage />
          </Suspense>
        ),
      },
      {
        path: '/sign-up',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: '/company-documents',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DocumentsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/cabinet',
    element: <CabinetLayout />,
    children: [
      {
        path: 'admin-panel',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPanelPage />
          </Suspense>
        ),
      },
      {
        path: 'main',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MainCabinetPage />
          </Suspense>
        ),
      },
      {
        path: 'open-plan/plans',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <OpenPlanPage />
          </Suspense>
        ),
      },
      {
        path: 'make-deposit',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MakeDepositPage />
          </Suspense>
        ),
      },
      {
        path: 'make-deposit/confirm-transaction',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ConfirmTransactionPage />
          </Suspense>
        ),
      },
      {
        path: 'withdrawn',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <WithdrawnPage />
          </Suspense>
        ),
      },
      {
        path: 'withdrawn/confirm-transaction',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ConfirmTransactionPage />
          </Suspense>
        ),
      },
      {
        path: 'transactions',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TransactionsPage />
          </Suspense>
        ),
      },
      {
        path: 'referrals',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ReferralsPage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
])

export default routes

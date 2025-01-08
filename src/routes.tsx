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
  NewYearPromoPage,
  OpenPlanPage,
  PrivacyPolicyPage,
  ProductPage,
  ProductsPage,
  ReferralsPage,
  SettingsPage,
  SignInPage,
  SignUpPage,
  TermsOfUsePage,
  TransactionsPage,
  WithdrawnPage,
} from '@/lazyPages.ts'
import { Suspense } from 'react'
import Partners from '@/pages/Partners/Partners.tsx'
import SuspenseLoading from '@SharedUI/SuspenseLoading/SuspenseLoading.tsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <IndexPage />
            {/*<SuspenseLoading />*/}
          </Suspense>
        ),
      },
      {
        path: '/products',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: '/products/:product',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: '/investments',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <InvestmentsPage />
          </Suspense>
        ),
      },
      {
        path: '/investments/:investment',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <InvestmentPage />
          </Suspense>
        ),
      },
      {
        path: '/partner-program',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <Partners />
          </Suspense>
        ),
      },
      {
        path: '/about-us',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <AboutUsPage />
          </Suspense>
        ),
      },
      {
        path: '/faq',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <FAQPage />
          </Suspense>
        ),
      },
      {
        path: '/contacts',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <ContactsPage />
          </Suspense>
        ),
      },
      {
        path: '/sign-in',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <SignInPage />
          </Suspense>
        ),
      },
      {
        path: '/sign-up',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: '/company-documents',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <DocumentsPage />
          </Suspense>
        ),
      },
      {
        path: '/privacy-policy',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <PrivacyPolicyPage />
          </Suspense>
        ),
      },
      {
        path: '/terms-of-use',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <TermsOfUsePage />
          </Suspense>
        ),
      },
      {
        path: '/new-year-promo-2025',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <NewYearPromoPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/cabinet',
    element: (
      <Suspense fallback={<SuspenseLoading />}>
        <CabinetLayout />
        {/*<SuspenseLoading />*/}
      </Suspense>
    ),
    children: [
      {
        path: 'admin-panel',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <AdminPanelPage />
          </Suspense>
        ),
      },
      {
        path: 'main',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <MainCabinetPage />
          </Suspense>
        ),
      },
      {
        path: 'open-plan/plans',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <OpenPlanPage />
          </Suspense>
        ),
      },
      {
        path: 'make-deposit',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <MakeDepositPage />
          </Suspense>
        ),
      },
      {
        path: 'make-deposit/confirm-transaction',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <ConfirmTransactionPage />
          </Suspense>
        ),
      },
      {
        path: 'withdrawn',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <WithdrawnPage />
          </Suspense>
        ),
      },
      {
        path: 'withdrawn/confirm-transaction',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <ConfirmTransactionPage />
          </Suspense>
        ),
      },
      {
        path: 'transactions',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <TransactionsPage />
          </Suspense>
        ),
      },
      {
        path: 'referrals',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <ReferralsPage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <div>Что-то пошло не так, перезагрузите страницу</div>,
  },
])

export default routes

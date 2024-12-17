import { lazy } from 'react'

export const IndexPage = lazy(() => import('@/pages/IndexPage/IndexPage'))
export const ProductsPage = lazy(() => import('@/pages/Products/Products'))
export const ProductPage = lazy(
  () => import('@/pages/Products/Product/Product'),
)
export const InvestmentsPage = lazy(
  () => import('@/pages/Investments/Investments'),
)
export const InvestmentPage = lazy(
  () => import('@/pages/Investments/Investment/Investment'),
)
export const AboutUsPage = lazy(() => import('@/pages/AboutUs/AboutUs'))
export const FAQPage = lazy(() => import('@/pages/FAQ/FAQ'))
export const ContactsPage = lazy(() => import('@/pages/Contacts/Contacts'))
export const SignInPage = lazy(() => import('@/pages/SignIn/SignIn'))
export const SignUpPage = lazy(() => import('@/pages/SignUp/SignUp'))
export const DocumentsPage = lazy(() => import('@/pages/Documents/Documents'))

export const AdminPanelPage = lazy(
  () => import('@/pages/AdminPanel/AdminPanel'),
)
export const MainCabinetPage = lazy(
  () => import('@/pages/Cabinet/MainCabinet/MainCabinet'),
)
export const OpenPlanPage = lazy(
  () => import('@/pages/Cabinet/OpenPlan/OpenPlan'),
)
export const MakeDepositPage = lazy(
  () => import('@/pages/Cabinet/MakeDeposit/MakeDeposit'),
)
export const ConfirmTransactionPage = lazy(
  () => import('@/pages/ConfirmTransaction/ConfirmTransaction'),
)
export const WithdrawnPage = lazy(
  () => import('@/pages/Cabinet/Withdrawn/Withdrawn'),
)
export const TransactionsPage = lazy(
  () => import('@/pages/Cabinet/Transactions/Transactions'),
)
export const ReferralsPage = lazy(
  () => import('@/pages/Cabinet/Referrals/Referrals'),
)
export const SettingsPage = lazy(
  () => import('@/pages/Cabinet/Settings/Settings'),
)

export const TermsOfUsePage = lazy(
  () => import('@/pages/TermsOfUse/TermsOfUse'),
)

export const PrivacyPolicyPage = lazy(
  () => import('@/pages/PrivacyPolicy/PrivacyPolicy'),
)

export const NewYearPromoPage = lazy(
  () => import('@/pages/NewYearPromo/NewYearPromo'),
)

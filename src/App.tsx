import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components/header";
import { WhisprFooter } from "./components/whispr-footer";
import { CookieBanner } from "./components/cookie-banner";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/home";
import { MarketplacePage } from "./pages/marketplace";
import { LeaderboardsPage } from "./pages/leaderboards";
import { CreatorProfilePage } from "./pages/creator-profile";
import { CreatorDashboardPage } from "./pages/creator-dashboard";
import { CreatorUploadPage } from "./pages/creator-upload";
import { CheckoutPage } from "./pages/checkout";
import { ButtonShowcasePage } from "./pages/button-showcase";
import { RequestFlowPage } from "./pages/request-flow";
import { BuyerDashboardPage } from "./pages/buyer-dashboard";
import { LoadingStatesPage } from "./pages/loading-states";
import { DemoContentPage } from "./pages/demo-content";
import { ComponentLibraryPage } from "./pages/component-library";
import { SiteIndexPage } from "./pages/site-index";
import { BecomeCreatorPage } from "./pages/become-creator";
import { ComingSoonPage } from "./pages/coming-soon";
import { ModerationPolicyPage } from "./pages/moderation-policy";
import { RefundsPage } from "./pages/refunds";
import { PrivacyPage } from "./pages/privacy";
import { NotFoundPage } from "./pages/404";
import { ErrorPage } from "./pages/error";
import { HelpPage } from "./pages/help";
import { SignupChoicePage } from "./pages/signup-choice";
import { SignupBuyerPage } from "./pages/signup-buyer";
import { SignupCreatorPage } from "./pages/signup-creator";
import { SignupSuccessPage } from "./pages/signup-success";
import { SignInPage } from "./pages/signin";

function AppContent() {
  const location = useLocation();
  const isComingSoonPage = location.pathname === "/coming-soon";
  const isAuthPage = ["/signup", "/signup/buyer", "/signup/creator", "/signup/success", "/signin"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!isComingSoonPage && !isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route path="/profile/:username" element={<CreatorProfilePage />} />
        
        {/* Protected Creator Routes */}
        <Route path="/creator/dashboard" element={
          <ProtectedRoute requiredUserType="creator">
            <CreatorDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/creator/upload" element={
          <ProtectedRoute requiredUserType="creator">
            <CreatorUploadPage />
          </ProtectedRoute>
        } />
        
        {/* Protected Buyer Routes */}
        <Route path="/buyer-dashboard" element={
          <ProtectedRoute requiredUserType="buyer">
            <BuyerDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute requiredUserType="buyer">
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="/request" element={
          <ProtectedRoute requiredUserType="buyer">
            <RequestFlowPage />
          </ProtectedRoute>
        } />
        
        <Route path="/become-creator" element={<BecomeCreatorPage />} />
        <Route path="/ui/buttons" element={<ButtonShowcasePage />} />
        <Route path="/ui/loading-states" element={<LoadingStatesPage />} />
        <Route path="/ui/demo-content" element={<DemoContentPage />} />
        <Route path="/ui/components" element={<ComponentLibraryPage />} />
        <Route path="/site-index" element={<SiteIndexPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        {/* Auth Pages */}
        <Route path="/signup" element={<SignupChoicePage />} />
        <Route path="/signup/buyer" element={<SignupBuyerPage />} />
        <Route path="/signup/creator" element={<SignupCreatorPage />} />
        <Route path="/signup/success" element={<SignupSuccessPage />} />
        <Route path="/signin" element={<SignInPage />} />
        {/* Legal & Help Pages */}
        <Route path="/moderation-policy" element={<ModerationPolicyPage />} />
        <Route path="/refunds" element={<RefundsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/help" element={<HelpPage />} />
        {/* Error Pages */}
        <Route path="/error" element={<ErrorPage />} />
        {/* Catch-all route - shows 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isComingSoonPage && !isAuthPage && <WhisprFooter />}
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

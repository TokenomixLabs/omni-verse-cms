
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ReferralProvider } from "./context/ReferralContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NotFound from "./pages/NotFound";
import ContentExample from "./pages/ContentExample";

// Protected pages
import ProfileSetup from "./pages/auth/ProfileSetup";
import UserDashboard from "./pages/UserDashboard";
import ContentLibrary from "./pages/ContentLibrary";
import LiveEvents from "./pages/LiveEvents";
import DocumentVault from "./pages/DocumentVault";
import Admin from "./pages/Admin";
import UserManagement from "./pages/UserManagement";
import ContentApproval from "./pages/ContentApproval";
import MediaLibrary from "./pages/MediaLibrary";
import SeoTools from "./pages/SeoTools";
import IntegrationTools from "./pages/IntegrationTools";
import ReferralTrackingStats from "./components/referrals/ReferralTrackingStats";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ReferralProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/content-example" element={<ContentExample />} />
              <Route path="/content-example/:contentId" element={<ContentExample />} />
              
              {/* Protected Routes */}
              <Route 
                path="/profile-setup" 
                element={
                  <ProtectedRoute>
                    <ProfileSetup />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/content" 
                element={
                  <ProtectedRoute>
                    <ContentLibrary />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/live" 
                element={
                  <ProtectedRoute>
                    <LiveEvents />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/documents" 
                element={
                  <ProtectedRoute>
                    <DocumentVault />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/users" 
                element={
                  <ProtectedRoute>
                    <UserManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/content-approval" 
                element={
                  <ProtectedRoute>
                    <ContentApproval />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/media-library" 
                element={
                  <ProtectedRoute>
                    <MediaLibrary />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/seo-tools" 
                element={
                  <ProtectedRoute>
                    <SeoTools />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/integration-tools" 
                element={
                  <ProtectedRoute>
                    <IntegrationTools />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/referral-stats" 
                element={
                  <ProtectedRoute>
                    <ReferralTrackingStats />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ReferralProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

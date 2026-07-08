import {
  createBrowserRouter,
  Outlet,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import { Nav } from "./components/ui/Nav";
import { Footer } from "./components/ui/Footer";
import { useAuth } from "./context/AuthContext";
import { useCartContext } from "./context/CartContext";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart, type CartItem } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { OrderSuccess } from "./pages/OrderSuccess";
import { Dashboard } from "./pages/Dashboard";
import { MyPets } from "./pages/MyPets";
import { Subscriptions } from "./pages/Subscriptions";
import { Reminders } from "./pages/Reminders";
import { Recommendations } from "./pages/Recommendations";
import { Orders } from "./pages/Orders";
import { SignUp, Login, Forgot, Onboarding } from "./pages/Auth";
import { HowItWorks, Help, PublicSubs, Account } from "./pages/Static";
import { BundleBuilder } from "./pages/BundleBuilder";
import { PetForm } from "./pages/PetForm";
import { OrderDetails } from "./pages/OrderDetails";
import { SubscriptionDetails } from "./pages/SubscriptionDetails";
import {
  About,
  Careers,
  Press,
  Sustainability,
  Shipping,
  Returns,
  Contact,
  Privacy,
  Terms,
  Cookies,
} from "./pages/FooterPages";

// --- URL map used across pages (keyed by old route name) ---
const PATHS: Record<string, string> = {
  home: "/",
  shop: "/shop",
  product: "/product",
  cart: "/cart",
  checkout: "/checkout",
  "order-success": "/order-success",
  dashboard: "/dashboard",
  pets: "/pets",
  orders: "/orders",
  subscriptions: "/subscriptions",
  reminders: "/reminders",
  recommendations: "/recommendations",
  account: "/account",
  how: "/how-it-works",
  help: "/help",
  "subs-public": "/subscribe",
  signup: "/signup",
  login: "/login",
  forgot: "/forgot",
  onboarding: "/onboarding",
  bundle: "/bundle",
  about: "/about",
  careers: "/careers",
  press: "/press",
  sustainability: "/sustainability",
  shipping: "/shipping",
  returns: "/returns",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
};

const PATH_TO_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(PATHS).map(([k, v]) => [v, k])
);

const AUTH_KEYS = new Set([
  "dashboard",
  "pets",
  "orders",
  "subscriptions",
  "reminders",
  "recommendations",
  "account",
]);



// --- Navigation shim so existing pages keep calling setRoute(key) ---
function useGo() {
  const navigate = useNavigate();
  return (key: string) => {
    const path = PATHS[key] ?? "/";
    navigate(path);
    window.scrollTo(0, 0);
  };
}

function currentKey(pathname: string): string {
  if (pathname.startsWith("/product/")) return "product";
  return PATH_TO_KEY[pathname] ?? "home";
}

// --- Layouts ---
function PublicLayout() {
  const go = useGo();
  const { cart } = useCartContext();
  const { authed, setAuthed } = useAuth();
  const { pathname } = useLocation();
  const key = currentKey(pathname);
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);
  return (
    <div
      className="min-vh-100"
      style={{ fontFamily: "Manrope, system-ui, sans-serif", backgroundColor: '#FFF8F1', color: '#1F2937' }}
    >
      <Nav
        route={key}
        setRoute={go}
        authed={authed}
        setAuthed={setAuthed}
        cartCount={cartCount}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Footer setRoute={go} />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

function AuthLayout() {
  const { authed, loading } = useAuth();
  const go = useGo();
  const { pathname } = useLocation();
  const key = currentKey(pathname);

  if (!loading && authed && key !== "onboarding") {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div
      className="min-h-screen bg-[#FFF8F1] text-[#1F2937]"
      style={{ fontFamily: "Manrope, system-ui, sans-serif" }}
    >
      <div className="border-bottom bg-white" style={{ borderColor: '#E7E2D9' }}>
        <div className="container-fluid px-3 px-md-4 d-flex align-items-center justify-content-between" style={{ maxWidth: '1280px', height: '72px' }}>
          <button
            onClick={() => go("home")}
            className="btn btn-link text-decoration-none shadow-none p-0 fw-semibold"
            style={{ fontFamily: 'Sora', color: '#1F2937' }}
          >
            ← Zootopia
          </button>
          {key !== "onboarding" && (
            <button
              onClick={() => go(key === "signup" ? "login" : "signup")}
              className="btn btn-link text-decoration-none shadow-none p-0 fw-semibold"
              style={{ fontFamily: 'Manrope', fontSize: '13px', color: '#0F766E' }}
            >
              {key === "signup" ? "Sign in" : "Create account"}
            </button>
          )}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

function RequireAuth() {
  const { authed, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen d-flex align-items-center justify-content-center">Loading...</div>;
  }

  if (!authed) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

// --- Page wrappers that adapt existing prop-based pages to router hooks ---
function HomeRoute() {
  const go = useGo();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  return (
    <Home
      setRoute={go}
      openProduct={(id) => navigate(`/product/${id}`)}
      addToCart={addToCart}
    />
  );
}

function ShopRoute() {
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  return (
    <Shop
      openProduct={(id) => navigate(`/product/${id}`)}
      addToCart={addToCart}
    />
  );
}

function ProductRoute() {
  const go = useGo();
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCartContext();
  return (
    <ProductDetails
      id={id ?? "pr1"}
      setRoute={go}
      openProduct={(pid) => navigate(`/product/${pid}`)}
      addToCart={addToCart}
    />
  );
}

function CartRoute() {
  const go = useGo();
  return <Cart setRoute={go} />;
}

function CheckoutRoute() {
  const go = useGo();
  return <Checkout setRoute={go} />;
}

function DashboardRoute() {
  const go = useGo();
  return <Dashboard route="dashboard" setRoute={go} />;
}
function PetsRoute() {
  const go = useGo();
  return <MyPets route="pets" setRoute={go} />;
}
function OrdersRoute() {
  const go = useGo();
  return <Orders route="orders" setRoute={go} />;
}
function SubsRoute() {
  const go = useGo();
  return <Subscriptions route="subscriptions" setRoute={go} />;
}
function RemindersRoute() {
  const go = useGo();
  return <Reminders route="reminders" setRoute={go} />;
}
function RecsRoute() {
  const go = useGo();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  return (
    <Recommendations
      route="recommendations"
      setRoute={go}
      openProduct={(id) => navigate(`/product/${id}`)}
      addToCart={addToCart}
    />
  );
}

function SignUpRoute() {
  const go = useGo();
  const { register } = useAuth();
  return <SignUp setRoute={go} register={register} />;
}
function LoginRoute() {
  const go = useGo();
  const { login } = useAuth();
  return <Login setRoute={go} login={login} />;
}
function ForgotRoute() {
  const go = useGo();
  return <Forgot setRoute={go} />;
}
function OnboardingRoute() {
  const go = useGo();
  return <Onboarding setRoute={go} />;
}

function BundleRoute() {
  const go = useGo();
  const { addManyToCart } = useCartContext();
  return <BundleBuilder setRoute={go} addManyToCart={addManyToCart} />;
}
function PetAddRoute() {
  const go = useGo();
  return <PetForm route="pets" setRoute={go} />;
}
function PetEditRoute() {
  const go = useGo();
  return <PetForm route="pets" setRoute={go} />;
}
function OrderDetailsRoute() {
  const go = useGo();
  return <OrderDetails route="orders" setRoute={go} />;
}
function SubscriptionDetailsRoute() {
  const go = useGo();
  return <SubscriptionDetails route="subscriptions" setRoute={go} />;
}

function NotFound() {
  const go = useGo();
  return (
    <div className="container px-3 px-md-4 py-5 text-center" style={{ maxWidth: '760px' }}>
      <div className="fw-bold lh-1" style={{ fontFamily: 'Sora', fontSize: '88px', color: 'rgba(15, 118, 110, 0.2)' }}>
        404
      </div>
      <h1 className="mt-4 fw-bold" style={{ fontFamily: 'Sora', fontSize: '32px', color: '#1F2937' }}>
        This page wandered off
      </h1>
      <p className="mt-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
        The page you're looking for doesn't exist or has moved.
      </p>
      <button
        onClick={() => go("home")}
        className="btn rounded-pill text-white fw-semibold mt-4 px-4"
        style={{ height: '44px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
      >
        Back to home
      </button>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: HomeRoute },
      { path: "shop", Component: ShopRoute },
      { path: "product/:id", Component: ProductRoute },
      { path: "how-it-works", Component: HowItWorksRoute },
      { path: "help", Component: HelpRoute },
      { path: "subscribe", Component: PublicSubsRoute },
      { path: "bundle", Component: BundleRoute },
      { path: "about", Component: AboutRoute },
      { path: "careers", Component: CareersRoute },
      { path: "press", Component: PressRoute },
      { path: "sustainability", Component: SustainabilityRoute },
      { path: "shipping", Component: ShippingRoute },
      { path: "returns", Component: ReturnsRoute },
      { path: "contact", Component: ContactRoute },
      { path: "privacy", Component: Privacy },
      { path: "terms", Component: Terms },
      { path: "cookies", Component: Cookies },
      { path: "*", Component: NotFound },
      {
        Component: RequireAuth,
        children: [
          { path: "cart", Component: CartRoute },
          { path: "checkout", Component: CheckoutRoute },
          { path: "order-success", Component: OrderSuccess_ },
          { path: "dashboard", Component: DashboardRoute },
          { path: "pets", Component: PetsRoute },
          { path: "pets/new", Component: PetAddRoute },
          { path: "pets/:id/edit", Component: PetEditRoute },
          { path: "orders", Component: OrdersRoute },
          { path: "orders/:id", Component: OrderDetailsRoute },
          { path: "subscriptions", Component: SubsRoute },
          { path: "subscriptions/:id", Component: SubscriptionDetailsRoute },
          { path: "reminders", Component: RemindersRoute },
          { path: "recommendations", Component: RecsRoute },
          { path: "account", Component: AccountRoute },
        ],
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      { path: "/signup", Component: SignUpRoute },
      { path: "/login", Component: LoginRoute },
      { path: "/forgot", Component: ForgotRoute },
      { path: "/onboarding", Component: OnboardingRoute },
    ],
  },
]);

// Simple wrappers so order-success, static, account, and 404 can live under their layouts cleanly.
function OrderSuccess_() {
  const go = useGo();
  return <OrderSuccess setRoute={go} />;
}
function HowItWorksRoute() {
  const go = useGo();
  return <HowItWorks setRoute={go} />;
}
function HelpRoute() {
  const go = useGo();
  return <Help setRoute={go} />;
}
function PublicSubsRoute() {
  const go = useGo();
  return <PublicSubs setRoute={go} />;
}
function AccountRoute() {
  const go = useGo();
  return <Account setRoute={go} />;
}
function AboutRoute() {
  const go = useGo();
  return <About setRoute={go} />;
}
function CareersRoute() {
  const go = useGo();
  return <Careers setRoute={go} />;
}
function PressRoute() {
  const go = useGo();
  return <Press setRoute={go} />;
}
function SustainabilityRoute() {
  const go = useGo();
  return <Sustainability setRoute={go} />;
}
function ShippingRoute() {
  const go = useGo();
  return <Shipping setRoute={go} />;
}
function ReturnsRoute() {
  const go = useGo();
  return <Returns setRoute={go} />;
}
function ContactRoute() {
  const go = useGo();
  return <Contact setRoute={go} />;
}

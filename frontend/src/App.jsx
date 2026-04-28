import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import MyPets from './pages/MyPets';
import AddNewPet from './pages/AddNewPet';
import EditPet from './pages/EditPet';
import ForMyPet from './pages/ForMyPet';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';

import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Dashboard Routes with Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-pets" element={<MyPets />} />
          <Route path="/add-pet" element={<AddNewPet />} />
          <Route path="/edit-pet/:id" element={<EditPet />} />
          <Route path="/for-my-pet" element={<ForMyPet />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

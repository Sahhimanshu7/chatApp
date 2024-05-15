import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import WithPrivateRoute from "./utils/WithPrivateRoute";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorDisplay from "./layouts/ErrorDisplay";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <ErrorDisplay />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <WithPrivateRoute>
                <ChatPage />
              </WithPrivateRoute>
            }
          />
          <Route
            exact
            path="/user/profile"
            element={
              <WithPrivateRoute>
                <ProfilePage />
              </WithPrivateRoute>
            }
          />
          <Route exact path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

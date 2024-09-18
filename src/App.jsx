import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import { privateRoutes, publicRoutes } from "@/routes";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);
export const ThemeContext = createContext(null);

function App() {
    if (localStorage.getItem("theme") === null)
        localStorage.theme = "dark";

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [theme, setTheme] = useState(localStorage.theme);
    
    const checkAuth = () => {
        setIsAuthenticated(!!localStorage.getItem("token"));
    };

    useEffect(() => {
        window.addEventListener("storage", checkAuth);
        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, []);

    const ProtectedRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" replace />;
    };

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
                <Router>
                    <div className={`app ${theme}`}>
                        <Routes>
                            <Route path="/" element={<DefaultLayout />}>
                                {/* Public Routes */}
                                {publicRoutes.map((route, index) => {
                                    const Page = route.component;

                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={ <Page /> }
                                        />
                                    );
                                })}

                                {/* Private Routes */}
                                {privateRoutes.map((route, index) => {
                                    const Page = route.component;

                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <ProtectedRoute>
                                                    <Page />
                                                </ProtectedRoute>
                                            }
                                        />
                                    );
                                })}

                            </Route>

                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                </Router>
            </AuthContext.Provider>
        </ThemeContext.Provider>
    );
}

export default App;

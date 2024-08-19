import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import {privateRoutes, publicRoutes} from "@/routes";
import {Navigate} from "react-router-dom";
import {createContext, useState} from "react";

export const AuthContext = createContext(null);

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    // Function to update authentication status
    const checkAuth = () => {
        setIsAuthenticated(!!localStorage.getItem("token"));
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
            <Router>
                <div className="app">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        isAuthenticated ? (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        ) : (
                                            <Navigate to="/login" replace />
                                        )
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;

import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import routes from '~/routes'
import DefaultLayout from '~/layouts'
import AuthProvider, { useAuth } from '~/context/AuthProvider'

function App() {
  const ProtectedRoutes = () => {
    const user = useAuth();
    return user?.authTokens ? <Outlet /> : <Navigate to="/login" replace />;
  };
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout

            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }

            const content = <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            } />

            return (route.private ?
              <Route key={index} path={route.path} element={<ProtectedRoutes />} children={content} />
              : content
            )

          })}
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App

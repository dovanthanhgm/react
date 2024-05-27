import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import routes from '~/routes'
import DefaultLayout from '~/layouts'

function App() {
    const isAuthenticated = false
    return (
        <Router>
            <div className="App">
                <Routes>
                    {routes.map((route, index) => {
                        const Page = route.component
                        let Layout = DefaultLayout

                        if (route.layout) {
                            Layout = route.layout
                        } else if (route.layout === null) {
                            Layout = Fragment
                        }

                        const content = (
                            <Layout>
                                <Page />
                            </Layout>
                        )

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    route.private ? (
                                        isAuthenticated ? content: <Navigate to="/login"/>
                                    ) : content
                                }
                            />
                        )
                    })}
                </Routes>
            </div>
        </Router>
    )
}

export default App

import React from 'react'
import Layout from '../components/Layouts/Layout'
import { useAuth } from '../context/auth'
const Homepage = () => {
    const [auth, setAuth] = useAuth()
    return (
        <Layout title={"BEST OFFERS"}>
            <h1>HOMEPAGE</h1>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>
    )
}

export default Homepage
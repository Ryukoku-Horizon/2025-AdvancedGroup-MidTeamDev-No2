import { Link } from "gatsby"
import Layout from "../components/Layout/Layout"
import * as React from "react"

// import Seo from "../components/seo"
// import * as styles from "../components/index.module.css"

const IndexPage = () => {

  return (
    <Layout>
      <div className="flex flex-col">
        <Link to="/login">login</Link>
        <Link to="/request">request</Link>
        <Link to="search">search</Link>
      </div>
    </Layout>
)}

// export const Head = () => <Seo title="Home" />

export default IndexPage

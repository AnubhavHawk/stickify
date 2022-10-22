import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import CollectionPreview from "../components/categories/collection-preview"
import ProductListItem from "../components/products/product-list-item"
import Grid from "../components/utility/grid"
import SearchEngineOptimization from "../components/utility/seo"
import { useCollections } from "../hooks/use-collections"
import "../styles/custom.css"
import { BiCaretRightCircle } from "react-icons/bi";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"

import Medusa from "@medusajs/medusa-js"

const IndexPage = ({ data }) => {
  const { products, collections } = data
  const prods = data.products.edges.map(edge => edge.node)
  const collectionPreviews = useCollections(collections, products)
  // const searchSomething = () => {
  //   const medusa = new Medusa({ baseUrl: "http://localhost:9000", maxRetries: 3 })
  //   medusa.products.list({
  //     handle: "sweatshirt"
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });
  // }

  // return (
  //   <div>
  //     <SearchEngineOptimization title="Home" />
  //     <div className="bg-ui-light pb-12 lg:pb-0 w-full px-4 sm:px-6 lg:px-12">
  //       <div className="flex flex-col lg:flex-row items-center max-w-screen-2xl mx-auto">
  //         <StaticImage
  //           src="../images/hero-merch.png"
  //           alt="A black Medusa hoodie and a white Medusa coffee mug"
  //           placeholder="tracedSVG"
  //           className="w-full lg:w-1/2 h-auto"
  //         />
  //         <div>
  //           <h1 className="text-4xl">CLAIM YOUR MERCH</h1>
  //           <p className="mt-2 text-lg font-normal">
  //             Contribute to Medusa and receive free merch
  //             <br />
  //             as a token of our appreciation
  //           </p>
  //           <button className="btn-ui mt-4 min-w-full lg:min-w-0">
  //             Learn more
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="layout-base my-12 min-h-0">
  //       <Grid
  //         title={"Featured"}
  //         cta={{ to: "/products", text: "Browse all products" }}
  //       >
  //         {prods.slice(0, 4).map(p => {
  //           return <ProductListItem product={p} key={p.handle} />
  //         })}
  //       </Grid>
  //       <div className="mt-12">
  //         <Grid
  //           title="Shop by collection"
  //           cta={{ to: "/collections", text: "Browse all collections" }}
  //         >
  //           {collectionPreviews.slice(0, 4).map(collection => {
  //             return (
  //               <CollectionPreview
  //                 key={collection.id}
  //                 collection={collection}
  //               />
  //             )
  //           })}
  //         </Grid>
  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <div>
      <main className="p-5 rounded mt-5 text-white" style={{backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1042%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(22%2c 22%2c 22%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c346.07C67.882%2c344.316%2c131.471%2c327.441%2c194.969%2c303.378C273.601%2c273.58%2c378.478%2c265.283%2c414.136%2c189.129C449.742%2c113.086%2c380.053%2c29.902%2c361.348%2c-51.954C344.49%2c-125.727%2c352.042%2c-205.62%2c309.611%2c-268.28C264.618%2c-334.724%2c196.628%2c-384.854%2c119.936%2c-408.463C42.721%2c-432.233%2c-44.341%2c-434.276%2c-117.369%2c-399.721C-186.641%2c-366.944%2c-224.284%2c-293.895%2c-262.537%2c-227.49C-294.895%2c-171.318%2c-298.327%2c-106.874%2c-321.039%2c-46.158C-351.689%2c35.777%2c-446.831%2c108.448%2c-419.259%2c191.469C-392.49%2c272.072%2c-281.241%2c284.24%2c-201.554%2c313.624C-136.387%2c337.654%2c-69.433%2c347.864%2c0%2c346.07' fill='%230e0e0e'%3e%3c/path%3e%3cpath d='M1440 1199.091C1561.573 1225.942 1701.762 1195.249 1795.843 1113.703 1887.5149999999999 1034.245 1888.555 896.885 1922.8980000000001 780.532 1952.211 681.22 2000.1799999999998 584.021 1982.287 482.031 1964.634 381.40700000000004 1891.693 303.777 1825.591 225.88299999999998 1758.837 147.221 1696.423 52.639999999999986 1596.41 27.317000000000007 1497.216 2.201000000000022 1401.826 66.88 1303.046 93.57600000000002 1201.664 120.97500000000002 1093.12 123.863 1008.588 186.17899999999997 912.037 257.355 794.893 347.454 795.948 467.399 797.027 590.03 940.607 656.181 1013.5889999999999 754.736 1068.769 829.25 1108.4189999999999 909.153 1172.618 976.054 1254.641 1061.529 1324.324 1173.542 1440 1199.091' fill='%231e1e1e'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1042'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e\")", backgroundSize: "cover"}}>
        <h1 style={{fontSize: "5vh"}}>Stickers that developers <b>Love</b></h1>
        <p className="mt-4">
          The GitHub sticker shop, find the latest stickers of your favorite Octocat that will make your laptops and all your belongings extra appealing. Just go through the wide range of stickers available, to find the best.
        </p>
        {/* ========== Popular Products Starts ========= */}
        <div className="mt-5">
          <h3>Explore Popular:</h3>
          <div className="row">
            {
            prods.slice(prods.length-5, prods.length).map(p => {
              // console.log("===>", p);
              return  <div className="col-md-2 col-6 p-2" style={{height: "100%"}} key={Math.random()*10000000000000000}>
                        <div className="bg-grey pl-2 pr-2 pt-4 pb-4 rounded shadow text-center">
                        <GatsbyImage
                            image={p.thumbnail?.childImageSharp?.gatsbyImageData}
                            alt="Heroo section"
                            placeholder="tracedSVG"
                            className="w-full lg:w-1/2 h-auto rounded bg-dark"
                          />
                          <div className="text-left mt-4">
                            <h3 className="text-capitalize">{p.title}</h3>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <h1>${p.variants[0].prices[p.variants[0].prices.length-1].amount/100}</h1>
                              <Link to={"/na/"+p.handle}>
                                <BiCaretRightCircle style={{fontSize: "30px"}} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
            })}
          </div>
          {/* ========== Popular Products Ends ========= */}
        </div>
      </main>

      <div className="mt-5">
        {/* ========== All Products Starts =========== */}
        <section id="all-products">
          <h1>All Stickers:</h1>
          <div className="row">
          {
            prods.map(p => {
              // console.log("===>", p);
              return  <div className="col-md-3 col-6 p-2 d-flex flex-column justify-content-between" key={Math.random()*1000000000}>
                        <div className="border-grey pl-2 pr-2 pt-4 pb-4 rounded text-center sticker-product">
                        <GatsbyImage
                            image={p.thumbnail?.childImageSharp?.gatsbyImageData}
                            alt="Heroo section"
                            placeholder="tracedSVG"
                            className="w-full lg:w-1/2 rounded h-auto mb-3"
                          />
                          <div className="text-left mt-4">
                            <h3 className="text-capitalize">{p.title}</h3>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <h1>${Number.parseFloat(p.variants[0].prices[p.variants[0].prices.length-1].amount/100, 2)}</h1>
                              <Link to={"/na/"+p.handle}>
                                <BiCaretRightCircle style={{fontSize: "30px"}} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
            })}
          </div>
        </section>
        {/* ========== All Products Ends ============= */}
      </div>
    </div>
  )
}
export const query = graphql`
  query {
    products: allMedusaProducts {
      edges {
        node {
          handle
          title
          collection_id
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          variants {
            prices {
              amount
              currency_code
            }
          }
        }
      }
    }
    collections: allMedusaCollections {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`

export default IndexPage

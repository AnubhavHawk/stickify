import { graphql, Link, navigate } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useEffect } from "react"
import { BiCaretRightCircle, BiRightArrowAlt, BiShoppingBag } from "react-icons/bi"
import ProductExpandable from "../components/products/product-expandable"
import ProductImages from "../components/products/product-images"
import ProductListItem from "../components/products/product-list-item"
import ProductOptionSelector from "../components/products/product-option-selector"
import QuantitySelector from "../components/products/quantity-selector"
import Grid from "../components/utility/grid"
import SearchEngineOptimization from "../components/utility/seo"
import { useCart } from "../hooks/use-cart"
import { useProduct } from "../hooks/use-product"
import { useRegion } from "../hooks/use-region"
import { formatPrice } from "../utils/format-price"
import { pickDetails } from "../utils/pick-details"
import { toKebab } from "../utils/to-kebab"

const Product = ({ data, pageContext }) => {
  const { product, related } = data
  const { regionId, currencyCode, handle } = pageContext
  const details = pickDetails(product)
  const {
    loading,
    actions: { addItem },
  } = useCart()

  const {
    variant,
    options,
    quantity,
    actions: {
      updateOptions,
      increaseQuantity,
      decreaseQuantity,
      resetOptions,
    },
  } = useProduct(product)

  const price = variant
    ? variant.prices.find(p => p.currency_code === currencyCode)
    : undefined

  const handleAddToCart = async () => {
    await addItem({ variant_id: variant.id, quantity })
    resetOptions()
  }

  const { region } = useRegion()

  useEffect(() => {
    if (region && region.id !== regionId) {
      navigate(`/${toKebab(region.name)}/${handle}`)
    }
  }, [region, handle, regionId])

  // return (
  //   <div className="layout-base">
  //     <SearchEngineOptimization
  //       title={product.title}
  //       description={product.description}
  //     />
  //     <div className="flex flex-col lg:flex-row">
  //       <div className="lg:w-3/5 lg:pr-14">
  //         <ProductImages images={product.images} />
  //       </div>
  //       <div className="mt-8 lg:mt-0 lg:w-2/5 lg:max-w-xl">
  //         <h1 className="font-semibold text-3xl">{product.title}</h1>
  //         <p className="text-lg mt-2 mb-4">
  //           {formatPrice(price?.amount, currencyCode, 1)}
  //         </p>
  //         <p className="font-light">{product.description}</p>
  //         {product.options.map((option, index) => {
  //           return (
  //             <div key={index} className="mt-6">
  //               <ProductOptionSelector
  //                 option={option}
  //                 current={options[option.id]}
  //                 updateOption={updateOptions}
  //               />
  //             </div>
  //           )
  //         })}
  //         <div className="inline-flex mt-4">
  //           <button
  //             className="btn-ui mr-2 px-12"
  //             onClick={() => handleAddToCart()}
  //             disabled={loading}
  //           >
  //             Add to bag
  //           </button>
  //           <QuantitySelector
  //             quantity={quantity}
  //             increment={increaseQuantity}
  //             decrement={decreaseQuantity}
  //           />
  //         </div>
  //         <div className="mt-12">
  //           {Object.keys(details).length > 0 && (
  //             <ProductExpandable title="Details">
  //               <ul className="list-inside list-disc">
  //                 {Object.keys(details).map((key, index) => {
  //                   return <li key={index}>{`${key}: ${details[key]}`}</li>
  //                 })}
  //               </ul>
  //             </ProductExpandable>
  //           )}
  //           {product.metadata?.care && (
  //             <ProductExpandable title="Care">
  //               <ul className="list-inside list-disc">
  //                 {product.metadata.care.map((instruction, index) => {
  //                   return <li key={index}>{`${instruction}`}</li>
  //                 })}
  //               </ul>
  //             </ProductExpandable>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //     <div className="my-12">
  //       <Grid
  //         title="You might also like"
  //         cta={{ to: "/products", text: "Browse all products" }}
  //       >
  //         {related.edges
  //           .map(({ node }) => node)
  //           .slice(0, 4)
  //           .map(product => {
  //             return <ProductListItem key={product.handle} product={product} />
  //           })}
  //       </Grid>
  //     </div>
  //   </div>
  // )

  return (
    <div className="mt-5 ">
      <SearchEngineOptimization
        title={product.title}
        description={product.description}
      />
      {/* <h1 className="font-semibold text-5xl mb-4">{product.title}</h1> */}
      <div className="d-flex justify-content-between">
        <div style={{maxWidth: "40%"}}>
          <ProductImages images={product.images} />
        </div>
        <div style={{width: "60%"}}>
          <h1 className="text-grey text-4xl mb-3 mt-2">{product.title}</h1>
          <p>
          Octocat may refer to: Octocat, the mascot of the source-code hosting service GitHub. Octocat, part cat, part octopus character in Spliced (TV series) Octocat Adventure, a five-part animated video by David OReilly (artist)
            {product.description}
          </p>
          <div className="mt-3">
            <b className="text-6xl">
              $ {price?.amount/100}
            </b>
          </div>
          {product.options.map((option, index) => {
            return (
              <div key={index} className="mt-6">
                <ProductOptionSelector
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                />
              </div>
            )
          })}
          <div className="inline-flex mt-4">
            <button
              className="rounded btn btn-lg bg-grey text-light btn-dark mr-2 px-12"
              onClick={() => handleAddToCart()}
              disabled={loading}
            >
              Add to bag <BiShoppingBag className="d-inline ml-1" />
            </button>
            {/* <QuantitySelector
              quantity={quantity}
              increment={increaseQuantity}
              decrement={decreaseQuantity}
            /> */}
          </div>
          {/* <div className="mt-12">
            {Object.keys(details).length > 0 && (
              <ProductExpandable title="Details">
                <ul className="list-inside list-disc">
                  {Object.keys(details).map((key, index) => {
                    return <li key={index}>{`${key}: ${details[key]}`}</li>
                  })}
                </ul>
              </ProductExpandable>
            )}
            {product.metadata?.care && (
              <ProductExpandable title="Care">
                <ul className="list-inside list-disc">
                  {product.metadata.care.map((instruction, index) => {
                    return <li key={index}>{`${instruction}`}</li>
                  })}
                </ul>
              </ProductExpandable>
            )}
          </div> */}
        </div>
      </div>
      <div className="my-12">
        {/* <Grid
          title="Similar Stickers:"
          cta={{ to: "/products", text: "Browse all products" }}
        > */}
        <div className="mt-5 pt-5 d-flex justify-content-between">
          <h2>Similar Stickers:</h2>
          <Link to="/#all-products">Browse All <BiRightArrowAlt className="d-inline" /></Link>
        </div>
          <div className="row text-white">
          {related.edges
            .map(({ node }) => node)
            .slice(0, 4)
            .map(p => {
              return <div className="col-md-2 col-6 p-2" style={{height: "100%"}}>
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
                      <BiCaretRightCircle style={{fontSize: "30px"}} className="text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            })}
          </div>
        {/* </Grid> */}
      </div>
    </div>
  )

}

export const query = graphql`
  query ($handle: String!) {
    product: medusaProducts(handle: { eq: $handle }) {
      id
      title
      description
      weight
      options {
        id
        title
        values {
          id
          value
        }
      }
      variants {
        options {
          value
          option_id
          id
        }
        id
        title
        prices {
          amount
          currency_code
        }
      }
      images {
        url
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    related: allMedusaProducts(limit: 4, filter: { handle: { ne: $handle } }) {
      edges {
        node {
          handle
          title
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
  }
`

export default Product

import Medusa from "@medusajs/medusa-js";
import { Link } from "gatsby";
import React, { useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi";
import "./SearchStyle.css";

const SearchInput =  (props) => {
    const [searchResult, setSearchResult] = useState([]);
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        let mounted = true;
        getAllProducts()
          .then(items => {
            if(mounted) {
                setProducts(items)
            }
          })
        return () => mounted = false;
    }, []);
    

    const getAllProducts = () => {
        const medusa = new Medusa({ baseUrl: "http://localhost:9000", maxRetries: 3 })
        let res = medusa.products.list()
        .then((data) => {
            // setProducts(data.products);
            return data.products;
        })
        .catch(err => setProducts([]))

        return res;
    }

    function getSearchResult(e) {
        let q = e.target.value;
        if(q !== ""){
            let matchingProducts = products.filter(product => {
                return product.title.toLowerCase().indexOf(q.toLowerCase()) != -1
            })
            setSearchResult(matchingProducts);
        }
        else {
            setSearchResult([]);
        }
    }
    function displayResult() {
        if (searchResult.length > 0) {
            return searchResult.map(function(result, i){
                return <Link to={"/na/"+result.handle}><li className="pl-2" key={i}>{result.title}</li></Link>;
            })
         }
    }
    return (        
        <div className="bg-grey rounded d-flex justify-content-between align-items-center" style={{width: props.width+"%"}}>
            <BiSearch className="text-light" style={{marginLeft: "10px"}} />
            <input type="text" className="white-placeholder m-0 bg-transparent" value={query} onInput={e => setQuery(e.target.value)} onChange={getSearchResult} placeholder="Search..." style={{height: "auto", border: "none", width: "90%", outline: "none"}} />
            <div className="search-suggestion-container rounded shadow text-dark" onClick={e => {setSearchResult([]); setQuery("")}}>
                <ul>
                    {
                        displayResult()
                    }
                </ul>
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


export default SearchInput;
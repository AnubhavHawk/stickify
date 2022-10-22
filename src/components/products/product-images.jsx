import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { classNames } from "../../utils/class-names"

const ProductImages = ({ images = [] }) => {
  const [current, setCurrent] = useState(0)

  const handleInfiniteChange = change => {
    if (current + change < 0) {
      setCurrent(images.length - 1)
    } else if (current + change > images.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(current + change)
    }
  }
  return (
    <div>
      <div className="row p-3">
        <div className="col-md-8">
          <GatsbyImage
              className="border rounded p-4"
              image={images[current].image.childImageSharp.gatsbyImageData}
              alt={`Product #${current + 1}`}
              style={{height: "100%"}}
          />
          <div>
            <button className="text-white bg-grey rounded mt-1 btn btn-dark" onClick={() => handleInfiniteChange(-1)}>
              <BiChevronLeft />
            </button>
            <button className="text-white bg-grey rounded mt-1 ml-3 btn btn-dark" onClick={() => handleInfiniteChange(1)}>
              <BiChevronRight />
            </button>
          </div>
        </div>
        <div className="col-md-3">
          <div className="row">
            {images.map(({ image }, index) => {
              return (
                <button
                  key={index}
                  className={classNames(
                    "col-md-6 rounded",
                    current === index
                      ? "border-2 border-ui-medium opacity-100"
                      : "opacity-75"
                  )}
                  onClick={() => setCurrent(index)}
                >
                  <GatsbyImage
                    image={image.childImageSharp.gatsbyImageData}
                    alt={`Product #${index + 1}`}
                    className="rounded p-1"
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductImages

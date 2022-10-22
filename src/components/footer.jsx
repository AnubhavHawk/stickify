import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image";
import React from "react"
import { sticker } from "../images/sticker.png";

const Footer = () => {
  const internals = [
    {
      name: "Shop",
      to: "/#all-products",
    },
    {
      name: "FAQ",
      to: "/faq",
    },
    {
      name: "Terms & Conditions",
      to: "/terms-and-conditions",
    },
  ]

  // return (
  //   <footer>
  //     <div className="bg-white px-4 pt-24 pb-4 sm:px-6 lg:px-8 border-t border-ui-medium flex items-center justify-between text-sm">
  //       <div className="flex items-center">
  //         {internals.map(internal => {
  //           return (
  //             <Link
  //               to={internal.to}
  //               key={internal.name}
  //               className="mr-3 last:mr-0 text-ui-dark hover:text-gray-700"
  //             >
  //               {internal.name}
  //             </Link>
  //           )
  //         })}
  //       </div>
  //       <div className="flex items-center">
  //         {socials.map(social => {
  //           return (
  //             <a
  //               href={social.url}
  //               key={social.name}
  //               className="mr-3 last:mr-0 text-ui-dark hover:text-gray-700"
  //             >
  //               {social.name}
  //             </a>
  //           )
  //         })}
  //       </div>
  //     </div>
  //   </footer>
  // )
  return (
    <footer style={{position: "absolute", width: "96%"}} className="mt-5">
      <div className="bg-grey rounded pt-4 pb-4 sm:px-6 lg:px-8 mt-5 border-t border-ui-medium  text-sm" style={{borderTopLeftRadius: "10px!important", borderTopRightRadius: "80px!important"}}>
          <StaticImage
            src="../images/sticker.png"
            alt="..."
            placeholder="tracedSVG"
            className=""
            height="40px"
            style= {{position: "absolute",
              height: "300px!important",
              width: "30px!important",
              // top: "218vh",
              bottom: "10px",
              filter: "drop-shadow(-12px 9px 5px black)",
              right: "36px"}}
          />
        <h1 className="text-white mb-4">Get the sticker your laptop dreamt for...</h1>
        <div className="flex items-center">
          {internals.map(internal => {
            return (
              <Link
                to={internal.to}
                key={internal.name}
                className="mr-3 last:mr-0 text-ui-dark hover:text-gray-700"
              >
                {internal.name}
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer

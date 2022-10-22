import React from "react"
import { classNames } from "../../utils/class-names"
import { onlyUnique } from "../../utils/only-unique"

const ProductOptionSelector = ({ option, current, updateOption }) => {
  const filteredOptions = option.values.map(v => v.value).filter(onlyUnique)
  return (
    <div className="text-sm">
      <p className="font-medium mb-2">Select {option.title}:</p>
      <div>
        {filteredOptions.map((v, index) => {
          return (
            <button
              key={index}
              className={classNames(
                v === current
                  ? "shadow bg-grey text-white"
                  : "hover:bg-ui-dark hover:text-white",
                "border-grey text-lg pl-3 pr-3 rounded-pill mr-2"
              )}
              onClick={() => updateOption({ [option.id]: v })}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProductOptionSelector

import * as React from "react"
const Loading = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    fill="rgb(23 23 23)"
    stroke="rgb(23 23 23)"
    viewBox="0 0 100 100"
    {...props}
  >
    <g>
      <path
        fill="none"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={4}
        d="M50.188 26.812c12.806 0 23.188 10.381 23.188 23.188"
      />
      <animateTransform
        attributeName="transform"
        dur="1s"
        from="0 50 50"
        repeatCount="indefinite"
        to="360 50 50"
        type="rotate"
      />
    </g>
  </svg>
)
export default Loading

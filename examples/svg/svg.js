/** @jsx svg */

import { svg } from '../../snabbdom-jsx';


const MySvg = ({animate}) => {
  let animNode;
  if(animate)
    animNode = 
      <animateTransform
        attributeName="transform"
        begin="0s"
        dur="20s"
        type="rotate"
        from="0 60 60"
        to="360 60 60"
        repeatCount="indefinite"
      />;
      
  return <svg>
    <rect x="10" y="10" height="110" width="110" style-stroke="#ff0000" style-fill="#0000ff" >
      {animNode}
    </rect>
  </svg>;
};
  
  
export default MySvg;
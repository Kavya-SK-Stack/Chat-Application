import { keyframes, Skeleton, styled } from '@mui/material'
import { purple } from '@mui/material/colors';
import { Link as LinkComponent } from "react-router-dom";




export const VisuallyHiddenInput = styled("input")
    
    ({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1 ,
    margin:-1 ,
    overflow: "hidden",
    padding: 0,
    position:"absolute",
    whiteSpace: "nowrap",
    width: 1,
});

export const Link = ({ children, href }) => {
  return (
    <a href={href} className="no-underline text-black p-4 hover:bg-gray-200">
      {children}
    </a>
  );
};


export const InputBase = () => (
  <input
    className="w-full h-full border-none outline-none px-12 rounded-3xl bg-purple-500"
    type="text"
  />
);


export const SearchField = () => (
  <input placeholder='Search....'
    className="p-2 px-8 rounded-3xl bg-gray-100 w-[20vmax] border-none outline-none text-lg"
    type="text"
  />
);

export const CurveButton = () => (
  <button 
    className="rounded-3xl px-4 py-2 bg-purple-800 text-white border-none cursor-pointer outline-none text-lg hover:bg-purple-500"
  >
    Search
  </button>
);

const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`;

export const BouncingSkeleton = styled(Skeleton)(() => ({
  animation:`${bounceAnimation} is infinite`,
}))
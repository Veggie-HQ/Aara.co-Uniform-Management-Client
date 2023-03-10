import styled from "styled-components";
//Animation
const { motion } = require("framer-motion");

export const UserWrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-start;
`;

export const UserStyle = styled(motion.div)`
  width: 75%;
  background: #f1f1f1;
  padding: 0.5rem 1.25rem;
  overflow-y: scroll;
  position: relative;
`;

// export const Card = styled(motion.div)`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   border-radius: 1rem;
//   overflow: hidden;
//   background: white;
//   padding: 2rem;
//   margin: 2rem 0rem;

//   img {
//     width: 8rem;
//   }
// `;

// export const CardInfo = styled(motion.div)`
//   width: 50%;
//   div {
//     display: flex;
//     justify-content: space-between;
//   }
// `;

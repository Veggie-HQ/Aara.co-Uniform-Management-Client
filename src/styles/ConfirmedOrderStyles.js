import styled from "styled-components";
//Animation
const { motion } = require("framer-motion");

export const COWrapper = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;

export const COStyle = styled(motion.div)`
  width: 50%;
  background: #f1f1f1;
  padding: 0.5rem 1.25rem;
  overflow-y: scroll;
  position: relative;
`;

export const COCard = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  padding: 2rem;
  margin: 2rem 0rem;
  width: 100%;
  img {
    width: 50px;
  }
`;

export const COCardInfo = styled(motion.div)`
  width: 60%;
  div {
    display: flex;
  }
`;

export const EmptyCOStyle = styled(motion.div)`
  /* For the empty cart */
  position: absolute;
  top: 0;
  /*  */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80%;
  svg {
    font-size: 8rem;
    color: var(--secondary);
  }
`;

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

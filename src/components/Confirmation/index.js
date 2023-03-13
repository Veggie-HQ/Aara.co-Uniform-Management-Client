import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Index = ({ isOpen, onClose, onConfirm, loading }) => {
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size="xs"
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Confirm Order?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Text>
            Are you sure you want to confirm the order? Orders once placed
            cannot be changed.{" "}
          </Text>
          <Text mt={2}>
            Please be sure of Sizes and Quantity before Confirming
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            isLoading={loading}
            colorScheme="blue"
            ml={3}
            onClick={onConfirm}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Index;

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import EditRow from "./EditRow";

const EditModal = ({ isOpen, onClose, item }) => {
  const onEdit = (data) => {
    console.log("EDIT DATA:", data);
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    console.log("ORDER UPDATED");
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align="center" justify="center">
              <Text>Edit Order for {item.studentDetails.name}</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onUpdate}>
            <ModalBody>
              <Flex p={1} direction="column" width="100%" align="center">
                <Flex width="100%" align="center" justify="space-evenly">
                  <Text align="center" fontSize="10pt" width="32%">
                    Item Name
                  </Text>
                  <Text align="center" fontSize="10pt" width="32%">
                    Quantity
                  </Text>
                  <Text align="center" fontSize="10pt" width="32%">
                    Size
                  </Text>
                </Flex>
                <Flex
                  width="100%"
                  mt={1}
                  p={2}
                  border="0.5px solid"
                  borderRadius="7pt"
                  borderColor="gray.400"
                  align="center"
                  justify="space-evenly"
                  direction="column"
                >
                  {item.cartItems.map((cartItem, index) => (
                    <EditRow
                      item={cartItem}
                      key={index}
                      data={item}
                      onEdit={onEdit}
                    />
                  ))}
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Close
              </Button>
              <Button
                // type="submit"
                // isDisabled="true"
                colorScheme="blue"
                onClick={() => {
                  // onClose();
                }}
              >
                Update and Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;

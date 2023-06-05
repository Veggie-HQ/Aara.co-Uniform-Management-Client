import Item from "@/components/Item";
import UserLogin from "@/components/Login/Login";
import { auth, firestore } from "@/firebase/clientApp";
import useStudentInfo from "@/hooks/useStudentInfo";
import { useStateContext } from "@/lib/context";
import { Box, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const { showCart, showUser, students, USER, studentSelector } =
    useStateContext();
  const [student, setStudent] = useState(students[0]);
  const [items, setItems] = useState([]);
  const [user] = useAuthState(auth);

  const { savedStudents } = useStudentInfo();

  const onChange = (e) => {
    if (e.target.value >= 0) {
      setStudent((prev) => ({
        ...prev,
        name: savedStudents[e.target.value].name,
        gender: savedStudents[e.target.value].gender,
        goingToClass: savedStudents[e.target.value].goingToClass,
      }));
      studentSelector(savedStudents[e.target.value]);
    }
  };

  const itemFetcher = async () => {
    // e.preventDefault();
    if (student) {
      try {
        const itemQuery = query(
          collection(firestore, "items"),
          where("grades", "array-contains", student.goingToClass)
        );
        const itemDocs = await getDocs(itemQuery);
        const itemData = itemDocs.docs.flatMap((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems((prev) => ({
          ...prev,
          itemData,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    itemFetcher();
  }, [student]);

  return (
    <>
      <Head>
        <title>Aara Co Uniforms</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo.jpg" />
      </Head>

      <Flex mt="90px" direction="column">
        {!user ? (
          <Flex align="center" justify="center" direction="column">
            <UserLogin />
          </Flex>
        ) : (
          <Container>
            <Flex zIndex={showCart | showUser ? -1 : 1} direction="column">
              {savedStudents.length > 0 ? (
                <>
                  <Text fontWeight={600} align="center" mt={2}>
                    Placing an order for:
                  </Text>
                  <select
                    className="selectTab"
                    placeholder="Select Student"
                    onChange={onChange}
                  >
                    <option value="-1">Select Student</option>

                    {savedStudents.map((item, index) => (
                      <>
                        <option key={index} value={index}>
                          {item.name}
                        </option>
                      </>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <Text fontWeight={600} align="center" mt={2}>
                    Tap the Profile Button to Enter Student Information and
                    begin the Ordering Process
                  </Text>
                </>
              )}
            </Flex>
            {student && (
              <Box mt={2} width="100%">
                <Text
                  align="center"
                  mb={3}
                  mt={3}
                  fontStyle="italic"
                  fontWeight={600}
                  fontSize={"12pt"}
                >
                  The items displayed in the pictures are solely for
                  representational purposes
                </Text>

                <Text
                  align="center"
                  mb={3}
                  mt={3}
                  fontStyle="italic"
                  fontWeight={600}
                  fontSize={"15pt"}
                  color="orange.500"
                >
                  Once all the items have been added, tap the Cart icon to
                  review and submit the order
                </Text>
                {student.length === 0 ? (
                  ""
                ) : (
                  <>
                    {Object.keys(items).length > 0 ? (
                      <>
                        {items.itemData.map((item, index) => (
                          <Item item={item} key={index} />
                        ))}
                      </>
                    ) : (
                      <Flex width="100%" align="center" justify="center">
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="orange.200"
                          color="orange.500"
                          size="xl"
                        />
                      </Flex>
                    )}

                    {/* {Number(student.goingToClass) >= 1 &&
                    Number(student.goingToClass) <= 4 ? (
                      <>
                        {S1To4Data.map((item, index) => (
                          <>
                            <Item item={item} key={index} />
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    {Number(student.goingToClass) === 5 ? (
                      <>
                        {S5.map((item, index) => (
                          <>
                            <Item item={item} key={index} />
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    {Number(student.goingToClass) > 5 &&
                    Number(student.goingToClass) <= 12 ? (
                      <>
                        {S6To12Data.map((item, index) => (
                          <>
                            <Item item={item} key={index} />
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    {student.goingToClass.includes("LKG") ||
                    student.goingToClass.includes("UKG") ? (
                      <>
                        {LKGUKGData.map((item, index) => (
                          <>
                            <Item item={item} key={index} />
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )} */}
                  </>
                )}
              </Box>
            )}
          </Container>
        )}
      </Flex>
    </>
  );
}

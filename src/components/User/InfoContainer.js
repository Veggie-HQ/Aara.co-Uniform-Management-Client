import useStudentInfo from "@/hooks/useStudentInfo";
import { Flex, Text } from "@chakra-ui/react";

const InfoContainer = () => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [user] = useAuthState(auth);
  // const [savedStudents, setSavedStudents] = useState([]);

  // useEffect(() => {
  //   getStudents();
  // });

  // const getStudents = async () => {
  //   setLoading(true);
  //   if (error) setError("");
  //   try {
  //     const studentDocs = await getDocs(
  //       collection(firestore, `users/${user.email}/students`)
  //     );

  //     const students = studentDocs.docs.map((doc) => ({
  //       ...doc.data(),
  //     }));

  //     setSavedStudents(students);
  //   } catch (error) {
  //     console.log("getStudents error", error);
  //     setError(error.message);
  //   }
  //   setLoading(false);
  // };

  const { savedStudents } = useStudentInfo();

  return (
    <Flex borderRadius="7pt" width="95%" align="center" direction="column">
      {savedStudents.length < 1 ? (
        <Text align="center" fontWeight={800}>
          No Student Information Entered
        </Text>
      ) : (
        <>
          {savedStudents.map((item, index) => (
            <Flex
              width="95%"
              mb={2}
              borderRadius="7pt"
              direction="column"
              key={index}
              align="flex-start"
              bg="purple.300"
              p={2}
            >
              <Flex>
                <Text fontWeight={600} mr={1}>
                  Name:{" "}
                </Text>
                <Text>{item.name}</Text>
              </Flex>
              <Flex>
                <Text fontWeight={600} mr={1}>
                  Gender:{" "}
                </Text>
                <Text>{item.gender}</Text>
              </Flex>
              <Flex>
                <Text fontWeight={600} mr={1}>
                  Going To Class:{" "}
                </Text>
                <Text>{item.goingToClass}</Text>
              </Flex>
            </Flex>
          ))}
        </>
      )}
    </Flex>
  );
};

export default InfoContainer;

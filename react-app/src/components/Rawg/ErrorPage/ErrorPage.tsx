import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <Box padding={5}>
      <Heading>Oops!</Heading>
      <Text>
        {isRouteErrorResponse(error)
          ? "Invalid Page"
          : "Sorry! Unexpected Error Occurred!"}
      </Text>
    </Box>
  );
};

export default ErrorPage;

import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loading from "@/components/Loading";

export default function TasksPage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" gutterBottom>
            Protected: Tasks Page
          </Typography>
        </Box>
      </Container>
    )
  );
}

import AlertDialog from "@/components/AlertDialog";
import { Button, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import buildClient from "../api/build-client";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loading from "@/components/Loading";

interface ProfileProps {
  accessToken?: string;
  userId: string;
}

const ProfilePage: React.FC<ProfileProps> = ({ userId, accessToken }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, error, isLoading } = useUser();
  const dialogText = {
    title: "Do you really want to delete your profile?",
    content:
      "This action is irreversible and it deletes all the content associated with the account.",
  };
  const handleDeleteAccount = async () => {
    const deleteUserPostsRequest = {
      userId: userId,
    };

    try {
      // build client and service, then send request
      const client = buildClient();
      const userService = new UserService(client);
      const res = await userService.deleteUserPosts(
        deleteUserPostsRequest,
        accessToken
      );

      // log-out in case of success
      if (res.status >= 200 && res.status <= 204) {
        console.log("yes, between", res.status);

        setIsDialogOpen(false);
        router.push("/api/auth/logout");
      } else {
        console.log("outside ", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error || isLoading) {
      return;
    }

    if (!user) {
      router.push("/api/auth/login");
    }
  }, [user, error, isLoading]);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Typography variant="body1" gutterBottom>
        Profile:
      </Typography>

      <Button
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        Delete account
      </Button>
      <AlertDialog
        {...dialogText}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        agree={handleDeleteAccount}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx.req, ctx.res);

  if (!session?.user) {
    return {
      props: {
        userId: "",
        accessToken: "",
      },
    };
  }

  const { accessToken } = await getAccessToken(ctx.req, ctx.res);
  const client = buildClient(ctx);

  return {
    props: {
      userId: session.user.sub,
      accessToken: accessToken,
    },
  };
};

export default ProfilePage;

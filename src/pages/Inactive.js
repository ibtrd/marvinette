import { Center, Heading, Image, Text, Link } from "@chakra-ui/react";
import Profile from "../components/profile/Profile";
import { ProfileContext } from "../contexts/ProfileContext";
import StatsBanner from "../components/statsBanner/statsBanner";
import CooldownButton from "../components/cooldownButton/cooldownButton";
import { useContext } from "react";

export default function Inactive() {

  const {me} = useContext(ProfileContext);

  return (
      <Center width="100vw" height="100vh" flexDir="column">
        <Profile
          position="absolute"
          top="16px"
          left="16px"
          right={["16px", "auto", "auto"]}
          isAdmin={false}
        />
        <StatsBanner
          position="absolute"
          top={["auto", "16px", "16px"]}
          bottom={["16px", "auto", "auto"]}
          right="16px"
          left={["16px", "auto", "auto"]}
        />
        <Image src="/nofun.png" height="5vh" />
        <Heading>No fun allowed</Heading>
        <Text marginY="64px" textAlign="center" w={["60vw", "40vw", "30vw"]}>
          See you soon...
        </Text>
        {me && me.statusTimeout &&
        <CooldownButton
          timeout={new Date(me.statusTimeout).getTime()}
          onClick={() => window.location.reload()}
        >
          Play Marvinette
        </CooldownButton>}
        <Text
          color={"gray.400"}
          position={"absolute"}
          bottom="16px"
          textAlign="center"
        >
          Developed by <Link href="https://profile.intra.42.fr/users/ibertran">ibertran</Link> && <Link href="https://profile.intra.42.fr/users/bwisniew"> bwisniew </Link>
        </Text>
      </Center>
  );
}

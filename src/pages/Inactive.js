import { Center, Heading, Image, Text, Link, EditableTextarea, EditablePreview, Editable, EditableInput, Stack, IconButton } from "@chakra-ui/react";
import Profile from "../components/profile/Profile";
import { ProfileContext } from "../contexts/ProfileContext";
import StatsBanner from "../components/statsBanner/statsBanner";
import CooldownButton from "../components/cooldownButton/cooldownButton";
import { useContext } from "react";
import { useSettings } from "../hooks/useSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInactive } from "../hooks/useInactive";

function editableImage({children, ...props}) {
  return (
    <Image
      src={children}
      {...props}
    />
  );
}

export default function Inactive() {
  
  const { me } = useContext(ProfileContext);
  const [inactiveMsg, setInactiveMsg, updateInactiveMsg] = useSettings('inactiveMsg');
  const [inactiveTitle, setInactiveTitle, updateInactiveTitle] = useSettings('inactiveTitle');
  const [inactiveImage, setInactiveImage, updateInactiveImage] = useSettings('inactiveImage');

  const values = useInactive();

  if (values)
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

        {me && me.admin && inactiveImage ?
            <Editable
            textAlign="center" w={["60vw", "40vw", "30vw"]}
            height="5vh"
            defaultValue={inactiveImage}
            onChange={(e) => setInactiveImage({target: {value: e ? e : " "}})}
            >
              <EditablePreview
                height='100%'
                width={inactiveImage.length > 1 ? "auto" : "100%"}
                as={editableImage}
                bg={inactiveImage.length > 1 ? "white" : "gray.100"}
              />
              <EditableInput />
            </Editable>
        :
          <Image src={values.img} height="5vh" />
        }


        {me && me.admin && inactiveTitle ?
          <Editable
            textAlign="center" w={["60vw", "40vw", "30vw"]}
            defaultValue={inactiveTitle}
            onChange={(e) => setInactiveTitle({target: {value: e ? e : " "}})}
          >
            <EditablePreview
              as={Heading}
              fontWeight={"bold"}
              w={"100%"}
              h={'24px'}
              bg={inactiveTitle.length > 1 ? "white" : "gray.100"}
            />
            <EditableInput />
          </Editable>:
          <Heading>{values.title}</Heading>
        }



        {me && me.admin && inactiveMsg ?
          <Editable
            marginY="64px" textAlign="center" w={["60vw", "40vw", "30vw"]}
            defaultValue={inactiveMsg}
            onChange={(e) => setInactiveMsg({target: {value: e ? e : " "}})}
          >
            <EditablePreview
              w={"100%"}
              h={'24px'}
              bg={inactiveMsg.length > 1 ? "white" : "gray.100"}
            />
            <EditableTextarea />
          </Editable>:
          <Text marginY="64px" textAlign="center" w={["60vw", "40vw", "30vw"]}>
            {values.msg}
          </Text>
        }
        {me && me.admin && <IconButton m='16px' icon={<FontAwesomeIcon icon='check' />} onClick={() => {
          updateInactiveMsg();
          updateInactiveTitle();
          updateInactiveImage();
        }} />}
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

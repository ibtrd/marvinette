import '../App.css'
import Profile from "../components/profile/Profile";
import { ProfileProvider } from "../contexts/ProfileContext";
import { Flex, Heading } from "@chakra-ui/react";
import AdminSettingsUser from '../components/adminSettings/AdminSettingsUser';
import AdminSettingsNext from '../components/adminSettings/AdminSettingsNext';
import AdminSettings from '../components/adminSettings/AdminSettings';


export default function Admin() {

  return (
      <ProfileProvider>
        <Flex flexDir='column' alignItems='center'>
          <Profile position='absolute' top='16px' left='16px' right={['16px', 'auto', 'auto']} isAdmin/>
		  <Heading marginTop='128px'>Admin</Heading>
		  <Flex marginTop='2vh' width='100 vw' flexDir='column' alignItems='center'>
			<AdminSettingsUser width='90%' />
			<AdminSettingsNext width='90%' marginY='16px' />
			<AdminSettings width='90%' marginY='16px' maxHeight='50vh'/>
		  </Flex>

      </Flex>
      </ProfileProvider>
  );
}

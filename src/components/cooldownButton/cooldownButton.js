import { Button, Card, Center, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function CooldownButton({timeout, children, ...props}) {

	const [cooldown, setCooldown] = useState(Math.floor((timeout - Date.now()) / 1000));

	useEffect(() => {
		console.log('timeout', timeout);
		const interval = setInterval(() => {
			if (timeout < Date.now())
				setCooldown(0);
			else
				setCooldown(Math.floor((timeout - Date.now()) / 1000));
		}, 1000);
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Button
			isDisabled={cooldown > 0}
			{...props}
		>
			{cooldown > 0 ?
               Math.floor(cooldown / (60 * 60)).toString().padStart(2, '0') + ':' + Math.floor(cooldown % (60 * 60) / 60).toString().padStart(2, '0') + ':' + (cooldown % 60).toString().padStart(2, '0')
              : children}
		</Button>
	);
  }

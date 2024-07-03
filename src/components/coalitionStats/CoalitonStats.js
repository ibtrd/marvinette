import { Card, Center, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CoalitionStats({coa, rank, ...props}) {

	return (
		<Card
			{...props}
			alignItems='center'
			bg='gray.50'
			borderRadius='16px'
			overflow='hidden'
			display='flex'
			bgImage={coa.background}
			bgSize='cover'
			flexDir='row'
		>
			<Center
				flex='1'
				bg={coa.color}
				height='100%'
				flexDir='column'
			>
				<Image
					src={coa.img}
					width='60%'
				/>
			</Center>
			<Stack
				flex='3'
				justifyContent='center'
				color='white'
				alignItems='center'
				height='100%'
				textShadow='1px 1px 2px rgba(0, 0, 0, 0.52)'
			>
				<Flex
					alignItems='center'
				>
					<FontAwesomeIcon fontSize='32px' icon='arrows-rotate' />
					<Heading
						marginLeft='8px'
					>
						{coa.spins}
					</Heading>
				</Flex>
				<Text>
					{coa.name}
				</Text>
			</Stack>
		</Card>
	);
  }

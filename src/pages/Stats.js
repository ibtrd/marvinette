import { Flex, Grid, Link, Stack, Text } from '@chakra-ui/react';
import '../App.css'
import LeaderBoard from '../components/leaderBoard/leaderBoard';
import LastRewards from '../components/lastRewards/LastRewards';
import CoalitionStats from '../components/coalitionStats/CoalitonStats';
import { useStats } from '../hooks/useStats';
import ChampionStats from '../components/championStats/championStats';

export default function Stats() {

  const { stats } = useStats();

  if (stats)
  return (
    <Flex
      bg='gray.200'
      width='100vw'
      height='100vh'
      justifyContent='space-around'
      alignItems='center'
    >
      <LeaderBoard
        width='27%'
        height='95%'
        stats={stats}
      />
      <Stack
        width='45%'
        height='95%'
        justifyContent='space-between'
      >
         { stats.champion && <ChampionStats champion={stats.champion} height='24%'/>}
          <CoalitionStats coa={stats.coalitions[0]} rank={1} height='24%'/>
          <CoalitionStats coa={stats.coalitions[1]} rank={2} height='24%'/>
          <CoalitionStats coa={stats.coalitions[2]} rank={3} height='24%'/>
      </Stack>
      <LastRewards
        stats={stats}
        width='20%'
        height='95%'
      />
    </Flex>
  );
}

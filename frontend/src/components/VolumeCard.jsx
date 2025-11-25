import React, { useEffect } from "react";
import { Button, Card, Flex, Box } from "@chakra-ui/react";
import { BarList, Chart, useChart } from "@chakra-ui/charts";
import { useStatsStore } from "@/store/stats";
import CardGrid from "./CardGrid";

export default function VolumeCard() {
  const { weeklyVolume, fetchWeeklyVolume } = useStatsStore();

  useEffect(() => {
    fetchWeeklyVolume();
  }, []);

  // Latest week's data
  const weeks = Object.keys(weeklyVolume || {});
  const sortedWeeks = weeks.sort((a, b) => new Date(a) - new Date(b));
  const latestWeek = sortedWeeks.at(-1);

  //muscle volumes for latest week
  const muscleData = weeklyVolume?.[latestWeek] || {};

  // Convert to [{ name, value }] for BarList
  const barListData = Object.entries(muscleData).map(([muscle, value]) => ({
    name: muscle,
    value,
  }));

  const chart = useChart({
    sort: { by: "value", direction: "desc" },
    data: barListData,
    series: [{ name: "name", color: "green.subtle" }],
  });

  return (
    <Box w="full" position="relative">
      
        <Card.Root w="full" h="100%">
          <Card.Body gap="2">
            <Card.Title mb="2" fontWeight="bold">Volume This Week</Card.Title>
            <BarList.Root chart={chart}>
              <BarList.Content>
                <BarList.Bar />
                <BarList.Value valueFormatter={(value) => `${value.toLocaleString()} kg`}/>
              </BarList.Content>
            </BarList.Root>
          </Card.Body>
          <Card.Footer justifyContent="flex-end"></Card.Footer>
        </Card.Root>
      
    </Box>
  );
}

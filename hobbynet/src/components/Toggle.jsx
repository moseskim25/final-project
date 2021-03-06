import * as React from 'react';
import { useColorMode, Stack, Text } from "@chakra-ui/react"
import { SunIcon } from "@chakra-ui/icons"

function Toggle(isLoggedIn) {
  const { colorMode, toggleColorMode } = useColorMode();
  if (isLoggedIn) {

    return (
      <Stack cursor="pointer" onClick={() => toggleColorMode()} display="flex" alignItems="center" spacing="0px" _hover={{ opacity: 0.85 }}>
        <Text>Toggle Mode   <SunIcon align="center"></SunIcon></Text>
      </Stack>
    )
  }
  return (
    <Stack cursor="pointer" onClick={() => toggleColorMode()} display="flex" alignItems="center" spacing="0px" _hover={{ opacity: 0.85 }}>
      <SunIcon align="center"></SunIcon>
      <Text>Toggle Mode</Text>
    </Stack>
  )
}

export default Toggle

import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Yuji Syuku'`,
    body: `'Yuji Syuku'`,
  },
  fontSizes: {
    md : "xl"
  },
  components: {
    Text: {
      baseStyle: {
        fontSize: "xl", 
      },
    },
  },
})

export default theme
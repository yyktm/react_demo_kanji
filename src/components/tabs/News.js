import { Text, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, HStack, Spacer, Badge } from '@chakra-ui/react'

const News = () => {
    return (
        <div>
            <Heading>お知らせ</Heading>

            <Accordion mt={5} defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                <HStack>
                                    <Text fontSize="2xl">サイトを公開しました</Text>
                                    <Spacer />
                                    <Text mr={5}>2023/XX/XX</Text>
                                </HStack>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Text>
                            サイトを公開しました。<br />
                            不具合やご要望あればお問い合わせください。<br />
                            引き続き当サイトをよろしくお願いいたします。
                        </Text>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default News;
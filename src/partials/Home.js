import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Flex, Text, VStack, HStack } from '@chakra-ui/react'

import App from "../App";

import HowToPlay from "../components/tabs/HowToPlay";
import News from '../components/tabs/News';
import Faq from '../components/tabs/Faq';
import Inquiry from "../components/tabs/Inquiry";
import PrivacyPolicy from '../components/tabs/PrivacyPolicy';

const Home = () => {
    return (
        <>
            <Flex justifyContent="space-between" my={16}>
                <Box w="85%" bg="cyan.50" rounded='md' shadow='md' mx={8}>
                    <Tabs>
                        <TabList>
                            <Tab><Text>プレイする</Text></Tab>
                            <Tab><Text>遊び方</Text></Tab>
                            <Tab><Text>お知らせ</Text></Tab>
                            <Tab><Text>Q＆A</Text></Tab>
                            <Tab><Text>お問い合わせ</Text></Tab>
                            <Tab><Text>サイトポリシー</Text></Tab>
                        </TabList>
                        <TabPanels p='2rem'>
                            <TabPanel><App /></TabPanel>
                            <TabPanel><HowToPlay /></TabPanel>
                            <TabPanel><News /></TabPanel>
                            <TabPanel><Faq /></TabPanel>
                            <TabPanel><Inquiry /></TabPanel>
                            <TabPanel><PrivacyPolicy /></TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </>

    )
}

export default Home;
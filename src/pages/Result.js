import { useNavigate } from "react-router-dom";
import { useDifficulty } from "../context/DifficultyContext";
import { useScore } from "../context/ScoreContext";
import { resultList } from "./Play";
import { Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex, HStack, Button, Spacer, VStack } from "@chakra-ui/react";
import DoughnutChart from "../components/utils/DoughnutChart";

const review = {
    0: "まずは基礎固めから頑張りましょう。",
    1: "次回の挑戦をお待ちしています。",
    2: "しっかり復習して、さらなるレベルアップを！",
    3: "まずまずの結果です。その調子で次回も頑張ってください。",
    4: "素晴らしい正解数です。この級の読みはばっちりですね。",
    5: "凄まじい漢字力とタイピング力ですね！。"
}

const Result = () => {
    const difficulty = useDifficulty();
    const score = useScore();
    const navigate = useNavigate();

    const correctCount = resultList.filter(item => item.answerFlg === 1).length;
    const falseCount = resultList.filter(item => item.answerFlg === 2).length;
    const correctRate = (correctCount + falseCount) === 0 ? 0 : Math.floor((correctCount / (correctCount + falseCount)) * 100);


    return (
        <div>
            <Flex justifyContent="end">
                <a href="/">
                    <Button colorScheme="yellow" variant="outline">
                        トップに戻る＞＞
                    </Button>
                </a>
            </Flex>
            <Heading mb={8}>結果発表</Heading>

            <Flex mb={8} alignItems="center">
                <VStack align="start">
                    <Box maxW="300px" p='15px' bg="cyan.400" color='white' rounded='md' shadow='md'>
                        <Flex justifyContent="center" alignItems="center">
                            <Text mr={5}>最終スコア</Text>
                            <Heading>{score}P</Heading>
                        </Flex>
                    </Box>
                    <Text>お疲れ様でした！{review[Math.floor(correctCount / 10)]}</Text>
                    <Text>レベル：{difficulty}級</Text>
                    <Text>正解数：{correctCount}問</Text>
                    <Text>正解率：{correctRate}％</Text>

                </VStack>

                {correctCount + falseCount === 0 ? "" : (
                    <>
                        <Spacer />
                        <Box maxW="400px">
                            <DoughnutChart scoreData={[correctCount, falseCount]} />
                        </Box>
                    </>

                )}
            </Flex>

            <Accordion defaultIndex={[0]} allowMultiple mt={16}>
                {resultList.map((resultObj) => {
                    return (
                        <AccordionItem key={resultObj.id}>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        <HStack>
                                            <Box w={20} p='10px' color='white' bg={resultObj.answerFlg === 1 ? 'teal.400' : 'red.400'} rounded='md' shadow='md'>
                                                <Flex justifyContent='center'>{resultObj.answerFlg === 1 ? '正解' : '不正解'}</Flex>
                                            </Box>
                                            <Text ml={3}>{resultObj.question}「{resultObj.answer}」</Text>
                                        </HStack>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                あなたの回答：{resultObj.submittedAnswerList.map((submittedAnswerObj, index) => {
                                    return (
                                        <HStack key={index}>
                                            <Text color={submittedAnswerObj.answerFlg === 1 ? 'teal.400' : submittedAnswerObj.answerFlg === 2 ? 'red.400' : submittedAnswerObj.answerFlg === 3 ? 'yellow.400' : submittedAnswerObj.answerFlg === 4 ? 'orange.300' : 'Gray.50'}>
                                                {submittedAnswerObj.answerFlg === 1 ? '正解　　' : submittedAnswerObj.answerFlg === 2 ? '不正解　' : submittedAnswerObj.answerFlg === 3 ? 'パス　　' : submittedAnswerObj.answerFlg === 4 ? '時間切れ' : '未回答'}
                                            </Text>
                                            <Text>「{submittedAnswerObj.submittedAnswer}」</Text>
                                        </HStack>

                                    )
                                })}
                            </AccordionPanel>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    )
}

export default Result;
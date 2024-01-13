import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDifficulty } from "../context/DifficultyContext";
import { useScore, useSetScore } from "../context/ScoreContext";
import { kanjiList_origin } from "../db/kanjiList";
import { Text, Box, Grid, GridItem, Flex, Input, Button, Progress, Spacer, ScaleFade, VStack, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

function arrayShuffle(array) {
    const newArray = array;

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
let kanjiList = [{
    "id": 0,
    "question": "",
    "answer": "",
    "level": 0,
    "ver": 1,
    "del_flg": 0,
    "updated_by": "",
    "updated_at": ""
}];

const scoreAllocation = {
    1: 15,
    2: 10,
    3: 8,
    4: 7,
    5: 6,
    6: 5,
    7: 4,
    8: 3,
    9: 2,
    10: 1
}

let interval;
let submittedAnswer;
let submittedAnswerList = [];
export let resultList = [];

const Play = () => {
    const [hp, setHp] = useState(100);
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(0);
    const [timeAcceleration, setTimeAcceleration] = useState(1);
    const [endTime, setEndTime] = useState(0);
    const [inputValue, setInputValue] = useState("");

    const [kanjiObj, setKanjiObj] = useState(kanjiList[0]);
    const [answerFlg, setAnswerFlg] = useState(0);

    const difficulty = useDifficulty();
    const score = useScore();
    const setScore = useSetScore();

    const inputRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();


    useEffect(() => {
        kanjiList = arrayShuffle(kanjiList_origin[difficulty]);
        inputRef.current.focus();
        submittedAnswer = "";
        submittedAnswerList = [];
        resultList = [];
        setScore(0);
    }, []);

    useEffect(() => {
        interval = window.setInterval(() => {
            setTime(prev => prev + timeAcceleration);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeAcceleration]);

    useEffect(() => {
        if(count >= kanjiList.length){
            navigate("/result");
        }
        setKanjiObj(kanjiList[count]);
        setTime(0);
        setTimeAcceleration(1 + Math.floor(count / 10));
    }, [count])

    useEffect(() => {
        if (hp <= 0) setTimeAcceleration(0);
        if (time >= 10 && answerFlg !== 1 && answerFlg !== 3) {
            setHp(prev => prev - 7);
            pushToSubmittedAnswerList(4);
            moveNextQ(4);
        }
    }, [time])

    useEffect(() => {
        if (hp <= 0) {
            if (submittedAnswerList && submittedAnswerList.length > 0) {
                pushToResultList(2);
            }
            onOpen();
            let endInterval = window.setInterval(() => {
                setEndTime(prev => prev + 1);
            }, 1000);
            return () => clearInterval(endInterval);
        }
    }, [hp])

    useEffect(() => {
        if (endTime === 5) {
            navigate("/result");
        }
    }, [endTime])


    const answerQ = (e) => {
        if (answerFlg !== 0) {
            return;
        }
        if (e.key === "Enter") {
            if (e.target.value === kanjiObj.answer) {
                pushToSubmittedAnswerList(1, e.target.value);
                setScore(prev => prev + scoreAllocation[difficulty])
                moveNextQ(1);

            } else {
                submittedAnswer = e.target.value;
                pushToSubmittedAnswerList(2, e.target.value)
                setAnswerFlg(2);
                setHp(prev => prev - 7);
                setInputValue("");
                setTimeout(() => {
                    setAnswerFlg(0);
                }, 2000)
            }
        }
    }

    const passQ = () => {
        if (answerFlg !== 0) {
            return;
        }
        setHp(prev => prev - 5);
        inputRef.current.focus();
        pushToSubmittedAnswerList(3);
        moveNextQ(3);
    }

    const moveNextQ = (flg) => {
        setTimeAcceleration(0);
        setAnswerFlg(flg);
        setTimeout(() => {
            setAnswerFlg(0);
            setInputValue("");
            setCount(prev => prev + 1);
        }, 2000)
    }

    const pushToSubmittedAnswerList = (flg, submittedAnswer = "") => {
        submittedAnswerList.push({ answerFlg: flg, submittedAnswer: submittedAnswer });
        if (flg !== 2) {
            pushToResultList(flg);
        }
    }

    const pushToResultList = (flg) => {
        resultList.push({ ...kanjiObj, answerFlg: flg === 1 ? 1 : 2, submittedAnswerList: submittedAnswerList });
        submittedAnswerList = [];
    }

    const transitionToResult = () => {
        if (submittedAnswerList && submittedAnswerList.length > 0) {
            pushToResultList(2);
        }
        navigate("/result");
    }

    return (
        <div>
            <Flex justifyContent="space-between">
                <Button colorScheme="yellow" variant="outline" onClick={() => { navigate("/") }}>
                    ＜＜トップに戻る
                </Button>
                <Button colorScheme="cyan" variant="outline" onClick={transitionToResult}>
                    結果画面へ＞＞
                </Button>
            </Flex>
            <Text fontSize="3xl">{difficulty}級</Text>
            <Box
                // bg='yellow.100'
                border="ridge"
                p={4} color='black'
                style={{
                    backgroundImage: `url(kanken/bunbougu_kokuban.png)`,
                    backgroundSize: "55% 55%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Grid
                    templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']}
                    gap={4}
                >
                    <GridItem rowSpan={1} colSpan={1}>
                        <Text fontSize="3xl">第{count + 1}問</Text>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={2}>
                        <Flex justifyContent="end" alignItems="center">
                            <Text mr={3} fontSize={["xl", "2xl", "3xl"]}>体力</Text>
                            <Progress hasStripe w={64} value={hp} colorScheme={hp > 50 ? "blue" : hp > 25 ? "yellow" : "red"} />
                        </Flex>
                        <Flex justifyContent="end">
                            <Text fontSize={["xl", "2xl", "3xl"]} mr="52">スコア</Text>
                            <Text fontSize={["xl", "2xl", "3xl"]}>{score}P</Text>
                        </Flex>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={3}>
                        <Flex mt={10} justifyContent="center">
                            <Text color="white" fontSize="6xl" opacity={1 - time * 0.1}>{kanjiObj.question}</Text>
                        </Flex>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1} />
                    <GridItem rowSpan={1} colSpan={1}>
                        <ScaleFade initialScale={0.9} in={answerFlg !== 0}>
                            <Box p='15px' color='white'>
                                <Flex justifyContent="center">
                                    <VStack>
                                        <Text as={answerFlg === 1 ? 'b' : ''} fontSize="3xl" color={answerFlg === 1 ? 'blue.400' : answerFlg === 2 ? 'red.400' : answerFlg === 3 ? 'yellow.200' : answerFlg === 4 ? 'orange.300' : 'transparent'}>
                                            {answerFlg === 1 ? '正解' : answerFlg === 2 ? '不正解' : answerFlg === 3 ? 'パスしました' : answerFlg === 4 ? '時間切れ' : '未回答'}
                                        </Text>
                                        <Text as={answerFlg === 1 ? 'b' : ''} fontSize="3xl" color={answerFlg === 1 ? 'blue.400' : answerFlg === 2 ? 'red.400' : answerFlg === 3 ? 'yellow.200' : answerFlg === 4 ? 'orange.300' : 'transparent'}>
                                            「{answerFlg === 0 ? '' : answerFlg === 2 ? submittedAnswer : kanjiObj.answer}」
                                        </Text>
                                    </VStack>
                                </Flex>
                            </Box>
                        </ScaleFade>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1} />

                    <GridItem rowSpan={1} colSpan={3}>
                        <Input mt={20} size="lg" value={inputValue} ref={inputRef} onKeyDown={answerQ} onChange={(e) => setInputValue(e.target.value)} placeholder="回答を入力して、Enterを押してください"></Input>
                        <Flex mt={3}>
                            <Button colorScheme="yellow" variant="outline" onClick={passQ}>パスして次の問題へ</Button>
                        </Flex>
                    </GridItem>
                </Grid>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size='3xl' closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>ゲーム終了</ModalHeader>
                    <ModalBody>
                        <Text>
                            お疲れ様でした！<br />
                            {5 - endTime}秒後に結果画面に移ります。
                        </Text>
                        <Flex justifyContent="center">
                            <CircularProgress value={endTime * 20} size={120}>
                                <CircularProgressLabel>{5 - endTime}</CircularProgressLabel>
                            </CircularProgress>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            <Link to="/result">結果画面へ</Link>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Play;
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useDifficulty, useSetDifficulty } from '../context/DifficultyContext';
import { BiCaretRightCircle } from "react-icons/bi";
import { Text, Flex, Stack, Radio, RadioGroup, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

let startInterval;

const SelectLevel = () => {
    const [startTime, setStartTime] = useState(0);

    const difficulty = useDifficulty();
    const setDifficulty = useSetDifficulty();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const transitionToPlay = () => {
        onOpen();
        startInterval = window.setInterval(() => {
            setStartTime(prev => prev + 1);
        }, 1000);
    }

    useEffect(() => {
        setDifficulty("1");
    }, [])

    useEffect(() => {
        if (startTime === 3) {
            navigate("/play");
            return () => clearInterval(startInterval);
        }
    }, [startTime])



    return (
        <div>
            <RadioGroup value={difficulty} onChange={(value) => setDifficulty(value)}>
                <Stack>
                    <Radio value='1'><Text>1級：大学・社会人レベル</Text></Radio>
                    <Radio value='2'><Text>2級：高校卒業レベル</Text></Radio>
                    <Radio value='3'><Text>3級：中学卒業レベル</Text></Radio>
                    <Radio value='4'><Text>4級：中学在学レベル</Text></Radio>
                    <Radio value='5'><Text>5級：小学校６年生レベル</Text></Radio>
                    <Radio value='6'><Text>6級：小学校５年生レベル</Text></Radio>
                    <Radio value='7' isDisabled><Text>7級：準備中</Text></Radio>

                </Stack>
            </RadioGroup>

            <Button mt={6} leftIcon={<BiCaretRightCircle />} colorScheme='teal' variant='solid' onClick={transitionToPlay}>
                ゲーム開始
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size='3xl' closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>ゲーム開始</ModalHeader>
                    <ModalBody>
                        <Text>
                            {difficulty}級のゲームを開始します。<br />
                            {3 - startTime}秒後にプレイ画面に移ります。
                        </Text>
                        <Flex justifyContent="center">
                            <CircularProgress value={startTime * 33.3} size={120}>
                                <CircularProgressLabel>{3 - startTime}</CircularProgressLabel>
                            </CircularProgress>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => navigate("/play")}>
                            プレイ画面へ
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}


export default SelectLevel;
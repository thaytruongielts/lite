
import React, { useState, useCallback } from 'react';
import { Question, AnswerStatus } from './types';
import QuestionItem from './components/QuestionItem';
import ScriptDisplay from './components/ScriptDisplay';

const SCRIPT_TEXT = `
You will hear part of a conversation between an art auctioneer and their client. First you have some time to look at questions 1-7. [Pause 30 seconds]
You will see that there is an example that has been done for you. On this occasion only, the conversation relating to this will be played first.
Auctioneer: Good afternoon, madam. Ah yes, I see you successfully bid for Lot 2374.
Client: Good afternoon. Yes, that's correct.
Narrator: The Lot number of the auctioned article is 2374, so you write '2374' in the space provided. You should answer the questions as you listen because you will not hear the recording a second time. Listen carefully and answer questions 1-7.
Auctioneer: Good afternoon, madam. Ah yes, I see you successfully bid for Lot 2374.
Client: Good afternoon. Yes, that's correct.
Auctioneer: I hope you are satisfied with your purchase? If I may say so myself, I think you got a real bargain. What you paid is not much above the original reserve price of £300!
Client: I love P.J.Browning's work and to be honest I was prepared to pay a lot more. I'd decided beforehand that £500 would be my limit, so getting it £150 cheaper than I was prepared to pay for it was a wonderful surprise!
Auctioneer: I have to say that 17th-century paintings of rural English scenes like this one are rather underrated. The art world seems to want abstract paintings by modern artists more. Geometric designs seem to be the trend today!
Client: Not my taste at all! I have a more conservative taste when it comes to art. The painting will blend In with my antique furniture at home.
Auctioneer: Well, I hope you have a big wall to put It on!
Client: Luckily, I'm very fortunate to live In a rather large country house. What are the exact measurements of the painting by the way?
Auctioneer: The width is 1.5 metres and the height, is.1 metre, without, the frame that is. If you include the gilt-covered frame, .which Is quite large to balance the size of the painting, you can add on another 0,5 metres for the width and the same again for the height, obviously.
Client: That shouldn't prove too much of a problem. I'm just happy I managed to win the bid for this wonderful painting!
Narrator: Before listening to the rest of the conversation you have some time to look at questions 8-10. [Pause 30 seconds] Now listen and answer questions 8-10.
Auctioneer: So, madam, I would just like to take down some details from you.
Client: OK, go ahead!
Auctioneer: I recognise your face as you've attended several of our auctions before, but I can't put a name to your face. Could you remind me of your name, please?
Client: Oh, yes, it's Mrs. Bradwell-Thompson. It's a double barrel surname, so you need a hyphen In between the 2 surnames, you see.
Auctioneer: So that's spelt B-R-A-D-W-E-L-L followed by a hyphen, then T-H-O-M-S-O-N?
Client: Well, the first part's right. But you spell Thompson with a 'P' In between the 'M' and the 'S' of the surname.
Auctioneer: OK... and your address, please?
Client: Yes, It's 'Charlton Manor'; that's spelt, C-H-A-R-L-T-O-N, and I live In Kingston Village. Oh and of course you'll need the postcode, too, It's KN26 56T.
Auctioneer: Sorry, did you say KM26 56T?
Client: No, it's K-N-not an 'M' then 2-6 5-6-T.
Auctioneer: Well, thank you, Mrs. Bradwell-Thompson, I think that's just about everything... Oh and I need to know when you would like the painting delivered. We deliver on Tuesdays and Fridays, the week following an auction.
Client: Well... I'm having a long-weekend break In the Cotswolds, a charming area of England, you know, so this coming Friday would be impossible. Flow about next Tuesday?
Auctioneer: No problem at all, madam. So that will be the 23rd of March.
Client: Superb! Thank you.
Auctioneer: Not at all, madam, It was a pleasure doing business with you.
Narrator: That's the end of Part 1. You have half a minute to check your answers. [Pause 30 seconds]
`;


const initialQuestions: Question[] = [
    { id: 1, correctAnswers: ['300'], userAnswer: '', status: AnswerStatus.UNCHECKED },
    { id: 2, correctAnswers: ["p.j.browning", "p.j. browning", "pj browning"], userAnswer: '', status: AnswerStatus.UNCHECKED },
    { id: 3, correctAnswers: ['350'], userAnswer: '', status: AnswerStatus.UNCHECKED },
    { id: 4, correctAnswers: ['17th-century', '17th century'], userAnswer: '', status: AnswerStatus.UNCHECKED },
    { id: 5, correctAnswers: ['rural english'], userAnswer: '', status: AnswerStatus.UNCHECKED },
    { id: 6, correctAnswers: ['1.5 metres', '1.5 meters', '1.5m'], userAnswer: '', status: AnswerStatus.UNCHECKED },
    { id: 7, correctAnswers: ['1.5 metres', '1.5 meters', '1.5m'], userAnswer: '', status: AnswerStatus.UNCHECKED },
    { id: 8, correctAnswers: ['Bradwell-Thompson', 'bradwell-thompson'], userAnswer: '', status: AnswerStatus.UNCHECKED },
    { id: 9, correctAnswers: ['KN26 56T'], userAnswer: '', status: AnswerStatus.UNCHECKED },
    { id: 10, correctAnswers: ['23rd of march', '23 march'], userAnswer: '', status: AnswerStatus.UNCHECKED },
];

const App: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [showAnswers, setShowAnswers] = useState(false);
    const [score, setScore] = useState(0);
    const [showScript, setShowScript] = useState(false);

    const handleAnswerChange = useCallback((id: number, answer: string) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(q => (q.id === id ? { ...q, userAnswer: answer, status: AnswerStatus.UNCHECKED } : q))
        );
        setShowAnswers(false);
    }, []);

    const checkAnswers = () => {
        let correctCount = 0;
        const updatedQuestions = questions.map(q => {
            const isCorrect = q.correctAnswers.includes(q.userAnswer.trim().toLowerCase()) || (q.id === 9 && q.userAnswer.trim().toUpperCase() === q.correctAnswers[0]);
            if (isCorrect) {
                correctCount++;
                return { ...q, status: AnswerStatus.CORRECT };
            }
            return { ...q, status: AnswerStatus.INCORRECT };
        });
        setQuestions(updatedQuestions);
        setScore(correctCount);
        setShowAnswers(true);
    };
    
    const getQuestion = (id: number) => questions.find(q => q.id === id)!;

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue-800">IELTS Listening Practice Test</h1>
                    <p className="text-gray-600 mt-1">Listen to the audio and answer the questions below.</p>
                </div>
            </header>
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-6">
                         <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2204499827&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">Questions 1-7</h2>
                        <p className="mb-4 font-semibold text-gray-700">Write <span className="text-red-600">NO MORE THAN THREE WORDS AND/OR A NUMBER</span> for each answer.</p>
                        
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <h3 className="text-lg font-semibold bg-gray-50 p-4 border-b">Details of customer purchase</h3>
                            
                            <div className="divide-y divide-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 items-center">
                                    <div className="md:col-span-1 font-medium text-gray-600">Lot number</div>
                                    <div className="md:col-span-2 text-gray-800"><strong>Example:</strong> 2374</div>
                                </div>
                                <QuestionItem question={getQuestion(1)} onChange={handleAnswerChange} showAnswers={showAnswers} label="Reserve price" number={1} prefix="£" />
                                <QuestionItem question={getQuestion(2)} onChange={handleAnswerChange} showAnswers={showAnswers} label="Name of artist" number={2} />
                                <QuestionItem question={getQuestion(3)} onChange={handleAnswerChange} showAnswers={showAnswers} label="Amount paid" number={3} prefix="£" />
                                <QuestionItem question={getQuestion(4)} onChange={handleAnswerChange} showAnswers={showAnswers} label="Description" number={4} suffix="painting of a" />
                                <QuestionItem question={getQuestion(5)} onChange={handleAnswerChange} showAnswers={showAnswers} label="" number={5} suffix="landscape" />
                                <QuestionItem question={getQuestion(6)} onChange={handleAnswerChange} showAnswers={showAnswers} label="Width of painting without frame" number={6} />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 items-center bg-gray-50">
                                    <div className="md:col-span-1 font-medium text-gray-600">Width of painting with frame</div>
                                    <div className="md:col-span-2 text-gray-800">2 metres</div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 items-center">
                                    <div className="md:col-span-1 font-medium text-gray-600">Height without frame</div>
                                    <div className="md:col-span-2 text-gray-800">1 metre</div>
                                </div>
                                <QuestionItem question={getQuestion(7)} onChange={handleAnswerChange} showAnswers={showAnswers} label="Height with frame" number={7} />
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">Questions 8-10</h2>
                        <p className="mb-2">Complete the table below.</p>
                        <p className="mb-4 font-semibold text-gray-700">Write <span className="text-red-600">NO MORE THAN THREE WORDS AND/OR A NUMBER</span> for each answer.</p>

                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                             <h3 className="text-lg font-semibold bg-gray-50 p-4 border-b">Customer details</h3>
                             <div className="divide-y divide-gray-200">
                                <QuestionItem question={getQuestion(8)} onChange={handleAnswerChange} showAnswers={showAnswers} label="Name" number={8} prefix="Mrs." />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 items-start">
                                    <div className="md:col-span-1 font-medium text-gray-600 self-center">Address</div>
                                    <div className="md:col-span-2 space-y-4">
                                        <span>Charlton Manor, Kingston Village</span>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="q9" className="font-medium">Post Code:</label>
                                            <QuestionItem question={getQuestion(9)} onChange={handleAnswerChange} showAnswers={showAnswers} label="" number={9} inline={true} />
                                        </div>
                                    </div>
                                </div>
                                <QuestionItem question={getQuestion(10)} onChange={handleAnswerChange} showAnswers={showAnswers} label="Requested delivery date" number={10} suffix="(Day: Tuesday)" />
                             </div>
                        </div>
                    </div>

                    {showAnswers && (
                        <div className="text-center p-4 mb-6 bg-blue-100 border border-blue-300 rounded-lg">
                            <p className="font-bold text-xl text-blue-800">Your score: {score} / {questions.length}</p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={checkAnswers} className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                            Check Answers
                        </button>
                        <button onClick={() => setShowScript(!showScript)} className="w-full sm:w-auto bg-gray-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition duration-300 shadow-md">
                            {showScript ? 'Hide' : 'Show'} Script
                        </button>
                    </div>

                    <ScriptDisplay script={SCRIPT_TEXT} isVisible={showScript} />
                </div>
            </main>
        </div>
    );
};

export default App;

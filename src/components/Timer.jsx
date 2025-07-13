import React, { useState, useEffect , useRef } from "react";
import '../css/timer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRedo } from "@fortawesome/free-solid-svg-icons";

const Timer = () => {
    const [time, setTime] = useState(25*60); //initial time 25 minutes
    const [timeRun, setTimeRun] = useState(false); //initial timer paused
    const [timerType, setTimerType] = useState("work"); //initial timer type is work
    const [noticeMessage, setNoticeMessage] = useState("") //pop up text
    const audioRef = useRef(null);

    //timer count down logic
    useEffect(()=> { 
        let interval = null;

        if (timeRun) {
            interval = setInterval(()=> {
                setTime((prevTime)=> {
                    if (prevTime === 0) {
                        timerFinish();
                        return 0;
                    }
                    return prevTime -1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return ()=> clearInterval(interval);
    }, [timeRun]);

    function startStopBtn(e) {
        e.preventDefault();
        setTimeRun((prevRun) => !prevRun);
        setNoticeMessage("");
    }

    function resetBtn(e) {
        e.preventDefault();
        setTimeRun(false);
        setNoticeMessage("");
        switch (timerType) {
            case "work":
                setTime(25*60);
                break;
            case "shortBreak":
                setTime(5*60);
                break;
            case "longBreak":
                setTime(30*60);
                break;
            default:
                break;
        }
    }

    //notice pop up for time's up
    function timerFinish(e) {
        let message = "";
        switch (timerType) {
            case "work":
                message = (
                    <>
                    <p>Thank you for your hard work!</p>
                    <p>Now it's time for a rest, give it to yourself.</p>
                    </>
                );
                break;
            case "shortBreak":
                message = (
                    <>
                    <p>Thank yourself for taking a break.</p>
                    <p>Now it's time to move toward your goal!</p>
                    </>
                );
                break;
            case "longBreak":
                message = (
                    <>
                    <p>Thank yourself for taking a break.</p>
                    <p>Now it's time to move toward your goal!</p>
                    </>
                );
                break;
            default:
                break;
        }

        setNoticeMessage(message);
        setTimeRun(false); // stop timer
        if (audioRef.current) {
            audioRef.current.play()
        }
    }

   
    //change timer tabs
    function timerTypeChange(newType) {
        setTimerType(newType);
        switch (newType) {
            case "work":
                setTime(25*60); 
                setTimeRun(false);
                break;
            case "shortBreak":
                setTime(5*60); 
                setTimeRun(false);
                break;
            case "longBreak":
                setTime(30*60);
                setTimeRun(false);
                break;
            default:
                break;
        }
    };

    const formatTime = (timeInSec) => {
        const minutes = Math.floor(timeInSec/60);
        const seconds = timeInSec % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="timerContainer">
            <h1>Pomodoro Timer</h1>

            <div className="timerTypeTabs">
                <button className= {timerType === "work" ? "btnActive" : ""}
                    onClick={()=> timerTypeChange("work")}>Work</button>
                <button className= {timerType === "shortBreak" ? "btnActive" : ""}
                    onClick={()=> timerTypeChange("shortBreak")}>Small Break</button>
                <button className= {timerType === "longBreak" ? "btnActive" : ""}
                    onClick={()=> timerTypeChange("longBreak")}>Big Break</button>
            </div>

            <div className="timer">
                <p id="formatTime">{formatTime(time)}</p>
                <div className="timeControl">
                    <button id="startStopBtn" onClick={startStopBtn} className={ timeRun ? "stopActive" : "" }>
                        <FontAwesomeIcon className="iconBtn" icon = {timeRun ? faPause : faPlay}/>
                        {timeRun ? "Pause" : "Start"}
                    </button>
                    <button id="resetBtn" onClick={resetBtn}><FontAwesomeIcon className="iconBtn" icon={faRedo}/>Reset</button>
                </div>
            </div>

            {noticeMessage && (
                <div className="timeUpNotice">
                    <p>{noticeMessage}</p>
                    <button className="closeBtn" onClick={() => setNoticeMessage("")}>X</button>
                </div>
            )}

            <audio ref={audioRef} src={`${import.meta.env.BASE_URL}ding.mp4`} preload="auto" />


        </div>
        
    )
}

export default Timer;
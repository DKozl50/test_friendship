import {useEffect, useState} from "react";
import React from "react";
import './Modal.css';
import emojis from '../../data/emojis.json'
import { Icon24DismissDark } from '@vkontakte/icons';
import Emoji from "../Emoji/Emoji";

/**
 * React component with a modal window (used for choosing emojis for answers)
 * @param {number} answerId - id of the answer user is choosing an emoji for
 * @param {() => void} closeModal - function closing the modal window
 * @param {(answerId : number, new_value : string) => void} newIcon - handler
 * of icon selection
 * @param {string} animation - current CSS class of modal window (used for animation)
 */
export default function Modal({answerId, closeModal, newIcon, animation}) {
    //an array of emojis' urls(blocks of emojis grouped by 7)
    const [emojiList, setEmojiList] = useState([])

    useEffect(() => {
        //creating an array of emojis' urls(blocks of emojis grouped by 7)
        const newEmojiList = []
        for (let i = 0; i < emojis.length; i++) {
            if (i % 7 === 0) {
                newEmojiList.push([])
            }
            newEmojiList[newEmojiList.length - 1].push(emojis[i])
        }
        setEmojiList(newEmojiList)
    }, [])
    
    return (
        <div className={"modal " + animation} onClick={closeModal}>
            <div className={"modal-dialog " + animation} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                <span className="modal-close" onClick={closeModal}>
                    <Icon24DismissDark/>
                </span>
                </div>
                <div className="modal-body">
                    <div className="modal-content">
                        {/* displaying emojis by rows(7 emojis in a row) */}
                        {emojiList.map((block, blockIndex) => (
                            <div className="icons-row" key={blockIndex}>
                                {block.map((emoji_url, ind) => (
                                    <button 
                                        className="emoji-button"
                                        key={ind} 
                                        onClick={() => newIcon(answerId, emoji_url)}
                                    >
                                        <Emoji size={30} src={emoji_url}/>
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
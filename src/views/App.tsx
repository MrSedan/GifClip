import React, { useState } from "react";
import Gallery from "react-photo-gallery";
import Header from "./Header";
import "./styles/app.css";

declare global {
    interface Window {
        electron: any;
    }
}

export default function App() {
    const [gifs, setGifs] = useState<string[]>([]);
    const [activeNotification, setActiveNotification] = useState(false);

    async function copyImg(url: string) {
        setActiveNotification(true);
        setTimeout(() => {
            setActiveNotification(false);
        }, 3000);
        return window.electron.notificationApi.sendToClipboard(url);
    }
    const getGifs = () => {
        const gifArr: { src: string; width: number; height: number }[] = [];
        gifs.map((item) => {
            gifArr.push({
                src: item,
                width: 1,
                height: 1,
            });
        });
        return gifArr;
    };

    return (
        <div>
            <Header setGifs={setGifs} />
            <div id="gif-block">
                {gifs.length > 0 && gifs[0] != "error" && (
                    <Gallery
                        photos={getGifs()}
                        onClick={(e, obj) => copyImg(obj.photo.src)}
                    />
                )}
                {gifs.length == 2 && gifs[0] == "error" && (
                    <p>Error: {gifs[1]}!</p>
                )}
            </div>
            <div
                id="message-box"
                className={activeNotification ? "active" : ""}
            >
                Successfully copied!
            </div>
        </div>
    );
}

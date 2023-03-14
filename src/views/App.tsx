import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import "./styles/app.css";

export default function App() {
    const [gifs, setGifs] = useState<string[]>([]);

    async function copyImg(url: string) {
        return electron.notificationApi.sendToClipboard(url);
    }
    return (
        <div>
            <Header setGifs={setGifs} />
            <div id="gif-block">
                {gifs.length > 0 &&
                    gifs[0] != "error" &&
                    gifs.map((item, index) => {
                        return (
                            <img
                                key={index}
                                alt="Some gif"
                                src={item}
                                onClick={() => {
                                    copyImg(item);
                                }}
                            />
                        );
                    })}
                {gifs.length == 2 && gifs[0] == "error" && (
                    <p>Error: {gifs[1]}!</p>
                )}
            </div>
        </div>
    );
}

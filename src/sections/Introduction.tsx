"use client";

import Tag from "@/components/Tag";
import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const text = `You're racing to create exceptional work, but traditional design tools slow you down with unnecessary complexity and steep learning curves.`;
// Split 
const words = text.split(/\s+/);

export default function Introduction() {
    const scrollTarget = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: scrollTarget,
        offset: ["start end", "end end"],
    });

    const [currentWord, setCurrentWord] = useState(0);
    const wordProgress = useTransform(scrollYProgress, [0, 1], [0, words.length]);

    useEffect(() => {
        // Floor to get discrete steps, and unsubscribe on cleanup
        const unsub = wordProgress.on("change", (v) => {
            setCurrentWord(Math.floor(v)); // cumulative highlight
        });
        return unsub;
    }, [wordProgress]);

    return (
        <section className="py-28 lg:py-40">
            <div className="container">
                <div className="sticky top-20 md:top-28 lg:top-40">
                    <div className="flex justify-center">
                        <Tag>Introducting Layers</Tag>
                    </div>
                    <div className="text-4xl md:text-6xl lg:text-7xl text-center font-medium mt-10">
                        <span>Your creative process deserves better. </span>
                        <span className="text-white/15">
                            {words.map((word, i) => (
                                <span
                                    key={i}
                                    className={twMerge(i < currentWord ? "text-white" : "")}
                                >
                                    {word}
                                    {i < words.length - 1 ? " " : ""}
                                </span>
                            ))}
                        </span>
                        <span className="text-lime-400 block">That is why we built Layers.</span>
                    </div>
                </div>
                <div className="h-[150vh]" ref={scrollTarget} />
            </div>
        </section>
    );
}
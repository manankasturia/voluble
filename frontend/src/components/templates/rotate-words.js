import React, { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

export function RotateWords({ text = "", words = ["Word 1", "Word 2", "Word 3"], interval = 5000 }) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length)
        }, interval)
        return () => clearInterval(id)
    }, [words.length, interval])

    return (
        <div className="w-full flex flex-nowrap items-center gap-2 my-3 text-xl sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-950">
        {text}
    </span>
    <div className="relative flex items-center" style={{ minHeight: '4rem' }}>
        <AnimatePresence mode="wait">
            <motion.div
                key={words[index]}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute"
            >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">
                    {words[index]}
                </span>
            </motion.div>
        </AnimatePresence>
    </div>
</div>
    )
}
'use client';

import React, {useEffect, useRef, useState} from 'react';
import {default as hljsMain} from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import {Check, Copy} from 'lucide-react';

interface CodeBlockProps {
    id?: string;
    lines?: boolean;
    language?: string;
    fileName?: string;
    icon?: string;
    url?: string;
    langSelector?: boolean;
    dots?: boolean;
    lineSelector?: boolean;
    value?: string;
    lineNumberClass?: string;
    caretColor?: string;
    defaultTextClass?: string;
    maxHeight?: string;
    defaultText?: string;
    minHeight?: string;
    langSelectorClass?: string;
    lineSelectorClass?: string;
    consoleOutput?: string;
    children?: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
    id = 'react-editor',
    lines = false,
    language = 'javascript',
    fileName = '',
    icon = '',
    url = '',
    langSelector = false,
    dots = false,
    lineSelector = false,
    value = '',
    lineNumberClass = '',
    caretColor = 'black',
    defaultTextClass = 'text-slate-400 text-sm ml-2',
    maxHeight = '100vh',
    defaultText = 'Start typing or paste some code to see syntax highlighting!',
    minHeight = '80px',
    langSelectorClass = '',
    lineSelectorClass = '',
    consoleOutput = '',
    children,
}) => {
    const [showLines, setShowLines] = useState(lines);
    const editorRef = useRef<HTMLPreElement>(null);
    const linesDivRef = useRef<HTMLDivElement>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Set hydration state once component is mounted
        setIsHydrated(true);
    }, []);


    const languages = [
        'python', 'javascript', 'HLSL', 'typescript', 'java', 'c', 'cpp', 'csharp',
        'go', 'ruby', 'rust', 'swift', 'kotlin', 'php', 'sql', 'shell', 'plaintext',
        'bash', 'json', 'yaml', 'xml', 'html', 'css', 'scss', 'less', 'stylus',
        'markdown', 'dockerfile', 'nginx', 'apache', 'ini', 'properties', 'makefile',
        'perl', 'r', 'lua', 'dart', 'groovy', 'powershell'
    ];

    const validLanguage = languages.includes(language) ? language : 'plaintext';


    const highlightCode = (code: string) => {
        let highlightedText = hljsMain.highlight(code, {language: validLanguage}).value;
        highlightedText = highlightedText.replace(/\n/g, '<br/>');
        return highlightedText;
    };

    const syncScroll = () => {
        if (!editorRef.current || !linesDivRef.current || !showLines) return;
        linesDivRef.current.scrollTop = editorRef.current.scrollTop;
    };

    const copyToClipboard = () => {
        if (!isHydrated) return;
        navigator.clipboard
            .writeText(value)
            .then(() => {
                console.log('Copied to clipboard');
            })
            .catch((err) => {
                console.error('Failed to copy to clipboard', err);
            });
    };

    useEffect(() => {
        if (!isHydrated) return;
        const editor = editorRef.current;
        if (!editor) return;

        editor.addEventListener('scroll', syncScroll);
        editor.scroll({top: editor.scrollHeight, behavior: 'auto'});

        return () => {
            editor.removeEventListener('scroll', syncScroll);
        };
    }, [isHydrated, showLines, syncScroll]);
    
    // Scroll to top on load
    
    useEffect(() => {
        if (isHydrated && editorRef.current) {
            editorRef.current.scrollTo(0, 0);
        }
    }, [isHydrated]);

    // Split lines for line numbers
    const lineArray = value.split(/\r\n|\r|\n/);

    if (!isHydrated) {
        // return skeleton loader
        return (
            <div className={`rounded-lg mb-8 mt-4 code-block bg-gray-200 w-full h-screen animate-pulse `}></div>
        )
    }
    
    

    return (
        <>

            <div
                id={id}
                className="rounded-lg flex flex-col code-block border-gray-200 border bg-white"
                style={{minHeight}}
            >
                <div className="flex flex-row justify-between w-full">
                    {dots && (
                        <div className="flex gap-2 z-50 flex-row">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    )}
                    <div
                        className="flex flex-row  bg-white border-b border-slate-200 px-4 py-3 rounded-t-lg flex-1 items-center justify-between gap-2">
                        <div className="flex flex-row items-center gap-2">
                            {icon && (
                                <img
                                    src={icon}
                                    alt={validLanguage}
                                    className="w-4 h-4 object-contain grayscale !m-0"
                                />
                            )}
                            
                                {fileName && (
                                    url ? (
                                           
                                            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
                                                <p className={"text-xs font-medium hover:text-blue-500! underline text-gray-600! p-0 !m-0 "}
                                                   style={{fontSize: '0.7em'}}>{fileName}</p>
                                            </a>
                                        )
                                        : (
                                        <p className={"text-xs font-medium text-gray-600 p-0 !m-0 "}
                                           style={{fontSize: '0.7em'}}>{fileName}</p>
                                        )
                                )}


                                    </div>
                                    <div className="flex flex-row gap-4 items-center">
                                    <p className="text-xs font-medium uppercase text-gray-700 p-0 !m-0"
                               style={{fontSize: '0.7em'}}>{validLanguage}</p>
                            {lineSelector && (
                                <button
                                    className={` bg-white border border-slate-200  items-center hover:bg-slate-50 flex flex-row rounded-md px-2 py-1 text-sm ${lineSelectorClass}`}
                                    onClick={() => setShowLines(!showLines)}
                                >
                                    {showLines && (
                                        <Check className="text-green-500 w-4 h-4 mr-1"/>
                                    )}
                                    Lines
                                </button>
                            )}
                            {children && children}
                            <button
                                onClick={copyToClipboard}
                                className=""
                            >
                                <Copy className="w-4 h-4 text-slate-600 hover:text-slate-500"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`flex flex-row ${
                        consoleOutput ? 'border-b border-slate-200' : ''
                    } mt-1 gap-4 mb-4 mt-4 px-2 pb-2 overflow-hidden `}
                >
                    <div
                        ref={linesDivRef}
                        id="lines"
                        className={`${showLines ? 'w-10' : 'w-0'} max-h-[500px] pl-2 hide-scrollbar overflow-hidden ${lineNumberClass}`}
                    >
                        {lineArray.map((_, i) => (
                            <div
                                key={i}
                                className="text-slate-400 h-5 pt-0.5 flex items-end relative justify-center px-1 text-sm"
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    <div className="fade-in relative w-full ">
            <pre
                ref={editorRef}
                id="editorView"
                className="editor z-0 hide-scrollbar max-h-[500px] overscroll-contain overflow-y-scroll absolute text-lg top-0 left-0 overflow-x-scroll px-2 max-w-full w-full min-h-12 bg-transparent"
                dangerouslySetInnerHTML={{__html: highlightCode(value)}}
            />
                    </div>
                </div>

                {consoleOutput && (
                    <div className="bg-white p-2 rounded-b-sm  border-slate-200">
                        <p className="font-semibold mb-2">Output</p>
                        <pre className="text-sm p-2 overflow-x-scroll rounded-sm bg-slate-100 ">
              {consoleOutput}
            </pre>
                    </div>
                )}
            </div>

            <style jsx>{`
                .editor {
                    align-items: center;
                    font-size: 0.875rem !important;
                    line-height: 1.25rem !important;
                    font-family: 'Source Code Pro', monospace !important;
                }

                .editor:focus {
                    outline: none;
                }

                .hide-scrollbar {
                    scrollbar-width: none; /* For Firefox */
                    -ms-overflow-style: none; /* For Internet Explorer and Edge */
                }

                .hide-scrollbar::-webkit-scrollbar {
                    display: none; /* For Chrome, Safari, and Opera */
                }
            `}</style>
        </>
    );
};
  
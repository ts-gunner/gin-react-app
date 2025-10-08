import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import { cn } from '@/utils/utils'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css'
import "./index.css"
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' // 代码高亮
import { message } from 'antd'
//高亮的主题，还有很多别的主题，可以自行选择
// @ts-ignore

const mdStyle = "flex flex-col gap-3"

export default function MarkdownRender({ markdownText, className }: { markdownText: string, className?: string }) {
  return (
    <div className={cn(
      "markdown-body", mdStyle, className
    )}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{

          ul: ({ node, children, ...props }) => (
            <ul className={cn(
              mdStyle,
              "list-disc pl-5 my-2"
            )} {...props}>{children}</ul>
          ),
          ol: ({ node, children, ...props }) => (
            <ol className={cn(
              mdStyle,
              "list-decimal my-0"
            )} {...props}>{children}</ol>
          ),
          li: ({ node, children, ...props }) => (
            <li {...props} >{children}</li>
          ),
          p: ({ node, children, ...props }) => (
            <span {...props} >{children}</span>
          ),
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <div>
                <div className='flex justify-between'>
                  <div>{match[1]}</div>
                  <div className='text-xs cursor-pointer' onClick={() => {
                    navigator.clipboard.writeText(String(children).replace(/\n$/, '')).then(
                      resp => {
                        message.success("复制成功")
                      }
                    )
                    // navigator.clipboard.writeText()
                  }}>复制</div>

                </div>
                <SyntaxHighlighter language={match[1]} PreTag="div" className="markdown-code">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>

            ) : (
              <code {...props}>
                {children}
              </code>
            );
          },
        }}
      >{markdownText}</Markdown>
    </div>

  )
}

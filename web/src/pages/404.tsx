import { motion } from 'framer-motion';
import { history } from 'umi';

export default function NotFundPage() {
    // 容器动画
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    // 子元素动画
    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    };

    // 数字动画
    const numberMotion = {
        hover: {
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' },
        },
    };

    // 零的动画
    const zero = {
        animate: {
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
        },
        transition: { duration: 2, repeat: Infinity, repeatType: 'mirror' },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50"
        >
            {/* 404 数字部分 */}
            <motion.div
                variants={item}
                className="flex items-center justify-center mb-8"
            >
                <motion.span
                    variants={{
                        hover: {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                            transition: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' },
                        },
                    }}
                    whileHover="hover"
                    className="text-8xl font-bold text-gray-800 mx-2"
                >
                    4
                </motion.span>

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{ 
                        duration: 2, repeat: Infinity, repeatType: 'mirror' 
                    }}
                    className="w-24 h-24 rounded-full bg-red-400 flex items-center justify-center text-6xl text-white font-bold"
                >
                    0
                </motion.div>

                <motion.span
                     variants={{
                        hover: {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                            transition: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' },
                        },
                    }}
                    whileHover="hover"
                    className="text-8xl font-bold text-gray-800 mx-2"
                >
                    4
                </motion.span>
            </motion.div>

            {/* 标题 */}
            <motion.h1
                variants={item}
                className="text-4xl mb-4 text-gray-700"
            >
                页面未找到
            </motion.h1>

            {/* 描述 */}
            <motion.p
                variants={item}
                className="text-xl mb-8 text-gray-500 max-w-md text-center"
            >
                抱歉，您访问的页面不存在或已被移除。
            </motion.p>

            {/* 返回按钮 */}
            <motion.div variants={item}>
                <motion.button
                    onClick={() => history.push('/')}
                    whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 text-lg bg-blue-400 text-white border-none rounded-full cursor-pointer font-bold"
                >
                    返回首页
                </motion.button>
            </motion.div>

            {/* 装饰性动画元素 */}
            <motion.div
                variants={item}
                className="mt-12 w-full max-w-md"
            >
                <motion.svg
                    viewBox="0 0 400 100"
                    className="w-full"
                    animate={{ x: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                >
                    <path
                        d="M20,50 Q100,10 180,50 T340,50"
                        stroke="#adb5bd"
                        strokeWidth="2"
                        fill="none"
                    />
                    <motion.circle
                        cx="20"
                        cy="50"
                        r="8"
                        fill="#4dabf7"
                        animate={{ cx: [20, 340] }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </motion.svg>
            </motion.div>
        </motion.div>
    )
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  User, Lock, Phone, Mail, Eye, EyeOff, 
  ChevronRight, RefreshCw, Check, AlertCircle,
  ArrowRight, Shield, Clock, Zap, ShieldAlert,
  X, CheckCircle2, ArrowLeft, Send
} from 'lucide-react';

// 定义表单数据类型
interface FormData {
  phone: string;
  code: string;
  username: string;
  password: string;
}

// 定义错误信息类型
interface Errors {
  phone?: string;
  code?: string;
  username?: string;
  password?: string;
}

// 动画变体配置
const containerVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  },
  exit: { 
    opacity: 0,
    x: 30,
    transition: {
      duration: 0.4
    }
  }
};

const inputVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, type: 'spring', stiffness: 300 }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay: 0.3 }
  },
  hover: { 
    scale: 1.02,
    boxShadow: '0 10px 25px -5px rgba(56, 189, 248, 0.4)',
    transition: { duration: 0.3 }
  },
  tap: { scale: 0.98, transition: { duration: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.7, type: 'spring', stiffness: 300, damping: 25 }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, type: 'spring', stiffness: 400, damping: 20 }
  }
};

const decorationVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, delay: 0.3 }
  }
};

const LoginPage: React.FC = () => {
  // 状态管理
  const [loginMethod, setLoginMethod] = useState<'code' | 'password'>('code');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    code: '',
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [initializationStatus, setInitializationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // 引用
  const decorationRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // 滚动动画值
  const yTransform = useTransform(scrollY, [0, 300], [0, -50]);
  
  // 表单输入变化处理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 清除对应字段的错误
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name as keyof Errors]: undefined }));
    }
  };
  
  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    if (loginMethod === 'code') {
      if (!formData.phone) {
        newErrors.phone = '请输入手机号码';
      } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = '请输入有效的手机号码';
      }
      
      if (!formData.code) {
        newErrors.code = '请输入验证码';
      } else if (formData.code.length !== 6) {
        newErrors.code = '验证码长度为6位';
      }
    } else {
      if (!formData.username) {
        newErrors.username = '请输入用户名';
      }
      
      if (!formData.password) {
        newErrors.password = '请输入密码';
      } else if (formData.password.length < 6) {
        newErrors.password = '密码长度不能少于6位';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 登录提交处理
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // 模拟登录请求
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccessModal(true);
        
        // 3秒后关闭成功提示
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 3000);
      }, 1500);
    }
  };
  
  // 获取验证码
  const handleGetCode = () => {
    if (!formData.phone) {
      setErrors(prev => ({ ...prev, phone: '请输入手机号码' }));
      return;
    }
    
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      setErrors(prev => ({ ...prev, phone: '请输入有效的手机号码' }));
      return;
    }
    
    setCodeLoading(true);
    
    // 模拟获取验证码请求
    setTimeout(() => {
      setCodeLoading(false);
      setCountdown(60);
    }, 1000);
  };
  
  // 切换登录方式
  const toggleLoginMethod = () => {
    setLoginMethod(prev => prev === 'code' ? 'password' : 'code');
    setErrors({});
  };
  
  // 项目初始化处理
  const handleInitialization = () => {
    setInitializationStatus('loading');
    
    // 模拟初始化过程
    setTimeout(() => {
      // 模拟成功或失败
      const success = Math.random() > 0.2;
      setInitializationStatus(success ? 'success' : 'error');
      
      // 5秒后重置状态
      setTimeout(() => {
        setInitializationStatus('idle');
      }, 5000);
    }, 2000);
  };
  
  // 倒计时效果
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 text-slate-800 font-sans overflow-x-hidden">
      {/* 装饰元素 */}
      <div className="fixed -z-10 inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row min-h-screen">
        {/* 左侧内容区域 */}
        <motion.div 
          className="md:w-1/2 md:pr-12 lg:pr-24 flex flex-col justify-center mb-12 md:mb-0"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="max-w-lg">
            {/* 品牌标识 */}
            <div className="flex items-center mb-10">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl">G</div>
              <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">Gin-React-Admin</span>
            </div>
            
            {/* 主标题 */}
            <motion.h1 
              variants={inputVariants}
              className="text-4xl md:text-5xl font-bold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600"
            >
              欢迎回来
            </motion.h1>
            
            {/* 副标题 */}
            <motion.p 
              variants={inputVariants}
              className="text-lg text-slate-600 mb-10 max-w-md"
            >
              {loginMethod === 'code' 
                ? '使用手机验证码快速登录，安全便捷' 
                : '输入您的账号密码，继续访问您的账户'
              }
            </motion.p>
            
            {/* 登录卡片 */}
            <motion.div 
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 backdrop-blur-sm bg-white/80 border border-slate-100"
            >
              {/* 登录方式切换标签 */}
              <div className="flex border-b border-slate-200 mb-6">
                <button
                  onClick={() => setLoginMethod('code')}
                  className={`py-3 px-1 font-medium transition-all text-sm md:text-base relative ${
                    loginMethod === 'code' 
                      ? 'text-cyan-600' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  手机验证码登录
                  {loginMethod === 'code' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 rounded-full"></span>
                  )}
                </button>
                <button
                  onClick={() => setLoginMethod('password')}
                  className={`py-3 px-1 font-medium transition-all text-sm md:text-base relative ml-6 ${
                    loginMethod === 'password' 
                      ? 'text-cyan-600' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  账号密码登录
                  {loginMethod === 'password' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 rounded-full"></span>
                  )}
                </button>
              </div>
              
              {/* 登录表单 */}
              <form onSubmit={handleLogin} className="space-y-5">
                <AnimatePresence mode="wait">
                  {loginMethod === 'code' ? (
                    // 手机验证码登录表单
                    <motion.div key="code-form" variants={inputVariants} className="space-y-5">
                      {/* 手机号码输入 */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                          手机号码
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="请输入手机号码"
                            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                              errors.phone 
                                ? 'border-red-400 focus:ring-red-100' 
                                : 'border-slate-200 focus:border-cyan-400 focus:ring-cyan-100'
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <div className="flex items-center text-sm text-red-500">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span>{errors.phone}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* 验证码输入 */}
                      <div className="space-y-2">
                        <label htmlFor="code" className="block text-sm font-medium text-slate-700">
                          验证码
                        </label>
                        <div className="relative">
                          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <input
                            type="text"
                            id="code"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            placeholder="请输入6位验证码"
                            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                              errors.code 
                                ? 'border-red-400 focus:ring-red-100' 
                                : 'border-slate-200 focus:border-cyan-400 focus:ring-cyan-100'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={handleGetCode}
                            disabled={countdown > 0 || codeLoading}
                            className={`absolute right-1 top-1/2 transform -translate-y-1/2 px-3 py-1.5 text-sm rounded ${
                              countdown > 0 || codeLoading
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100 transition-colors'
                            }`}
                          >
                            {codeLoading ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : countdown > 0 ? (
                              `重新发送(${countdown})`
                            ) : (
                              '获取验证码'
                            )}
                          </button>
                        </div>
                        {errors.code && (
                          <div className="flex items-center text-sm text-red-500">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span>{errors.code}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    // 账号密码登录表单
                    <motion.div key="password-form" variants={inputVariants} className="space-y-5">
                      {/* 用户名输入 */}
                      <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                          用户名
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="请输入用户名"
                            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                              errors.username 
                                ? 'border-red-400 focus:ring-red-100' 
                                : 'border-slate-200 focus:border-cyan-400 focus:ring-cyan-100'
                            }`}
                          />
                        </div>
                        {errors.username && (
                          <div className="flex items-center text-sm text-red-500">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span>{errors.username}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* 密码输入 */}
                      <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                          密码
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="请输入密码"
                            className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                              errors.password 
                                ? 'border-red-400 focus:ring-red-100' 
                                : 'border-slate-200 focus:border-cyan-400 focus:ring-cyan-100'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <div className="flex items-center text-sm text-red-500">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span>{errors.password}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* 忘记密码链接 */}
                      <div className="flex justify-end">
                        <a href="#" className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors hover:underline">
                          忘记密码?
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* 登录按钮 */}
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center mt-4"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      登录中...
                    </>
                  ) : (
                    <>
                      登录
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </motion.button>
                
                {/* 切换登录方式 */}
                <div className="text-center text-sm text-slate-600 pt-2">
                  {loginMethod === 'code' ? (
                    <>
                      已有账号?{' '}
                      <button
                        type="button"
                        onClick={toggleLoginMethod}
                        className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors hover:underline"
                      >
                        使用账号密码登录
                      </button>
                    </>
                  ) : (
                    <>
                      还没有账号?{' '}
                      <button
                        type="button"
                        onClick={toggleLoginMethod}
                        className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors hover:underline"
                      >
                        使用手机验证码登录
                      </button>
                    </>
                  )}
                </div>
              </form>
            </motion.div>
            
            {/* 项目初始化按钮 */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleInitialization}
              disabled={initializationStatus === 'loading'}
              className={`mt-8 px-6 py-2.5 rounded-lg font-medium transition-all flex items-center ${
                initializationStatus === 'loading'
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : initializationStatus === 'success'
                  ? 'bg-green-500 hover:bg-green-600'
                  : initializationStatus === 'error'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-indigo-500 hover:bg-indigo-600'
              } text-white`}
            >
              {initializationStatus === 'loading' ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  初始化中...
                </>
              ) : initializationStatus === 'success' ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  初始化成功
                </>
              ) : initializationStatus === 'error' ? (
                <>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  初始化失败
                </>
              ) : (
                <>
                  项目初始化
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
        
        {/* 右侧装饰内容区域 */}
        <motion.div 
          ref={decorationRef}
          className="md:w-1/2 relative hidden md:block"
          style={{ y: yTransform }}
        >
          {/* 装饰卡片 */}
          <motion.div 
            variants={decorationVariants}
            initial="hidden"
            animate="show"
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-4/5 max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100 z-10"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-slate-800">安全保障</h3>
              <motion.div 
                variants={badgeVariants}
                className="bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                已认证
              </motion.div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mt-1 bg-cyan-100 p-2 rounded-lg text-cyan-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-slate-800">加密传输</h4>
                  <p className="text-sm text-slate-500 mt-1">所有数据采用银行级加密技术传输，保障信息安全</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-cyan-100 p-2 rounded-lg text-cyan-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-slate-800">时效验证码</h4>
                  <p className="text-sm text-slate-500 mt-1">验证码5分钟内有效，且只能使用一次</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-cyan-100 p-2 rounded-lg text-cyan-600">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-slate-800">快速验证</h4>
                  <p className="text-sm text-slate-500 mt-1">验证过程仅需2秒，不占用您过多时间</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* 装饰图形 */}
          <motion.div 
            variants={decorationVariants}
            initial="hidden"
            animate="show"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full z-0"
            style={{ animationDelay: '0.5s' }}
          ></motion.div>
          
          <motion.div 
            variants={decorationVariants}
            initial="hidden"
            animate="show"
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cyan-300/30 rounded-full z-0"
            style={{ animationDelay: '1s' }}
          ></motion.div>
          
          <motion.div 
            variants={decorationVariants}
            initial="hidden"
            animate="show"
            className="absolute top-1/3 right-1/3 w-16 h-16 bg-blue-300/30 rounded-full z-0"
            style={{ animationDelay: '1.5s' }}
          ></motion.div>
        </motion.div>
      </div>
      
      {/* 登录成功弹窗 */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">登录成功</h3>
                <p className="text-slate-600 mb-6">您已成功登录系统，正在跳转...</p>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3 }}
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;

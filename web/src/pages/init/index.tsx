import { APPLICATION_CONFIG } from "@/constants/config";
import {
  initProject,
  testDbConnection,
} from "@/services/go_api/initController";
// @ts-ignore
import CryptoJs from "crypto-js"
import {history} from "umi"
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Progress,
  Select,
  Spin,
  Steps,
  Tooltip,
} from "antd";
// @ts-ignore
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Database,
  Database as DatabaseIcon,
  HelpCircle,
  Loader2,
  Projector,
  Save,
  Settings,
} from "lucide-react";
import React, { useEffect, useState } from "react";

// 定义步骤类型
type Step = "project-info" | "database" | "confirmation";

// 表单数据类型定义
interface FormData {
  adminUsername: string;
  adminPassword: string;
  // 数据库配置
  dbType: string;
  dbHost: string;
  dbPort: string;
  dbName: string;
  dbUser: string;
  dbPassword: string;
}

// 数据库类型选项
const databaseTypes = [
  { label: "MySQL", value: "mysql" },
  { label: "PostgreSQL", value: "postgres" },
  { label: "Mssql", value: "mssql" },
  { label: "SQLite", value: "sqlite" },
];

const databaseDefaultData = {
  mysql: {
    dbHost: "127.0.0.1",
    dbPort: "3306",
  },
  postgres: {
    dbHost: "127.0.0.1",
    dbPort: "5432",
  },
  mssql: {
    dbHost: "127.0.0.1",
    dbPort: "1433",
  },
};

export default function InitProjectPage() {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    checkIsInit();
  }, []);
  const checkIsInit = () => {
    setLoading(true);
    setLoading(false);
  };
  const [formData, setFormData] = useState<object>({});
  const [currentStep, setCurrentStep] = useState<Step>("project-info");
  const [form] = Form.useForm<FormData>();
  const [currentDbType, setCurrentDbType] = useState<string>("mysql");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [connectionTest, setConnectionTest] = useState<{
    status: "idle" | "testing" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  // 步骤配置
  const steps: { key: Step; title: string; icon: React.ReactNode }[] = [
    {
      key: "project-info",
      title: "项目信息",
      icon: <Projector className="h-5 w-5" />,
    },
    {
      key: "database",
      title: "数据库配置",
      icon: <DatabaseIcon className="h-5 w-5" />,
    },
    {
      key: "confirmation",
      title: "确认",
      icon: <CheckCircle className="h-5 w-5" />,
    },
  ];

  // 计算当前步骤索引
  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);

  // 计算完成进度
  const progress = (currentStepIndex / (steps.length - 1)) * 100;

  // 处理步骤变更
  const handleStepChange = (step: Step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 下一步
  const handleNext = async () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      const d = await form.validateFields();
      setFormData((prev) => ({
        ...prev,
        ...d,
      }));
      handleStepChange(steps[nextIndex].key);
    }
  };

  // 上一步
  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      handleStepChange(steps[prevIndex].key);
    }
  };

  // 测试数据库连接
  const testDatabaseConnection = async () => {
    setConnectionTest({ status: "testing", message: "正在测试连接..." });
    try {
      // 实际应用中这里会有真实的连接测试逻辑
      const formData = await form.validateFields([
        "dbType",
        "dbHost",
        "dbPort",
        "dbUser",
        "dbPassword",
      ]);

      const resp = await testDbConnection({
        dbType: formData.dbType,
        host: formData.dbHost,
        port: formData.dbPort,
        username: formData.dbUser,
        password: formData.dbPassword,
      });
      if (resp.code === 200) {
        if (resp.data?.result) {
          setConnectionTest({
            status: "success",
            message: "数据库连接成功！",
          });
        } else {
          setConnectionTest({
            status: "error",
            message: "数据库连接失败，请检查配置",
          });
        }
      }
    } catch {
      setConnectionTest({
        status: "error",
        message: "数据库连接失败，请检查配置",
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const resp = await initProject({
      adminAccount: (formData as any).adminUsername,
      adminPassword: CryptoJs.MD5((formData as any).adminPassword).toString(),
      dbName: (formData as any).dbName,
      dbType: (formData as any).dbType,
      host: (formData as any).dbHost,
      port: (formData as any).dbPort,
      username: (formData as any).dbUser,
      password: (formData as any).dbPassword,
    });
    if (resp.code === 200) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }

    setIsSubmitting(false);
  };
  const handleDbTypeChange = (value: string) => {
    if (Object.keys(databaseDefaultData).includes(value)) {
      form.setFieldValue("dbHost", (databaseDefaultData as any)[value].dbHost);
      form.setFieldValue("dbPort", (databaseDefaultData as any)[value].dbPort);
    }
    setCurrentDbType(value);
  };


  // 渲染步骤内容
  const renderStepContent = () => {
    switch (currentStep) {
      case "project-info":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Form.Item<FormData>
              name="adminUsername"
              label="管理员账号"
              rules={[{ required: true, message: "请输入管理员账号" }]}
            >
              <Input placeholder="例如: admin" />
            </Form.Item>

            <Form.Item<FormData>
              name="adminPassword"
              label="管理员密码"
              rules={[{ required: true, message: "请输入管理员密码" }]}
            >
              <Input.Password placeholder="例如: 123456" />
            </Form.Item>
          </motion.div>
        );

      case "database":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              message="数据库配置"
              description="请填写数据库连接信息，这些设置将用于项目连接到数据库服务。"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />

            <Form.Item<FormData>
              name="dbType"
              label="数据库类型"
              rules={[{ required: true, message: "请选择数据库类型" }]}
            >
              <Select
                options={databaseTypes}
                placeholder="选择数据库类型"
                onChange={handleDbTypeChange}
              />
            </Form.Item>
            {currentDbType === "sqlite" ? (
              <Form.Item<FormData>
                name="dbName"
                label="数据库名称"
                rules={[{ required: true, message: "请输入数据库名称" }]}
              >
                <Input placeholder="请输入数据库名称" />
              </Form.Item>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item<FormData>
                    name="dbHost"
                    label="主机地址"
                    rules={[{ required: true, message: "请输入主机地址" }]}
                  >
                    <Input placeholder="例如: localhost 或数据库服务器IP" />
                  </Form.Item>

                  <Form.Item<FormData>
                    name="dbPort"
                    label="端口号"
                    rules={[{ required: true, message: "请输入端口号" }]}
                  >
                    <Input placeholder="例如: 3306 对于MySQL" type="number" />
                  </Form.Item>
                </div>

                <Form.Item<FormData>
                  name="dbName"
                  label="数据库名称"
                  rules={[{ required: true, message: "请输入数据库名称" }]}
                >
                  <Input placeholder="要连接的数据库名称" />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item<FormData>
                    name="dbUser"
                    label="用户名"
                    rules={[{ required: true, message: "请输入用户名" }]}
                  >
                    <Input placeholder="数据库访问用户名" />
                  </Form.Item>

                  <Form.Item<FormData> name="dbPassword" label="密码">
                    <Input.Password placeholder="数据库访问密码" />
                  </Form.Item>
                </div>

                <div className="mt-6">
                  <Button
                    type="primary"
                    onClick={testDatabaseConnection}
                    disabled={connectionTest.status === "testing"}
                    icon={
                      connectionTest.status === "testing" ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Database className="h-4 w-4 mr-2" />
                      )
                    }
                  >
                    {connectionTest.status === "testing"
                      ? "测试中..."
                      : "测试连接"}
                  </Button>

                  {connectionTest.status === "success" && (
                    <Alert
                      message="连接成功"
                      description={connectionTest.message}
                      type="success"
                      showIcon
                      style={{ marginTop: 12 }}
                    />
                  )}

                  {connectionTest.status === "error" && (
                    <Alert
                      message="连接失败"
                      description={connectionTest.message}
                      type="error"
                      showIcon
                      style={{ marginTop: 12 }}
                    />
                  )}
                </div>
              </>
            )}
          </motion.div>
        );

      case "confirmation":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              message="确认创建项目"
              description="请确认以上配置信息正确无误，点击创建按钮将开始初始化项目。"
              type="info"
              showIcon
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  // 渲染提交成功页面
  const renderSuccessView = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-10"
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">项目初始化成功！</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        您的项目已根据配置成功初始化。您可以开始开发工作了。
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          type="primary"
          onClick={() => {
            history.push("/login")
          }}
          icon={<Projector className="h-4 w-4 mr-2" />}
        >
          进入产品主页
        </Button>
      </div>
    </motion.div>
  );
  return (
    <Spin spinning={loading}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* 顶部导航 */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Settings className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">项目初始化</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Tooltip title="帮助文档">
                <Button variant="text">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </header>

        {/* 进度条 */}
        <div className="w-full bg-gray-200">
          <Progress
            percent={isSuccess ? 100 : progress}
            status={isSuccess ? "success" : undefined}
            size="small"
            showInfo={false}
            strokeColor={{ from: "#71c4ef", to: "#00668c" }}
          />
        </div>

        {/* 主内容区 */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {isSuccess ? (
            renderSuccessView()
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* 步骤导航 */}
              <Steps
                current={currentStepIndex}
                className="mb-8"
                items={steps.map((step) => ({
                  key: step.key,
                  title: step.title,
                  icon: step.icon,
                }))}
              />

              {/* 表单内容 */}
              <Card className="shadow-sm">
                <Form
                  form={form}
                  layout="vertical"
                  className="space-y-6"
                  initialValues={{
                    dbType: "mysql",
                    dbHost: databaseDefaultData["mysql"].dbHost,
                    dbPort: databaseDefaultData["mysql"].dbPort,
                  }}
                >
                  <AnimatePresence mode="wait">
                    {renderStepContent()}
                  </AnimatePresence>

                  {/* 导航按钮 */}
                  <div className="flex justify-between pt-4 border-t">
                    {currentStepIndex > 0 ? (
                      <Button
                        onClick={handlePrevious}
                        icon={<ArrowLeft className="h-4 w-4 mr-1" />}
                      >
                        上一步
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    {currentStepIndex < steps.length - 1 ? (
                      <Button
                        type="primary"
                        onClick={handleNext}
                        icon={<ArrowRight className="h-4 w-4 ml-1" />}
                      >
                        下一步
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        loading={isSubmitting}
                        onClick={handleSubmit}
                        icon={
                          isSubmitting ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )
                        }
                      >
                        {isSubmitting ? "创建中..." : "创建项目"}
                      </Button>
                    )}
                  </div>
                </Form>
              </Card>
            </div>
          )}
        </main>

        {/* 页脚 */}
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            © 2025 项目初始化 | 版本 {APPLICATION_CONFIG.VERSION}
          </div>
        </footer>
      </div>
    </Spin>
  );
}

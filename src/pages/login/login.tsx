    import {
    Button,
    Card,
    Checkbox,
    ConfigProvider,
    Flex,
    Form,
    Input,
    Typography,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const BRAND = '#F0501E';

export type LoginValues = {
    username: string;
    password: string;
    remember: boolean;
};

const PizzaLogo = () => (
    <Flex align="center" gap={8}>
        <span
            aria-hidden
            style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: BRAND,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <span
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#fff',
                }}
            />
        </span>
        <Typography.Title
            level={4}
            style={{ margin: 0, letterSpacing: 1, color: '#2b2b2b' }}
        >
            PIZZA
        </Typography.Title>
    </Flex>
);

const LoginPage = () => {
    const [form] = Form.useForm<LoginValues>();

    const onFinish = (values: LoginValues) => {
        console.log('Login submitted:', values);
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: BRAND } }}>
            <Flex
                justify="center"
                align="center"
                style={{ minHeight: '100vh', background: '#f2f2f2', padding: 16 }}
            >
                <Flex vertical align="center" gap={24}>
                    <PizzaLogo />

                    <Card
                        style={{ width: 320 }}
                        styles={{ header: { textAlign: 'center' } }}
                        title={
                            <Flex align="center" justify="center" gap={8}>
                                <LockOutlined />
                                <span>Sign in</span>
                            </Flex>
                        }
                    >
                        <Form
                            form={form}
                            name="login"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            requiredMark={false}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Username"
                                    autoComplete="username"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                />
                            </Form.Item>

                            <Flex
                                justify="space-between"
                                align="center"
                                style={{ marginBottom: 24 }}
                            >
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <Typography.Link href="#" style={{ color: BRAND }}>
                                    Forgot password
                                </Typography.Link>
                            </Flex>

                            <Form.Item noStyle>
                                <Button type="primary" htmlType="submit" block>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Flex>
            </Flex>
        </ConfigProvider>
    );
};

export default LoginPage;

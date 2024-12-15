import {Button, Card, Col, Form, Row, Steps, Typography} from "antd";
import GetFieldForm from "./GetFieldForm/GetFieldForm.tsx";
import {UseMainPage} from "./UseMainPage.tsx";
import {stepsData} from "./static/Steps.ts";

const {Title} = Typography;

const MainPage = () => {
    const [form] = Form.useForm();
    const {current, items, prev, saveAndValidateForm, sendAllData} = UseMainPage({form});

    return (
        <Row align="middle" justify="center">
            <Card style={{width: '50%'}}>
                <Steps current={current} items={items}/>
                <Row>
                    <Form
                        form={form}
                        layout="vertical"
                        style={{width: '100%'}}
                    >
                        <Row gutter={[12, 12]}>
                            <Col span={24}>
                                <Title level={3}>{stepsData[current].title} заполнения</Title>
                            </Col>
                            {stepsData[current].content.map(field => {
                                return <GetFieldForm key={field.name} field={field}/>;
                            })}
                        </Row>
                    </Form>
                </Row>
                <Row gutter={[12, 12]}>
                    {current < stepsData.length - 1 && (
                        <Col>
                            <Button type="primary" onClick={saveAndValidateForm}>
                                Следующий этап
                            </Button>
                        </Col>
                    )}
                    {current === stepsData.length - 1 && (
                        <Col>
                            <Button type="primary" onClick={sendAllData}>
                                Подать заявку
                            </Button>
                        </Col>
                    )}
                    {current > 0 && (
                        <Col>
                            <Button onClick={() => prev()}>
                                Предыдущий этап
                            </Button>
                        </Col>
                    )}
                </Row>
            </Card>
        </Row>
    );
};

export default MainPage;
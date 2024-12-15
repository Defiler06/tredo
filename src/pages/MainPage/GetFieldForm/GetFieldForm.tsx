import {Col, DatePicker, Form, Input, Select, Slider} from "antd";
import InputMask from 'react-input-mask';

interface IField {
    type: string;
    label: string;
    name: string;
    required: boolean;
    span: number;
    minLength?: number;
    maxLength?: number;
    dicti?: {
        value: string;
        label: string;
    }[];
}

interface IGetFieldForm {
    field: IField;
}

const {Option} = Select;

const GetFieldForm = ({field}: IGetFieldForm) => {
    const renderField = (field: IField) => {
        switch (field.type) {
            case 'TEXT':
                return (
                    <Col span={field.span}>
                        <Form.Item
                            label={field.label}
                            name={field.name}
                            rules={[{
                                required: field.required,
                                message: `Поле ${field.label} обязательное для заполнения`,
                            }]}
                        >
                            <Input size="large" placeholder={`Введите ${field.label}`}/>
                        </Form.Item>
                    </Col>
                )
            case 'DATE':
                return (
                    <Col span={field.span}>
                        <Form.Item
                            label={field.label}
                            name={field.name}
                            rules={[{
                                required: field.required,
                                message: `Поле ${field.label} обязательное для заполнения`,
                            }]}
                        >
                            <DatePicker
                                size="large"
                                style={{width: '100%'}}
                                placeholder={`Выберите ${field.label}`}
                                format="DD.MM.YYYY"
                            />
                        </Form.Item>
                    </Col>
                )
            case 'PHONE':
                return (
                    <Col span={field.span}>
                        <Form.Item
                            label={field.label}
                            name={field.name}
                            rules={[{
                                required: field.required,
                                message: `Поле ${field.label} обязательное для заполнения`,
                            }]}
                        >
                            <InputMask mask="+79999999999" placeholder={`Введите ${field.label}`}>
                                {(inputProps) => <Input {...inputProps} size="large"/>}
                            </InputMask>
                        </Form.Item>
                    </Col>
                )
            case 'DICTI':
                return (
                    <Col span={field.span}>
                        <Form.Item
                            label={field.label}
                            name={field.name}
                            rules={[{
                                required: field.required,
                                message: `Поле ${field.label} обязательное для заполнения`,
                            }]}
                        >
                            <Select size="large" placeholder={`Выберите ${field.label}`}>
                                {field?.dicti?.map((value) => {
                                    return <Option
                                        key={value.value}
                                        value={value.value}
                                    >
                                        {value.label}
                                    </Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                );
            case 'EMAIL':
                return (
                    <Col span={field.span}>
                        <Form.Item
                            label={field.label}
                            name={field.name}
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Введите корректный email!',
                                },
                                {
                                    required: field.required,
                                    message: `Поле ${field.label} обязательное для заполнения`,
                                },
                            ]}
                        >
                            <Input size="large" placeholder={`Введите ${field.label}`}/>
                        </Form.Item>
                    </Col>
                );
            case 'NUMBER':
                return (
                    <Col span={field.span}>
                        <Form.Item
                            label={field.label}
                            name={field.name}
                            rules={[
                                {
                                    required: field.required,
                                    message: `Поле ${field.label} обязательно для заполнения`,
                                },
                                {
                                    pattern: /^\d+$/,
                                    message: `${field.label} должно содержать только цифры`,
                                },
                                {
                                    min: field.minLength,
                                    message: `${field.label} должно быть не менее ${field.minLength} символов`,
                                },
                                {
                                    max: field.maxLength,
                                    message: `${field.label} должно быть не более ${field.maxLength} символов`,
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder={`Введите ${field.label}`}
                                maxLength={field.maxLength}
                            />
                        </Form.Item>
                    </Col>
                );
            case 'SLIDER':
                return (
                    <Col span={field.span}>
                        <Form.Item
                            label={field.label}
                            name={field.name}
                            rules={[
                                {
                                    required: field.required,
                                    message: `Поле ${field.label} обязательно для заполнения`,
                                },
                                {
                                    type: 'number',
                                    min: field.minLength,
                                    max: field.maxLength,
                                    message: `${field.label} должно быть в пределах от ${field.minLength} до ${field.maxLength}`,
                                },
                            ]}
                        >
                            <Slider
                                min={field.minLength}
                                max={field.maxLength}
                                step={1000}
                                tooltip={{formatter: (value) => `${value} Т`}}
                            />
                        </Form.Item>
                    </Col>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {renderField(field)}
        </>
    );
};

export default GetFieldForm;
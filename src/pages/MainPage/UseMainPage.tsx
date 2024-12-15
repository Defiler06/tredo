import {useEffect, useState} from "react";
import {stepsData} from "./static/Steps.ts";
import {FormInstance} from "antd";
import dayjs from "dayjs";
import {requestData} from "../../services";

interface IUseMainPageProps {
    form: FormInstance;
}

export const UseMainPage = ({form} : IUseMainPageProps) => {
    const [current, setCurrent] = useState(0);
    const [allFormData, setAllFormData] = useState<Record<string, string | number>>({});

    const items = stepsData.map((item) => ({key: item.title, title: item.title}));

    const next = () => {
        setCurrent(current + 1);
        localStorage.setItem('CurrentStep', String(current + 1));
    };

    const prev = () => {
        setCurrent(current - 1);
        localStorage.setItem('CurrentStep', String(current - 1));
    };

    const saveAndValidateForm = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                form
                    .validateFields()
                    .then(async (values) => {
                        resolve(values);

                        const updatedData = {...allFormData, ...values};
                        setAllFormData(updatedData);

                        localStorage.setItem('CurrentStep', String(current));
                        localStorage.setItem('Values', JSON.stringify(updatedData));

                        next();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        });
    };

    const sendAllData = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                form
                    .validateFields()
                    .then(async (values) => {
                        resolve(values);
                        const updatedData = {...allFormData, ...values};
                        setAllFormData(updatedData);

                        await requestData('allData', {method: "POST", data: updatedData});

                        localStorage.clear();

                        setCurrent(0);
                        form.resetFields();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        });
    };

    useEffect(() => {
        setCurrent(Number(localStorage.getItem('CurrentStep')) || 0);
        const savedData = localStorage.getItem('Values');

        if (savedData) {
            const parsedData = JSON.parse(savedData);

            setAllFormData(parsedData);
            form.setFieldsValue({
                ...parsedData,
                birthday: dayjs(parsedData.birthday) || null,
            });
        }
    }, [form]);

    return {
        current,
        next,
        prev,
        items,
        saveAndValidateForm,
        sendAllData,
    }
};


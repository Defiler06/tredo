import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';

dayjs.locale('ru');

createRoot(document.getElementById('root')!).render(
    <ConfigProvider locale={locale}>
        <App/>
    </ConfigProvider>
)

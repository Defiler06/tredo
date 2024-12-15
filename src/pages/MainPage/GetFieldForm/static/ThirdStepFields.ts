export const ThirdStepFields = [
    {
        type: 'NUMBER',
        label: 'Ежемесячный доход',
        name: 'month_salary',
        required: true,
        minLength: 1,
        span: 12,
    },
    {
        type: 'NUMBER',
        label: 'Срок кредита (в годах)',
        name: 'loan_term',
        required: true,
        minLength: 1,
        span: 12,
    },
    {
        type: 'SLIDER',
        label: 'Сумма кредита',
        name: 'loan_sum',
        required: true,
        minLength: 20000,
        maxLength: 1000000,
        span: 24,
    },
];
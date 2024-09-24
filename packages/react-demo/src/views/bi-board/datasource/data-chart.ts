
const metaFields = {
    name: {
        name:'name', title: '名称'
    },
    year: {
        name:'year', title: '年份'
    },
    month: {
        name:'month', title: '月份'
    },
    amount: {
        name:'amount', title: '金额'
    },
    count: {
        name:'count', title: '合计'
    }
}

const datasource = [
    {
        id: 'd1',
        name: '名称-年份-金额',
        meta: [metaFields.name, metaFields.year, metaFields.amount],
        dimensions: [metaFields.name, metaFields.year],
        metrics: [metaFields.amount],
    },
    {
        id: 'd2',
        name: '名称-月份-合计',
        meta: [metaFields.name, metaFields.month, metaFields.count],
        dimensions: [metaFields.year],
        metrics: [metaFields.count],
    }
]

export default datasource;

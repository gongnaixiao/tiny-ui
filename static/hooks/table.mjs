const instance = axios.create({
    baseURL: 'http://localhost:9000/',
    timeout: 20000
})

const useFetch = (url, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            url,
            ...config
        }).then(({ data: { data, code, msg } }) => {
            switch (code) {
                case 0: // success
                    resolve({ code, msg, data })
                    break
                default:
                    // other code
                    reject(new Error(msg))
                    break
            }
        }).catch((e) => {
            reject(e)
        })
    })
}

const defaultOptions = {
    // 列表数据是否正在加载中，默认为false
    dataListLoading: false,
    // 是否需要自动请求创建接口来获取表格数据，默认为true
    createdIsNeed: true,
    // 是否展示分页组件，默认为true
    isPage: true,
    // 查询表单对象，用于提交条件查询时的参数传递，默认为空对象
    queryForm: {},
    // 表格展示的数据数组，默认为空数组
    dataList: [],
    // 分页组件属性配置，如当前页码、每页展示数据条数等，默认值为 {current:1, size:10,total:0,pageSizes:[1, 10, 20, 50, 100, 200],layout:'total, sizes, prev, pager, next, jumper'}
    pagination: {
        current: 1,
        size: 10,
        total: 0,
        pageSizes: [1, 10, 20, 50, 100, 200],
        layout: 'total, sizes, prev, pager, next, jumper',
    },
    // 当前选中的数据项，默认为空数组
    dataListSelections: [],
    // 是否正在从服务器加载数据，默认为false
    loading: false,
    // 表格数据项的选择数据，默认为空数组
    selectObjs: [],
    // 排序时使用的字段名数组，如 ['id','name']，默认为空数组
    descs: [],
    // 排序方向数组，如 ['asc', 'desc']，默认为空数组
    ascs: [],
    // props属性配置对象，用于自定义数据属性，默认值为 {item:'records',totalCount:'total'}
    props: {
        item: 'records',
        totalCount: 'total',
    },
};

const mergeDefaultOptions = (options, props) => {
    for (const key in options) {
        if (!Object.getOwnPropertyDescriptor(props, key)) {
            props[key] = options[key];
        }
    }
    return props;
};

export const getDataList = async (options) => {
    options.loading = true;
    try {
        const {
            data: list
        } = await useFetch('/admin/post/page', {
            method: 'get'
        })
        console.log(list);
        // 覆盖默认值
        const state = mergeDefaultOptions(defaultOptions, options);
        console.log("getDataList");
    } finally {
        options.loading = false;
    }
};
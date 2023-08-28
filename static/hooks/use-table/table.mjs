import { onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'ElementPlus';

export function useTable(options) {
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

    /**
     * 合并默认属性配置和自定义属性配置
     * @param options 默认属性配置对象
     * @param props 自定义属性配置对象
     * @returns 合并后的属性配置对象
     */
    const mergeDefaultOptions = (options, props) => {
        for (const key in options) {
            if (!Object.getOwnPropertyDescriptor(props, key)) {
                props[key] = options[key];
            }
        }
        return props;
    };

    // 覆盖默认值
    const state = mergeDefaultOptions(defaultOptions, options);

    /**
     * 发起分页查询，并设置表格数据和分页信息
     */
    const query = async () => {
        // 判断是否存在state.pageList属性
        if (state.pageList) {
            try {
                // 开始加载数据，设置state.loading为true
                state.loading = true;

                // 调用state.pageList方法发起分页查询
                const res = await state.pageList({
                    ...state.queryForm,
                    current: state.pagination?.current,
                    size: state.pagination?.size,
                    descs: state.descs?.join(','),
                    ascs: state.ascs?.join(','),
                });

                // 设置表格展示的数据数组
                state.dataList = state.isPage ? res.data[state.props.item] : res.data;
                // 设置分页信息中的总数据条数
                state.pagination && (state.pagination.total = state.isPage ? res.data[state.props.totalCount] : 0);
            } catch (err) {
                // 捕获异常并显示错误提示
                //ElMessage.error(err.msg || err.data.msg);
            } finally {
                // 结束加载数据，设置state.loading为false
                state.loading = false;
            }
        }
    };

    onMounted(() => {
        if (state.createdIsNeed) {
            query();
        }
    });

    /**
     * 分页大小改变事件处理函数
     * @param val 新的分页大小
     */
    const sizeChangeHandle = (val) => {
        // 修改state.pagination中的size属性
        state.pagination && (state.pagination.size = val);
        // 再次发起查询操作
        query();
    };

    /**
     * 当前页码改变事件处理函数
     * @param val 新的页码
     */
    const currentChangeHandle = (val) => {
        // 修改state.pagination中的current属性
        state.pagination && (state.pagination.current = val);
        // 再次发起查询操作
        query();
    };

    // 排序触发事件
    const sortChangeHandle = (column) => {
        const prop = other.toUnderline(column.prop);
        if (column.order === 'descending') {
            state.descs?.push(prop);
            if (state.ascs?.indexOf(prop) >= 0) {
                state.ascs?.splice(state.ascs.indexOf(prop), 1);
            }
        } else if (column.order === 'ascending') {
            state.ascs?.push(prop);
            if (state.descs?.indexOf(prop) >= 0) {
                state.descs?.splice(state.descs.indexOf(prop), 1);
            }
        } else {
            if (state.ascs?.indexOf(prop) >= 0) {
                state.ascs?.splice(state.ascs.indexOf(prop), 1);
            }
            if (state.descs?.indexOf(prop) >= 0) {
                state.descs?.splice(state.descs.indexOf(prop), 1);
            }
        }
        query();
    };

    /**
     * 获取数据列表，并可选择是否刷新当前页码
     * 刷新后不跳转第一页，则入参 getDataList(false)
     * @param refresh 是否刷新当前页码
     */
    const getDataList = (refresh) => {
        // 如果需要刷新，则将state.pagination.current重置为1
        if (refresh !== false) {
            state.pagination && (state.pagination.current = 1);
        }
        // 再次发起查询操作
        query();
    };

    /**
     * 下载文件
     * @param url 文件下载地址
     * @param query 请求参数（可能包含token）
     * @param fileName 文件名
     * @returns 返回一个Promise对象，用于异步处理结果
     */
    const downBlobFile = (url, query, fileName) => {
        return other.downBlobFile(url, query, fileName);
    };

    /**
     * 定义表格通用样式
     * @returns  css
     */
    const tableStyle = {
        cellStyle: { textAlign: 'center' },
        headerCellStyle: {
            textAlign: 'center',
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)',
        },
    };

    return {
        tableStyle,
        getDataList,
        sizeChangeHandle,
        currentChangeHandle,
        sortChangeHandle,
        downBlobFile,
    };
}

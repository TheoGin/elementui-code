import Row from '@element/Row'
import Col from '@element/Col'

const components = [Row, Col]
const install = (Vue) => {
    components.forEach( item => {
        Vue.component(item.name, item)
    })
}

// 全部导入用
export default {
    install,
    Row,
    Col
}

// 按需导入用
export {
    install,
    Row,
    Col
}
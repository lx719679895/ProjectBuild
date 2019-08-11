import {foo, bar} from './math'
import data from '../data/test'

import '../css/test.css'

document.write('index.js is working<br>')
document.write(foo(3) + '<br />')
document.write(bar(3) + '<br />')
document.write(JSON.stringify(data))
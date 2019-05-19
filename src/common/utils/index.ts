import * as moment from 'moment'

export const relativeTime = (timestamp: string) => moment(timestamp).fromNow()

export {sanitize} from 'dompurify'

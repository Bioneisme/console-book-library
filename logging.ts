import moment from "moment";
import {createLogger, transports, format} from "winston";


const formatter = format((info) => {
    const {level} = info;
    info.level = `(${moment().utc().format('DD.MM.YYYY, HH:mm:ss')}) [${level}]`;
    return info;
})();


const logger = createLogger({
    transports: [
        new transports.File({
            format: format.combine(
                formatter,
                format.simple()
            ),
            filename: `./logs.log`
        }),
    ]
});

export default logger;
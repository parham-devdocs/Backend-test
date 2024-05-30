const fs = require("fs")
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "yyyy-MMdd \tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname,"logs"))) {
         await fs.promises.mkdir(path.join(__dirname,"logs"))
        
      }
        
        fs.promises.appendFile(path.join(__dirname, "logs", "eventLog.txt"),logItem);
  } catch (error) {
    console.error(error);
  }
};

const logger =(req, res, next) => {
  console.log(`${req.method}  ${req.path}`);
  logEvents(`${req.method}  ${req.headers.origin} ${req.url}`);
  next();
}


module.exports = logger;

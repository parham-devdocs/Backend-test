const whiteList = [
  "http://localhost:3000",

];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error("not allowed to access the resources"));
    }
  },
  optionsSuccessStatus: 200,
};
module.exports=corsOptions
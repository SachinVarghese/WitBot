module.exports = function (body) {
    let date = new Date();
    let intent = body.entities.intent.sort(function (a,b) {
        return a.confidence>b.confidence;
    })[0];
    let result=null;
    switch (intent.value){
        case "day":
            result = date.toDateString();
            break;
        case "time":
            result = date.toTimeString();
            break;
        default:
            result=null;
            break;
    }
    return result;
};
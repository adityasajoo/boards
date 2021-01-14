/*
{
    msg1 : [a,b,c],
    msg2: [d,e]
}
 */
module.exports = function(obj){
    Object.keys(obj).forEach(function(key) {
        console.log(key, obj[key]);    
      });

}
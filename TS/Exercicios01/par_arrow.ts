const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

var par = array.filter(n => n%2 == 0);

for(let i of par){
    console.log(i);
}
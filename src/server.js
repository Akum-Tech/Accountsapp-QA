import app from './app';
import "@babel/polyfill"
// console.log('app--->',app)
async function main(){
    await app.listen(process.env.PORT || 8989);
    console.log("server run on 8989");
}
main();

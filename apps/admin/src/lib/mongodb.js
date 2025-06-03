import mongoose from "mongoose"

const uri = process.env.MONGODB_URI

if(!uri) throw new Error("تنظیمات دیتابیس را وارد کنید")

let isConnected = false 
 
export async function connectedToDatabase(){
    if(isConnected) return console.log("قبلا به دیتابیس متصل شده اید!")
    
        try{
            await mongoose.connect(uri, {dbName: "test"})
            isConnected = true
            console.log("اتصال موفق به دیتابیس")
        }catch(error){
            console.error(error);
            process.exit(1)
            
        }
}
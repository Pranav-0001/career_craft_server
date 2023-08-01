import { MongoDBChat, chatModel } from "../Database/chatModel";
import { Chat } from "../../domain/models/chat";
import mongoose from "mongoose";

export type chatRepository={
    createChat:(empId:string,candidateId:string)=>Promise<Chat|null>
    getAllChats:(userId:string)=>Promise<Chat[] |null>
    getChatCount:(userId:string)=>Promise<number[]>
}

export const chatRepositoryEmpl=(chatsModel:MongoDBChat):chatRepository=>{

    const createChat=async(empId:string,candidateId:string):Promise<Chat|null>=>{
        const emp=new mongoose.Types.ObjectId(empId)
        const candidate=new mongoose.Types.ObjectId(candidateId)
        const isChat=await chatModel.findOne(
            {
                $and:[
                    {users:{$elemMatch:{$eq:emp}}},
                    {users:{$elemMatch:{$eq:candidate}}}
                ]
            }
        ).populate('users','-password').populate('latestMessage')
        if(isChat){
            return isChat
        }else{
            const chatData:Chat={
                chatName:'sender',
                users:[emp,candidate],
            }
            const createdChat=await chatModel.create(chatData)
            const fullChat=await chatModel.findOne({_id:createdChat._id}).populate('users','-password')
            return fullChat
        }

        
    }

    const getAllChats=async(userId:string):Promise<Chat[] | null>=>{
        const id= new mongoose.Types.ObjectId(userId)
        const chats=chatModel.find({users:{$elemMatch:{$eq:id}}}).populate('users','-password').populate('latestMessage').sort({updatedAt:-1})
        return chats
    }
    
    const getChatCount = async (userId: string): Promise<number[]> => {
        const id = new mongoose.Types.ObjectId(userId)
        const num = await chatModel.aggregate([{
            $unwind: "$users"
        },{
            $match:{
                users:id
            }
        },
        {
            $group:{
                _id:null,
                count:{$sum:1}
            }
        }

    ])
    return num
    }

    return {
        createChat,
        getAllChats,
        getChatCount
    }
}
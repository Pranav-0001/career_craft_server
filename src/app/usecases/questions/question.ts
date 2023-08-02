import { questionRepository } from "../../../infra/repositories/questionRepository";

export const addQuestion=(queModel:questionRepository)=>(question:string,answer:string,option1:string,option2:string,option3:string,addedBy:string,role:string,difficulty:string,code?:string)=>{
    const options=shuffleArray([answer,option1,option2,option3])
    const added=queModel.createQuestion(question,answer,options,difficulty,addedBy,role,code)
    return added

    
}

export const getQuestions=(queModel:questionRepository)=>async(page:string,empId:string)=>{
  const questions=await queModel.getQuestions(page,empId)
  return questions
}
export const getCount=(queModel:questionRepository)=>async(empId:string)=>{
  const count=await queModel.getCount(empId)
  return count
}

export const getQuestionsByDiff=(queModel:questionRepository)=>async(difficulty:string)=>{
  const questions=await queModel.getQuestionsByDiff(difficulty)
  return questions
}

function shuffleArray(array:string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  export const getAllQuestions=(queModel:questionRepository)=>async(page:string)=>{
    const data=await queModel.getAllQuestions(page)
    return data
  }
  export const enableQueStatus=(queModel:questionRepository)=>async(qId:string)=>{
    const data=await queModel.enableQue(qId)
    return data
  }
  export const disableQueStatus=(queModel:questionRepository)=>async(qId:string)=>{
    const data=await queModel.disableQue(qId)
    return data
  }
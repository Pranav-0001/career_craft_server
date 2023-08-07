import { promises } from "dns";
import { Job, applied } from "../../domain/models/job";
import { MongoDBJob } from "../Database/jobModel";
import mongoose, { UpdateWriteOpResult,ObjectId } from "mongoose";

export type jobRepository = {
    addJob: (jobData: Job) => Promise<Job>;
    editJob: (jobData: Job,job:string) => Promise<UpdateWriteOpResult>;
    getEmpJobs: (id: string) => Promise<Job[]>
    getJobs: (page: number, domain: string | null, salary: string | null, type: string | null, sort: string | null) => Promise<Job[]>
    getDomains: () => Promise<string[]>
    getJobsCount: (domain: string | null, salary: string | null, type: string | null) => Promise<number>
    getSingleJob:(id:string)=>Promise<Job[]|null>
    saveJob:(jobId:string,user:string)=>Promise<UpdateWriteOpResult>
    removeSaved:(jobId:string,user:string)=>Promise<UpdateWriteOpResult>
    getBookmarked:(userId:string)=>Promise<Job[]>
    addToApplied:(jobId:string,user:string)=>Promise<UpdateWriteOpResult>
    getSavedCountById:(id:string)=>Promise<number[]>
    getJobBySearch:(search:string)=>Promise<{data:Job[],count:number}>
    jobStatustrue:(id:string)=>Promise<UpdateWriteOpResult>
    jobStatusfalse:(id:string)=>Promise<UpdateWriteOpResult>
}
export const JobRepositoryImpl = (jobModel: MongoDBJob): jobRepository => {

    const addJob = async (job: Job): Promise<Job> => {
        const createdJob = await jobModel.create(job)
        return createdJob.toObject()
    }
    const editJob=async (jobData:Job,job:string)=>{
        const id=new mongoose.Types.ObjectId(job)
        console.log({jobData});
        
        const update= await jobModel.updateOne({_id:id},{$set:{
            title:jobData.title,
            category:jobData.category,
            salaryType:jobData.salaryType,
            fixedSalary:jobData.fixedSalary,
            salaryFrom:jobData.salaryFrom,
            salaryTo:jobData.salaryTo,
            qualification:jobData.qualification,
            experience:jobData.experience,
            deadline:jobData.deadline,
            jobType:jobData.deadline,
            desc:jobData.desc
        }})

        return update
    }

    const getEmpJobs = async (id: string): Promise<Job[]> => {
        const jobs = await jobModel.find({ EmployerId: id })
        return jobs
    }

    const getBookmarked=async (id:string) : Promise<Job[]>=>{
        const jobs=await jobModel.aggregate([
            {
                $match:{
                    savedBy:{$in:[new mongoose.Types.ObjectId(id)]}
                }
            },{
                $lookup:{
                    from:'users',
                    localField:'EmployerId',
                    foreignField:'_id',
                    as:'Employer'
                }
            }
        ])
        return jobs
    }

    const getSingleJob=async(id:string):Promise<Job[]|null>=>{
        try{
        const _id=new mongoose.Types.ObjectId(id)
        const data=await jobModel.aggregate([{
            $match:{_id}
        },
        {
            $lookup:{
                from: 'users',
                localField: 'EmployerId',
                foreignField: '_id',
                as: 'Employer'
            }
        }
        ])
        
        
        return data

        }catch(err){
            return null
        }
    }

    const saveJob=async(jobId:string,user:string)=>{
        const userId=new mongoose.Types.ObjectId(user)
        const res=await jobModel.updateOne({_id:jobId},{$push:{savedBy:userId}})
        return res
    }

    const removeSaved=async(jobId:string,user:string)=>{
        const userId=new mongoose.Types.ObjectId(user)
        const res=await jobModel.updateOne({_id:jobId},{$pull:{savedBy:userId}})
        return res
    }

    const addToApplied=async(jobId:string,user:string)=>{
        const userId=new mongoose.Types.ObjectId(user)
        const res=await jobModel.updateOne({_id:jobId},{$push:{appliedBy:userId}})
        return res
    }

   

    const getJobs = async (page: number, domain: string | null, salary: string | null, type: string | null, sort: string | null): Promise<Job[]> => {
        let skip = (page - 1) * 5
        if (domain != 'null' && type != 'null' && salary != 'null') {


            const salArr: string[] = salary?.split('-') as string[]
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);

            if (sort == 'low' || sort == 'high') {
                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        category: domain,
                        jobType: type,
                        salaryTo: {
                            $gte: min,
                            $lte: max
                        }
                    }
                }, {
                    $sort: {
                        salaryTo: sort === 'low' ? 1 : -1
                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            } else {

                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        category: domain,
                        jobType: type,
                        salaryTo: {
                            $gte: min,
                            $lte: max
                        }
                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            }
        }
        else if (domain != 'null' && type != 'null') {
            if (sort == 'low' || sort == 'high') {
                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        category: domain,
                        jobType: type,
                    }
                }, {
                    $sort: {
                        salaryTo: sort === 'low' ? 1 : -1
                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            }
            else {
                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        category: domain,
                        jobType: type,
                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            }
        }
        else if (domain != 'null' && salary != "null") {
            if (sort == 'low' || sort == 'high') {
                const salArr: string[] = salary?.split('-') as string[]
                let min = parseInt(salArr[0]);
                let max = parseInt(salArr[1]);
                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        category: domain,
                        salaryTo: {
                            $gte: min,
                            $lte: max
                        }

                    }
                }, {
                    $sort: {
                        salaryTo: sort === 'low' ? 1 : -1
                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            }
            else {
                const salArr: string[] = salary?.split('-') as string[]
                let min = parseInt(salArr[0]);
                let max = parseInt(salArr[1]);
                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        category: domain,
                        salaryTo: {
                            $gte: min,
                            $lte: max
                        }

                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            }
        } else if (type != 'null' && salary != "null") {
            const salArr: string[] = salary?.split('-') as string[]
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);
            if (sort == 'low' || sort == 'high') {
                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        jobType: type,
                        salaryTo: {
                            $gte: min,
                            $lte: max
                        }

                    }
                }, {
                    $sort: {
                        salaryTo: sort === 'low' ? 1 : -1
                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            }
            else {

                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        jobType: type,
                        salaryTo: {
                            $gte: min,
                            $lte: max
                        }

                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            }
        }
        else if (salary != "null") {
            const salArr: string[] = salary?.split('-') as string[]
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);
            if (sort == 'low' || sort == 'high') {
                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        salaryTo: {
                            $gte: min,
                            $lte: max
                        }

                    }
                }, {
                    $sort: {
                        salaryTo: sort === 'low' ? 1 : -1
                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            }
            else {

                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        salaryTo: {
                            $gte: min,
                            $lte: max
                        }

                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            }
        }
        else if (domain != 'null') {
            if (sort == 'low' || sort == 'high') {
                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        category: domain,

                    }
                }, {
                    $sort: {
                        salaryTo: sort === 'low' ? 1 : -1
                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs

            }
            else {
                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        category: domain,

                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            }
        }
        else if (type != 'null') {
            if (sort == 'low' || sort == 'high') {

                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        jobType: type,

                    }
                }, {
                    $sort: {
                        salaryTo: sort === 'low' ? 1 : -1
                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            }
            else {
                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                }, {
                    $match: {
                        status:true,
                        jobType: type,

                    }
                },
                {

                    $skip: skip
                },
                {
                    $limit: 5
                }

                ])
                return jobs
            }
        }

        else {
            if (sort == 'low' || sort == 'high') {
                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                },{
                    $match:{
                        status:true
                    }
                }, {
                    $sort: {
                        salaryTo: sort === 'low' ? 1 : -1
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: 5
                }
                ])
                return jobs
            }
            else {
                const jobs = await jobModel.aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'EmployerId',
                        foreignField: '_id',
                        as: 'Employer'
                    }
                },
                {
                    $match:{
                        status:true
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: 5
                }
                ])
                return jobs
            }
        }



    }

    const getJobsCount = async (domain: string | null, salary: string | null, type: string | null): Promise<number> => {

        if (domain != 'null' && type != 'null' && salary != 'null') {
            const salArr: string[] = salary?.split('-') as string[]
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);



            const jobs = await jobModel.aggregate([{
                $lookup: {
                    from: 'users',
                    localField: 'EmployerId',
                    foreignField: '_id',
                    as: 'Employer'
                }
            }, {
                $match: {
                    category: domain,
                    jobType: type,
                    salaryTo: {
                        $gte: min,
                        $lte: max
                    }
                }
            },
            {
                $count: "count"
            }

            ])
            console.log(jobs[0]?.count ?? 1);

            return jobs[0]?.count ?? 1
        }
        else if (domain != 'null' && type != 'null') {
            const jobs = await jobModel.aggregate([{
                $lookup: {
                    from: 'users',
                    localField: 'EmployerId',
                    foreignField: '_id',
                    as: 'Employer'
                }
            }, {
                $match: {
                    category: domain,
                    jobType: type,
                }
            },
            {
                $count: "count"
            }

            ])
            return jobs[0]?.count ?? 1
        }
        else if (domain != 'null' && salary != "null") {
            const salArr: string[] = salary?.split('-') as string[]
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);
            const jobs = await jobModel.aggregate([{
                $lookup: {
                    from: 'users',
                    localField: 'EmployerId',
                    foreignField: '_id',
                    as: 'Employer'
                }
            }, {
                $match: {
                    category: domain,
                    salaryTo: {
                        $gte: min,
                        $lte: max
                    }

                }
            },
            {
                $count: "count"
            }

            ])
            return jobs[0]?.count ?? 1
        } else if (type != 'null' && salary != "null") {
            const salArr: string[] = salary?.split('-') as string[]
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);
            const jobs = await jobModel.aggregate([{
                $lookup: {
                    from: 'users',
                    localField: 'EmployerId',
                    foreignField: '_id',
                    as: 'Employer'
                }
            }, {
                $match: {
                    jobType: type,
                    salaryTo: {
                        $gte: min,
                        $lte: max
                    }

                }
            },
            {
                $count: "count"
            }
            ])
            return jobs[0]?.count ?? 1
        }
        else if (salary != "null") {
            const salArr: string[] = salary?.split('-') as string[]
            let min = parseInt(salArr[0]);
            let max = parseInt(salArr[1]);
            const jobs = await jobModel.aggregate([{
                $lookup: {
                    from: 'users',
                    localField: 'EmployerId',
                    foreignField: '_id',
                    as: 'Employer'
                }
            }, {
                $match: {
                    salaryTo: {
                        $gte: min,
                        $lte: max
                    }

                }
            },
            {
                $count: "count"
            }

            ])
            return jobs[0]?.count ?? 1
        }
        else if (domain != 'null') {
            const jobs = await jobModel.aggregate([{
                $lookup: {
                    from: 'users',
                    localField: 'EmployerId',
                    foreignField: '_id',
                    as: 'Employer'
                }
            }, {
                $match: {
                    category: domain,

                }
            },
            {
                $count: "count"
            }

            ])
            return jobs[0]?.count ?? 1
        }
        else if (type != 'null') {
            const jobs = await jobModel.aggregate([{
                $lookup: {
                    from: 'users',
                    localField: 'EmployerId',
                    foreignField: '_id',
                    as: 'Employer'
                }
            }, {
                $match: {
                    jobType: type,

                }
            },
            {
                $count: "count"
            }

            ])
            return jobs[0]?.count ?? 1
        }


        else {
            const count = await jobModel.countDocuments()
            return count
        }


    }

    const getDomains = async (): Promise<string[]> => {


        const domains = await jobModel.distinct("category")
        return domains
    }

    const getSavedCountById=async(id:string):Promise<number[]>=>{
        const Id=new mongoose.Types.ObjectId(id)
        const domain=await jobModel.aggregate([{
            $unwind:"$savedBy"
        },
        {
            $match:{
                "savedBy":Id
            }
        },
        {
            $group:{
                _id:null,
                count:{$sum:1}
            }
        }
    ])
    return domain
    }
    const getJobBySearch=async(search:string)=>{
        
        
        const data=await jobModel.find({title:{ $regex: search,$options:'i' }}).populate('EmployerId')
        const count=await jobModel.countDocuments({title:{ $regex: search ,$options:'i'}})
        return {data,count}
    }

    const jobStatusfalse=async(jobId:string)=>{
        const data=await jobModel.updateOne({_id:new mongoose.Types.ObjectId(jobId)},{$set:{status:false}})
        return data
    }
    const jobStatustrue=async(jobId:string)=>{
        const data=await jobModel.updateOne({_id:new mongoose.Types.ObjectId(jobId)},{$set:{status:true}})
        return data
    }

    return {
        addJob,
        getEmpJobs,
        getJobs,
        getDomains,
        getJobsCount,
        getSingleJob,
        saveJob,
        removeSaved,
        getBookmarked,
        addToApplied,
        editJob,
        getSavedCountById,
        getJobBySearch,
        jobStatusfalse,
        jobStatustrue
    }
}
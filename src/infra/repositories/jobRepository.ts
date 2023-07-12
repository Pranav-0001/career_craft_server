import { promises } from "dns";
import { Job, applied } from "../../domain/models/job";
import { MongoDBJob } from "../Database/jobModel";
import mongoose, { UpdateWriteOpResult,ObjectId } from "mongoose";

export type jobRepository = {
    addJob: (jobData: Job) => Promise<Job>;
    getEmpJobs: (id: string) => Promise<Job[]>
    getJobs: (page: number, domain: string | null, salary: string | null, type: string | null, sort: string | null) => Promise<Job[]>
    getDomains: () => Promise<string[]>
    getJobsCount: (domain: string | null, salary: string | null, type: string | null) => Promise<number>
    getSingleJob:(id:string)=>Promise<Job>
    saveJob:(jobId:string,user:string)=>Promise<UpdateWriteOpResult>
    removeSaved:(jobId:string,user:string)=>Promise<UpdateWriteOpResult>
    getBookmarked:(userId:string)=>Promise<Job[]>
    addToApplied:(jobId:string,user:string)=>Promise<UpdateWriteOpResult>
}
export const JobRepositoryImpl = (jobModel: MongoDBJob): jobRepository => {

    const addJob = async (job: Job): Promise<Job> => {
        const createdJob = await jobModel.create(job)
        return createdJob.toObject()
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

    const getSingleJob=async(id:string):Promise<any>=>{
        
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
        addToApplied
    }
}
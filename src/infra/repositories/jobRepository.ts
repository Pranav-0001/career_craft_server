import { promises } from "dns";
import { Job } from "../../domain/models/job";
import { MongoDBJob } from "../Database/jobModel";

export type jobRepository = {
    addJob: (jobData: Job) => Promise<Job>;
    getEmpJobs: (id: string) => Promise<Job[]>
    getJobs: (page: number, domain: string | null, salary: string | null, type: string | null, sort: string | null) => Promise<Job[]>
    getDomains: () => Promise<string[]>
    getJobsCount: (domain: string | null, salary: string | null, type: string | null) => Promise<number>
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
        getJobsCount
    }
}
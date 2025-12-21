const studentInfoService = require('../../services/student/student.profile.service');


const getStudentInfo = async (req , res)=>{
    try{
        const studentInfo = await studentInfoService.getStudentInfo();
        res.json(studentInfo);
    }catch (error) {
        console.error('Error fetching Student Dashboard Infos:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module
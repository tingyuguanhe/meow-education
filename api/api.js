
import request from './index.js'

var basePath = 'http://114.112.75.135:7000/api/';
//教师list
export const getTeacherList = (data) => request('GET', basePath+'teacher/',data);
//students
export const getStudentList = (data) => request('GET', basePath + 'students/', data);

//城市
export const getCity = () => request('GET', basePath +'city/');
//学校
export const getSchools = () => request('GET', basePath + 'school/');
//学历
export const getEduBackground = () => request('GET', basePath + 'learn/');
//科目
export const getCourses = () => request('GET', basePath + 'subject/');
//学生特点
export const getStudentType = () => request('GET', basePath + 'student_type/');
//教学特点
export const getTeacherType = () => request('GET', basePath + 'teacher_type/');

//注册教师
export const registerTeacher = (data) => request('POST', basePath + 'teacher/',data);

//学生基础
export const getStuBasis = () => request('GET', basePath + 'basis/');

//判断是否注册
export const isRegister = () => request('GET', basePath + 'customer/');

//年级二级联动--获取年级
export const getBaselevel = () => request('GET', basePath + 'baselevel/');
//--获取年级级别
export const getLevel = () => request('GET', basePath + 'level/');
//注册学生
export const registerStudent = (data) => request('POST', basePath + 'students/', data);
//教师资质

export const getRequire = () => request('GET', basePath + 'require/');

//学生详情
export const getStudentDetail = (data) => request('GET', basePath + 'students/'+ data.id +'/');

//教师详情
export const getTeacherDetail = (data) => request('GET', basePath + 'teacher/' + data.id + '/');









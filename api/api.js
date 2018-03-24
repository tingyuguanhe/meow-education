
import request from './index.js'
var p = request.request;
var basePath = 'http://114.112.75.135:7000/api/';
//教师list
export const getTeacherList = (data) => p('GET', basePath+'teacher/',data);
//students
export const getStudentList = (data) => p('GET', basePath + 'students/', data);

//城市
export const getCity = () => p('GET', basePath +'city/');
//学校
export const getSchools = () => p('GET', basePath + 'school/');
//学校--带全部
export const getAllSchools = () => p('GET', basePath + 'schfilter/');

//学历
export const getEduBackground = () => p('GET', basePath + 'learn/');
//科目
export const getCourses = () => p('GET', basePath + 'subject/');
//科目--带全部科目
export const getAllCourses = () => p('GET', basePath + 'subfilter/');

//学生特点
export const getStudentType = () => p('GET', basePath + 'student_type/');
//教学特点
export const getTeacherType = () => p('GET', basePath + 'teacher_type/');

//注册教师
export const registerTeacher = (data) => p('POST', basePath + 'teacher/',data);

//学生基础
export const getStuBasis = () => p('GET', basePath + 'basis/');

//年级二级联动--获取年级
export const getBaselevel = () => p('GET', basePath + 'baselevel/');
//--获取年级级别
export const getLevel = () => p('GET', basePath + 'level/');
//注册学生
export const registerStudent = (data) => p('POST', basePath + 'students/', data);
//教师资质

export const getRequire = () => p('GET', basePath + 'require/');

//学生详情
export const getStudentDetail = (data) => p('GET', basePath + 'students/'+ data.id +'/');

//教师详情
export const getTeacherDetail = (data) => p('GET', basePath + 'teacher/' + data.id + '/');

//判断是否注册
export const userIsRegister = () => p('GET', basePath + 'customer/info/');

//我的发布
export const myPublish = () => p('GET', basePath + 'customer/info/issue/');

//删除老师
export const deleteTeacher = (data) => p('DELETE', basePath + 'teacher/' + data.id + '/');

//删除学生
export const deleteStudent = (data) => p('DELETE', basePath + 'students/' + data.id + '/');

//收藏教师
export const followerTeacher = (data) => p('POST', basePath + 'follower/teacher/', data);

//收藏学生
export const followerStudent = (data) => p('POST', basePath + 'follower/student/', data);
// 获取投诉原因
export const getReason = (data) => p('GET', basePath + 'reason/?type=' + data.type);
// 提交投诉
export const submitSuggestion = (data) => p('POST', basePath + 'suggestion/', data);

// 获取帮助
export const getHelps = () => p('GET', basePath + 'help/');












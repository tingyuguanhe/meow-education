import { getCity, getSchools } from '../api/api.js'
export const getSchoolsData = () =>{
//  return new Promise((resolve, reject) => {
    var data = '';
    getSchools().then((res) => {
      
        console.log('学校', res);
        data = res;
        return data;
      
      
      // resolve(res);
      
      // return res;
    })
  // })
    
    // var str = [1,2,3];
    // return str;
}
export const getCityData = () => {
 new Promise((resolve,reject) => {
    getCity().then((res) => {
      // console.log('城市', res);
      resolve(res.data);
      
    })
  })
  
}


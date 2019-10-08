export const login = ({ userName, password }:any) => {
  const data = {
    userName,
    password
  }
  setTimeout( () => {
    return new Promise( (resolve:any,reject:any) => {
      resolve({
        success: true
      })
    });
  },1000)
}


export const logout = (token:string) => {
  setTimeout( () => {
    return new Promise( (resolve:any,reject:any) => {
      resolve({
        success: true
      })
    });
  },1000)
}

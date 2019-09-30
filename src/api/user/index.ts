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

export const getUserInfo = (token:string) => {
  
    return new Promise( (resolve:any,reject:any) => {
      resolve()
    });
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

function wrapPromise(flag, promise) {
    let status = 'pending';
    let response;
  
    const suspender = promise.then(
      res => {
        status = 'success';
        response = res;
      },
      err => {
        status = 'error';
        response = err;
      },
    );
  
    const handler = {
      pending: () => {
        throw suspender;
      },
      error: () => {
        throw response;
      },
      default: () => response,
    };
  
    const read = () => {
      if(flag!==0){
        return flag
      }
      const result = handler[status] ? handler[status]() : handler.default();
      return result;
    };
  
    return { read };
  }
  
  export default wrapPromise;
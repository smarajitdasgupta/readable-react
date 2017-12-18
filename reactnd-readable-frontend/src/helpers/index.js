import { format } from 'date-fns'

const helpers = {
  
  formatDate(timestamp) { 
    return format(new Date(timestamp), 'D MMMM YYYY, h:mma') 
  }, 

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

}

export default helpers;
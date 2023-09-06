export async function checkCode(data) {
    switch(data) {
        case 'error':
          return 500
          break;
        case 'validation':
         return 300
          break;
        case 'success':
            return 300
            break;
        default:
          // code block
      }
}
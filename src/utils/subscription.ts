export const validSubsription=(expiryDateStr:string)=>{
    
    
    const [day, month, year] = expiryDateStr.split("-").map(Number);
  const expiryDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    console.log(expiryDate > currentDate ,expiryDate);
    
    if (expiryDate > currentDate) {
        return true;
      } else {
        return false;
      }
}
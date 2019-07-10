export const updateObject = (oldObject,updatedProperties) =>{
return{
    ...oldObject,
    ...updatedProperties
 };
};

export const checkValidity = (value, rules) =>
{
  let isValid = true;

  if(!rules)
  {
    return true;
  }
  
  if(rules.required)
  {
   isValid = value.trim() !== '' && isValid; 
  }

  if(rules.minLength)
  {
   isValid = value.length >= rules.minLength && isValid; 
  }

  
  if(rules.maxLength)
  {
   isValid = value.length <= rules.maxLength && isValid; 
  }

  if(rules.isEmail)
  { 

   //console.log(isValid +" yea yea");   
   const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
   isValid = pattern.test(value) && isValid; 
  // console.log(pattern.test(value) + "Is Valid "+isValid);
  }

  if(rules.isNumeric)
  {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }


  return isValid;
}

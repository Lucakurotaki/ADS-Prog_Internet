export const passwordValidator = (password: string)=>{
    if(password.length < 5){
        throw new Error("Your password must be at least 5 characters long.");
    }

    if(password.length < 10 && !containsValidChars(password)){
        throw new Error(
            "Make sure it's at least 10 characters or at least 5 characters including a number, " + 
            "an uppercase letter and a special character ($,%,#,etc.)."
        );
    }

    return true;
    
}

const containsValidChars = (password: string): boolean => {
    let containsSpecial = false;
    let containsUpperCase = false;
    let containsNumber = false;

    for(let i = 0; i < password.length; i++){
        const charCode = password.codePointAt(i);

        if(isUpperCase(charCode!)){
            containsUpperCase = true;
            continue;
        }
        
        if(isNumber(charCode!)){
            containsNumber = true;
            continue;
        }
        
        if(isSpecial(charCode!)){
            containsSpecial = true;
        }
    }

    return containsNumber && containsSpecial && containsUpperCase;

    
}

const isUpperCase = (charCode: number) => {
    return charCode >= 65 && charCode <= 90
}

const isNumber = (charCode: number) => {
    return charCode >= 48 && charCode <= 57
}

const isSpecial = (charCode: number) => {
    return !isUpperCase(charCode) && !isNumber(charCode) && (charCode < 97 || charCode > 122);
}
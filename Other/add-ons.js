let regex = ``
/*
^ represents starting character of the string.
(?=.*[0-9]) represents a digit must occur at least once.
(?=.*[a-z]) represents a lower case alphabet must occur at least once.
(?=.*[A-Z]) represents an upper case alphabet that must occur at least once.
(?=.*[@#$%^&-+=()] represents a special character that must occur at least once.
(?=\\S+$) white spaces don’t allowed in the entire string.
.{8, 20} represents at least 8 characters and at most 20 characters.
$ represents the end of the string.
*/

function checkPassword(str)
{
    var re = `^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$`;
    return re.test(str);
}
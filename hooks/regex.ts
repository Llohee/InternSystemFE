export const phoneRegex = /^(03|05|07|08|09)+([0-9]{8})$/

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const passwordRegex =
  /^((?=.*[A-Z])[a-zA-Z0-9])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{7,}$/
export const onlyNumber = /[a-zA-Z ]+$/
export const notSpecialCharactersRegex =
  /[`~!@#$%^&*()|+\-=?;:'",<>\{\}\[\]\\\/]/gi

export const spaceRegexFirst = /([(\s+[^\s]+){2,}|(^[(\s+[^\s]+)/
export const onlyNumber2 =
  /[a-zA-Z aàảãáạăằẳẵắặâầẩẫấậAÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬdđDĐeèẻẽéẹêềểễếệEÈẺẼÉẸÊỀỂỄẾỆiìỉĩíịIÌỈĨÍỊoòỏõóọôồổỗốộơờởỡớợOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢuùủũúụưừửữứựUÙỦŨÚỤƯỪỬỮỨỰyỳỷỹýỵYỲỶỸÝỴ]+$/g
export const removeSpecialCharacter = (e: string) => {
  let value = e.replace(notSpecialCharactersRegex, '')
  value = value.replace(spaceRegexFirst, '')

  return value
}

export const checkPhoneVN = (e: any) => {
  let value = e.currentTarget.value.replace(notSpecialCharactersRegex, '')
  value = value.replace(onlyNumber, '')
  return value
}
